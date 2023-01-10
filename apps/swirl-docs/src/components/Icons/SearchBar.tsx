import { FunctionComponent, useEffect, useState } from "react";

interface SearchBarProps {
  searchQuery: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: FunctionComponent<SearchBarProps> = ({
  handleChange,
  searchQuery,
}) => {
  return (
    <form role="search">
      <div className="relative md:grid md:grid-cols-icon-grid">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <i className="swirl-icons-Search28 text-icon-default text-2xl" />
        </div>
        <input
          type="search"
          id="default-search"
          className="block p-4 pl-10 w-full text-sm text-gray-900 rounded-lg border border-border-default"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default SearchBar;
