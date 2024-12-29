import React,{useEffect, useState} from 'react'
import dp from "../assets/dp.png"
import { FaUniversity } from 'react-icons/fa';
import { FaInstagram } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { useDarkThemeContext } from '../contextApi/DarkTheme';
const Leadboard = () => {
    const [Leadboard, setLeadboard] = useState([]);
    const {isDark}=useDarkThemeContext()
    useEffect(() => {
        const getLeadboard = async () => {
            try {
                const res = await fetch('/api/admin/getLeadboard', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await res.json()
                setLeadboard(data)
                console.log(Leadboard);
            } catch (error) {
                console.log(error)
            }
        }
        getLeadboard()
    }, [])
    return (
        <div  className='BoardOfAppreciation'>
            <button className="HomeButton"   ><GoHome onClick={() => window.location.href = "/" } className={isDark==="false"?'text-black':'text-white'}  /></button>
      
            <h4 className={isDark==="false"?'BoardOfAppreciationHeading text-black ':'BoardOfAppreciationHeading'}  >Board of Appreciation</h4>
            <div className="board">
            {Leadboard.map((item) => {
                return (
                    <div  className={isDark==="false"?'profileCard  border border-black '  :'profileCard border border-white'} >
                        <h1  className={isDark==="false"?'text-black':'text-white'} > <img src={dp} alt=""    /> {item.username} {item.instagramLink &&<a href={item.instagramLink} className={isDark==="false"?'text-black instagram2 ':'text-white instagram2'}  ><FaInstagram className='instaIcon2'  /> <span>instagram</span> </a> }   </h1>
                        <h4 className={isDark==="false"?'text-black':'text-white'} >Contributions: {item.contributions}</h4>
                        <h4  className={isDark==="false"?'text-black opacity-50 ':'text-white opacity-50'}  ><FaUniversity/> {item.college.name} </h4>
                    </div>
                )
            })}
            <p  className={isDark==="false"?'text-black ':'text-white '} >To see YourSelf on this board share news and gain contribution points. 1 point for each news. </p>
            </div>
        </div>
    )
}

export default Leadboard
