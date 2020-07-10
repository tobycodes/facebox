import React from 'react';
import './Error.css';


const Error = ({ message }) => {
    return (
        <div className='error mb0'>
            {message}
        </div>
    );
}

export default Error;