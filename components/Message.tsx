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
    <div className={
      [
        "text-gray-600 flex gap-x-2 items-center",
        type === 'bot' ? "flex-row-reverse" : "",
      ].join(' ')
    }>
      <div className="bg-white rounded-full p-2 self-end">
        {type === 'bot' ? (
          <ComputerDesktopIcon className="h-6 w-6" />
        ) : (
          <UserIcon className="h-6 w-6" />
        )}
      </div>
      <div className="bg-neutral-200 flex-1 p-2 rounded-lg">
        {typeof children === 'string' ? (
          <Markdown>{children}</Markdown>
        ) : (
          <div>
            {children}
          </div>
        )}
      </div>
      <div className="h-10 w-20"></div>
    </div>
  )
}
