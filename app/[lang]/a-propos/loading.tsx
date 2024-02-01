import Skeleton from "@/app/Skeleton";

export default function LoadingApropos() {
  return (
    <main className="w-full h-fit m-auto pt-5">
      <div className={`relative w-full h-1/4 mx-auto max-w-[629px]`}>
        <Skeleton height="150px" highlightColor="#191919" baseColor="#000000" />
      </div>
      <section className="w-full flex items-center justify-center grow-1">
        <div className="w-[90%] max-w-[650px]  gap-6 p-4 ">
          <Skeleton
            height="580px"
            highlightColor="#191919"
            baseColor="#000000"
          />{" "}
        </div>
      </section>
    </main>
  );
}
