import React, { useState ,useEffect}  from 'react';
import './styles/HomePage.css';
import AskAQuestion from './AskAQuestion';
import Question from './Question';
import {collection, onSnapshot } from 'firebase/firestore';
import db from "../firebase";


function HomePage(){
    const collectionInfo=collection(db,'questions');
    const [questions,setQuestions]=useState([]);
    useEffect(()=>{
        const unsub=onSnapshot(collectionInfo,(querySnapshot)=>{
            var q=[];
            querySnapshot.forEach((doc)=>{
                const question=doc.data();
                q.push(<Question keys={doc.id} votes={question.vote} answer={question.answers} date={question.date} title={question.title} text={question.text}/>);
            });
            
            setQuestions(q);
        });
        return () =>{
            unsub();
        };
    },[]);
    
    return (
        <div className='HomePage'>
            <AskAQuestion />
            {questions}
        </div>
    )
}

export default HomePage;