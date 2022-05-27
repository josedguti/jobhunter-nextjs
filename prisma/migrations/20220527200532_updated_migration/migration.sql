-- AlterTable
ALTER TABLE `Job` MODIFY `status` ENUM('Applied', 'Interviewing', 'Rejected', 'Hired', 'Offer', 'Ghosted') NOT NULL DEFAULT 'Applied';
