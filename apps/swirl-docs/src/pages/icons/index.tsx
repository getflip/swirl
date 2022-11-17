import { iconsNavItems } from "@swirl/lib/navigation/src/data/iconsChildren.data";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetStaticProps } from "next/types";
import { useState, useEffect } from "react";
import IconGrid from "src/components/Icons/IconGrid";
import IconInfo from "src/components/Icons/IconInfo";
import SearchBar from "src/components/Icons/SearchBar";
import { CategoryNav } from "src/components/Layout/CategoryNav";

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

const IconsIndex = () => {
  const icons: IconsMetaData = require("@getflip/swirl-icons/dist/metadata.js");
  const iconsArray = Object.keys(icons);

  const { asPath } = useRouter();
  const [searchWord, setSearchWord] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<IconData>(icons["Add"]);

  const filteredIcons = iconsArray.filter((icon) => {
    return icon.toLowerCase().includes(searchWord.toLowerCase());
  });

  useEffect(() => {
    const iconName = asPath.split("#")[1];
    setSelectedIcon(icons[iconName]);
  }, [asPath, icons]);

  return (
    <>
      <Head>
        <title>Swirl | Icons</title>
      </Head>
      <div className="flex min-h-[calc(100vh_-_72px)]">
        <CategoryNav categoryLinkList={iconsNavItems} />
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
              <IconInfo icon={selectedIcon} />
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<{}> = async () => {
  return {
    props: {},
  };
};

export default IconsIndex;
