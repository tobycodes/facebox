import React from 'react';


class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    onInputEmail = (event) => {
        this.setState({email: event.target.value});
    }

    onInputPassword = (event) => {
        this.setState({password: event.target.value});
    }

    onSignIn = () => {
        const { email, password } = this.state;

        if(!email || !password) {
            return this.props.onError('Incomplete form.');
        }
        this.props.onError('');

        fetch('https://sheltered-lowlands-62768.herokuapp.com/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(result => {
            if(result.id) {
                this.props.loadUser(result)
                this.props.onRouteChange('home');
            } else {
                this.props.onError(result);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <article className="br2 ba dark-gray b--black-10 mb4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onInputEmail} className="pa2 input-reset ba bg-transparent hover-bg-black input hover-white w-100" type="email" name="email-address"  id="email-address" autoComplete='off' />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onInputPassword} className="b pa2 input-reset ba bg-transparent hover-bg-black input hover-white w-100" type="password" name="password"  id="password" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type='button' value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                        <p onClick={() => this.props.onRouteChange('register')} className="f6 link dim pointer black db">Register</p>
                        </div>
                    </form>
                </main>
            </article>
        )
    }
}

export default SignIn;