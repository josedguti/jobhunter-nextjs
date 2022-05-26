import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateJob = async (req, res) => {
  if (req.method === "PUT") {
    const { status, jobId } = req.body;
    try {
      const updateToInterviewing = await prisma.job.update({
        where: {
          id: jobId,
        },
      });
      res.status(200).json({ message: "Job updated" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  }
};

export default updateJob;
