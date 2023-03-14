import { iconsNavItems } from "@swirl/lib/navigation/src/data/iconsChildren.data";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetStaticProps } from "next/types";
import { useState, useEffect } from "react";
import IconGrid from "src/components/Icons/IconGrid";
import IconInfo from "src/components/Icons/IconInfo";
import SearchBar from "src/components/Icons/SearchBar";
import { CategoryNav } from "src/components/Layout/CategoryNav";
import { DesktopView } from "src/components/View/Views";

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
  const router = useRouter();
  const [searchWord, setSearchWord] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<IconData>(icons["Add"]);

  const filteredIcons = iconsArray.filter((icon) => {
    return icon.toLowerCase().includes(searchWord.toLowerCase());
  });

  useEffect(() => {
    const iconName = asPath.split("#")[1];

    if (iconName) {
      setSelectedIcon(icons[iconName]);
    }
  }, [router, asPath, icons]);

  return (
    <>
      <Head>
        <title>Swirl | Icons</title>
      </Head>
      <div className="flex">
        {/* <CategoryNav categoryLinkList={iconsNavItems} /> */}
        <main id="main" className="w-full h-full mt-14">
          <section className="flex flex-col px-4 md:px-24">
            <div className="mb-16">
              <h1 className="mb-4 font-bold text-4xl text-text-default">
                Icons
              </h1>
              <SearchBar
                handleChange={(e) => setSearchWord(e.target.value)}
                searchQuery={searchWord}
              />
            </div>
            <div className="flex md:grid md:grid-cols-icon-grid w-full">
              <div className="w-full">
                <h2 className="mb-4 font-semibold text-font-size-xl text-text-default">
                  Icon List
                </h2>
                <IconGrid
                  selectedIcon={selectedIcon}
                  iconList={filteredIcons}
                  icons={icons}
                  handleTileClick={(iconname) =>
                    setSelectedIcon(icons[iconname])
                  }
                />
              </div>
              <DesktopView>
                <IconInfo icon={selectedIcon} />
              </DesktopView>
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
