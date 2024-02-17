import InfiniteScroll from "react-infinite-scroll-component";
import TalentsLayout from "./TalentsLayout";

const InfniteScrollDisplay = ({
  candidat,
  loadMoreUsers,
  meta,
  pathname,
  toggle
}: {
  candidat: any;
  loadMoreUsers: () => void;
  meta: number;
  pathname: string;
  toggle: () => void;
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
        <TalentsLayout
          candidat={candidat}
          pathname={pathname}
          toggle={toggle}
        />
      </InfiniteScroll>
    </section>
  );
};

export default InfniteScrollDisplay;
