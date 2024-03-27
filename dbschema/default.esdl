module default {
  type House {
    required title: str;
    required description: str;
    required location: str;
    required price_per_night: float64;
    required max_guests: int16;
    required no_of_rooms: int16;
    required no_of_beds: int16;
    required rating: float64;
    required amenities: array<str>;
    required photos: array<str>;

    required no_of_reviews := count(.reviews);
    multi link reviews: Review;
  }

  type Review {
    required reviewer_name: str;
    required rating: float64;
    required comment: str;

    required link house: House;
  }

  type Booking {
    required link house: House;
    required from_date: datetime;
    required to_date: datetime;
  }

  type History {
    required date: datetime;
    required actionRole: str;
    required name: str;
    required content: str;

    created: datetime {
      rewrite insert using (datetime_of_statement());
    }
  }
}
