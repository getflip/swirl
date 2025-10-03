import { AlgoliaRecord } from "@swirl/lib/search";
import { Command } from "cmdk";
import router from "next/router";
import { IconsMetaData } from "src/pages/icons";
import { AlgoliaRecordHits, HitComponentGenerator } from ".";
import { Hit } from "./Hit";

type IconHit = AlgoliaRecord & {
  iconName?: string;
};

export class IconHitsGenerator implements HitComponentGenerator {
  icons: IconsMetaData = require("@getflip/swirl-icons/dist/metadata.js");

  type: AlgoliaRecord["type"] = "icon";
  generateHits(hits: AlgoliaRecordHits, onSelected?: () => void): JSX.Element {
    const iconHits = this.getIconHits(hits).filter(
      ({ iconName }) => iconName !== undefined
    );

    if (iconHits.length === 0) {
      return <></>;
    }

    return (
      <Command.Group
        heading={
          <h3 className="text-font-size-sm font-font-weight-medium text-text-subdued pt-4 px-4 pb-1">
            Icons
          </h3>
        }
      >
        {iconHits.map((hit) => {
          return (
            <Hit
              key={hit.objectID}
              title={hit.title}
              icon={
                <i
                  className={`swirl-icons-${hit.iconName}16 text-icon-default w-5 h-5`}
                ></i>
              }
              handleOnSelect={() => {
                if (!hit.path) {
                  return;
                }

                router.push(hit.path.replace("-tokens", ""));
                onSelected?.();
              }}
            />
          );
        })}
      </Command.Group>
    );
  }

  private getIconName(title: string): string | undefined {
    return this.icons[title]?.name;
  }

  private getIconHits(hits: AlgoliaRecordHits): IconHit[] {
    return hits.map((hit) => ({
      ...hit,
      iconName: this.getIconName(hit.title),
    }));
  }
}
