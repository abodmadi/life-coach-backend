import prismaClient from "../utils/prismaClient.js";

export const index = async (request, response) => {
  try {
    return response.status(200).json({
      payment: await prismaClient.payment.findMany({
        include: {
          course: {
            select: {
              name: true,
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

export const userPayment = async (request, response) => {
 try {
    const userPayment = await prismaClient.payment.findMany({
      where: {
        studentId: request.params.uuid,
      },
      select: {
        paymentReceipt:true,
        paymentMethod:true,
        paymentDate:true,
        status:true,
        course: {
          select: {
            name: true,
          },
        },
        createdAt:true,
        updatedAt:true,
      }
    });
    return response.status(200).json({
      userPayment: userPayment,
    }); 
  } catch (error) {
    return response.status(406).json({
      error: error,
    });
  }
}

export const show = async (request, response) => {
  try {
    const payment = await prismaClient.payment.findUnique({
      where: {
        id: request.params.uuid,
      },
      include: {
        course: {
          select: {
            name: true,
          },
        },
      },
    });
    return response.status(200).json({
      payment: payment,
    });
  } catch (error) {
    return response.status(406).json({
      error: error,
    });
  }
}

export const store = async (request, response) => {
  try {
    return response.status(200).json({
      payment: await prismaClient.payment.create({
        data: request.body,
      }),
    });
  } catch (error) {
    return response.status(406).json({
      error: error,
    });
  }
};
