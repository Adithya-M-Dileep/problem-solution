import React from 'react';
import { useParams } from 'react-router-dom';
import {doc,collection ,getDoc,updateDoc} from 'firebase/firestore';
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
    async function questionLike(){
        var a=questionInfo;
        a.vote=a.vote+1;
        try{
            updateDoc(questionRef,a);
        } catch(error){
            console.log(error);
        }
    }
    return (
        <div className='QuestionPage'>
            <div className='QuestionSection'>
                <div className="questionTitle">
                <div>
                <p>{questionInfo.title}</p></div>
                <div>
                <button onClick={()=>questionLike()}>
                <img src="/Images/ICONS/heart.png" alt="Likes" style={{width:'45px',height:'40px'}}></img>
                </button></div>
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