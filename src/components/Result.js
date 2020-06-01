import React from 'react'

import useFetchVideo from '../hooks/useFetchVideo'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classes from './Result.module.css'

const Image = ({ src, title, clicked }) => (
    <div 
        className = { classes.ResultImageContainer }
        onClick = { clicked }>
        <img src = { src } alt = { title } className = { classes.ResultImage } />
        <div className = { classes.ResultImageCaption }>
            <h5 className = { classes.CaptionTitle }>
                { title }
            </h5>
            <FontAwesomeIcon 
                icon = { [ 'fal', 'info' ] } 
                className = { classes.Icon } />
            <p className = { classes.InfoLabel }>
                Click for more info
            </p>
        </div>
    </div>
)

const Video = ({ nasaID }) => {
    const videoSrc = useFetchVideo(nasaID)

    return (
        <video 
            className = { classes.Video } 
            key = { videoSrc }
            controls = { true }>
            <source src = { videoSrc } type = "video/mp4" />
            Your browser does not support the video tag.
        </video>

    )
}

const Result = ({ mediaType, imageSrc, data, clicked }) => {
    let media = (
        <Image 
            src = { imageSrc } 
            alt = "description"
            title = { data.title }
            clicked = { clicked } />
    )
    
    if (mediaType === 'video') {
        media = <Video nasaID = { data.nasa_id } />
    }

    return (
        <div className = { classes.MediaContainer }>
            { media }
        </div>
    )
}

export default Result