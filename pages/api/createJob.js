import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

const createJob = async (req, res) => {
  const { company, position, url, date } = req.body;

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const newJob = await prisma.job.create({
      data: {
        company,
        position,
        url,
        date,
        user: {
          connect: {
            email: session.user.email,
          },
        },
      },
    });
    res.status(200).json(newJob);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default createJob;