import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{ height: "calc(100vh - 48px)" }}
      className="flex flex-col items-center justify-center"
    >
      <div className="border-l-[1px] p-4 mb-5 text-xl">
        <div>
          <span>404</span>
        </div>
        <h2>Not Found</h2>
      </div>
      <Link href="/" className="hover:underline text-xl uppercase">
        Back Home
      </Link>
    </main>
  );
}
