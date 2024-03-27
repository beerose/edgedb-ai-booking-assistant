/* eslint-disable @next/next/no-img-element */
import { House } from '@/dbschema/interfaces'
import { Properties } from '@/src/types'
import { MapPinIcon } from '@heroicons/react/20/solid'

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
      className="col-span-1 w-full flex flex-col divide-y divide-gray-200 rounded bg-white shadow-sm overflow-hidden flex-wrap"
    >
      <div className="flex-1 flex flex-col gap-4 relative pb-4">
        <div
          className="h-48 max-h-48 w-full bg-cover bg-center flex flex-col"
          style={{
            backgroundImage: `
              linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.4) 100%),
              url(${house.photos[0]})
            `,
          }}
        >
          <div className="flex mt-auto mx-3 mb-3">
            {properties.includes('title') && (
              <h3 className="p-1 text-slate-50 text-sm font-medium text-left">
                {house.title}
              </h3>
            )}
            {properties.includes('price_per_night') && (
              <div className="flex items-center justify-center text-xs font-medium ml-auto bg-gray-800 text-slate-200 rounded px-2 py-px">
                ${house.price_per_night}
              </div>
            )}
          </div>
        </div>
        {properties.includes('location') && (
          <div className="mx-4 ml-3 flex content-center">
            <MapPinIcon
              className="h-5 w-5 text-grey-50 self-center mr-1"
              aria-hidden="true"
            />
            <div className="text-grey-50 text-sm self-center text-left">
              {house.location}
            </div>
          </div>
        )}

        <div className="mx-4 flex items-center gap-4 flex-wrap">
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
              <span className="text-gray-900 text-sm font-medium">
                {house.no_of_rooms}
              </span>
              <span className="ml-1 text-gray-500 text-sm">rooms</span>
            </div>
          )}

          {properties.includes('no_of_beds') && (
            <div>
              <span className="text-gray-900 text-sm font-medium">
                {house.no_of_beds}
              </span>
              <span className="ml-1 text-gray-500 text-sm">beds</span>
            </div>
          )}
        </div>

        {properties.includes('description') && (
          <div className="mx-4 text-left flex-grow flex flex-col justify-between text-ellipsis">
            <span className="text-gray-500 text-sm">
              {house.description.substring(0, 150)}...
            </span>
          </div>
        )}

        {properties.includes('amenities') && (
          <div className="mx-4">
            <div className="flex items-center text-left flex-wrap text-gray-500 text-sm italic">
              {house.amenities.slice(0, 5).join(', ')}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
