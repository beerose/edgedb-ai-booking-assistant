import { Message } from './Message'

export function Spinner() {
  return (
    <Message type="bot">
      <div className="flex min-h-4 items-center">
        <div className="sr-only">Loading...</div>
        <div className="h-2 w-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="ml-1 h-2 w-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="ml-1 h-2 w-2 bg-gray-600 rounded-full animate-bounce"></div>
      </div>
    </Message>
  )
}
