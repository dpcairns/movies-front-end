import React, { Component } from 'react'
import request from 'superagent';

export default class Favorites extends Component {
    state = { favorites : [] }

    componentDidMount = async () => {
        const response = await request
            .get(`${process.env.REACT_APP_BACK_END_URL}/api/favorites`)
            .set('Authorization', this.props.token)

        this.setState({ favorites: response.body });

    }
    render() {

        return (
            <div>
                Favorites!!
                <ul>
                    {
                        !!this.state.favorites.length && this.state.favorites.map(fave => 
                            <li>
                                <div>{fave.title}</div>
                                <div>{fave.movie_api_id}</div>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }
}
