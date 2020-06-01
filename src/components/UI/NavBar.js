import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classes from './NavBar.module.css'

const BackLink = () => (
    <NavLink 
        to = "/"
        className = { classes.Link }>
        <FontAwesomeIcon 
            icon = { [ 'fal', 'chevron-left' ] } 
            className = { classes.LinkIcon } />
        <p className = { classes.LinkLabel }> 
             Back To Search
        </p>
    </NavLink>
)

const SearchLabel = ({ query }) => (
    <div className = { classes.LabelContainer }>
        <p className = { classes.Label }>{ query }</p>
    </div>
)

const NavBar = () => {
    const query = useSelector(state => state.nasa.searchQuery)

    return (
        <nav className = { classes.NavBar }>
            <BackLink />
            <SearchLabel query = { query } />
        </nav>
    )
}

export default NavBar