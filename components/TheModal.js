import React, { useState } from "react";
import { Modal, Button, Text, Input } from "@mantine/core";
import { Plus, Calendar, User, Link, Home  } from "tabler-icons-react";
import { useRouter } from "next/router";
import axios from "axios";
import Loading from "./Loading";

const TheModal = () => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };

  // submit job form to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/createJob", formData);
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
        <form onSubmit={(e) => handleSubmit(e)}>
          <Text style={{ marginBottom: "1rem", marginTop: "2rem" }}>
            Company Name
          </Text>
          <Input
            style={{ marginBottom: "1rem" }}
            placeholder="Ex: Amazon, Google, Facebook"
            rightSection={<Home size={20} color="gray" />}
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
            rightSection={<User size={20} color="gray" />}
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
            rightSection={<Link size={20} color="gray" />}
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
