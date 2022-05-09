import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const deleteJob = async (req, res) => {
    const { jobId } = req.body;

    try {
        await prisma.job.delete({
            where: {
                id: jobId,
            },
        });
        res.status(200).json({ message: 'Job deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
}

export default deleteJob;