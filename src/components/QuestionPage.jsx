import React from 'react';
import './styles/QuestionPage.css';
import Answer from "./Answer.jsx";

function QuestionPage(){
    return (
        <div className='QuestionPage'>
            <div className='QuestionSection'>
                <div className="questionTitle">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                </p>
                </div>
                <hr/>
                <div className="questionBody">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                </p></div>
                <div className="questionTags">
                <a href='/'>Tags</a></div>
                
            </div>
            <p className='sectionTitles'>Answers</p>
            <div className='AnswerSection'>
                <Answer />
                <Answer />
            </div>
            <p className='sectionTitles'>Your Answer</p>
            <div className="YoursAnswerSection">
                <textarea className="YoursAnswer" placeholder="Enter your answer here..."></textarea>
            </div>
        </div>
    )
}

export default QuestionPage;