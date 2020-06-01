import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Loading from './UI/Loading'
import NavBar from './UI/NavBar'
import Card from './UI/Card'
import Result from './Result'
import Backdrop from './UI/Backdrop'
import FullScreenMedia from '../components/FullScreenImage'

import classes from './SearchResults.module.css'

const NUM_RESULTS_PER_PAGE = 6

const PageControl = ({ max, clicked, currentPage }) => (
    <div className = { classes.Container }>
        <FontAwesomeIcon 
            icon = { [ 'fal', 'arrow-left' ] } 
            className = { classes.Icon }
            onClick = { () => clicked(currentPage - 1) } />
            <p>{ currentPage + 1 } / { max }</p>
        <FontAwesomeIcon 
            icon = { [ 'fal', 'arrow-right' ] } 
            className = { classes.Icon }
            onClick = { () => clicked(currentPage + 1) } />
    </div>
)

const SearchResults = () => {
    const imageCollection = useSelector(state => state.nasa.collection)
    // need to make sure our data has loaded
    const loading = useSelector(state => state.nasa.loading)

    /*
        For pagination
    */
    const [ currentPageNumber, setCurrentPageNumber ] = useState(0)
    let totalPages // the total number of page search results
    let visibleResults = imageCollection // the images currently being show to the user.
    let imageList = null

    /*
        Full screen media
        Will hold index of item in visibleResults
    */
    const [ chosenMedia, setChosenMedia ] = useState(-1)

    // To control which part of the image collection is being viewed
    const setPageHandler = pageNum => {
        // check for edge cases, no -nums and
        // no nums higher than totalPages
        if (pageNum < 0) {
            setCurrentPageNumber(0) // first page
        } else if (pageNum > totalPages) {
            setCurrentPageNumber(totalPages) // last page
        } else {
            setCurrentPageNumber(pageNum)
        }

        // When setpagehandler is called, reset chosen media
        setChosenMedia(-1)
    }
    
    // Once collection loads set state variables
    if (imageCollection) {
        totalPages = Math.ceil(imageCollection.length / NUM_RESULTS_PER_PAGE )
        const collectionStart = currentPageNumber * NUM_RESULTS_PER_PAGE
        const collectionEnd = (currentPageNumber* NUM_RESULTS_PER_PAGE) + NUM_RESULTS_PER_PAGE
        visibleResults = imageCollection.slice(collectionStart, collectionEnd)

        // Create visible image list
        imageList = (
            visibleResults.map((item, index )=> {
                return (
                <Card key = { item.data[0].nasa_id }>
                    <Result
                        clicked = { () => setChosenMedia(index) } 
                        mediaType = { item.data[0].media_type }
                        imageSrc = { 
                            item.data[0].media_type === 'image'
                                ? item.links[0].href
                                : item.href }
                        data = { item.data[0] } 
                    />
                </Card>
              )})
        )
    }

    /*
        Set up full screen media if state variable is not -1
    */
    let fullScreenMedia = null

    if (chosenMedia !== -1) {
        fullScreenMedia = (
            <FullScreenMedia 
                src = { visibleResults[chosenMedia].links[0].href } 
                data = { visibleResults[chosenMedia].data[0] } />
        )
    }
    
    return (
        <section className = { classes.SearchResults }>
            { loading || !imageCollection ? null : <NavBar /> }
            { loading || !imageCollection ? <Loading /> : null }
            <Backdrop 
                show = { chosenMedia !== - 1 } 
                clicked = { () => setChosenMedia(-1) } />
            { fullScreenMedia }
            <div className = { classes.ResultsContainer }>
                { imageList }
            </div>
            <PageControl
                max = { totalPages } 
                clicked = { setPageHandler }
                currentPage = { currentPageNumber } />
        </section>
    )
}

export default SearchResults