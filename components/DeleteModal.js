import React, { useState } from "react";
import { Modal, Button, Text } from "@mantine/core";
import { Trash } from "tabler-icons-react";
import { useRouter } from "next/router";
import axios from "axios";

const DeleteModal = ({ job }) => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  const reload = () => {
    router.reload();
  };

  // delete job application
  const deleteJob = async (id) => {
    try {
      const response = await axios.post("/api/deleteJob", {
        jobId: id,
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
        rightIcon={<Trash />}
        variant="outline"
        color="dark"
        onClick={() => setOpened(true)}
      >
        Delete
      </Button>
      <Modal
        centered
        overlayOpacity={0.4}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Delete Job Application"
      >
        <Text className="mb-5">
          Are you sure you want to delete this Job Application
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
          onClick={() => deleteJob(job.id)}
        >
          Delete
        </Button>
      </Modal>
    </>
  );
};

export default DeleteModal;
