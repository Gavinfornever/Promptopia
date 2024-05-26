'use client'
import React, { useEffect } from 'react'
import {useState} from 'react'
import {useSession} from 'next-auth/react'
import {useRouter, useSearchParams} from 'next/navigation'
import Form from '@/components/Form'
import { Suspense } from 'react'

const UpdatePrompt = () => {
    const router = useRouter()
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false)
    const searchParams = useSearchParams()
    const prompt_id = searchParams.get('id')
    const [post, setPost] = useState({
        prompt:"",
        tag:""
    })

    useEffect(()=>{
        const getPromptDetails=async()=>{
            const response=await fetch(`api/prompt/${prompt_id}`)
            const data=await response.json()
            setPost({
                prompt:data.prompt,
                tag:data.tag
            })
        }
        getPromptDetails()
    }, [prompt_id])

    const updateThePrompt = async(e)=>{
        e.preventDefault()
        setSubmitting(true)
        if(!prompt_id)return alert("Prompt id not found!")
        try {
            const response = await fetch(`/api/prompt/${prompt_id}`,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })
            if(response.ok){
                console.log(response)
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        } finally{
            setSubmitting(false)
        }
    }

    return (
        <Form
            type="Update"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updateThePrompt}
        />
    )
}

export function Intermediate(){
    return(
        <Suspense>
            <UpdatePrompt />
        </Suspense> 
    )
}

export default Intermediate