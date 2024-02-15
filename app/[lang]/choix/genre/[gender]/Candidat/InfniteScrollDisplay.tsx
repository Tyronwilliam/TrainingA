import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { capitalizeFirstLetter } from "../function";
import CardCandidat from "./CardCandidat";
import Link from "next/link";
import ImageCandidat from "./ImageCandidat";

const InfniteScrollDisplay = ({
  candidat,
  loadMoreUsers,
  meta,
}: {
  candidat: any;
  loadMoreUsers: () => void;
  meta: number;
}) => {
  return (
    <section className="flex flex-col">
      {/* <section className="flex flex-wrap"> */}
      <InfiniteScroll
        dataLength={candidat?.length ? candidat?.length : 0}
        next={loadMoreUsers}
        hasMore={meta > candidat?.length}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <section className="flex flex-wrap justify-center items-center flex-col md:flex-row w-full h-fit gap-10 md:gap-5 p-5 md:gap-y-[50px]">
          {candidat?.map((talent: any) => {
            const image =
              talent?.attributes?.Photo_de_presentation?.data?.attributes?.url;
            const letterLastName = capitalizeFirstLetter(
              talent?.attributes?.Nom
            );
            return (
              <CardCandidat
                talent={talent}
                nom={letterLastName}
                key={talent?.id}
              >
                <Link href={"/"}>
                  <ImageCandidat image={image} />
                </Link>
              </CardCandidat>
            );
          })}{" "}
        </section>
      </InfiniteScroll>
      {/* </section> */}
    </section>
  );
};

export default InfniteScrollDisplay;
