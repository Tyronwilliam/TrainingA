import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <main className="container__talents-all">
      <div className="entete__image about__image">
        <Skeleton height="150px" highlightColor="#191919" baseColor="#000000" />
      </div>
      <>
        <section className="container__filter_layout">
          <div className="container__role-filter">
            <ul>
              <li>
                <Skeleton
                  width="70px"
                  height="30px"
                  highlightColor="#191919"
                  baseColor="#000000"
                />
              </li>
              <li>
                <Skeleton
                  width="70px"
                  height="30px"
                  highlightColor="#191919"
                  baseColor="#000000"
                />
              </li>
              <li>
                <Skeleton
                  width="70px"
                  height="30px"
                  highlightColor="#191919"
                  baseColor="#000000"
                />
              </li>
              <li>
                <Skeleton
                  width="70px"
                  height="30px"
                  highlightColor="#191919"
                  baseColor="#000000"
                />
              </li>
            </ul>
          </div>
          <div className="container__main-filter">
            <ul>
              <li>
                <Skeleton
                  width="70px"
                  height="30px"
                  highlightColor="#191919"
                  baseColor="#000000"
                />
              </li>
              <li>
                <Skeleton
                  width="70px"
                  height="30px"
                  highlightColor="#191919"
                  baseColor="#000000"
                />
              </li>
              <li>
                <Skeleton
                  width="70px"
                  height="30px"
                  highlightColor="#191919"
                  baseColor="#000000"
                />
              </li>
              <li>
                <Skeleton
                  width="70px"
                  height="30px"
                  highlightColor="#191919"
                  baseColor="#000000"
                />
              </li>
            </ul>
            <button className="button__package">
              <ul>
                <li>
                  <Skeleton
                    width="70px"
                    height="30px"
                    highlightColor="#191919"
                    baseColor="#000000"
                  />
                </li>
              </ul>
            </button>
          </div>
        </section>
        <section className="container__display-talents">
          <div className="container_cards-display" style={{ height: "100%" }}>
            <div className="container__card">
              <div className="container__image-card">
                <Skeleton
                  height="350px"
                  highlightColor="#191919"
                  baseColor="#000000"
                />
              </div>{" "}
            </div>
            <div className="container__card">
              <div className="container__image-card">
                <Skeleton
                  height="350px"
                  highlightColor="#191919"
                  baseColor="#000000"
                />
              </div>{" "}
            </div>{" "}
            <div className="container__card">
              <div className="container__image-card">
                <Skeleton
                  height="350px"
                  highlightColor="#191919"
                  baseColor="#000000"
                />
              </div>{" "}
            </div>{" "}
            <div className="container__card">
              <div className="container__image-card">
                <Skeleton
                  height="350px"
                  highlightColor="#191919"
                  baseColor="#000000"
                />
              </div>{" "}
            </div>{" "}
            <div className="container__card">
              <div className="container__image-card">
                <Skeleton
                  height="350px"
                  highlightColor="#191919"
                  baseColor="#000000"
                />
              </div>{" "}
            </div>{" "}
            <div className="container__card">
              <div className="container__image-card">
                <Skeleton
                  height="350px"
                  highlightColor="#191919"
                  baseColor="#000000"
                />
              </div>{" "}
            </div>
          </div>
        </section>
      </>
    </main>
  );
}
