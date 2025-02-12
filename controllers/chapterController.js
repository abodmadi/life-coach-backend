import prismaClient from "../utils/prismaClient.js";

export const index = async (request, response) => {
  try {
    const chapters = await prismaClient.chapter.findMany({
      include: {
        _count: {
          select: {
            videos: true,
          },
        },
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
        videos: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return response.status(200).json({
      chapters: chapters,
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
      newChapter: await prismaClient.chapter.create({
        data: {
          name: request.body.name,
          description: request.body.description,
          coverImage: request.body.coverImage,
          courseId: request.body.courseId,
          videos: {
            create: request.body.videos,
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

export const courseChapters = async (request, response) => {
  try {
    const courseChapters = await prismaClient.chapter.findMany({
      where: {
        courseId: request.params.uuid,
      },
      include: {
        _count: {
          select: {
            videos: true,
          },
        },
        course: {
          select: {
            name: true,
          },
        },
        videos: true,
      },
    });
    return response.status(200).json({
      courseChapters: courseChapters,
    });
  } catch (error) {
    return response.status(406).json({
      error: error,
    });
  }
};

export const show = async (request, response) => {
  try {
    const chapter = await prismaClient.chapter.findUnique({
      where: {
        id: request.params.uuid,
      },
    });
    return response.status(200).json({
      chapter: chapter,
    });
  } catch (error) {
    return response.status(406).json({
      error: error,
    });
  }
};

export const edit = async (request, response) => {
  try {
    const { name, description, coverImage, courseId, videos } = request.body;
    const editedChapter = await prismaClient.chapter.update({
      where: {
        id: request.params.uuid,
      },
      data: {
        name: name,
        description: description,
        coverImage: coverImage,
        courseId: courseId,
        videos: {
          deleteMany: {},
          create: videos.map((video) => ({ videoUrl: video.videoUrl })),
        },
      },
      include: { videos: true },
    });
    return response.status(200).json({
      editedChapter: editedChapter,
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
      delete: await prismaClient.chapter.delete({
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
