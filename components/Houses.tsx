'use client'

import { House } from '@/dbschema/interfaces'
import { Properties } from '@/src/types'
import HouseCard from './HouseCard'
import { useState } from 'react'
import HouseDetails from './HouseDetails'
import { useAIState } from 'ai/rsc'

type Props = {
  houses: Omit<House, 'reviews'>[]
  properties: Properties[]
}
export function Houses({ houses, properties }: Props) {
  const [houseId, setHouseId] = useState('')
  const [aiState, setAIState] = useAIState()

  if (!houseId) {
    return (
      <div>
        <ul className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {houses.map((house) => (
            <li key={house.id} className="justify-self-stretch align-self-start grid">
              <button
                className="justify-self-stretch flex flex-col"
                onClick={() => {
                  setHouseId(house.id)
                  setAIState([
                    ...aiState,
                    {
                      role: 'system' as const,
                      content: `[houseId = "${house.id}"]`,
                    },
                  ])
                }}
              >
                <HouseCard
                  house={house}
                  properties={properties}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const house = houses.find((house) => house.id === houseId)

  if (!house) {
    return <p>House not found</p>
  }

  if (house) {
    return (
      <HouseDetails
        house={house}
        onClose={() => setHouseId('')}
        reviews={[]}
      />
    )
  }
}
