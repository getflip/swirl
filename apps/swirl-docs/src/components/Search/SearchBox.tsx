// import connectSearchBox
import { connectSearchBox } from "react-instantsearch-dom";

function SearchBox({ refine }: any) {
  return (
    <>
      <label className="hidden" id="algolia_label" htmlFor="algolia_search">
        Search
      </label>
      <input
        aria-labelledby="algolia_label"
        id="algolia_search"
        type="search"
        placeholder="Search for articles!"
        onChange={(e) => refine(e.currentTarget.value)}
      />
    </>
  );
}

export default connectSearchBox(SearchBox);
