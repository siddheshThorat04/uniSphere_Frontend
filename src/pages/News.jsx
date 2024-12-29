
"use client"
import React, { useEffect, useState } from 'react'
import dp from "../assets/dp.png"
import axios from "axios"
import {GoHome} from "react-icons/go"
import { MdDelete } from "react-icons/md";
import {useAuthContext} from '../contextApi/authContext'
import { useDarkThemeContext } from '../contextApi/DarkTheme'
const News = () => {
  const {authUser}=useAuthContext()
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isForAll, setIsForAll] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [news, setnews] = useState([]);
  const {isDark, setDark}=useDarkThemeContext()
  useEffect(() => {
    const getNews = async () => {
      const res = await fetch('/api/user/getNews', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      setnews(data.news.reverse())
      console.log(news);
    }

    getNews()
  }, [])
  const deleteNews = async (id) => {
    const res = await fetch(`/api/admin/deleteNews/${id}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    window.location.reload();
  }
  const submit = async (e) => {

    e.preventDefault()
    scrollTo(0, 0)
    const formData = new FormData();
    if(file){
      formData.append('image', file);
    }
    formData.append('title', title);
    formData.append('description', description);
    formData.append('isForAll', isForAll);
    setIsAdding(false)
    await axios.post('/api/user/addNews', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      // console.log(res.data.message); // Display server success message
      window.location.reload();
    }).catch((error) => {
      console.error("Error:", error.response?.data?.message || "An error occurred");
    });
  }

  return (
    <div className='mainNewsDiv' >
      <button className= {isDark==="false"?"HomeButton HomeButtonDark":"HomeButton"}  ><GoHome onClick={() => window.location.href = "/"   } className={isDark==="false"?"HomeButton text-balck":"HomeButton text-white"}  /></button>
      <h1 className={isDark==="false"?'Post_latest_happening Post_latest_happeningDark text-3xl ':"Post_latest_happening text-3xl"} >Latest News</h1>
  
      {news.length==0 && <h1 className={isDark==="false"?'Post_latest_happening2  text-3xl text-black ':"Post_latest_happening2 text-3xl"} >Ohh, Such a Empty 😞 <span className={isDark==="false"?'post_something_na text-black ':'post_something_na text-white'}  >What's happening in Your College ? Share it.</span></h1>}
      <div className="newsDiv2">
        
      {news.map((item) => {
        return (
          <div className={isDark==="false"?'newsDiv newsDivDark w-[97vw]  ':"newsDiv w-[97vw]"}  key={item._id}      >
            <h1 className={isDark==="false"?'newsTitle newsTitleDark ':"newsTitle text-2xl text-white "}  >{item.title}<span className='clgName'  >{item.isForAll ?  "University": item.college.name}</span></h1>
            <p className={isDark==="false"?'newsDescription newsDescriptionDark ':"newsDescription"}  >{item.description}</p>
            {item.image && <div className={isDark==="false"?'newsImageDiv newsImageDivDark':"newsImageDiv"}>
              <img src={item.image} className='newsImage' alt="" />
            </div>}
            <a href={`/profile/${item.postedBy._id}`} className="newsPostedBy"  ><span className={isDark==="false"?"text-black ":"text-white text-sm text-opacity-70"} >posted by: </span> <img src={dp} alt="" className='postedByDp'   /> <h5 className={isDark==="false"?"text-black ":"text-white"}> {item.postedBy.username}</h5></a>
            {(authUser.isAdmin || authUser._id === item.postedBy._id) &&  <MdDelete onClick={() => deleteNews(item._id)} className='text-red-500'  />}
          </div>
        )
      })}
      </div>
      {isAdding && <div className="bg-black bg-opacity-70 w-screen h-screen fixed top-0 left-0"> <form onSubmit={submit} className='addPostForm w-[90vw] absolute top-[50%] left-[50%] translate-x-[-50%] max-w-[600px] translate-y-[-50%] h-[500px]  bg-white pt-10'  >
        <button className='offButton'  >x</button>
        <h1 className="Post_latest_happening2 text-3xl text-gray-600 " >Post latest happening</h1>
        <input type="text" className='Newsinputs   border-[1px] border-black' onChange={e => setTitle(e.target.value)} value={title} placeholder='Title' />
        <input type="text" className='Newsinputs   border-[1px] border-black' onChange={e => setDescription(e.target.value)} value={description} placeholder='Add Description' />
        <div className='ImageBox   border-[1px] border-black' ><input type="file"  className='w-[95px] mr-[10px]' onChange={e => setFile(e.target.files[0])} accept='image/*' /> <h4 className='text-black'>Only if Required</h4> </div>
        <div className='isForAllBox   border-[1px] border-black'  >
          <input type="checkbox" onChange={e => setIsForAll(e.target.checked)} checked={isForAll} />Only Check if you want to post for all Colleges ?
        </div>
        <button type="submit" className='submitbtn' >submit</button>
      </form></div>}
      <button onClick={() => setIsAdding(!isAdding)} className={isDark==="false"?'isAddingBtn ':"isAddingBtn isAddingBtnDark"}   >+</button>
    </div>
  )
}

export default News
