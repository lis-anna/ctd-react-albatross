import React from "react";
import style from "./PageStyles.module.css";
function getCopyright() {
  let today = new Date();
  let thisYear = today.getFullYear();

  return `Anna Liskovets  ${thisYear}`;
}

function Footer() {
  return (
    <div>
      <p className={style.copyright}>&copy;{getCopyright()} </p>
    </div>
  );
}

export default Footer;
