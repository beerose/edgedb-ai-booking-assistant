export default function UserInput({
  value,
  onChange,
}: {
  value: string
  onChange: (prompt: string) => void
}) {
  return (
    <div className="flex items-start space-x-4">
      <div className="min-w-0 flex-1">
        <div className="relative">
          <div className="overflow-hidden rounded-md shadow-sm ring-gray-300 outline-none focus-within:ring-2 focus-within:ring-indigo-600 bg-white">
            <label
              htmlFor="comment"
              className="sr-only"
            >
              Ask a question
            </label>
            <input
              name="comment"
              id="comment"
              className="block w-full resize-none border-0 bg-transparent p-3 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-white outline-none"
              placeholder="Ask a question..."
              onChange={(e) => {
                onChange(e.target.value)
              }}
              value={value}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
