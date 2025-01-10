import prismaClient from "../utils/prismaClient.js";
import { errorHandler } from "../utils/error.js";
import { Role } from "@prisma/client";

/* export const test = (request,response)=>{
    return response.status(200).json({
        message:'test done'
    })
}

export const index = async (request,response)=>{
    
}

export const show = async (request,response,next)=>{
    const {id:userId} = request.body
    
    if (!userId) {
        return response.status('405').json({
            message:"Please add user Id to show it"
        })
    }
    
    const user = await prisma.users.findUnique({
        where:{
            id:userId
        },
        include: {
            enrolments: {
                include: {
                    cources: true,
                },
            },
        },
    })

    if (!user) {
        //next(errorHandler(500,"User not found!"))
        
        return response.status(504).json({
            message:"User not found!"
        })
    }

    return response.status(200).json({
        message:user
    })
} */

export const userEnrollment = async (request, response) => {
  try {
    return response.status(200).json({
      enrollments: await prismaClient.user.findMany({
        where: {
          id: request.params.uuid,
        },
        include:{
            enrollments: {
              select: {
                course: true,
              },
            },
        }
      }),
    });
  } catch (error) {
    return response.status(406).json({
      error: error,
    });
  }
};

export const store = async (request, response) => {
  try {
    return response.status(200).json({
      user: await prismaClient.user.create({
        data: {
          firstName: "ahmad",
          lastName: "tareq",
          phone: "01000008889",
          email: "ahmad@gmail.com",
          password: "123456",
          image:
            "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
          role: Role.STUDENT,
        },
      }),
    });
  } catch (error) {
    return response.status(406).json({
      error: error,
    });
  }
};

export const update = async (request, response) => {};

export const destroy = async (request, response) => {};
