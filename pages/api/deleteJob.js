import { db } from "../../lib/prisma";


const deleteJob = async (req, res) => {
    const { jobId } = req.body;

    try {
        await db.job.delete({
            where: {
                id: jobId,
            },
        });
        res.status(200).json(deleteJob);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
}

export default deleteJob;