import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classes from './Loading.module.css'

/*
    Icon Container exists because the transform rotate was
    messing up my absolute positioning. This is my solution.
*/
const Loading = () => (
    <div className = { classes.Container }>
        <div className = { classes.Top }>

        </div>
        <div className = { classes.Bottom }>

        </div>
        <div className = { classes.IconContainer }>
            <FontAwesomeIcon 
                icon = { [ 'fal', 'spinner' ] } 
                className = { classes.Icon } />
        </div>
    </div>
)

export default Loading