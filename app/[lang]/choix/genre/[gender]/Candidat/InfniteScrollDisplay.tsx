import InfiniteScroll from "react-infinite-scroll-component";
import TalentsLayout from "./TalentsLayout";
import { Dictionary } from "@/types/dictionary";

const InfniteScrollDisplay = ({
  candidat,
  loadMoreUsers,
  meta,
  pathname,
  toggleModal,
  dictionary,
}: {
  candidat: any;
  loadMoreUsers: () => void;
  meta: number;
  pathname: string;
  toggleModal: () => void;
  dictionary: Dictionary;
}) => {
  return (
    <section className="flex flex-col mt-6">
      <InfiniteScroll
        dataLength={candidat?.length ? candidat?.length : 0}
        next={loadMoreUsers}
        hasMore={meta > candidat?.length}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center", marginBottom: "20px" }}>
            <b>{dictionary?.genre?.page?.infiniteScroll}</b>
          </p>
        }
      >
        <TalentsLayout
          candidat={candidat}
          pathname={pathname}
          toggle={toggleModal}
          isPackagePage={false}
        />
      </InfiniteScroll>
    </section>
  );
};

export default InfniteScrollDisplay;
