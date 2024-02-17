import InfiniteScroll from "react-infinite-scroll-component";
import TalentsLayout from "./TalentsLayout";

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
        <TalentsLayout candidat={candidat} pathname={pathname} />
      </InfiniteScroll>
    </section>
  );
};

export default InfniteScrollDisplay;
