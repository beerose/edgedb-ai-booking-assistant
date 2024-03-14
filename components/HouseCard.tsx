/* eslint-disable @next/next/no-img-element */
import { House } from '@/dbschema/interfaces'
import { Properties } from '@/src/types'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'

type Props = {
  house: Omit<House, 'reviews'>
  properties: Properties[]
}

const defaultProperties: Properties[] = [
  'id',
  'title',
  'description',
  'location',
  'price_per_night',
  'max_guests',
  'no_of_rooms',
  'no_of_beds',
  'amenities',
  'photos',
  'no_of_reviews',
  'rating',
]

export default function HouseCard({
  house,
  properties = defaultProperties,
}: Props) {
  return (
    <div
      key={house.id}
      className="col-span-1 h-[700px] w-full flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow-sm overflow-scroll"
    >
      <div className="flex-1 flex flex-col p-8 relative">
        <img
          className="w-52 h-52 flex-shrink-0 mx-auto"
          src={house.photos[0]}
          alt=""
        />
        <div className="flex gap-2 self-center mt-2">
          <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
          <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
          <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
        </div>
        {properties.includes('title') && (
          <h3 className="mt-4 text-gray-900 text-sm font-medium">
            {house.title}
          </h3>
        )}
        <dl className="mt-1 flex-grow flex flex-col justify-between text-ellipsis">
          {properties.includes('description') && (
            <dd className="text-gray-500 text-sm">
              {house.description.substring(0, 100)}...
            </dd>
          )}
          {properties.includes('location') && (
            <dd className="mt-3">
              <span className="text-gray-500 text-sm">{house.location}</span>
            </dd>
          )}
        </dl>

        <div className="mt-6 flex-1">
          {properties.includes('price_per_night') && (
            <div className="flex items-center justify-center">
              <span className="text-gray-900 text-sm font-medium">
                ${house.price_per_night}
              </span>
              <span className="ml-1 text-gray-500 text-sm">/ night</span>
            </div>
          )}

          {properties.includes('amenities') && (
            <div className="mt-4 flex items-center justify-center flex-wrap text-gray-500 text-sm">
              {house.amenities.slice(0, 5).join(', ')}
            </div>
          )}
          <div className="mt-4 flex items-center justify-center">
            {properties.includes('max_guests') && (
              <div>
                <span className="text-gray-900 text-sm font-medium">
                  {house.max_guests}
                </span>
                <span className="ml-1 text-gray-500 text-sm">guests</span>
              </div>
            )}

            {properties.includes('no_of_rooms') && (
              <div>
                <span className="text-gray-900 text-sm font-medium ml-4">
                  {house.no_of_rooms}
                </span>
                <span className="ml-1 text-gray-500 text-sm">rooms</span>
              </div>
            )}

            {properties.includes('no_of_beds') && (
              <div>
                <span className="text-gray-900 text-sm font-medium ml-4">
                  {house.no_of_beds}
                </span>
                <span className="ml-1 text-gray-500 text-sm">beds</span>
              </div>
            )}
          </div>
        </div>

        {properties.includes('rating') && (
          <div className="mt-4 flex items-center justify-center">
            <span className="text-gray-900 text-sm font-medium">
              {house.rating}
            </span>
            <span className="ml-1 text-gray-500 text-sm">rating</span>
            <span className="text-gray-900 text-sm font-medium ml-4">
              {house.no_of_reviews} reviews
            </span>
          </div>
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
