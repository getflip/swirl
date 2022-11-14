import { createDocCategory } from "@swirl/lib/docs";
import {
  BASE_PATHS,
  DocCategory,
  DOCUMENTATION_SRC,
} from "@swirl/lib/docs/src/docs.model";
import { NavLink, navItems } from "@swirl/lib/navigation";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetStaticProps } from "next/types";
import React, { useEffect } from "react";
import { CategoryNav } from "src/components/Layout/CategoryNav";
import SearchBar from "../components/SearchBar";
import IconGrid from "../../components/IconGrid/IconGrid";
import IconInfo from "src/components/IconGrid/IconInfo";

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

const RecursiveNavigation = (link: NavLink) => {
  const hasSubpages = link.subpages && link.subpages.length;
  return (
    <li className="list-disc">
      <Link href={link.path}>
        <a>{link.name}</a>
      </Link>
      {hasSubpages &&
        link.subpages?.map((item) => (
          <ul key={item.path}>
            <RecursiveNavigation key={item.name} {...item} />
          </ul>
        ))}
    </li>
  );
};

const IconsIndex = ({ links }: any) => {
  const icons: IconsMetaData = require("@getflip/swirl-icons/dist/metadata.js");
  const iconsArray = Object.keys(icons);

  const { asPath } = useRouter();
  const [searchWord, setSearchWord] = React.useState("");
  const [selectedIcon, setSelectedIcon] = React.useState<IconData>(
    icons["Add"]
  );

  const filteredIcons = iconsArray.filter((icon) => {
    return icon.toLowerCase().includes(searchWord.toLowerCase());
  });

  useEffect(() => {
    const iconName = asPath.split("#")[1];
    console.log("set selected icon changed");
    setSelectedIcon(icons[iconName]);
  }, [asPath, icons]);

  // useEffect(() => {
  //   document.body.addEventListener("focusin", (event) => {
  //     console.log("focusin", event);
  //   });
  // }, []);

  return (
    <>
      <Head>
        <title>Swirl | Icons</title>
      </Head>
      <div className="flex min-h-[calc(100vh_-_72px)]">
        <CategoryNav categoryLinkList={navItems[2].children} />
        <main id="main" className="w-full h-full">
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
              {selectedIcon && (
                <div className="hidden md:block max-w-[280px]">
                  <IconInfo icon={selectedIcon} />
                </div>
              )}
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

export default IconsIndex;
