CREATE MIGRATION m1hrjk3fm2v45c3cf3tfpdxwwh7qskoaxsrsgwdx67scc62c24qkpa
    ONTO m1xnshtl6q3yjzl6e5hnhuwr5cutiiypj6d46cojxul3mw22xrvnya
{
  CREATE TYPE default::History {
      CREATE REQUIRED PROPERTY actionRole: std::str;
      CREATE REQUIRED PROPERTY content: std::str;
      CREATE PROPERTY created: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
      CREATE REQUIRED PROPERTY date: std::datetime;
      CREATE REQUIRED PROPERTY name: std::str;
  };
};
