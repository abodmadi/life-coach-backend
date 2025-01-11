import prismaClient from "../utils/prismaClient.js";
export const userEnrollment = async (request, response) => {
  
    return response.status(200).json({
      enrollments: await prismaClient.enrollment.findMany({
        where: {
          studentId: request.params.uuid,
        },
        select: {
          id: true,
          enrollmentDate: true,
          createdAt: true,
          updatedAt: true,
          course: {
            select: {
              id: true,
              name: true,
              description: true,
              coverImage: true,
              price: true,
              _count:{
                select: {
                  chapters: true,
                },
              }
            },
          },
        },
      }),
    });try {
  } catch (error) {
    return response.status(406).json({
      error: error,
    });
  }
};
export const store = async (request, response) => {
  try {
    return response.status(200).json({
      newEnrollment: await prismaClient.enrollment.create({
        data: {
          enrollmentDate: new Date(),
          studentId: "28fc5776-89b8-40df-93b8-1689cf7baf60",
          courseId: "913645cd-88a2-433e-9fcb-73a80061e5e7",
        },
      }),
    });
  } catch (error) {
    return response.status(406).json({
      error: error,
    });
  }
};
