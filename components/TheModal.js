import React, { useState } from "react";
import { Modal, Button, Text, Input } from "@mantine/core";
import { Plus, Calendar } from "tabler-icons-react";
import { DatePicker } from "@mantine/dates";

const TheModal = () => {
  const [opened, setOpened] = useState(false);
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
          <Text style={{ marginBottom: "1rem", marginTop: "2rem"}}>Company Name</Text>
        <Input
          style={{ marginBottom: "1rem" }}
          placeholder="Ex: Amazon, Google, Facebook"
          required
        />
        <Text style={{ marginBottom: "1rem"}}>Position</Text>
        <Input
          style={{ marginBottom: "1rem" }}
          placeholder="Ex: Software Engineer, Full Stack Developer"
          required
        />
        <Text style={{ marginBottom: "1rem"}}>Job Post URL</Text>
        <Input
          style={{ marginBottom: "1rem" }}
          placeholder="Ex: https://www.google.com/jobs/12345"
          required
        />
        <Text style={{ marginBottom: "1rem"}}>Date Applied</Text>
        <DatePicker
          style={{ marginBottom: "1rem" }}
          allowFreeInput
          placeholder="Ex: 25-03-2022"
          inputFormat="MM/DD/YYYY"
          labelFormat="MM/DD/YYYY"
          rightSection={<Calendar size={20} color="gray" />}
          required
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
          <Button className="hover:text-zinc-500 hover:bg-black bg-black text-white">Create Job</Button>
        </div>
      </Modal>
    </>
  );
};

export default TheModal;
