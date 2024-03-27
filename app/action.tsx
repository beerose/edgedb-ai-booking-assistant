import { OpenAI } from 'openai'
import { createAI, createStreamableUI, getMutableAIState, render } from 'ai/rsc'
import { z } from 'zod'
import { createClient } from 'edgedb'
import e from '@/dbschema/edgeql-js'
import { Message } from '@/components/Message'
import { Houses } from '@/components/Houses'
import { Spinner } from '@/components/Spinner'
import HouseDetails from '@/components/HouseDetails'
import { houseProperties, propertiesSchema } from '@/src/types'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_AI_KEY,
})

const client = createClient()

async function getHouseInfo(houseId: string) {
  const houseQuery = e.select(e.House, () => ({
    ...e.House['*'],
    reviews: {
      ...e.Review['*'],
    },
    filter_single: {
      id: houseId,
    },
  }))

  const house = await houseQuery.run(client)
  return house
}

async function getHouses(limit?: number) {
  const housesQuery = e.select(e.House, (house) => ({
    ...e.House['*'],
    limit: limit,
    order_by: {
      expression: house.rating,
      direction: e.DESC,
    },
  }))

  const houses = await housesQuery.run(client)

  return houses
}

interface AIState {
  role: 'user' | 'assistant' | 'system' | 'function'
  content: string
  metadata?: Record<string, any>
}

async function confirmBooking(
  from: Date,
  to: Date,
  houseId: string,
  houseName: string
) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  const bookingInProgressMessage = (
    <div className="inline-flex items-start gap-1 md:items-center text-xs">
      <div className="h-1 w-1 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-1 w-1 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-1 w-1 bg-gray-600 rounded-full animate-bounce"></div>
      <p className="ml-3">Booking {houseName}</p>
    </div>
  )

  const booking = createStreamableUI(bookingInProgressMessage)

  const systemMessage = createStreamableUI(null)

  ;(async () => {
    booking.update(bookingInProgressMessage)

    const bookingQuery = e.insert(e.Booking, {
      from_date: from,
      to_date: to,
      house: e.select(e.House, () => ({
        filter_single: {
          id: houseId,
        },
      })),
    })

    await bookingQuery.run(client)

    booking.done(
      <div className="inline-flex md:items-center text-xs">
        You have successfully booked {houseName} from{' '}
        {new Date(from).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: '2-digit',
        })}{' '}
        to{' '}
        {new Date(to).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: '2-digit',
        })}
        . Enjoy your stay!
      </div>
    )

    systemMessage.done(
      <Message type="bot">
        You have successfully booked {houseName} from {from.toDateString()} to{' '}
        {to.toDateString()}.
      </Message>
    )

    aiState.done([
      ...aiState.get(),
      {
        role: 'system',
        content: `[User has booked ${houseName} from ${from} to ${to}]`,
      },
    ])
  })()

  return {
    ui: booking.value,
    newMessage: {
      id: Date.now(),
      display: systemMessage.value,
    },
  }
}

async function submitUserMessage(userInput: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI & AIState>()

  const pastMessages = aiState.get() as {
    role: 'user' | 'assistant' | 'system' | 'function'
    name: string
    content: string
    metadata?: Record<string, any>
  }[]

  aiState.update([
    ...aiState.get(),
    {
      role: 'user',
      content: userInput,
    },
  ])

  const ui = render({
    model: 'gpt-4-0125-preview',
    provider: openai,
    messages: [
      {
        role: 'system',
        content: `\
You are a house booking assistant. You can be asked to get the information for a house or get the list of houses.

To get a list of houses, use get_houses_list with parameters:
- limit: The maximum number of houses to return.
- propertiesToSelect: Specific house properties to include in the results.

When a user views a house, you'll see a message like "[houseId = "<houseId>"]." Use this houseId for detailed queries about that house.

To get detailed information on a specific house, use get_house_info with the relevant houseId.

If you can't find an appropriate function, tell the user to ask a different question.
`,
      },
      ...pastMessages,
      { role: 'user', content: userInput },
    ],
    text: ({ content, done }) => {
      if (done) {
        aiState.done([
          ...aiState.get(),
          {
            role: 'assistant',
            content,
          },
        ])
      }

      return <Message type="bot">{content}</Message>
    },
    tools: {
      get_houses_list: {
        description:
          'Get the list of houses. You can select the properties you need and limit the number of results.',
        parameters: z.object({
          limit: z.number().optional(),
          propertiesToSelect: z
            .array(propertiesSchema)
            .default([...houseProperties]),
        }),
        render: async function* ({ limit, propertiesToSelect }) {
          yield <Spinner />

          const house = await getHouses(limit)

          aiState.done([
            ...aiState.get(),
            {
              role: 'function',
              name: 'get_houses_list',
              content: JSON.stringify(house),
            },
          ])

          if (!house) {
            return <Message type="bot"><p>House not found</p></Message>
          }
          return (
            <Message type="bot">
              <Houses
                houses={house}
                properties={propertiesToSelect}
              />
            </Message>
          )
        },
      },
      get_house_info: {
        description: 'Get the information for a house.',
        parameters: z.object({
          houseId: z.string().describe('the id of the house'),
        }),
        render: async function* ({ houseId }) {
          yield <Spinner />

          const house = await getHouseInfo(houseId)

          aiState.done([
            ...aiState.get(),
            {
              role: 'function',
              name: 'get_house_info',
              content: JSON.stringify(house),
            },
          ])

          if (!house) {
            return <Message type="bot"><p>House not found</p></Message>
          }
          return (
            <Message type="bot">
              <HouseDetails
                house={house}
                reviews={house.reviews}
              />
            </Message>
          )
        },
      },
    },
  })

  return {
    id: Date.now(),
    display: ui,
  }
}

const initialAIState: {
  role: 'user' | 'assistant' | 'system' | 'function'
  content: string
  id?: string
  name?: string
}[] = []

const initialUIState: {
  id: number
  display: React.ReactNode
}[] = []

export const AI = createAI({
  actions: {
    submitUserMessage,
    confirmBooking,
  },
  initialUIState,
  initialAIState,
})
