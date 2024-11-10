import prismaClient from "../utils/prismaClient.js";
import { validate } from "../middlewares/validationMiddleware.js";

export const index = async (request, response) => {
  try {
    const courses = await prismaClient.course.findMany({
      include: {
        _count: {
          select: {
            chapters: true,
          },
        },
        admin: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return response.status(200).json({
      courses: courses,
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
      courses: await prismaClient.course.create({
        data: {
          name: "course 55555",
          description: "description course 5555",
          coverImage:
            "https://t3.ftcdn.net/jpg/04/58/64/76/360_F_458647644_QMgurK1ooH0uxNWuyelKdvIl5kysrPbP.jpg",
          price: 1500.0,
          adminId: "2b4bf124-592b-4ba8-b2cb-06a15fe4f27e",
          chapters: {
            create: [
              {
                name: "chapter 1",
                description: "description chapter 1",
                coverImage:
                  "https://marketplace.canva.com/EAFQoTmip0k/1/0/1600w/canva-black-and-silver-star-dust-love-facebook-cover-y7AF5Z8JlWI.jpg",
                videoUrl: "https://youtu.be/YyAuFiIv-V4?si=Y9c97uUkg7MTcixk",
              },
              {
                name: "chapter 2",
                description: "description chapter 2",
                coverImage:
                  "https://marketplace.canva.com/EAFMUqABEj8/1/0/1600w/canva-pink-minimalist-motivational-quote-facebook-cover-4i1_4CirhhQ.jpg",
                videoUrl: "https://youtu.be/r11Lr4FILX8?si=maQOJM_FzSaxV7ol",
              },
              {
                name: "chapter 3",
                description: "description chapter 3",
                coverImage:
                  "https://marketplace.canva.com/EAFMUqABEj8/1/0/1600w/canva-pink-minimalist-motivational-quote-facebook-cover-4i1_4CirhhQ.jpg",
                videoUrl: "https://youtu.be/r11Lr4FILX8?si=maQOJM_FzSaxV7ol",
              },
            ],
          },
        },
      }),
    });
  } catch (error) {
    return response.status(406).json({
      error: error,
    });
  }
};

export const destroy = async (request, response) => {
  
    console.log(request.params.uuid)
    return response.status(200).json({
      delete: await prismaClient.course.delete({
        where: {
          id: request.params.uuid,
        },
      }),
    });try {
  } catch (error) {
    return response.status(406).json({
      error: error,
    });
  }
};

// Old Functions:
/* import { body } from "express-validator"
import prisma from "../../utils/prisma.js"

export const index = async (request, response) => {
    try {
        const courses = await prisma.courses.findMany({
            include:{
                type:true,
                chapters:true,
            },
        })
        return response.status(200).json({
            courses:courses,
        })
    } catch (error) {
        return response.status(500).json({
            message:`Internal server error: ${error}`,
        })
        
    }
}

export const show = async (request,response) => {
    const {id} = request.params
    try {
        const course = await prisma.courses.findUnique({
            where:{
                id:parseInt(id),
            }
        })
        if (!course) {
            return response.status(401).json({
                message:"Course not Found!",
            })
        }
        return response.status(200).json({
            course:course,
        })
    } catch (error) {
        return response.status(500).json({
            message:`Internal server error: ${error}`,
        })
    }
} */
