import './App.css';
import {useState,useEffect} from 'react'
import Article from './component/Article';
import Form from './component/Form';
import { Cookies, useCookies } from 'react-cookie';
import {useNavigate} from 'react-router-dom'

function App() {

  const [articles,setArticles] = useState([])
  const [editArticle,setEditArticles] = useState(null)
  const [token,removeToken] = useCookies(['mytoken'])

  let navigate = useNavigate()

 
  
  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/article/",{
      'method':'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Token ${token['mytoken']}` 
      }
    })
    .then(resp => resp.json())
    .then(resp => setArticles(resp))
    .catch(error => console.log(error))
  },[token])

  const editBtn = (article) => {
    setEditArticles(article)

  }

  const UpdatedInformation=(article) =>{
    const new_article = articles.map(myarticle =>{
      if (myarticle.id === article.id){
        return article;
      }
      else{
        return myarticle
      }
    })

    setArticles(new_article)
  }

  const articleForm = () => {
    setEditArticles({title:'',description:''})
  }

  const InsetrtInformation = (article) =>{
    const new_article = [...articles,article]
    setArticles(new_article)

  }

  const deleteBtn = (article) =>{
    const new_article = articles.filter(myarticle => {
         if (myarticle.id === article.id){
          return false
         }
         return true;
    })
    setArticles(new_article)

  }

  const LogoutForm = (e) => {
    e.preventDefault();
    console.log('Logout');

    removeToken('mytoken')
    Cookies.remove('name')
   
}


  useEffect(() => {
    if(!token['mytoken']){
      navigate("/login")
      
    }
   
  },[token])


  
  return (
    <div className="App">
      <div className='row'>
        <div className='col'>
          <h1>Django - React Blog</h1>
          <br/>
        </div>
        <div className='col'>
          <button onClick={articleForm} className='btn btn-primary'>Insert Article</button>
        </div>
        <div className='col'>
          <button onClick={LogoutForm}   className='btn btn-primary'>Logout</button>
        </div>

      </div>
      
      <Article articles = {articles} editBtn={editBtn} deleteBtn={deleteBtn}/>
      {editArticle ? <Form article={editArticle} UpdatedInformation={UpdatedInformation} InsetrtInformation={InsetrtInformation} /> :null }
      
      
    </div>
  );
}

export default App;
