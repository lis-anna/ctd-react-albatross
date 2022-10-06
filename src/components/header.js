import React from "react";
import { NavLink } from "react-router-dom";
import style from "./PageStyles.module.css";

function Header() {
  return (
    <nav className={style.navigation}>
      <NavLink activeClassName="active" to="/">
        Home
      </NavLink>
      <NavLink activeClassName="active" to="/work">
        Work
      </NavLink>
      <NavLink activeClassName="active" to="/travel">
        Travel
      </NavLink>
    </nav>
  );
}
export default Header;
