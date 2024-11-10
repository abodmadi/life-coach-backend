import prismaClient from "../utils/prismaClient.js";

export const store = async (request, response) => {
  try {
    return response.status(200).json({
      payment: await prismaClient.payment.create({
        data: {
          paymentReceipt:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsxTraFgEqSJ4d_pLcOX4_zAtk-39mQp_bWA&s",
          paymentDate: new Date(),
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
