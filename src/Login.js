import React, { Component } from 'react'
import request from 'superagent';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        console.log(this.state);

        this.setState({ loading:true })
        const user = await request
            .post(`${process.env.REACT_APP_BACK_END_URL}/auth/signin`)
            .send(this.state); // we can send state because the keys are the same on the front and back end

        this.setState({ loading: false })
        
        this.props.changeTokenAndUsername(user.body.email, user.body.token);
        
        this.props.history.push('/search');
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Log in</h2>
                    <label>
                        Email:
                        <input 
                        onChange={(e) => this.setState({ email: e.target.value })}
                        value={this.state.email} />
                    </label>
                    <label>
                        Password:
                        <input 
                        onChange={(e) => this.setState({ password: e.target.value })}
                        value={this.state.password} type="password"/>
                    </label>
                    {
                        this.state.loading 
                        ? 'Spinnerrrr'
                        : <button>
                            Log in!
                        </button>
                    }
                </form>
            </div>
        )
    }
}
