CREATE MIGRATION m1xnshtl6q3yjzl6e5hnhuwr5cutiiypj6d46cojxul3mw22xrvnya
    ONTO m1suvwc6ygnf3qe4zkdmu43f4bshsst73d2dyuztwsqruyoz3agboa
{
  ALTER TYPE default::Review {
      CREATE REQUIRED LINK house: default::House {
          SET REQUIRED USING (<default::House>{});
      };
  };
  ALTER TYPE default::Review {
      DROP PROPERTY house_id;
  };
};
