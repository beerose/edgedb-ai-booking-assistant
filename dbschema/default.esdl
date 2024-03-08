module default {
  type House {
    required property title -> str;
    required property description -> str;
    required property location -> str;
    required property price_per_night -> float64;
    required property max_guests -> int16;
    required property no_of_rooms -> int16;
    required property no_of_beds -> int16;
    required property rating -> float64;
    required property amenities -> array<str>;
    required property photos -> array<str>;

    required property no_of_reviews := count(.reviews);
    multi link reviews -> Review;
  }

  type Review {
    required property reviewer_name -> str;
    required property rating -> float64;
    required property comment -> str;

    required link house -> House;
  }

  type History {
    required property date -> datetime;
    required property actionRole -> str;
    required property name -> str;
    required property content -> str;

    created: datetime {
      rewrite insert using (datetime_of_statement());
    }
  }
}
