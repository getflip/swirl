const TestComponent = () => {
  return (
    <div className="flex flex-col text-3xl font-font-weight-normal">
      We test if this Component can be loaded from a MDX file
      <button
        onClick={() => console.log("button clicked")}
        className="bg-core-status-light-info-default hover:bg-core-status-light-info-subdued"
      >
        yo
      </button>
    </div>
  );
};

export default TestComponent;
