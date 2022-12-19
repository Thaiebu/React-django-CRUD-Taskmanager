import React ,{useState,useEffect} from 'react';
import ApiService from '../ApiService';
import { useCookies } from 'react-cookie';
import {useNavigate} from 'react-router-dom';


function Login() {
  const [username,setusername] = useState('')
  const [password,setpassword] = useState('')
  const [token , setToken] = useCookies(['mytoken'])
  const [isLogin,setLogin] = useState(true)
  let navigate = useNavigate()

  useEffect(() => {
    if(token['mytoken']){
      navigate("/articles")
    }
   
  }, [token])


  const loginBtn = () =>{
    ApiService.LoginUser({username,password})
    .then(resp => setToken('mytoken',resp.token))
    .catch(error => console.log(error))

  }

  const RegisterBtn = () =>{
    console.log({username,password})
    ApiService.RegisterUser({username,password})
    .then(resp => console.log(resp))
    .catch(error => console.log(error))

  }
 
  return (
    <div className='App'>
     
      <br/>
      <br/>

      {isLogin ? <h1>Please Login</h1>: <h1>Please Register</h1>}


      <div className='mb-3'>
        <label htmlFor='username' className='form-label'>Username</label>
        <input type='text' className='form-control' id='username' placeholder='username'
         value={username}  onChange={e => setusername(e.target.value)} />
      </div>
      <div>
      <label htmlFor='password' className='form-label'>Password</label>
        <input type='password' className='form-control' id='password' placeholder='password'
        value={password}  onChange={e => setpassword(e.target.value)}/>
      </div>

      {/* {isLogin ?null :      <div>
      <label htmlFor='conform password' className='form-label'>Conform Password</label>
        <input type='password' className='form-control' id='Password' placeholder='conform password'
        value={password}  onChange={e => setpassword(e.target.value)}/>
      </div>  } */}
      <br/>
      {isLogin ?<button className='btn btn-primary' onClick={loginBtn}>Login</button>:<button className='btn btn-primary' onClick={RegisterBtn}>Register</button> }

      <div>{isLogin ? <h5>If you Don't have account,Please <button className='btn btn-primary' onClick={() => setLogin(false)}>Register </button> Here! </h5>: <h5>if you have account login<button className='btn btn-primary' onClick={() => setLogin(true)}>Login </button> Here!</h5>   }</div>
    </div>
  )
}

export default Login