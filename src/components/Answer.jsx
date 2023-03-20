import React from 'react';
import { useParams } from 'react-router-dom';
import db from "../firebase";
import {doc,collection,updateDoc,setDoc} from 'firebase/firestore';
import {useState } from 'react';

async function updateTokens(author,questionID){
    const rewardInfo=collection(db,'rewards');
    const rewardList={
        author:author,
        questionID:questionID
    }
    const rewardRef=doc(rewardInfo);
    try{
    await setDoc(rewardRef,rewardList);
    }catch(error){
        console.log(error);
    }
}


function Answer(props){
    const [answerVote,setVotes]=useState(props.votes);
    const { id } = useParams();
    const answerRef = doc(collection(db, "answers"), id);
    var answerInfo=props.answerInfo;
    async function updateVotes(x){
        answerInfo[props.keys].votes+=x;
        setVotes(answerInfo[props.keys].votes);
        if(!answerInfo[props.keys].tokenRecieved && answerVote>10){
            console.log("reached tilll heree")
            answerInfo[props.keys].tokenRecieved=true;
            updateTokens(answerInfo[props.keys].author,id);
        }
        await updateDoc(answerRef,{answerArray:answerInfo});
    }

    return (
        <div className='Answer'>
        <hr/>
            <div className='AnswerVote'>
            <button onClick={()=>{updateVotes(1)}}>
            <img src="/Images/ICONS/upArrow.png" alt="up Vote" style={{width:'45px',height:'40px'}}></img>
            </button>
            <p>{answerVote}</p>
            <button onClick={()=>{updateVotes(-1)}}>    
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