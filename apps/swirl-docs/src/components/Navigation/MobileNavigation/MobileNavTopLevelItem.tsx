import { NavItem } from "@swirl/lib/navigation";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { Tag } from "src/components/Tags";

export const MobileNavTopLevelItem = ({
  navItem,
  onClick,
  active,
}: {
  navItem: NavItem;
  onClick: () => void;
  active: boolean;
}) => {
  const itemContent = (
    <>
      <div className="flex justify-between items-start">
        <h4 className="flex items-center justify-start gap-2 font-bold mb-1 group-hover:text-interactive-primary-default ">
          {navItem.teaserIcon && (
            <Image
              src={navItem.teaserIcon}
              alt={navItem.title}
              width={24}
              height={24}
            />
          )}
          {navItem.title}
        </h4>
        {navItem.devOnly && <Tag scheme="warning" content="dev" />}
      </div>
      <div>{navItem.description}</div>
    </>
  );

  const classes = classNames("border-1 p-4 rounded-border-radius-base group", {
    "bg-surface-raised-default": active,
  });

  if (navItem.url) {
    return (
      <Link href={navItem.url} className={classes} onClick={onClick}>
        {itemContent}
      </Link>
    );
  } else {
    return <div className={classes}>{itemContent}</div>;
  }
};
