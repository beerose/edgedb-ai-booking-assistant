import { ComputerDesktopIcon, UserIcon } from '@heroicons/react/16/solid'
import Markdown from 'react-markdown'

export function Message({
  type,
  children,
}: {
  type: 'user' | 'bot'
  children: React.ReactNode
}) {
  return (
    <div className="text-gray-600 flex gap-x-2 items-center">
      <div className="bg-white rounded-full p-2">
        {type === 'bot' ? (
          <ComputerDesktopIcon className="h-6 w-6" />
        ) : (
          <UserIcon className="h-6 w-6" />
        )}
      </div>
      {typeof children === 'string' ? (
        <Markdown>{children}</Markdown>
      ) : (
        children
      )}
    </div>
  )
}
