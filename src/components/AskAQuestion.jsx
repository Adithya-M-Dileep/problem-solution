import React from 'react';
import './styles/AskAQuestion.css';

function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }


function AskAQuestion(){
    return (
        <div className='AskAQuestion'>
        <div className='First center-items'>
            <img src="/profile.png" alt="coin" style={{width:'40px',height:'40px',borderRadius:'50%'}}/>
        </div>
        <div className='Second center-items'>
            <form onSubmit={handleSubmit}>
                <button type="submit">Ask a Question...</button>
            </form>
        </div>
        </div>
    )
}

export default AskAQuestion;