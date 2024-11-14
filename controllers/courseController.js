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
 
    return response.status(200).json({
      courses: await prismaClient.course.create({
        data: request.body,
      }),
    }); try {
  } catch (error) {
    return response.status(406).json({
      error: error,
    });
  }
};

export const show = async (request, response) => {
  try {
    const course = await prismaClient.course.findUnique({
      where: {
        id: request.params.uuid,
      },
    });
    return response.status(200).json({
      course: course,
    });
  } catch (error) {
    return response.status(406).json({
      error: error,
    });
  }
};

export const edit = async (request, response) => {
  try {
    const { name, description, coverImage, price } = request.body;
    const editedCorse = await prismaClient.course.update({
      data: {
        name: name,
        coverImage: coverImage,
        description: description,
        price: price,
      },
      where: {
        id: request.params.uuid,
      },
    });
    return response.status(200).json({
      editedCorse: editedCorse,
    });
  } catch (error) {
    return response.status(406).json({
      error: error,
    });
  }
};

export const destroy = async (request, response) => {
  try {
    return response.status(200).json({
      delete: await prismaClient.course.delete({
        where: {
          id: request.params.uuid,
        },
      }),
    });
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
