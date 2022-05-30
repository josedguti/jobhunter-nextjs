import { db } from "../../lib/prisma";

const updateJob = async (req, res) => {
  if (req.method === "PUT") {
    const { status, jobId } = req.body;
    try {
      await db.job.update({
        where: {
          id: jobId,
        },
        data: {
          status: status,
        },
      });
      res.status(200).json(updateJob);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  }
};

export default updateJob;
