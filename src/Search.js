import React, { Component } from 'react'
import request from 'superagent';

export default class Search extends Component {
    state = {
        query: '',
        movies: []
    }

    handleSubmit = async e => {
        e.preventDefault();

        const response = await request
            .get(`${process.env.REACT_APP_BACK_END_URL}/search?query=${this.state.query}`)

        this.setState({ movies: response.body.results });
    }

    render() {
        console.log('=============================\n')
        console.log('|| this.state.movies', this.state.movies)
        console.log('\n=============================')
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
                        <ul>
                            {
                                !!this.state.movies.length && this.state.movies.map(movie => <li>
                                    <div>{movie.title}</div>
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
                                </li>) 
                            }
                        </ul>
                </form>
            </div>
        )
    }
}
