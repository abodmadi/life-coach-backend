import prismaClient from "../utils/prismaClient.js";

export const index = async (request, response) => {
  try {
    return response.status(200).json({
      payment: await prismaClient.payment.findMany(),
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
