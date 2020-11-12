import React, { Component } from 'react'
import request from 'superagent';

export default class Search extends Component {
    state = {
        query: '',
        movies: [],
        favorites: []
    }

    componentDidMount = async () => {
        await this.fetchFavorites();
    }

    fetchFavorites = async () => {
        const response = await request
        .get(`${process.env.REACT_APP_BACK_END_URL}/api/favorites`)
        .set('Authorization', this.props.token)

    this.setState({ favorites: response.body });

    }

    handleSubmit = async e => {
        e.preventDefault();

        const response = await request
            .get(`${process.env.REACT_APP_BACK_END_URL}/search?query=${this.state.query}`)

        this.setState({ movies: response.body.results });
    }

    handleFavorite = async (movie) => {
        const favorite = {
            movie_api_id: movie.id,
            title: movie.title
        };

        await request
            .post(`${process.env.REACT_APP_BACK_END_URL}/api/favorites`)
            .set('Authorization', this.props.token)
            .send(favorite);
        
        await this.fetchFavorites();
    }

    render() {
        return (
            <div>
                Search!
                <form onSubmit={this.handleSubmit}>
                    <input 
                        value={this.state.query} 
                        onChange={e => this.setState({ query: e.target.value })} />
                    <button>
                        Search!
                    </button>
                </form>
                    <ul>
                        {
                            !!this.state.movies.length && this.state.movies.map(movie => <li id={movie.id}>
                                {
                                    this.state.favorites.find(favorite => favorite.movie_api_id === movie.id)
                                        ? <span>🐼</span>
                                        : <span style={{ cursor: 'pointer' }} onClick={() => this.handleFavorite(movie)}>🍕</span>
                                }
                                <div>{movie.title}</div>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
                            </li>) 
                        }
                    </ul>
            </div>
        )
    }
}
