import React from "react";
import Link from "next/link";

import classes from "./MainNavigation.module.css"

const MainNavigation = () => {
    return(
        <header className={classes.header}>
            <div className={classes.logo}>React Meetups</div>
            <nav>
                <ul>
                    <li>
                        <Link href="/">All Meetups</Link>
                    </li>
                    <li>
                        <Link href="/new-meetup">Add new Meetup</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation

// Link -> use to prevent sending new request and getting new html page
