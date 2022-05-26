import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import Loading from "../components/Loading";
import jobhunterlogo from "../public/jobhunter.png";
import Link from "next/link";

export default function Home() {
  const { status } = useSession();

  if (status === "loading") {
    <Loading />;
  }

  return (
    <main className="lg:relative">
      <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-32 lg:text-left">
        <div className="lg:w-1/2 sm:px-8 xl:pr-16">
          <Image
            src={jobhunterlogo}
            height={100}
            width={100}
            alt="job hunter logo"
          />
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <span className="block xl:inline">Welcome to</span>{" "}
            <span className="block text-indigo-600 xl:inline">Job Hunter</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
            The best job tracking site. You can view, create, update and delete
            jobs applications, so you get a more organized job search and land
            your dream job.
          </p>
          <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
            <div className="shadow w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
              <Link href="/JobList">Get started</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
        <Image
          layout="fill"
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
          alt="guy with suit"
        />
      </div>
    </main>
  );
}
