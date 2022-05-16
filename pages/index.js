import { PrismaClient } from "@prisma/client";
import { getSession, useSession } from "next-auth/react";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
} from "@mantine/core";
import Loading from "../components/Loading";

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
            <button
              type="button"
              className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Link href="/CreateJob">Create a New Job</Link>
            </button>
          </div>
        </>
      ) : (
        <div style={{ margin: "5rem" , display: "flex"}}>
          {jobs.map((job) => (
            <Card shadow="sm" p="lg">
              <Card.Section>
                <h1>{job.company}</h1>
              </Card.Section>

              <Group position="apart" style={{ marginBottom: 5 }}>
                <Text weight={500}>{job.position}</Text>
                <Badge color="pink" variant="light">
                  {job.date}
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
