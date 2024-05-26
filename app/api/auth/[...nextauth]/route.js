import NextAuth from 'next-auth'
import {NextAuthOptions} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from '@/utils/database'
import User from '@/models/user'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            httpOptions:{
                timeout:10000
            }
        })
    ],
    callbacks:{
        async session({session}){
            const sessionUser = await User.findOne({
                email: session.user.email
            })
            session.user.id = sessionUser._id.toString()
            return session
        },
        async signIn({profile}){
            try{
                await connectToDB()
                console.log(profile);
                //check user exits?
                const userExists = await User.findOne({
                    email: profile.email
                })
                //if not, create user
                if(!userExists){
                    await User.create({
                        email:profile.email,
                        username:profile.name.replace(" ","").toLowerCase(),
                        image:profile.picture
                    })
                }
                return true
            }catch(e){
                console.log(`SignIn fail! ${e}`)
            }
            console.log(`SignIn fail! ${e}`)
            return true
        }
    }
    // what for? create new session / get 
    //
    
})

export {handler as GET, handler as POST}
