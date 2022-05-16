import React from "react";
import { DotsVertical, Trash, Edit } from "tabler-icons-react";
import { Menu, UnstyledButton, Loader } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";

const MyMenu = ({ JobId }) => {
  const router = useRouter();

  // delete job
  const handleDelete = async () => {
    const response = await axios.post("/api/deleteJob", {
      jobId: JobId,
    });

    if (response.status === 200) {
      showNotification({
        title: "Job Deleted Successfully",
        color: "green",
      });
      router.push("/");
    } else {
      showNotification({
        title: "Something went wrong",
        color: "red",
      });
    }
  };

  return (
    <>
      <Menu
        style={{ Height: "20px", Width: "20px" }}
        control={
          <UnstyledButton>
            <DotsVertical />
          </UnstyledButton>
        }
      >
        <Menu.Item
          icon={<Edit size={14} />}
          onClick={() => setUpdateModalOpen(true)}
        >
          Edit
        </Menu.Item>
        <Menu.Item onClick={handleDelete} icon={<Trash size={14} />}>
          Delete
        </Menu.Item>
      </Menu>
    </>
  );
};

export default MyMenu;
