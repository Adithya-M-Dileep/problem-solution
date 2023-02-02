import React from 'react';
import './styles/Question.css';

function Question(props){
    return (
        <div className='Question'>
                <div className='QuestionInfo'>
                    <p>{props.votes} votes</p>
                    <p>{props.answer} answers</p>
                    <p>{props.date}</p>
                </div>
                <div className='QuestionText'>
                    <a href={"/question/"+props.keys}>{props.title}</a>
                    <p>{props.text}</p>
                </div>
            </div>
    )
}

export default Question;