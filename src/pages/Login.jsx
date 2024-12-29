import React, { useEffect } from 'react'
import { useAuthContext } from '../contextApi/authContext.jsx'
import { useDarkThemeContext } from '../contextApi/DarkTheme.jsx'
const Login = () => {
  const {authUser,setauthUser}=useAuthContext()
  const {isDark, setDark}=useDarkThemeContext()


  useEffect(() => {
    setDark("true")
  },[])
  const handleSubmit = async (e) => {


      try {
        e.preventDefault()
        const res=await fetch("/api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username:e.target.username.value,
                password:e.target.password.value
            })
        })
        const data=await res.json()
        if(data.error){
          alert(data.error)
        }else{
          alert(data.message)
        setauthUser(data.user)
        // console.log(authUser);
      localStorage.setItem("mbAuth",JSON.stringify(data.user))
        }
      } catch (error) {
        console.log(error);
      }
      
   

  }

  return (
    <div className="login">
      <h1   >login to <span className='Name'  >mateBatu</span></h1>
      <form onSubmit={handleSubmit} className='loginForm ' >
        <div className='inputContainer'>
        <label htmlFor="username"   className='text-white' >what we called you ?</label>
        <input type="text" name='username' placeholder='Enter the username' />
        </div>
        <div className='inputContainer'>

        <label htmlFor="password"  className='text-white' >Password</label>
        <input type="password" name='password' placeholder='Enter the password' />
        </div>
        <button type='submit' className='loginBtn '   >login </button>
        <a href="/signup" className='text-white underline' >don't have an account ?</a>
      </form>
    </div>
  )
}

export default Login
