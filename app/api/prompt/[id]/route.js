import { connectToDB } from "@/utils/database"
import Prompt from "@/models/prompt"

//GET read a prompt by id
export const GET = async(req,{params}) =>{
    try {
        await connectToDB()
        const prompt = await Prompt.findById(params.id).populate("creator")
        if(!prompt)return Response("Prompt not found!", {status: 404})
        return new Response(JSON.stringify(prompt), {status: 200})
    } catch (error) {
        return new Response("Failed to find the prompt",{status:500})
    }
}
//PATCH modify a prompt
export const PATCH = async(req,{params}) =>{
    const {prompt, tag}=await req.json()
    try {
        await connectToDB()
        const promptObj = await Prompt.findById(params.id)
        if(!promptObj)return new Response("Prompt not found!", {status: 404})
        promptObj.prompt = prompt
        promptObj.tag = tag
        await promptObj.save()
        return new Response(JSON.stringify(prompt), {status: 200})
    } catch (error) {
        return new Response(`Failed to modify the prompt: ${error}`,{status:500})
    }
}
//DELETE delete a prompt
export const DELETE = async(req,{params}) =>{
    try {
        await connectToDB()
        const prompt = await Prompt.findOneAndDelete(params.id)
        return new Response("Delete success", {status: 200})
    } catch (error) {
        return new Response("Failed to delete the prompt",{status:500})
    }
}