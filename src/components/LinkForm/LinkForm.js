import React from 'react';
import './LinkForm.css';


const LinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Give it a try.'}
            </p>

            <div className='center pa4 br3 form shadow-5' >
                <input type='text' name='input' className='f4 pa2 w-70 center outline-none input' onChange={onInputChange} autoComplete='off' />
                <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple outline-none' onClick={onButtonSubmit}>Detect</button>
            </div>
            
        </div>
    )
}


export default LinkForm;