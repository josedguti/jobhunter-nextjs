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

  // update job status to Hired
  const updateToHired = async (id) => {
    try {
      const response = await axios.put("/api/updateJob", {
        jobId: id,
        status: "Hired",
      });
      if (response.status === 200) {
        reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // update job status to Rejected
  const updateToRejected = async (id) => {
    try {
      const response = await axios.put("/api/updateJob", {
        jobId: id,
        status: "Rejected",
      });
      if (response.status === 200) {
        reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // update job status to Offer
  const updateToOffer = async (id) => {
    try {
      const response = await axios.put("/api/updateJob", {
        jobId: id,
        status: "Offer",
      });
      if (response.status === 200) {
        reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

    // update job status to Ghosted
    const updateToGhosted = async (id) => {
      try {
        const response = await axios.put("/api/updateJob", {
          jobId: id,
          status: "Ghosted",
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
          style={{ marginRight: "1rem", marginLeft: "1rem" }}
          className="hover:bg-blue-800 bg-blue-700 text-white"
          onClick={() => updateToInterviewing(job.id)}
        >
          Got an Interview?
        </Button>
        <Button
          style={{ marginRight: "1rem", marginLeft: "1rem" }}
          className="hover:bg-green-800 bg-green-700 text-white"
          onClick={() => updateToOffer(job.id)}
        >
          Got an Offer?
        </Button>
        <Button
          style={{ marginRight: "1rem", marginLeft: "1rem", marginTop: "1rem" }}
          className="hover:bg-purple-800 bg-purple-700 text-white"
          onClick={() => updateToHired(job.id)}
        >
          Got Hired?
        </Button>
        <Button
          style={{ marginRight: "3.3rem", marginLeft: "3rem", marginTop: "1rem" }}
          className="hover:bg-red-800 bg-red-700 text-white"
          onClick={() => updateToRejected(job.id)}
        >
          Got Rejected?
        </Button>
        <Button
          style={{ marginRight: "1rem", marginLeft: "2rem", marginTop: "1rem" }}
          className="hover:bg-zinc-600 bg-zinc-400 text-white"
          onClick={() => updateToGhosted(job.id)}
        >
          Got Ghosted?
        </Button>
      </Modal>
    </>
  );
};

export default StatusModal;
