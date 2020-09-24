CREATE TABLE "Parking_bay" (
    "bay_id" integer   NOT NULL,
    "areaname_id" integer   NOT NULL,
    "lat" float   NOT NULL,
    "lon" float   NOT NULL,
    CONSTRAINT "pk_Parking_bay" PRIMARY KEY (
        "bay_id"
     )
);

CREATE TABLE "Parking_duration" (
    "arrivaltime" date   NOT NULL,
    "departuretime" date   NOT NULL,
    "durationminutes" integer   NOT NULL,
    "bay_id" integer   NOT NULL
);

CREATE TABLE "Area" (
    "area_id" integer   NOT NULL,
    "area_name" varchar(50)   NOT NULL,
    CONSTRAINT "pk_Area" PRIMARY KEY (
        "area_id"
     )
);

ALTER TABLE "Parking_bay" ADD CONSTRAINT "fk_Parking_bay_areaname_id" FOREIGN KEY("areaname_id")
REFERENCES "Area" ("area_id");

ALTER TABLE "Parking_duration" ADD CONSTRAINT "fk_Parking_duration_bay_id" FOREIGN KEY("bay_id")
REFERENCES "Parking_bay" ("bay_id");

