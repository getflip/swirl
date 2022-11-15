import PreFooterTile from "./PreFooterTile";

const PreFooter = () => {
  return (
    <article className="hidden col-start-3 col-span-10 md:grid grid-cols-1 md:grid-cols-3 bg-gray-300 rounded-lg my-4 mx-10 p-10">
      <PreFooterTile title="Platzhalter headline">
        <p>
          Imperdiet pellentesque sed massa augue elementum phasellus. Vulputate
          vel venenatis quis integer auctor ut. Tempus aliquet amet elementum
          purus augue volutpat.
        </p>
      </PreFooterTile>

      <PreFooterTile title="News and Updates">
        <nav>
          <ul>
            <li>Developer Changelog</li>
            <li>Flip Status</li>
          </ul>
        </nav>
      </PreFooterTile>

      <PreFooterTile title="Legal">
        <nav>
          <ul>
            <li>Terms of Service</li>
            <li>API Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Partner program agreement</li>
          </ul>
        </nav>
      </PreFooterTile>
    </article>
  );
};

export default PreFooter;
