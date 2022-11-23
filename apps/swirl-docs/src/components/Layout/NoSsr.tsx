import dynamic from "next/dynamic";

const NoSsr = ({ children }: any) => <>{children}</>;

export default dynamic(() => Promise.resolve(NoSsr), { ssr: false });
