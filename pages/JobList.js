import { PrismaClient } from "@prisma/client";
import { getSession, useSession } from "next-auth/react";
import { Card, Text, Badge, Button, Group } from "@mantine/core";
import Loading from "../components/Loading";
import TheModal from "../components/TheModal";
import AccessDenied from "../components/AccessDenied";
import DeleteModal from "../components/DeleteModal";
import StatusModal from "../components/StatusModal";
import Link from "next/link";

export async function getServerSideProps(context) {
  const prisma = new PrismaClient();
  const session = await getSession(context);

  if (!session) {
    return {
      props: {
        session: null,
      },
    };
  }

  const jobs = await prisma.job.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
  });

  return {
    props: {
      jobs,
      session,
    },
  };
}

export default function JobList({ jobs }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return <AccessDenied />;
  }

  return (
    <>
      <h1 className="text-center text-indigo-700 text-3xl font-bold mb-5">
        Hi{" "}
        <span className="text-green-600">
          {session ? session.user.name.split(" ")[0] : "Guest"}
        </span>
        , Welcome to your Job Listing!
      </h1>
      <div className="text-center">
        <TheModal />
      </div>
      {jobs.length === 0 ? (
        <>
          <h1 className="text-center text-indigo-700 text-2xl my-5">
            You have no jobs yet, please create a new one!
          </h1>
        </>
      ) : (
        <div style={{ margin: "3rem", display: "flex" }}>
          {jobs.map((job) => (
            <Card key={job.id} className="mx-5 my-4" shadow="sm" p="lg">
              <Card.Section>
                <h1 className="text-xl text-center">{job.company}</h1>
              </Card.Section>

              <Group position="apart" style={{ marginBottom: 5 }}>
                <Text weight={500}>Position: {job.position}</Text>
                <Badge color="pink" variant="light">
                  Date: {job.date}
                </Badge>
              </Group>

              <Text size="sm" style={{ lineHeight: 1.5 }}>
                <a href={job.url} rel="noopener" target="_blank">Link to Job Post</a>
              </Text>

              <Button
                variant="light"
                color="blue"
                fullWidth
                style={{ marginTop: 14 }}
              >
                Job Status: {job.status}
              </Button>
              {job.status === "Interviewing" ? (
                <h1 className="text-red-600 mb-2">Can't Delete a Job while Interviewing!</h1>
              ) : (
                <DeleteModal job={job} disabled={false} />
              )}
              <StatusModal job={job} />
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
