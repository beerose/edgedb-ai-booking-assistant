import * as z from 'zod'

export const houseProperties = [
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
] as const

export const propertiesSchema = z.enum(houseProperties)

export type Properties = z.infer<typeof propertiesSchema>
