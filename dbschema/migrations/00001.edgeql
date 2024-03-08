CREATE MIGRATION m1suvwc6ygnf3qe4zkdmu43f4bshsst73d2dyuztwsqruyoz3agboa
    ONTO initial
{
  CREATE TYPE default::Review {
      CREATE REQUIRED PROPERTY comment: std::str;
      CREATE REQUIRED PROPERTY house_id: std::int64;
      CREATE REQUIRED PROPERTY rating: std::float64;
      CREATE REQUIRED PROPERTY reviewer_name: std::str;
  };
  CREATE TYPE default::House {
      CREATE MULTI LINK reviews: default::Review;
      CREATE REQUIRED PROPERTY no_of_reviews := (std::count(.reviews));
      CREATE REQUIRED PROPERTY amenities: array<std::str>;
      CREATE REQUIRED PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY location: std::str;
      CREATE REQUIRED PROPERTY max_guests: std::int16;
      CREATE REQUIRED PROPERTY no_of_beds: std::int16;
      CREATE REQUIRED PROPERTY no_of_rooms: std::int16;
      CREATE REQUIRED PROPERTY photos: array<std::str>;
      CREATE REQUIRED PROPERTY price_per_night: std::float64;
      CREATE REQUIRED PROPERTY rating: std::float64;
      CREATE REQUIRED PROPERTY title: std::str;
  };
};
