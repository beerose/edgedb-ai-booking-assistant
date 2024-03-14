import { Message } from './Message'

export function Spinner() {
  return (
    <Message type="bot">
      <span className="sr-only">Loading...</span>
      <div className="h-2 w-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 bg-gray-600 rounded-full animate-bounce"></div>
    </Message>
  )
}
