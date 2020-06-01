import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SVG from '../Assets/nasa.png'

import * as actions from '../store/actions'

import classes from './MediaSearch.module.css'

const Search = ({ history }) => {
    const dispatch = useDispatch()
    const [ query, setQuery ] = useState('')
    
    const onSubmitHandler = e => {
        e.preventDefault()

        // set query and route to results page
        dispatch(actions.queryImageSearch(query))
        history.push('/results')
    }

    return (
        <form 
            className = { classes.InputContainer }
            onSubmit = { onSubmitHandler }>
            <div className = { classes.IconContainer }>
                <FontAwesomeIcon 
                    icon = { [ 'fal', 'search' ] } 
                    className = { classes.Icon } />
            </div>
            <input 
                className = { classes.Input } 
                placeholder = "Enter Search Here..."
                value = { query }
                onChange = { e => setQuery(e.target.value) } />
            <button className = { classes.Button }>
                Submit
            </button>
        </form>
    )
}

const Header = () => (
    <header className = { classes.Header }>
        <img src = { SVG } alt = "stars" className = { classes.HeaderImage } />
    </header>
)

const MediaSearch = ({ history }) => {
     return (
        <section className = { classes.MediaSearchContainer }>
            <Header />
            <Search history = { history } />
            <div className = { classes.Bottom }>
                <h1 className = { classes.Heading }>Search NASA's Image and Video Database</h1>
            </div>
        </section>
    )
}

export default MediaSearch