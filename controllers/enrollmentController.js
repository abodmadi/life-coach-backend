import prismaClient from "../utils/prismaClient.js";

export const store = async (request, response) => {
    try {
      return response.status(200).json({
        payment: await prismaClient.enrollment.create({
          data: {
            enrollmentDate: new Date(),
            studentId: "d8943f07-e91a-4f68-9131-507cfe327457",
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
  