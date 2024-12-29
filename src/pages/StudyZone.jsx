import React, { useEffect, useState } from 'react'
import { BsWindowSidebar } from 'react-icons/bs';
import { MdGroups } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { redirect } from 'react-router-dom';
import {useAuthContext} from '../contextApi/authContext';
import { useDarkThemeContext } from '../contextApi/DarkTheme';

const StudyZone = () => {
    const {authUser}=useAuthContext()
    const {isDark}=useDarkThemeContext()

    const [meetZone, setMeetZone] = useState([]);
    useEffect(() => {
        const getNews = async () => {
            try {
                const res = await fetch('/api/user/getMeet')
                const data = await res.json()
                console.log(data.meet);
                setMeetZone(data.meet)
            } catch (error) {
                console.log(error);
            }
        }
        getNews()
    }, [])

    const deleteMeet =async (id) => {
        const res= await fetch(`/api/admin/deleteMeet/${id}`,
             {
                 method: "POST",
                 headers: {
                     'Content-Type': 'application/json'
                 }
            }).then((res) => {
                window.location.reload();
            })
            
            const data=await res.json()
            console.log(data);
}
        return (
            <div className='studyZoneMainDiv'  >
                {meetZone.length == 0 &&  <h1 className='studyZoneNoMeet'  >Remind Us To Add New Meetings</h1>     }  
                <h1 className={isDark==="false"?'studyZoneHeading text-black text-3xl  ':"studyZoneHeading  text-gray-200 text-3xl "}  >Study Zone</h1>
                {
                    meetZone.map((item) => {
                        return (
                            <div className={isDark==="false"?'studyZoneDiv studyZoneDivDark':"studyZoneDiv"} key={item._id}  >
                                <div className='flex items-center justify-between w-full' >
                                    <div>
                                    <h1 className={isDark==="false"?'studyZoneSubHeading text-black text-3xl ':"studyZoneSubHeading text-white text-3xl"}  >{item.name}</h1>
                                    <button className='studyZoneButton'  ><a href={item.link}>Join</a></button>
                                    </div>
                                    <MdGroups className={isDark==="false"?'text-4xl text-black':'text-4xl text-white'}   /> 
                                    {authUser.isAdmin &&  <MdDelete onClick={() => deleteMeet(item._id)}  />}
                                </div>
                                
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    export default StudyZone
