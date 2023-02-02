import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import Answer from "./Answer.jsx";
import './styles/QuestionPage.css';
import {doc,collection,getDoc,updateDoc} from 'firebase/firestore';
import db from "../firebase";

function AnswerSection(props){
    const { id } = useParams();
    const answerRef = doc(collection(db, "answers"), id);
    const [answerInfo,setAnswerInfo]=useState([]);
    const [answerDetails,setAnswerDetails]=useState("");
    useEffect(() => {
        async function getAnswer() {
            const docSnap = await getDoc(answerRef);
            if (docSnap.exists()) {
                const a =docSnap.data().answerArray;
                setAnswerInfo(a);
            } else {
                console.log("No such document!");
            }
        }
        getAnswer();
    },[]);

    
    async function handleSubmit(e){
        e.preventDefault();
        var a=answerInfo;
        a.push({answer:answerDetails,votes:0});
        const updatedAnswer={
            answerArray:a
        }
        setAnswerDetails("");
        try{
            // console.log(updatedAnswer);
            updateDoc(answerRef,updatedAnswer);
            setAnswerInfo(a);
        } catch(error){
            console.log(error);
        }
    }

    return (
        <div>
            <p className='sectionTitles'>Answers</p>
            <div className='AnswerSection'>
                {answerInfo.map((answer)=>{
                    return <Answer votes={answer.votes} answerText={answer.answer}/>
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