import React from "react";
import { AiFillHome } from "react-icons/ai";
import { GrOrganization } from "react-icons/gr";
import { BiBuildingHouse } from "react-icons/bi";

interface NavBarRoutesInterface {
  icon?: React.ReactChild;
  primary_name: string;
  link: string;
  routes?: NavBarRoutesInterface[];
}

const NavBarRoutes: NavBarRoutesInterface[] = [
  {
    primary_name: "Competition",
    link: "/",
    icon: <AiFillHome />,
    routes: [
      {
        primary_name: "All",
        link: "/competition",
      },
      {
        primary_name: "New",
        link: "/competition?addnew=true",
      },
    ],
  },
  {
    primary_name: "Company",
    link: "/",
    icon: <BiBuildingHouse />,
    routes: [
      {
        primary_name: "All",
        link: "/company",
      },
      {
        primary_name: "New",
        link: "/company?addnew=true",
      },
    ],
  },
];

export default NavBarRoutes;
