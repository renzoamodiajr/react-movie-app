import React, { useEffect, useState } from 'react'
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from './components/MovieCard'

const API_URL = 'http://www.omdbapi.com?apikey=775fea35'

const App = () => {
    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState('')

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json()
        setMovies(data.Search)
    }

    const handleSearch = () => {
        searchMovies(search)
    }

    useEffect(() => {
        searchMovies('Avengers')
    }, [])

    return (
        <div className='app'>
            <h1>MovieLand</h1>
            <div className="search">
                <input
                    type="text"
                    placeholder='Search for movies'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={handleSearch}
                />
            </div>

            {
                movies.length > 0 ? (
                    <div className="container">
                        {
                            movies.map((movie, index) => (
                                <MovieCard key={index} movie={movie} />
                            ))
                        }

                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }

        </div>
    )
}

export default App