const edgedb = require('edgedb')
const {
  randStreetName,
  randCity,
  randState,
  randNumber,
  randParagraph,
  randImg,
  randFirstName,
  randLastName,
  randText,
  randFloat,
} = require('@ngneat/falso')

const db = edgedb.createClient()

async function insertHouse() {
  const title = randStreetName()
  const description = randParagraph()
  const location = `${randCity()}, ${randState()}`
  const pricePerNight = randNumber({ min: 50, max: 300 })
  const maxGuests = randNumber({ min: 1, max: 10 })
  const noOfRooms = randNumber({ min: 1, max: 5 })
  const noOfBeds = randNumber({ min: 1, max: 5 })
  const rating = randFloat({ min: 3, max: 5, fraction: 1 })
  const amenities = [
    'Wi-Fi',
    'Kitchen',
    'Parking',
    'Heating',
    'Washer',
    'Dryer',
    'AC',
    'Pool',
    'Gym',
    'Hot tub',
    'Fireplace',
    'TV',
    'Cable',
    'Breakfast',
    'Coffee maker',
    'Dishwasher',
    'Microwave',
    'Oven',
    'Refrigerator',
    'Stove',
    'Toaster',
    'Balcony',
    'Patio',
    'Garden',
    'Beach access',
    'Lake access',
    'Mountain view',
    'City view',
    'Ocean view',
    'Waterfront',
  ]
  const photos = [randImg(), randImg(), randImg()]

  const house = await db.querySingle(`
    INSERT House {
      title := '${title}',
      description := '${description}',
      location := '${location}',
      price_per_night := ${pricePerNight},
      max_guests := ${maxGuests},
      no_of_rooms := ${noOfRooms},
      no_of_beds := ${noOfBeds},
      rating := ${rating},
      amenities := [${amenities
        .splice(0, randNumber({ min: 1, max: amenities.length || 10 }))
        .map((a) => `'${a}'`)}],
      photos := [
        ${photos.map((p) => `'${p}'`)}
      ]
    };
  `)

  const houseId = house.id

  console.log(`Inserted house with ID: ${houseId}`)
  return houseId
}

async function insertReviewsForHouse(houseId) {
  const numberOfReviews = randNumber({ min: 1, max: 10 })

  for (let i = 0; i < numberOfReviews; i++) {
    const reviewerName = `${randFirstName()} ${randLastName()}`
    const rating = randNumber({ min: 3, max: 5, fraction: 1 })
    const comment = randParagraph()

    await db.query(`
      INSERT Review {
        reviewer_name := '${reviewerName}',
        rating := ${rating},
        comment := '${comment}',
        house := (SELECT House { id  } FILTER .id = <uuid>'${houseId}'),
      };
    `)
  }

  console.log(`Inserted ${numberOfReviews} reviews for house ID: ${houseId}`)
}

async function seedData() {
  try {
    for (let i = 0; i < 5; i++) {
      // Insert 5 houses with reviews
      const houseId = await insertHouse()
      await insertReviewsForHouse(houseId)
    }
  } catch (error) {
    console.error('Error seeding data:', error)
  } finally {
    await db.close()
  }
}

seedData()
