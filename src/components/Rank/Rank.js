import React from 'react';

const Rank = ({ firstName, entries }) => {
    return (
        <div>
            <div className='white f3'>
              {`Hi ${firstName}, your current rank is...`}
            </div>
            <div className='white f2'>
                {`#${entries}`}
            </div>
        </div>      
    );
}


export default Rank;