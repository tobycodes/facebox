import React from 'react';


class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstName: '',
            password: ''
        }
    }

    onInputName = (event) => {
        this.setState({firstName: event.target.value})
    }

    onInputEmail = (event) => {
        this.setState({email: event.target.value})
    }

    onInputPassword = (event) => {
        this.setState({password: event.target.value})
    }

    onRegister = () => {
        const { firstName, email, password } = this.state;

        if(!firstName || !email || !password){
           return this.props.onError('Incomplete form.');
        }

        if(password.length < 6) {
            return this.props.onError('Password must not be less than 6 characters.');
        }

        this.props.onError('');
        
        fetch('https://sheltered-lowlands-62768.herokuapp.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: firstName,
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(result => {
            if(result.first_name) {
                this.props.loadUser(result);
                this.props.onRouteChange('home');
            } else {
                this.props.onError(result);
            }
        })
        .catch(err => console.log(err));

    }

    render() {
        return (
            <article className="br2 ba dark-gray b--black-10 mb4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="firstName">First Name</label>
                                <input onChange={this.onInputName} className="pa2 input-reset ba bg-transparent hover-bg-black input hover-white w-100" type="text" name="firstName"  id="first-name" autoComplete='off' />
                            </div>
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
                            <input onClick={this.onRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="Register" />
                        </div>
                        <div className="lh-copy mt3">
                        <p onClick={() => this.props.onRouteChange('signin')} className="f6 link pointer dim black db">Sign In</p>
                        </div>
                    </form>
                </main>
            </article>
        )
    }
    
}

export default Register;