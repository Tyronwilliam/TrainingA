import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingSingleTalent() {
  return (
    <main
      className="main__single_talent"
      style={{ width: "100%", margin: "0", minHeight: "calc(100vh - 40px)" }}
    >
      <section className="container__single_talent">
        <div className="container__image-card single_card">
          <Skeleton
            highlightColor="#191919"
            baseColor="#000000"
            height="100%"
          />
        </div>{" "}
        <div className="container__infos_candidat" style={{ height: "100%" }}>
          <Skeleton highlightColor="#191919" baseColor="#000000" height={50} />
          <div className="container__box-physionomie">
            <Skeleton
              highlightColor="#191919"
              baseColor="#000000"
              height={230}
            />
          </div>{" "}
          <div>
            <Skeleton
              highlightColor="#191919"
              baseColor="#000000"
              height={80}
            />
          </div>{" "}
        </div>
      </section>
    </main>
  );
}
