import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import dp from "../assets/dp.png"
import { FaUniversity } from 'react-icons/fa';
import { FaInstagram } from "react-icons/fa";
import { useAuthContext } from "../contextApi/authContext"
import { IoIosLogOut } from 'react-icons/io'
import { GoHome } from "react-icons/go";
import { useDarkThemeContext } from '../contextApi/DarkTheme';
const ProfilePage = () => {
  const userId = useParams().id
  const [user, setUser] = useState()
  const { authUser, setauthUser } = useAuthContext()
  const {isDark}= useDarkThemeContext()
  useEffect(() => {
    const getProfile = async () => {
      const res = await fetch("/api/user/getProfile/" + userId, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET"
      })
      const data = await res.json()
      setUser(data.user)
      console.log(data);
    }
    getProfile()
  }, [])
  const logout = async (e) => {
    e.preventDefault()
    const res = await fetch("/api/auth/logout", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    setauthUser(null)
    localStorage.setItem("mbAuth", null)
    localStorage.setItem("mbTheme", null)
    console.log(data);

  }
  const updateProfile = async (e) => {
    e.preventDefault()
    const username = e.target[0].value
    const instagramLink = e.target[1].value
    const res = await fetch("/api/user/updateProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        instagramLink
      })
    })
    const data = await res.json()
    window.location.reload()
    console.log(data);
  }

  return (

    <div className='profile'>
      <button className="HomeButton"   ><GoHome onClick={() => window.location.href = "/" }className={isDark==="false"?'text-black':"text-white" }/></button>
      <div className={isDark==="false"?'profileHeader border-black ':"profileHeader"}>
        <img    src={dp} alt="" />
        <div className='name_and_insta' >
          <h1 className={isDark==="false"?'text-black':"text-white"}  >{user?.username}</h1>
          {user?.instagramLink && <a href={user?.instagramLink} target='_blank' className='instagram'   ><FaInstagram className='instaIcon'  /> <span className={isDark==="false"?'text-black':"text-white"} > instagram.com</span> </a>  }
        </div>
      </div>
      <div className="profileDetails">
        <FaUniversity  className={isDark==="false"?'text-black':"text-white"} />
        <h4 className={isDark==="false"?'text-black':"text-white"} >{user?.college.name}</h4>
      </div>
      {(user?._id == authUser._id) && <div className="updateProfile"><form onSubmit={updateProfile} className='updateForm'   > <input type="text" placeholder='Update Username'  className={isDark==="false"?'text-black':'text-white bg-transparent'}  /> <input type="text"  placeholder='Add Instagram (optional)' className={isDark==="false"?'text-black':'text-white bg-transparent'} /> <button type='submit'  className={isDark==="false"?'updateButton text-black bg-blue-300':' bg-blue-800 text-black' }   id='updateButton'   >Update</button>  </form></div>   }
          {user?.contributions   && <h3 className={isDark==="false"?'contributions text-black':"text-white"}  >Contributions: {user?.contributions}</h3>}
      <button className='logoutButton2'><IoIosLogOut onClick={logout} className={isDark==="false"?'text-black':"text-white"} /> <h4 className={isDark==="false"?'text-black':"text-white"}  > Logout</h4> </button>


    </div>
  )
}

export default ProfilePage
