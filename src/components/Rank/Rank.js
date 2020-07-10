import React from 'react';

const Rank = ({ firstName, entries }) => {
    return (
        <div>
            <div className='white f3'>
              {`Hi ${firstName}, you have made a total of...`}
            </div>
            <div className='white f2'>
                {`#${entries} requests`}
            </div>
        </div>      
    );
}


export default Rank;