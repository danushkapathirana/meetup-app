import React from "react";

import classes from "./MainNavigation.module.css"

const MainNavigation = () => {
    return(
        <header className={classes.header}>
            <div className={classes.logo}>React Meetups</div>
            <nav>
                <ul>
                    <li>
                        <link to="/">All Meetups</link>
                    </li>
                    <li>
                        <link to="/new-meetup">Add new Meetup</link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation
