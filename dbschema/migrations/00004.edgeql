CREATE MIGRATION m12gux5n42qy2tptlrp2hl2eggyiiwe5ikp3bikm6lkxozqw7dbtda
    ONTO m1hrjk3fm2v45c3cf3tfpdxwwh7qskoaxsrsgwdx67scc62c24qkpa
{
  CREATE TYPE default::Booking {
      CREATE REQUIRED LINK house: default::House;
      CREATE REQUIRED PROPERTY from_date: std::datetime;
      CREATE REQUIRED PROPERTY to_date: std::datetime;
  };
};
