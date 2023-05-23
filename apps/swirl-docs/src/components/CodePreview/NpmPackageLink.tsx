import { SwirlIconOpenInNew } from "@getflip/swirl-components-react";
import Link from "next/link";
export function NpmPackageLink() {
  return (
    <Link href="https://www.npmjs.com/package/@getflip/swirl-components">
      <a className="flex justify-center items-center text-[#F2F2F2] text-base font-medium mr-4">
        npm package
        <i className="swirl-icons-OpenInNew28 text-base ml-1"></i>
      </a>
    </Link>
  );
}
