import React, { useState } from "react";
import { Modal, Button, Text } from "@mantine/core";
import { Edit } from "tabler-icons-react";
import { useRouter } from "next/router";
import axios from "axios";

const StatusModal = ({ job }) => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  const reload = () => {
    router.reload();
  };

  // update job status to Interviewing
  const updateToInterviewing = async (id) => {
    try {
      const response = await axios.put("/api/updateJob", {
        jobId: id,
        status: "Interviewing",
      });
      if (response.status === 200) {
        reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        className="ml-7 mt-1"
        rightIcon={<Edit />}
        variant="outline"
        color="dark"
        onClick={() => setOpened(true)}
      >
        Update
      </Button>
      <Modal
        centered
        overlayOpacity={0.4}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Update Job Application"
      >
        <Text className="mb-5">
          Are you sure you want to update this Job Application?
        </Text>
        <Text className="mb-5">
          What status you want to update this job to?
        </Text>
        <Button
          onClick={() => setOpened(false)}
          variant="outline"
          color="dark"
          style={{ marginRight: "2rem", marginLeft: "6rem" }}
        >
          Cancel
        </Button>
        <Button
          className="hover:bg-red-800 bg-red-700 text-white"
          onClick={() => updateToInterviewing(job.id)}
        >
          Interviewing?
        </Button>
        <Button className="hover:bg-red-800 bg-red-700 text-white">
          Offer?
        </Button>
        <Button className="hover:bg-red-800 bg-red-700 text-white">
          Hired?
        </Button>
        <Button className="hover:bg-red-800 bg-red-700 text-white">
          Rejected?
        </Button>
        <Button className="hover:bg-red-800 bg-red-700 text-white">
          Ghosted?
        </Button>
      </Modal>
    </>
  );
};

export default StatusModal;
