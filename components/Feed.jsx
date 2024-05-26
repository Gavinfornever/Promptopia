'use client'
import { useState, useEffect } from "react"
import PromptCard from './PromptCard'

const PromptCardList = ({data, handleTagClick, handleEdit, handleDelete})=>{
  return(
    <div className="mt-16 prompt_layout">
      {data?.map((post)=>(
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [allPosts, setAllPosts] = useState(null)
  const handleSearchChange=(e)=>{
    setSearchText(e.target.value)
  }
  useEffect(()=>{
    const fetchPosts=async()=>{
      const response=await fetch("/api/prompt")
      const data=await response.json()
      setAllPosts(data)
    }
    fetchPosts()
  },[])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={allPosts}
        handleTagClick={()=>{

        }}
        handleEdit={()=>{

        }}
        handleDelete={()=>{

        }}
      />
    </section>
  )
}

export default Feed