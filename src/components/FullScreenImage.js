import React from 'react'

import classes from './FullScreenImage.module.css'

const FullScreenImage = ({ src, data }) => {
    const { title, description_508 } = data

    return (
        <div className = { classes.FullScreenImage }>
            <img src = { src } alt = { data.title } className = { classes.Image } />
            <div className = { classes.ImageInfo }>
                <h1 className = { classes.Title }>{ title }</h1>
                <p className = { classes.Description }>{ description_508 }</p>
            </div>
        </div>
    )
}

export default FullScreenImage