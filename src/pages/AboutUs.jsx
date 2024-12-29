import React from 'react'
import { useDarkThemeContext } from '../contextApi/DarkTheme'
import {GoHome} from "react-icons/go"
const AboutUs = () => {
    const { isDark } = useDarkThemeContext()
    return (
        <div className='flex flex-col w-[90%] items-center justify-between h-[90%]  text-center border border-yellow-400 rounded-[30px] ' >
             <button className= {isDark==="false"?"HomeButton HomeButtonDark":"HomeButton"}  ><GoHome onClick={() => window.location.href = "/"   } className={isDark==="false"?"HomeButton text-balck":"HomeButton text-white"}  /></button>
            <h1 className={isDark === "false" ? '   text-center text-2xl font-bold p-2  font-light font-sans ' : ' text-center text-2xl font-bold p-2  font-light font-sans text-white '}>About Us</h1>

            <div className={isDark === "false" ? 'aboutUsMainDiv flex' : "aboutUsMainDiv border-white flex "}   >

                <p className={isDark === "false" ? "text-black p-[10px]  aboutUsMainParagraphs" : "text-white aboutUsMainParagraphs"} >Welcome to mateBatu.com, the ultimate platform for students of DR.Babasaheb Ambedkar Technological University (DR.BATU) connecting over 70+ colleges into one vibrant digital community!Our mission is to foster collaboration, communication, and engagement among students, creating a hub for all things student life. Whether you want to chat randomly with peers, stay updated with the latest news, or participate in exciting events, we’ve got you covered!</p>
            </div>
                <div className={isDark === "false" ? 'aboutUsFooter  ' : 'aboutUsFooter text-white'}  >"Developed by <a href='https://www.linkedin.com/in/siddhesh-thorat-379224295/' className={isDark === "false" ? 'aboutUsFooterName text-blue-700' : 'aboutUsFooterName text-blue-700 '}  >Siddhesh</a> , an IT student of DR.BATU"</div>
        </div>
    )
}

export default AboutUs
