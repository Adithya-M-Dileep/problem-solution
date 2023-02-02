import React from 'react';
import { useParams } from 'react-router-dom';
import {doc,collection ,getDoc} from 'firebase/firestore';
import './styles/QuestionPage.css';
import AnswerSection from "./AnswerSection.jsx";
import db from "../firebase";
import { useEffect,useState } from 'react';

function QuestionPage(){
    const { id } = useParams();
    const questionRef = doc(collection(db, "questions"), id);
    const [questionInfo,setQuestionInfo]=useState({tags:[]});
    useEffect(() => {
        async function getQuestion() {
            const docSnap = await getDoc(questionRef);
            if (docSnap.exists()) {
                setQuestionInfo(docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        getQuestion();
    },[]);
    return (
        <div className='QuestionPage'>
            <div className='QuestionSection'>
                <div className="questionTitle">
                <p>{questionInfo.title}</p>
                </div>
                <hr/>
                <div className="questionBody">
                <p>{questionInfo.text}</p></div>
                <div className="questionTags">
                {questionInfo.tags.map((a)=>{
                    return <a href='/'>{a}</a>
                })}
                </div>
                
            </div>
            <AnswerSection/>
        </div>
    )
}

export default QuestionPage;