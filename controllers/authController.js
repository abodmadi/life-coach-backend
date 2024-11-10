import prisma from "../../utils/prisma.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signIn = async (request,response)=>{
    const {email,password} = request.body

    if (!email || !password) {
        return response.status(400).json({
            success:false,
            statusCode:400,
            message:'Email and password are required!'
        })
    }

    try {
        const user = await prisma.users.findUnique({
            where:{
                email:email,
            }
        })
        
        if (!user) {
            return response.status(400).json({
                success:false,
                statusCode:404,
                message:'User not found!',
            })
        }

        const passwordMatch = await bcrypt.compare(password,user.password)
        if (!passwordMatch) {
            return response.status(401).json({
                success:false,
                statusCode:401,
                message:'Invalid password!',
            })
        }

        const token = jwt.sign({id:user.id},process.env.JWT_SECRET)

        const {password:pass,...rest} = user

        return response.cookie('user_token',token,{httpOnly:true}).status(200).json({
            success:true,
            statusCode:200,
            //token:token,
            user:rest,
            message:'Sign in Successfully.',
        })
        
    } catch (error) {
        return response.status(500).json({
            success:false,
            statusCode:500,
            message:'Internal server error!',
        })
        
    }
}

export const signUp = async (request,response)=>{
    const {fullName,email,imageUrl,password} = request.body
    
    if (!fullName || !email || !password) {
        return response.status(400).json({
            success:false,
            statusCode:400,
            message:'Full name, email and password are required!'
        })
    }

    try {
        const unUniqueUser = await prisma.users.findUnique({
            where:{
                email:email,
            }
        })

        if (!unUniqueUser) {
            return response.status(400).json({
                success:false,
                statusCode:400,
                message:"The current user is already signed up!"
            })
        }

        const passwordHash = await bcrypt.hash(password,10)
        const user = await prisma.users.create({
            data:{
                fullName:fullName,
                email:email,
                imageUrl:imageUrl,
                password: passwordHash,
            }
        })

        if (!user) {
            return response.status(400).json({
                success:false,
                statusCode:400,
                message:"Error when sign up!"
            })
        }
        const {password:pass,...newUser} = user
        return response.status(200).json({
            success:true,
            statusCode:200,
            user:newUser,
            message:'Sign up successfully.'
        })

    } catch (error) {
        return response.status(500).json({
            success:false,
            statusCode:500,
            message:'Internal server error!',
        })
    }
    
}

export const google = async (request,response)=>{
    const {fullName,email,imageUrl} = request.body
    try {
        const user = await prisma.users.findUnique({
            where:{
                email:email,
            }
        })

        if (user) {
            const token = jwt.sign({id:user.id},process.env.JWT_SECRET)
            const {password:pass,...currentUser} = user
            return response.cookie('access-token',token,{httpOnly:true}).status(200).json({
                success:true,
                statusCode:200,
                user:currentUser,
                message:'Sign in with google account successfully().',
            })
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const passwordHash = bcrypt.hashSync(generatedPassword,10)

            const user = await prisma.users.create({
                data:{
                    fullName:fullName,
                    email:email,
                    password:passwordHash,
                    imageUrl:imageUrl,
                }
            })
            
            if (!user) {
                return response.status(400).json({
                    success:false,
                    statusCode:400,
                    message:"Error when continue with google account!"
                })
            }
            
            const token = jwt.sign({id:user.id},process.env.JWT_SECRET)
            const {password:pass,...newUser} = user

            return response.cookie('access-token',token,{httpOnly:true}).status(200).json({
                success:true,
                statusCode:200,
                user:newUser,
                message:'Sign in whit google account successfully.',
            })
        }
    } catch (error) {
        return response.status(500).json({
            success:false,
            statusCode:500,
            message:'Internal server error!',
        })
    }
}

export const signOut = (request,response)=>{
    return response.status(200).json({
        message:"Auth API out"
    })
}