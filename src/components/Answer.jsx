import React from 'react';

function Answer(props){
    return (
        <div className='Answer'>
        <hr/>
            <div className='AnswerVote'>
            <button >
            <img src="/Images/ICONS/upArrow.png" alt="up Vote" style={{width:'45px',height:'40px'}}></img>
            </button>
            <p>{props.votes}</p>
            <button>    
            <img src="/Images/ICONS/downArrow.png" alt="down Vote" style={{width:'45px',height:'40px'}}></img>
            </button>
            </div>
            <div className='AnswerBody'>
                <p>{props.answerText}</p>
            </div>
        <hr/>
        </div>
    )
}

export default Answer;