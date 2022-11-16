import useWindowSize from "@swirl/lib/hooks/useWindow";
import { Fragment, FunctionComponent } from "react";

export type MobileViewProps = {
  children: JSX.Element | JSX.Element[];
};

export const MobileView: FunctionComponent<MobileViewProps> = ({
  children,
}) => {
  const size = useWindowSize();
  const isMobile = size.width < 768;

  return isMobile ? <Fragment>{children}</Fragment> : null;
};

export const DesktopView: FunctionComponent<MobileViewProps> = ({
  children,
}) => {
  const size = useWindowSize();
  const isMobile = size.width > 768;

  return isMobile ? <Fragment>{children}</Fragment> : null;
};
