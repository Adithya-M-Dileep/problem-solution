import React from 'react';
import './styles/Question.css';

function Question(){
    return (
        <div className='Question'>
            <div className='QuestionInfo'>
                <p>0 votes</p>
                <p>0 answers</p>
                <p>31/12/22</p>
            </div>
            <div className='QuestionText'>
                <a href='/question'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                </a>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                </p>
            </div>
        </div>
    )
}

export default Question;