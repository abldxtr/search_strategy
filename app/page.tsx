import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/site";

export default function Home() {
  return (
    <section className="container mx-auto grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold text-zinc-100 leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          How to create Search Experience with Next.js 14
        </h1>
        <p className="max-w-[700px] text-lg text-neutral-500 sm:text-xl">
          We will focus on 3 main approach to create search experience with
          Next.js: <span className="font-medium text-neutral-400">Local</span>,{" "}
          <span className="font-medium text-neutral-400">Client</span> and{" "}
          <span className="font-medium text-neutral-400">Server</span>.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
        {siteConfig.pages.map((page) => (
          <Link
            key={page.id}
            rel="noreferrer"
            href={page.href}
            className="w-full text-gray-300 px-8 py-6 transition-all duration-200 ease-in-out transform rounded-md bg-black/40  hover:-translate-y-1 hover:-translate-x-1 hover:scale-105 hover:shadow-sm"
          >
            <div
              className={`${getTagBackground(
                page.category,
              )} h-9 px-3 flex items-center justify-center leading-none font-medium text-sm rounded-md max-w-fit`}
            >
              {page.category}
            </div>
            <h2 className="mt-3 text-lg text-gray-300 font-semibold">
              {page.title}
            </h2>
          </Link>
        ))}
      </div>
    </section>
  );
}

const getTagBackground = (type: string) => {
  switch (type) {
    case "Local":
      return "bg-emerald-900/20  text-emerald-900";
    case "Client":
      return "bg-yellow-900/20  text-yellow-900";
    case "Server":
      return "bg-blue-900/20  text-blue-900";
  }
};
