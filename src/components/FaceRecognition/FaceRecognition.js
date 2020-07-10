import React from 'react';
import './FaceRecognition.css';




const FaceRecognition = ({ imageUrl, faceBox }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id={'imgInput'} style={{width: '400px', height: 'auto'}} alt='Paste and submit a url in the field above' src={imageUrl}/>
                <div className='face-box' style={{top: faceBox.topRow, left: faceBox.leftCol, right: faceBox.rightCol, bottom: faceBox.bottomRow}}></div>
            </div>
        </div>
    )
}


export default FaceRecognition;