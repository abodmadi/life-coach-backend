import prismaClient from "../utils/prismaClient.js";

export const index = async (request, response) => {
  const chapters = await prismaClient.chapter.findMany({
    include: {
      /* _count: {
          select: {
            chapters: true,
          },
        }, */
      course: {
        select: {
          id: true,
          name: true,
          admin: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return response.status(200).json({
    chapters: chapters,
  });
  try {
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
        data: request.body,
      }),
    });
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
