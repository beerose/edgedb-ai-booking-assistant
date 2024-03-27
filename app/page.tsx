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
    <main className="bg-gray-100 flex flex-col md:p-12 sm:p-8 p-4 min-h-full relative items-center">
      <div className="bg-white p-10 rounded shadow-sm w-full mx-auto max-w-4xl sm:px-6 lg:px-8 mb-4">
        <h1 className="text-4xl font-semibold text-gray-900">
          Welcome to the booking assistant
        </h1>
        <p className="text-gray-600 mt-2">
          Ask me about available dates, pricing, or anything else you need to
          know.
        </p>
        <p className="text-gray-600 mt-6">
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
            What houses are available for rent?
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
            What are the prices for the houses?
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
            What houses are available? Display top 5 houses
          </button>
        </div>
      </div>
      <div className="bg-gray-100 flex mt-auto w-full">
        <div className="mx-auto max-w-4xl h-full w-full self-end">
          {messages.map((message) => (
            <div
              className="flex flex-col w-full mb-4"
              key={message.id}
            >
              <div className="text-gray-600">{message.display}</div>
            </div>
          ))}

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
