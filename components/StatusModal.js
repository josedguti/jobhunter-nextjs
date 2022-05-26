import React, { useState } from "react";
import { Modal, Button, Text, Input } from "@mantine/core";
import { Plus, Calendar } from "tabler-icons-react";
import { useRouter } from "next/router";
import axios from "axios";

const TheModal = () => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({});

  const reload = () => {
    router.reload();
  };

  // update job status
  const updateJob = async (id) => {
    try {
      const response = await axios.put("/api/updateJob", {
          jobId: id
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
        className="mr-2 mt-1"
        rightIcon={<Plus />}
        variant="outline"
        color="dark"
        onClick={() => setOpened(true)}
      >
        Create New Job
      </Button>
      <Modal
        centered
        overlayOpacity={0.4}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create New Job Application"
      >
        <form onSubmit={handleSubmit}>
          <Text style={{ marginBottom: "1rem", marginTop: "2rem" }}>
            Company Name
          </Text>
          <Input
            style={{ marginBottom: "1rem" }}
            placeholder="Ex: Amazon, Google, Facebook"
            required
            name="company"
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
          />
          <Text style={{ marginBottom: "1rem" }}>Position</Text>
          <Input
            style={{ marginBottom: "1rem" }}
            placeholder="Ex: Software Engineer, Full Stack Developer"
            required
            name="position"
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
          />
          <Text style={{ marginBottom: "1rem" }}>Job Post URL</Text>
          <Input
            style={{ marginBottom: "1rem" }}
            placeholder="Ex: https://www.google.com/jobs/12345"
            required
            name="url"
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          />
          <Text style={{ marginBottom: "1rem" }}>Date Applied</Text>
          <Input
            style={{ marginBottom: "1rem" }}
            placeholder="Ex: 25-03-2022"
            rightSection={<Calendar size={20} color="gray" />}
            required
            name="date"
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={() => setOpened(false)}
              variant="outline"
              color="dark"
              style={{ marginRight: "1rem", marginLeft: "5rem" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="hover:text-zinc-500 hover:bg-black bg-black text-white"
            >
              Create Job
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default TheModal;