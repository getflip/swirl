import Head from "next/head";
import { useRouter } from "next/router";
import { GetStaticProps } from "next/types";
import { useState, useEffect, useRef } from "react";
import IconGrid from "src/components/Icons/IconGrid";
import IconInfo from "src/components/Icons/IconInfo";
import SearchBar from "src/components/Icons/SearchBar";
import Footer from "src/components/Layout/Footer";
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

  function handleTileClick(iconName: string) {
    setSelectedIcon(icons[iconName]);
  }

  return (
    <>
      <Head>
        <title>Swirl | Icons</title>
      </Head>
      <div className="flex flex-col justify-between overflow-auto h-full">
        <main
          id="main"
          className="relative xl:grid xl:grid-cols-icon-grid gap-8 pt-14 max-w-[1112px] px-4 xl:px-0 xl:mx-auto"
        >
          <div>
            <div className="mb-12">
              <h1 className="mb-3 font-bold text-4xl text-text-default">
                Icons
              </h1>
              <SearchBar
                handleChange={(e) => setSearchWord(e.target.value)}
                searchQuery={searchWord}
              />
            </div>
            <h2 className="mb-4 font-semibold text-font-size-xl text-text-default">
              Icon List
            </h2>
            <IconGrid
              selectedIcon={selectedIcon}
              iconList={filteredIcons}
              icons={icons}
              handleTileClick={(iconname) => {
                handleTileClick(iconname);
              }}
            />
            {/* <NoSsr>
              <Portal>
                <SwirlPopover
                  label="Icon Info"
                  popoverId={`icon-popover`}
                  trigger={`icon-popover-trigger`}
                >
                  <div className="p-4">
                    <IconInfo icon={icons[selectedIcon.name]} />
                  </div>
                </SwirlPopover>
              </Portal>
            </NoSsr> */}
          </div>
          <DesktopView>
            <IconInfo icon={selectedIcon} />
          </DesktopView>
        </main>
        <Footer />
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
