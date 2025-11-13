import React from "react";
import { NavLink } from "react-router";

const MyLink = ({ children,to}) => {
  return (
     <NavLink
      to={to}
      className={({ isActive }) =>
        `inline-block px-4 py-2 rounded-lg font-semibold text-black transition-all duration-300 ${
          isActive
            ? "bg-gradient-to-r from-green-700 to-green-700 hover:from-green-700 hover:to-green-500"
            : "bg-gradient-to-r from-green-400 to-green-300 hover:from-green-450 hover:to-green-300"
        } shadow-md hover:shadow-lg`
      }
    >
      {children}
    </NavLink>
  );
};

export default MyLink;