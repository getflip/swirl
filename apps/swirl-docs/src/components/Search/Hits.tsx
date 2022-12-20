import Link from "next/link";
import { connectStateResults } from "react-instantsearch-dom";

function Hits({ searchState, searchResults }: any) {
  const validQuery = searchState.query?.length >= 3; // 3 is the minimum query length

  return (
    <>
      {searchResults?.hits.length === 0 && validQuery && (
        <p>No results found!</p>
      )}

      {searchResults?.hits.length > 0 && validQuery && (
        <>
          {searchResults.hits.map((hit: any, index: any) => (
            <div tabIndex={index} key={hit.objectID}>
              <p>{hit.title}</p>
              <Link href={hit.path}>
                <a>{hit.path}</a>
              </Link>
              <pre>
                <code>{JSON.stringify(hit, null, 2)}</code>
              </pre>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default connectStateResults(Hits);
