import { PrismaClient } from "@prisma/client";
import { getSession, useSession } from "next-auth/react";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
} from "@mantine/core";
import Loading from "../components/Loading";
import TheModal from "../components/TheModal";

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

export default function Home({ jobs }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
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
      {jobs.length === 0 ? (
        <>
          <h1 className="text-center text-indigo-700 text-2xl my-5">
            You have no jobs yet!
          </h1>
          <div className="flex-shrink-0 text-center my-5">
           <TheModal />
          </div>
        </>
      ) : (
        <div style={{ margin: "5rem" , display: "flex"}}>
          {jobs.map((job) => (
            <Card key={job.id} className="mx-5 my-4" shadow="sm" p="lg">
              <Card.Section>
                <h1 className="text-xl text-center">{job.company}</h1>
              </Card.Section>

              <Group position="apart" style={{ marginBottom: 5 }}>
                <Text weight={500}>{job.position}</Text>
                <Badge color="pink" variant="light">
                  Date - {job.date}
                </Badge>
              </Group>

              <Text size="sm" style={{ lineHeight: 1.5 }}>
                {job.url}
              </Text>

              <Button
                variant="light"
                color="blue"
                fullWidth
                style={{ marginTop: 14 }}
              >
                {job.status}
              </Button>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}