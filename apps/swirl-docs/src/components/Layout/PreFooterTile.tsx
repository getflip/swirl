interface PreFooterTileProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export const PreFooterTile = ({ title, children }: PreFooterTileProps) => {
  return (
    <div className="mb-4 md:mb-0">
      <h5 className="font-semibold">{title}</h5>
      {children}
    </div>
  );
};

export default PreFooterTile;
