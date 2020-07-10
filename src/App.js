import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import LinkForm from './components/LinkForm/LinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import particlesConfig from './particlesjs-config.json';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Error from './components/Error/Error'


const particlesParams = particlesConfig;

class App extends Component {

  constructor() {
    super();
    
    this.state = {
      input: '',
      imageUrl: '',
      faceBox: {},
      route: 'signin',
      user: {
        id: '',
        firstName: '',
        email: '',
        dateCreated: '',
        entries: 0
      },
      errorMessage: ''
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onSubmit = () => {
    this.setState({
      errorMessage: '',
      imageUrl: this.state.input,
      facebox: {}
    });

    fetch('https://sheltered-lowlands-62768.herokuapp.com/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: this.state.input
      })
    })
    .then(response => response.json())
    .then(data => {
      this.showFaceBox(this.calculateFaceBox(data));
    
      fetch('https://sheltered-lowlands-62768.herokuapp.com/entry', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.state.user.id
        })
      })
      .then(response => response.json())
      .then(user => this.loadUser(user))
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    this.setState({
      route: route,
      errorMessage: '',
      imageUrl: '',
      facebox: {},
    });
  }

  onError = (message) => {
    this.setState({errorMessage: message});
  }

  calculateFaceBox = (data) => {
    const clarifaiData = data.outputs[0].data.regions[0].region_info.bounding_box,
          img = document.getElementById('imgInput'),
          width = +img.width,
          height = +img.height,
          box = {
            leftCol: clarifaiData.left_col * width,
            rightCol: width - (clarifaiData.right_col * width),
            topRow: clarifaiData.top_row * height,
            bottomRow: height - (clarifaiData.bottom_row * height)
          }
          
    return box
  }

  showFaceBox = (box) => {
    this.setState({faceBox: box});    
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        firstName: data.first_name,
        email: data.email,
        dateCreated: data.date_created,
        entries: data.entries
      }
    });
  }

  render() {
    const { imageUrl, faceBox, route } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={{particlesParams}} />
        <Navigation route={route} onRouteChange={this.onRouteChange}/>
        <Error message={this.state.errorMessage}/>
        {{
          'signin':<SignIn loadUser ={this.loadUser} onRouteChange={this.onRouteChange} onError={this.onError} />,
          'register':<Register loadUser ={this.loadUser} onRouteChange={this.onRouteChange} onError={this.onError} />,
          'home':<div>
            <Rank firstName={this.state.user.firstName} entries={this.state.user.entries} />
            <LinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onSubmit} />
            <FaceRecognition faceBox={faceBox} imageUrl={imageUrl} />
          </div>
        }[route]}

      </div>
    );
  }
  
}

export default App;
