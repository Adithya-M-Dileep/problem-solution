import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import Answer from "./Answer.jsx";
import {doc,collection,getDoc,updateDoc,setDoc} from 'firebase/firestore';
import db from "../firebase";
import { useAuth } from "./auth/AuthContext";

function AnswerSection(props){
    const { currentUser } = useAuth();
    const { id } = useParams();
    const answerRef = doc(collection(db, "answers"), id);
    const questionRef = doc(collection(db, "questions"), id);
    const [answerInfo,setAnswerInfo]=useState([]);
    const [answerDetails,setAnswerDetails]=useState("");
    useEffect(() => {
        async function getAnswer() {
            const docSnap = await getDoc(answerRef);
            if (docSnap.exists()) {
                const a =docSnap.data().answerArray;
                setAnswerInfo(a);
            } else {
                setDoc(answerRef,{answerArray:[]});
                console.log("No such document!");
            }
        }
        getAnswer();
    },[]);

    async function answerCount(){
        var count= answerInfo.length;
        const docSnap = await getDoc(questionRef);
            if (docSnap.exists()) {
                var quesntionInfo=docSnap.data();
                quesntionInfo.answers=count;
                updateDoc(questionRef,quesntionInfo);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document! 2");
            }
    }

    
    async function handleSubmit(e){
        e.preventDefault();
        var a=answerInfo;
        const key=new Date().valueOf();
        a.push({answer:answerDetails,votes:0,tokenRecieved:false,author:currentUser.email,key:key});
        const updatedAnswer={
            answerArray:a
        }
        setAnswerDetails("");
        try{
            // console.log(updatedAnswer);
            updateDoc(answerRef,updatedAnswer);
            answerCount();
            setAnswerInfo(a);
        } catch(error){
            console.log(error);
        }
    }

    return (
        <div>
            <p className='sectionTitles'>Answers</p>
            <div className='AnswerSection'>
                {answerInfo.map((answer,i)=>{
                    return <Answer answerInfo={answerInfo} keys={i} votes={answer.votes} answerText={answer.answer}/>
                })}
            </div>
            <p className='sectionTitles'>Your Answer</p>   
            <div className="YoursAnswerSection">
                <form onSubmit={handleSubmit}>
                    <textarea className="YoursAnswer" value={answerDetails} onChange={(e)=>setAnswerDetails(e.target.value)} placeholder="Enter your answer here..."></textarea>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>

    );
}

export default AnswerSection;