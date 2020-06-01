import { useEffect, useState } from 'react'

import axios from '../axios-nasa'


/*
    Our video component. To get the video data we make a call
    to nasa api with the nasa_id, then search through the response data
    for a link containing .mp4.
    playable prop is a boolean. We don't want users having the video playing
    multiple times at once. So videos are only playable in fullScreen mode.
*/
const useFetchVideo =  nasaID => {
    const [ videoSrc, setVideoSrc ] = useState('')
    
    useEffect(() => {
        async function getVideo() {
            try {
                const response = await axios.get(`/asset/${nasaID}`)
                const videoLink = response.data.collection.items.find(
                    item => item.href.match(/.mp4/g)
                )
                console.log('videoLink: ', videoLink.href)
                setVideoSrc(videoLink.href)
            } catch (e) {
                // setup alert here
                console.log(e)
            }
        }
        getVideo()
    }, [nasaID])

    return videoSrc
}

export default useFetchVideo