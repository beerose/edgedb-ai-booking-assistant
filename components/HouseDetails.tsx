/* eslint-disable @next/next/no-img-element */
'use client'

import { AI } from '@/app/action'
import { House, Review } from '@/dbschema/interfaces'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import { useActions, useUIState } from 'ai/rsc'
import { useState } from 'react'

type Props = {
  house: Omit<House, 'reviews'>
  reviews: Omit<Review, 'house'>[]
  onClose?: () => void
}

export default function HouseDetails({ house, reviews, onClose }: Props) {
  const [bookingDates, setBookingDates] = useState<{
    startDate: string | null
    endDate: string | null
  }>({
    startDate: null,
    endDate: null,
  })
  const [bookingUI, setBookingUI] = useState<null | React.ReactNode>(null)
  const [readMore, setReadMore] = useState<boolean>(false)
  const [, setMessages] = useUIState<typeof AI>()
  const { confirmBooking } = useActions<typeof AI>()

  return (
    <div
      key={house.id}
      className="col-span-1 flex relative flex-col rounded bg-white text-center shadow-sm overflow-hidden"
    >
      <div
        className="h-96 max-h-96 w-full bg-cover bg-center flex flex-col"
        style={{
          backgroundImage: `
              linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.4) 100%),
              url(${house.photos[0]})
            `,
        }}
      >
        <div className="flex">
          {onClose && (
            <button
              onClick={onClose}
              className="shadow-sm mt-8 mx-8 cursor-pointer group-hover p-2 z-100 rounded-full bg-slate-50"
            >
              <ArrowLeftIcon
                className="h-6 w-6 text-gray-500 hover:text-gray-900 hover:scale-110 transition-all duration-100"
                aria-hidden="true"
              />
            </button>
          )}
        </div>
        <div className="flex mt-auto mx-8 mb-8">
          <h3 className="p-1 text-slate-50 text-3xl font-medium text-left">
            {house.title}
          </h3>

          <div className="flex items-center justify-center text-lg font-medium ml-auto bg-gray-800 text-slate-200 rounded px-2 py-px">
            ${house.price_per_night}
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col p-8 relative">
        <div className="mt-2 flex-grow flex flex-col text-left text-ellipsis">
          <span className="text-gray-500 text-sm">
            {readMore
              ? house.description
              : house.description.substring(0, 100) + '... '}
            {readMore ? null : (
              <button
                className="text-blue-600 text-sm"
                onClick={() => setReadMore(true)}
              >
                Read more
              </button>
            )}
          </span>
        </div>

        <div className="flex-1">
          <div className="italic mt-4 flex items-center text-left flex-wrap text-gray-500 text-sm">
            {house.amenities.join(', ')}
          </div>
          <div className="mt-4 flex items-center">
            <div>
              <span className="text-gray-900 text-sm font-medium">
                {house.max_guests}
              </span>
              <span className="ml-1 text-gray-500 text-sm">guests</span>
            </div>

            <div>
              <span className="text-gray-900 text-sm font-medium ml-4">
                {house.no_of_rooms}
              </span>
              <span className="ml-1 text-gray-500 text-sm">rooms</span>
            </div>

            <div>
              <span className="text-gray-900 text-sm font-medium ml-4">
                {house.no_of_beds}
              </span>
              <span className="ml-1 text-gray-500 text-sm">beds</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-8">
        <div className="flex-1 flex">
          <div className="flex flex-col sm:flex-row items-center text-xs gap-2 flex-wrap">
            <input
              type="date"
              className="border-2 border-gray-300 rounded-md p-2"
              onChange={(e) =>
                setBookingDates({
                  ...bookingDates,
                  startDate: e.target.value,
                })
              }
            />
            <input
              type="date"
              className="border-2 border-gray-300 rounded-md p-2"
              onChange={(e) =>
                setBookingDates({
                  ...bookingDates,
                  endDate: e.target.value,
                })
              }
            />

            <button
              onClick={async () => {
                if (!bookingDates.startDate || !bookingDates.endDate) {
                  return
                }
                const response = await confirmBooking(
                  new Date(bookingDates.startDate),
                  new Date(bookingDates.endDate),
                  house.id,
                  house.title
                )
                setBookingUI(response.ui)

                setMessages((currentMessages) => [
                  ...currentMessages,
                  response.newMessage,
                ])
              }}
              className="p-2 bg-blue-600 rounded-md text-white self-start"
            >
              <span className="text-sm font-semibold">Book now</span>
            </button>
          </div>
        </div>

        {bookingUI && (
          <div className="mt-4 flex-1 flex text-left font-bold">
            {bookingUI}
          </div>
        )}
      </div>
    </div>
  )
}
