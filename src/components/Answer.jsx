import React from 'react';

function Answer(){
    return (
        <div className='Answer'>
            <div className='AnswerVote'>
            <button >
            <img src="/Images/ICONS/upArrow.png" alt="up Vote" style={{width:'45px',height:'40px'}}></img>
            </button>
            <p>10</p>
            <button>    
            <img src="/Images/ICONS/downArrow.png" alt="down Vote" style={{width:'45px',height:'40px'}}></img>
            </button>
            </div>
            <div className='AnswerBody'>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae voluptatibus dignissimos facilis at animi consequatur in optio itaque, repellat, minus sint aliquam inventore minima quas a error. Delectus, minus ut.</p>
            </div>

        </div>
    )
}

export default Answer;