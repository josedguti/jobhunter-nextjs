import React, { useState } from "react";
import { Modal, Button, Text } from "@mantine/core";
import { Trash } from "tabler-icons-react";
import { useRouter } from "next/router";
import axios from "axios";
import Loading from "./Loading";

const DeleteModal = ({ job, disable }) => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };

  // delete job application
  const deleteJob = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/deleteJob", {
        jobId: id,
      });
      if (response.status === 200) {
        refreshData();
        setIsRefreshing(false);
        setOpened(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isRefreshing) {
    return <Loading />;
  }

  return (
    <>
      {job.status === "Interviewing" ? (
        <Button
          className="ml-0.5 mt-1"
          rightIcon={<Trash />}
          variant="outline"
          color="dark"
          onClick={() => setOpened(true)}
          disabled
          title="You cannot delete an application while it is in the Interviewing status"
        >
          Delete
        </Button>
      ) : (
        <Button
          className="ml-0.5 mt-1"
          rightIcon={<Trash />}
          variant="outline"
          color="dark"
          onClick={() => setOpened(true)}
          disabled={disable}
        >
          Delete
        </Button>
      )}
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
          onClick={(e) => deleteJob(e, job.id)}
        >
          Delete
        </Button>
      </Modal>
    </>
  );
};

export default DeleteModal;
