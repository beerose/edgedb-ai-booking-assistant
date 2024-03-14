/* eslint-disable @next/next/no-img-element */
'use client'

import { AI } from '@/app/action'
import { House, Review } from '@/dbschema/interfaces'
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  HeartIcon,
  PhoneIcon,
} from '@heroicons/react/20/solid'
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
  const [, setMessages] = useUIState<typeof AI>()
  const { confirmBooking } = useActions<typeof AI>()

  return (
    <div
      key={house.id}
      className="col-span-1 flex relative flex-col rounded-lg bg-white text-center shadow-sm"
    >
      {onClose && (
        <button
          onClick={onClose}
          className="mt-4 ml-4 cursor-pointer group-hover p-2 z-100"
        >
          <ArrowLeftIcon
            className="h-6 w-6 text-gray-500 hover:text-gray-900 hover:scale-110 transition-all duration-100"
            aria-hidden="true"
          />
        </button>
      )}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 cursor-pointer group-hover p-2 z-100"
      >
        <HeartIcon
          className="h-6 w-6 text-gray-400 group-hover:text-gray-800 group-hover:scale-110"
          aria-hidden="true"
        />
      </button>
      <div className="flex-1 flex flex-col p-8 relative">
        <>
          <img
            className="w-52 h-full flex-shrink-0 mx-auto"
            src={house.photos[0]}
            alt=""
          />
          <div className="flex gap-2 self-center mt-2">
            <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
            <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
            <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
          </div>
        </>
        <h3 className="mt-4 text-gray-900 text-sm font-medium">
          {house.title} - {house.location}
        </h3>
        <div className="mt-2 flex-grow flex flex-col justify-between text-ellipsis">
          <span className="text-gray-500 text-sm">
            {house.description.substring(0, 100)}...
            <button className="text-blue-600 text-sm">Read more</button>
          </span>
        </div>

        <div className="mt-6 flex-1">
          <div className="flex items-center justify-center">
            <span className="text-gray-900 text-sm font-medium">
              ${house.price_per_night}
            </span>
            <span className="ml-1 text-gray-500 text-sm">/ night</span>
          </div>

          <div className="mt-4 flex items-center justify-center flex-wrap text-gray-500 text-sm">
            {house.amenities.join(', ')}
          </div>
          <div className="mt-4 flex items-center justify-center">
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

        <div className="mt-4 flex items-center justify-center">
          <span className="text-gray-900 text-sm font-medium">
            {house.rating}
          </span>
          <span className="ml-1 text-gray-500 text-sm">rating</span>
          <span className="text-gray-900 text-sm font-medium ml-4">
            {house.no_of_reviews}
          </span>
          <span className="ml-1 text-gray-500 text-sm">reviews</span>
        </div>

        <div className="mt-4 flex-1">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="mt-4 flex items-center justify-center"
            >
              <span className="text-gray-900 text-sm font-medium">
                {review.rating}
              </span>
              <span className="ml-1 text-gray-500 text-sm">rating</span>
              <span className="text-gray-900 text-sm font-medium ml-4">
                {review.reviewer_name}
              </span>
              <span className="ml-1 text-gray-500 text-sm">reviewer</span>
              <span className="text-gray-900 text-sm font-medium ml-4">
                {review.comment}
              </span>
            </div>
          ))}
        </div>

        {/* from, to inputs */}
        <div className="mt-4 flex-1 flex justify-center">
          <div className="flex items-center justify-center text-xs">
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
              className="border-2 border-gray-300 rounded-md p-2 ml-4"
              onChange={(e) =>
                setBookingDates({
                  ...bookingDates,
                  endDate: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="mt-4 flex-1 flex justify-center text-center">
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
            className="px-4 py-3 bg-blue-600 rounded-md text-white"
          >
            <span className="text-sm font-semibold">Book now</span>
          </button>
        </div>

        {bookingUI && (
          <div className="mt-4 flex-1 flex justify-center">{bookingUI}</div>
        )}

        <div className="mt-1 flex-1">
          <div className="mt-6 flex justify-center space-x-6">
            <PhoneIcon
              className="h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
            <EnvelopeIcon
              className="h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
