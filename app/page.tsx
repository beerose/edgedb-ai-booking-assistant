'use client'

import { useState } from 'react'
import { useUIState, useActions } from 'ai/rsc'
import type { AI } from './action'
import UserInput from '@/components/UserInput'
import { Message } from '@/components/Message'

export default function Page() {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions<typeof AI>()

  return (
    <main className="bg-gray-100 flex flex-col min-h-full max-h-full h-full relative items-center">
      <div className="flex flex-1 w-full overflow-scroll md:p-12 sm:p-8 p-4 flex-col-reverse">

      {messages.toReversed().map((message) => (
        <div
          className="flex flex-col w-full mb-4"
          key={message.id}
        >
          <div className="text-gray-600">{message.display}</div>
        </div>
      ))}

      <Message type="bot" className="mb-4">
      <div className="p-4">
        <h1 className="text-xl font-semibold text-gray-900">
          Ask me about available dates, pricing, or anything else you need to know.
        </h1>
        <p className="text-gray-600 mt-2">
          Here are some example questions you can ask:
        </p>
        <div className="text-gray-600 mt-2 cursor-pointer hover:text-gray-900 flex flex-col items-start gap-y-1">
          <button
            className="text-blue-600 hover:text-blue-800 text-left"
            onClick={async () => {
              setMessages((currentMessages) => [
                ...currentMessages,
                {
                  id: Date.now(),
                  display: (
                    <Message type="user">
                      What houses are available for rent?
                    </Message>
                  ),
                },
              ])

              const responseMessage = await submitUserMessage(
                'What houses are available for rent?'
              )
              setMessages((currentMessages) => [
                ...currentMessages,
                responseMessage,
              ])
            }}
          >
            — What houses are available for rent?
          </button>
          <button
            className="text-blue-600 hover:text-blue-800  text-left"
            onClick={async () => {
              setMessages((currentMessages) => [
                ...currentMessages,
                {
                  id: Date.now(),
                  display: (
                    <Message type="user">
                      What are the prices for the houses?
                    </Message>
                  ),
                },
              ])

              const responseMessage = await submitUserMessage(
                'What are the prices for the houses?'
              )
              setMessages((currentMessages) => [
                ...currentMessages,
                responseMessage,
              ])
            }}
          >
            — What are the prices for the houses?
          </button>
          <button
            className="text-blue-600 hover:text-blue-800 text-left"
            onClick={async () => {
              setMessages((currentMessages) => [
                ...currentMessages,
                {
                  id: Date.now(),
                  display: (
                    <Message type="user">
                      What houses are available? Display top 5 houses
                    </Message>
                  ),
                },
              ])

              const responseMessage = await submitUserMessage(
                'What houses are available? Display top 5 houses'
              )
              setMessages((currentMessages) => [
                ...currentMessages,
                responseMessage,
              ])
            }}
          >
            — What houses are available? Display top 5 houses
          </button>
        </div>
      </div>
      </Message>

      </div>

      <div className="flex mt-auto w-full md:p-12 sm:p-8 p-4 bg-zinc-400">
        <div className="mx-auto max-w-4xl h-full w-full self-end">

          <form
            onSubmit={async (e) => {
              e.preventDefault()

              setMessages((currentMessages) => [
                ...currentMessages,
                {
                  id: Date.now(),
                  display: <Message type="user">{inputValue}</Message>,
                },
              ])

              setInputValue('')

              const responseMessage = await submitUserMessage(inputValue)
              setMessages((currentMessages) => [
                ...currentMessages,
                responseMessage,
              ])
            }}
          >
            <UserInput
              onChange={(prompt) => {
                setInputValue(prompt)
              }}
              value={inputValue}
            />
          </form>
        </div>
      </div>
    </main>
  )
}
