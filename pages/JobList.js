import { PrismaClient } from "@prisma/client";
import { getSession, useSession } from "next-auth/react";
import { Card, Text, Badge, Button, Group } from "@mantine/core";
import Loading from "../components/Loading";
import TheModal from "../components/TheModal";
import AccessDenied from "../components/AccessDenied";
import DeleteModal from "../components/DeleteModal";
import StatusModal from "../components/StatusModal";

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
        <div
          style={{
            margin: "3rem",
            display: "flex",
            flexWrap: "wrap",
            paddingBottom: "5rem",
          }}
        >
          {jobs.map((job) => (
            <Card key={job.id} className="mx-5 my-4 hover:bg-slate-100" shadow="md" p="lg">
              <Card.Section>
                <h1 className="text-2xl text-center my-4">{job.company}</h1>
              </Card.Section>

              <Card.Section className="text-center">
                <h1 className="text-lg my-2">{job.position}</h1>
                <Badge
                variant="outline"
                  color="indigo"
                  size="lg"
                  style={{ marginBottom: "1rem", marginTop: "0.5rem" }}
                >
                  Applied: {job.date}
                </Badge>
              </Card.Section>

              <Card.Section className="text-center mt-2">
                <Text size="sm">
                  <Badge color="lime" size="lg">
                    <a href={job.url} rel="noreferrer" target="_blank">
                      Job Post Link
                    </a>
                  </Badge>
                </Text>
              </Card.Section>

              <Text size="md">
                Job Status:{" "}
                <Badge
                  variant="outline"
                  color="dark"
                  size="lg"
                  style={{
                    color:
                      job.status === "Offer"
                        ? "#90EE90"
                        : job.status === "Interviewing"
                        ? "blue"
                        : job.status === "Hired"
                        ? "#8A2BE2"
                        : job.status === "Rejected"
                        ? "red"
                        : job.status === "Ghosted"
                        ? "#778899"
                        : "black",
                    margin: "1.5rem",
                  }}
                >
                  {job.status}
                </Badge>
              </Text>

              <DeleteModal job={job} disable={false} />

              <StatusModal job={job} />
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
