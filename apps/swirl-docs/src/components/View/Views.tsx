import useWindowSize from "@swirl/lib/hooks/useWindow";
import { Fragment, FunctionComponent } from "react";

export type MobileViewProps = {
  children: JSX.Element | JSX.Element[];
};

const isMobile = (width: number) => width < 768;

export const MobileView: FunctionComponent<MobileViewProps> = ({
  children,
}) => {
  const { width } = useWindowSize();

  return isMobile(width) ? <Fragment>{children}</Fragment> : null;
};

export const DesktopView: FunctionComponent<MobileViewProps> = ({
  children,
}) => {
  const { width } = useWindowSize();

  return !isMobile(width) ? <Fragment>{children}</Fragment> : null;
};
