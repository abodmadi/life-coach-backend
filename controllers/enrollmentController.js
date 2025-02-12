import prismaClient from "../utils/prismaClient.js";
export const userEnrollment = async (request, response) => {
  try {
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
      newEnrollment: await prismaClient.enrollment.create({
        data: {
          enrollmentDate: new Date(),
          studentId: "00c8d7a8-6e6f-4141-bdc8-a0c1c443bd6c",
          courseId: "23f81dec-9607-44cc-bda6-15334723ebc1",
        },
      }),
    });
  } catch (error) {
    return response.status(406).json({
      error: error,
    });
  }
};
