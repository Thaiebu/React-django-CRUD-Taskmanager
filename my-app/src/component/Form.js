import React,{useState,useEffect} from 'react';
import ApiService from '../ApiService';
import { useCookies } from 'react-cookie';

function Form(props) {

  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [token] = useCookies(['mytoken'])

  
  useEffect(() => {
    setTitle(props.article.title)
    setDescription(props.article.description)

  },[props.article])


  const updateArticle = () => {
    ApiService.UpdateArticle(props.article.id,{title,description},token['mytoken'])
    .then(resp => props.UpdatedInformation(resp))

   }


   const insertArticle =  () =>{
    ApiService.InsertArticle({title,description},token['mytoken'])
    .then(resp => props.InsetrtInformation(resp))

   }
  
  return (
    <div>
      {/* {props.article && props.article.title } */}
      {props.article ? (
        <div className='mb-3'>
        <label htmlFor='title' className='form-lable'>Title</label>
        <input type='text' className= "form-control"  id="title" placeholder='Enter Title' 
          value={title} onChange = {e =>setTitle(e.target.value)} />
        
        <label htmlFor='description' className='form-lable'>Description</label>
        <textarea type='text' className= "form-control"  row="5" id="desc" placeholder='Enter description'  
          value={description} onChange = {e =>setDescription(e.target.value)}/>
        <br/>

        {props.article.id ? <button onClick={updateArticle} className='btn btn-success'>Update</button> :
        <button onClick={insertArticle} className='btn btn-success'>Add</button>}

        
        </div>

      ) : null}
      

    </div>
  )
}

export default Form