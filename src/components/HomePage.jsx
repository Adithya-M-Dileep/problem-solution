import React from 'react';
import './styles/HomePage.css';
import AskAQuestion from './AskAQuestion';
import Question from './Question';

function HomePage(){
    return (
        <div className='HomePage'>
            <AskAQuestion />
            <Question />
            <Question />
        </div>
    )
}

export default HomePage;