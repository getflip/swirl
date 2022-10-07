import { createDocCategory } from "@swirl/lib/docs";
import {
  BASE_PATHS,
  DocCategory,
  DOCUMENTATION_SRC,
} from "@swirl/lib/docs/src/docs.model";
import { Link, NavItem, navItems } from "@swirl/lib/navigation";
import Head from "next/head";
import { GetStaticProps } from "next/types";
import React, { useEffect } from "react";
import { CategoryNav } from "src/components/Layout/CategoryNav";
import SearchBar from "../components/SearchBar";
import IconGrid from "./components/IconGrid";
import IconInfo from "./components/IconInfo";

type Usage = "app" | "admin";

export type IconData = {
  id: string;
  name: string;
  description: string;
  usage: Usage[];
  keywords: string[];
};

export type IconsMetaData = {
  [key: string]: IconData;
};

const RecursiveNavigation = (link: Link) => {
  const hasSubpages = link.subpages && link.subpages.length;
  return (
    <li className="list-disc">
      <a href={link.path}>{link.name}</a>
      {hasSubpages &&
        link.subpages?.map((item) => (
          <ul key={item.path}>
            <RecursiveNavigation key={item.name} {...item} />
          </ul>
        ))}
    </li>
  );
};

const Components = ({ links }: any) => {
  const icons: IconsMetaData = require("@getflip/swirl-icons/dist/metadata.js");
  const iconsArray = Object.keys(icons);
  const [searchWord, setSearchWord] = React.useState("");
  const [selectedIcon, setSelectedIcon] = React.useState<IconData>(
    icons["Add"]
  );

  const filteredIcons = iconsArray.filter((icon) => {
    return icon.toLowerCase().includes(searchWord.toLowerCase());
  });

  return (
    <>
      <Head>
        <title>Swirl Components</title>
      </Head>
      <div className="flex min-h-[calc(100vh_-_72px)]">
        <CategoryNav categoryLinkList={navItems[2].children} />
        <main className="w-full h-full">
          <section className="flex flex-col px-4 md:py-14 md:px-24">
            <div className="mb-16">
              <h1 className="mb-4">Icons</h1>
              <SearchBar
                handleChange={(e) => setSearchWord(e.target.value)}
                searchQuery={searchWord}
              />
            </div>
            <div className="flex w-full">
              <div className="w-full md:mr-8">
                <h2 className="mb-4">Icon List</h2>
                <IconGrid
                  iconList={filteredIcons}
                  icons={icons}
                  handleTileClick={(iconname) =>
                    setSelectedIcon(icons[iconname])
                  }
                />
              </div>
              <IconInfo icon={selectedIcon} />
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  links: DocCategory[] | undefined;
}> = async () => {
  const categoryDocs = createDocCategory(
    {
      name: BASE_PATHS.ICONS,
      basePath: BASE_PATHS.ICONS,
    },
    DOCUMENTATION_SRC.DOCUMENTATION
  );

  const links: DocCategory[] | undefined = categoryDocs.subpages;

  return {
    props: {
      links,
    },
  };
};

export default Components;
