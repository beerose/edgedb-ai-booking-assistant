/* eslint-disable @next/next/no-img-element */
import { House } from '@/dbschema/interfaces'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'

type Props = {
  house: House
}

export default function HouseListItem({ house }: Props) {
  return (
    <div
      key={house.id}
      className="flex p-8 flex-col divide-gray-200 rounded-lg bg-white shadow"
    >
      <div className="flex flex-col sm:flex-row flex-wrap space-x-3 gap-y-3">
        <div>
          <h3 className="text-gray-900 text-sm font-medium">{house.title}</h3>
        </div>
        <span className="text-gray-500 text-sm">· {house.location}</span>
        <div>
          <span className="text-gray-900 text-sm font-medium">
            · ${house.price_per_night}
          </span>
          <span className="ml-1 text-gray-500 text-sm">/ night</span>
        </div>
      </div>
    </div>
  )
}
