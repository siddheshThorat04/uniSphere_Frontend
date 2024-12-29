import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../contextApi/authContext';
import { useDarkThemeContext } from '../contextApi/DarkTheme';


const Signup = () => {
  
  const [colleges, setcolleges] = useState([]);
  const {isDark, setDark}=useDarkThemeContext()
  const{authUser, setauthUser}=useAuthContext()
  useEffect(() => {
    setDark("true")
    const getCollleges = async () => {
        const res=await fetch('/api/admin/getClg')
       setcolleges(await res.json())
    }
    getCollleges()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const username = e.target[0].value
    const college = e.target[1].value
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        college
      })
    })
    const data = await res.json()
    if(data.error) {
        alert(data.error)
        
    }else {
        setauthUser(data.user)
        console.log(authUser);
      localStorage.setItem("mbAuth",JSON.stringify(data.user))
      localStorage.setItem("mbTheme","false")
      window.location.href="/"
    }
    console.log(data);
  }


  return (
       
        <div className="login">
         <h1 className=' '  >signing up to <span className='Name'  >mateBatu</span></h1>
         <form   onSubmit={handleSubmit} className='loginForm  w-full px-3 ' >  

              <div className="inputContainer2">
              <label htmlFor="username"  className='text-white' >what we can call you ?</label>
              <input type="text"  name='username'     placeholder='Enter the username'  />
              </div>
              <div className="inputContainer2">
              <label htmlFor="college" className='text-white'  >Select college👇</label>
              <select className='text-white bg-transparent border rounded border-white  '    name="college" id="">
              {
                  colleges.map((clg)=><option className='bg-black'  key={clg._id} value={clg._id}>{clg.name}</option>)
              }
              </select>
              </div>
              <button type='submit' className='loginBtn'   >submit </button>
              {/* <a href="/login"    className="text-white underline"   >Already have an account ?</a> */}
          </form>
        </div>
    
  )
}

export default Signup
