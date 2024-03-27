import { ComputerDesktopIcon, UserIcon } from '@heroicons/react/16/solid'
import Markdown from 'react-markdown'

export function Message({
  type,
  children,
  className,
}: {
  type: 'user' | 'bot'
  children: React.ReactNode,
  className?: string
}) {
  return (
    <div className={
      [
        "text-gray-600 flex gap-x-2 items-center",
        type === 'user' ? "flex-row-reverse" : "",
        className ?? '',
      ].join(' ')
    }>
      <div className="bg-white rounded-full p-2 self-end">
        {type === 'bot' ? (
          <ComputerDesktopIcon className="h-6 w-6 text-amber-600" />
        ) : (
          <UserIcon className="h-6 w-6 text-sky-600" />
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
