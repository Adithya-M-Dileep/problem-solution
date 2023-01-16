import React from 'react';
import './styles/NewQuestion.css';

function NewQuestion(){
    return (
        <div className='NewQuestion'>
        <h1>Ask a Question</h1>
        <form>
            <div className="titleSection">
                <h2>Title</h2>
                <input type="text" name="title" placeholder="Be specific and imagine you’re asking a question to another person" />
            </div>
            <div className="detailSection">
                <h2>Explain the Question in Detail.</h2>
                <textarea name="detail" rows="15" placeholder="Include all the information someone would need to answer your question" />
            </div>
            <div className="tagsSection">
                <h2>Tags</h2>
                <input type="text" name="tags" placeholder="Add up to 5 tags to describe what your question is about. Seperate the tags by comma (,)" />
            </div>
            <input type="submit" />
        </form>
        </div>
    )
}

export default NewQuestion;