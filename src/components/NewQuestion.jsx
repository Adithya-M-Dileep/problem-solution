import React,{ useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/NewQuestion.css';
import {doc,collection, setDoc } from 'firebase/firestore';
import db from "../firebase";

function NewQuestion(){
    const collectionInfo=collection(db,'questions');
    const navigate = useNavigate();
    const [title,setTitle] = useState("");
    const [detail,setDetail] = useState("");
    var [tags,setTags] = useState("");

    async function handleSubmit(e){
        e.preventDefault();
        tags=tags.split(",");
        const today=new Date();
        const date=(today.getDate()>10?today.getDate():"0"+today.getDate())+"/"+(today.getMonth()+1>10?today.getMonth()+1:"0"+(today.getMonth()+1))+'/'+(today.getFullYear()%100);
        const newQuestionData={
            title:title,
            text:detail,
            tags:tags,
            date:date,
            vote:0,
            answers:0,
        };
        try{
            const schoolRef=doc(collectionInfo);
            await setDoc(schoolRef,newQuestionData);
        }
        catch(error){
            console.log(error);
        }
        navigate('/');
    }
    return (
        <div className='NewQuestion'>
        <h1>Ask a Question</h1>
        <form onSubmit={handleSubmit}>
            <div className="titleSection">
                <h2>Title</h2>
                <input type="text" name="title" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Be specific and imagine you’re asking a question to another person" />
            </div>
            <div className="detailSection">
                <h2>Explain the Question in Detail.</h2>
                <textarea name="detail" rows="15" value={detail} onChange={(e)=>setDetail(e.target.value)} placeholder="Include all the information someone would need to answer your question" />
            </div>
            <div className="tagsSection">
                <h2>Tags</h2>
                <input type="text" name="tags" value={tags} onChange={(e)=>setTags(e.target.value)} placeholder="Add up to 5 tags to describe what your question is about. Seperate the tags by comma (,)" />
            </div>
            <input type="submit" value="Submit"/>
        </form>
        </div>
    )
}

export default NewQuestion;