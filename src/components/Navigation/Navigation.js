import React from 'react';
import Logo from '../Logo/Logo';
import Hero from '../Hero/Hero';


const Navigation = ({ onRouteChange, route }) => {
    if(route ==='signin') {
        return (
            <div>
                <nav style={{display: 'flex', justifyContent: 'space-between'}} className='mt3'>
                    <Logo />
                    <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
                </nav>
                <Hero />
            </div>
            
        )
    } else if(route === 'register') {
        return (
            <div>
                <nav style={{display: 'flex', justifyContent: 'space-between'}} className='mt3'>
                    <Logo />
                    <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
                </nav>
                <Hero />
            </div>
            
        )
    } else {
        return (
            <nav style={{display: 'flex', justifyContent: 'space-between'}} className='mt3'>
                <Logo />
                <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
            </nav>
        )
    }
    
}





export default Navigation;