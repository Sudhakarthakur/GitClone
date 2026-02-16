import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.contianer}>
      <Link to="/">
        <div className="ImageContiner">
          <img
            src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png"
            alt="Git Logo"
          />
        </div>
      </Link>
      <div className={styles.navlinek}>
        <Link to="/create">
          <h3>create new repo</h3>
        </Link>
        <Link to="/logout">
          <h3>Logout</h3>
        </Link>
        <Link to="/profile">
          <h3>Profile</h3>
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
