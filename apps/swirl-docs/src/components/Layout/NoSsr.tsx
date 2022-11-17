import dynamic from "next/dynamic";

const NoSsr = ({ children }: any) => <div>{children}</div>;

export default dynamic(() => Promise.resolve(NoSsr), { ssr: false });
