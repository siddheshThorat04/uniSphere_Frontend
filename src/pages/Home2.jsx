import React, { useState } from 'react'
import { IoIosLogOut } from 'react-icons/io'
import { CiCircleMore } from "react-icons/ci";
import randomChatLogo from "../assets/randomChatLogo.png"
import last_24_hrs from "../assets/last_24_hrs.png"
import studyTogether from "../assets/studyTogether.png"
import podium from "../assets/podium.png"
import { useAuthContext } from '../contextApi/authContext'
import eventsLogo from '../assets/events.png'
import { useDarkThemeContext } from '../contextApi/DarkTheme';
const Home2 = () => {
    const {authUser,setauthUser}=useAuthContext()
     const {isDark, setDark}=useDarkThemeContext()
    const [isSideBarOn, setIsSideBarOn] = useState(false);
     const logout =async(e)=>{
        e.preventDefault()
        const res= await fetch("/api/auth/logout",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data=await res.json()
        setauthUser(null)
        localStorage.setItem("mbAuth",null)
        console.log(data);

    }
    console.log(isDark)
    function ChangeTheme(params) {
      localStorage.setItem("mbTheme","true") 
      setDark("true")
    }
    function restoreTheme(params) {
      localStorage.setItem("mbTheme","false") 
      setDark("false")
    }

  return (
  <><div className=  {isDark==="false"?"mainHome":"mainHome darkMainHome"}> 
  <div className={isDark==="false"?'absolute top-[-19px] right-4 border-black  border-[1px]  p-[4px] rounded-[10px]'   :"text-white absolute top-[-19px] right-4 border-white  border-[1px]  p-[4px] rounded-[10px]"  }  >
      <button onClick={isDark==="false"?ChangeTheme:restoreTheme}  >{isDark==="false"?"Dark":"Light"}</button>
      </div>
  <button className='moreButton' onClick={()=>{setIsSideBarOn(!isSideBarOn)}}  ><CiCircleMore  className={isDark==="false"?'text-black ':"text-white"}     /></button> <h1 className={isDark==="false"?'HomeWelcomeText':"HomeWelcomeText darkHomeWelcomeText"} ><center>Hello <button className='usernameOnWelcome' onClick={()=>{window.location.href=`/profile/${authUser._id}`}}  >{authUser.username}</button> welcome to mateBatu.com</center></h1>
    {isSideBarOn && <div className="sideNavigation" onClick={()=>setIsSideBarOn(false)}  ><div className='sideNavigationInner'  ><div className="navElems"><button className='navLinks'  onClick={()=>{window.location.href=`/profile/${authUser._id}`}}    >profile</button> {[{value:"about us",page:"/about-us"},{ value:"contact us",page:"/contact_us"}, {value:"privacy policy",page:"/privacy_policy"} ].map((item) => {return <button className='navLinks' key={item.value}  onClick={()=>{window.location.href=item.page}}    >{item.value}</button>})} </div><div className="googleAdnav"></div><button className='sideBarButton'  onClick={()=>setIsSideBarOn(false)}  >x</button><button className='logoutButton'><IoIosLogOut onClick={logout} className='logoutIcon'  /></button>   </div></div> }
        

        <div className="navigation">
                <button className={isDark==="false"?"card darkCard":"card "} onClick={()=>{window.location.href="/chatHome"}}> <img className='homeLogos'   src={randomChatLogo} alt="" /> talkRandomly</button>
                <button className={isDark==="false"?"card darkCard":"card "} onClick={()=>{window.location.href="/news"}}   ><img  className='homeLogos' src={last_24_hrs} alt="" />last_24_hrs</button>
                <button className={isDark==="false"?"card darkCard":"card "} onClick={()=>{window.location.href="/study-zone"}}  > <img className='homeLogos'   src={studyTogether} alt="" />  studyTogether</button>
                <button className={isDark==="false"?"card darkCard":"card "} onClick={()=>{window.location.href="/events"}}  > <img className='homeLogos'   src={eventsLogo} alt="" />Events</button>
                <button className={isDark==="false"?"card darkCard":"card "}  onClick={()=>{window.location.href="/Leadboard"}} > <div  className='homeLogos' ><img  className={isDark==="false"?'homeLogos h-full   ':'homeLogos h-full'}  src={podium} alt="" /></div>Leadboard</button>
        </div>
    
    </div></>
  )
}

export default Home2
