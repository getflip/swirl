import Grid from "src/components/Grid";

const ApiGrid = ({ children }: { children: JSX.Element }) => {
  return (
    <Grid className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[1fr]">
      {children}
    </Grid>
  );
};

export default ApiGrid;
