import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { capitalizeFirstLetter } from "../function";
import CardCandidat from "./CardCandidat";
import Link from "next/link";
import ImageCandidat from "./ImageCandidat";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const InfniteScrollDisplay = ({
  candidat,
  loadMoreUsers,
  meta,
  pathname,
}: {
  candidat: any;
  loadMoreUsers: () => void;
  meta: number;
  pathname: string;
}) => {
  return (
    <section className="flex flex-col">
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
        <section className="flex flex-wrap justify-center items-center flex-col md:flex-row w-full h-fit gap-10 md:gap-5 p-5 md:gap-y-[50px] max-w-[1100px] mx-auto">
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
                showName={true}
              >
                <Link href={`${pathname}/${talent?.id}`}>
                  <ImageCandidat image={image} />
                </Link>
              </CardCandidat>
            );
          })}{" "}
        </section>
      </InfiniteScroll>
    </section>
  );
};

export default InfniteScrollDisplay;
