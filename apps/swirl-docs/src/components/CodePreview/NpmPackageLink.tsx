import { SwirlIconOpenInNew } from "@getflip/swirl-components-react";
import Link from "next/link";
import { FunctionComponent } from "react";

interface NpmPackageLinkProps {}

export const NpmPackageLink: FunctionComponent<NpmPackageLinkProps> = ({}) => {
  return (
    <Link href="https://www.npmjs.com/package/@getflip/swirl-components">
      <a className="flex justify-center items-center text-[#F2F2F2] text-base font-medium mr-4">
        npm package
        <SwirlIconOpenInNew className="ml-1" size={16} />
      </a>
    </Link>
  );
};
