/**
 * DEMO vehicle catalog for the progressive vehicle selector.
 * This is illustrative data only — not a complete Moroccan vehicle database.
 */

export interface VehicleModel {
  name: string;
  years: number[];
  engines?: string[];
}

export interface VehicleManufacturer {
  name: string;
  models: VehicleModel[];
}

export const VEHICLE_MANUFACTURERS: VehicleManufacturer[] = [
  {
    name: "Renault",
    models: [
      {
        name: "Clio",
        years: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        engines: ["1.2 16V", "1.5 dCi", "0.9 TCe", "1.0 TCe"],
      },
      {
        name: "Megane",
        years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
        engines: ["1.5 dCi", "1.6 16V", "1.2 TCe"],
      },
      {
        name: "Kangoo",
        years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
        engines: ["1.5 dCi", "1.6 16V"],
      },
      {
        name: "Symbol",
        years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
        engines: ["1.4 8V", "1.5 dCi"],
      },
    ],
  },
  {
    name: "Peugeot",
    models: [
      {
        name: "208",
        years: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        engines: ["1.2 PureTech", "1.6 HDi", "1.4 HDi"],
      },
      {
        name: "308",
        years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
        engines: ["1.6 HDi", "1.2 PureTech", "1.6 THP"],
      },
      {
        name: "Partner",
        years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
        engines: ["1.6 HDi", "1.6 BlueHDi"],
      },
    ],
  },
  {
    name: "Dacia",
    models: [
      {
        name: "Logan",
        years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
        engines: ["1.2 16V", "1.5 dCi", "1.0 SCe"],
      },
      {
        name: "Sandero",
        years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
        engines: ["1.2 16V", "1.5 dCi", "0.9 TCe"],
      },
      {
        name: "Duster",
        years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
        engines: ["1.5 dCi", "1.6 16V", "1.2 TCe"],
      },
    ],
  },
  {
    name: "Toyota",
    models: [
      {
        name: "Corolla",
        years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        engines: ["1.6 Dual VVT-i", "1.8 Hybrid", "1.4 D-4D"],
      },
      {
        name: "Yaris",
        years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
        engines: ["1.0 VVT-i", "1.3 Dual VVT-i", "1.5 Hybrid"],
      },
      {
        name: "Hilux",
        years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        engines: ["2.4 D-4D", "2.8 D-4D", "2.5 D-4D"],
      },
    ],
  },
  {
    name: "Volkswagen",
    models: [
      {
        name: "Golf",
        years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
        engines: ["1.4 TSI", "1.6 TDI", "2.0 TDI"],
      },
      {
        name: "Polo",
        years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
        engines: ["1.0 TSI", "1.2 TSI", "1.6 TDI"],
      },
    ],
  },
  {
    name: "Hyundai",
    models: [
      {
        name: "i10",
        years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
        engines: ["1.0 MPI", "1.2 MPI"],
      },
      {
        name: "Tucson",
        years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        engines: ["1.6 GDi", "1.7 CRDi", "2.0 CRDi"],
      },
    ],
  },
];

export const MOROCCAN_CITIES = [
  "Tout le Maroc",
  "Casablanca",
  "Rabat",
  "Fès",
  "Marrakech",
  "Tanger",
  "Agadir",
  "Meknès",
  "Oujda",
  "Kénitra",
  "Tétouan",
  "Safi",
  "El Jadida",
  "Nador",
];
