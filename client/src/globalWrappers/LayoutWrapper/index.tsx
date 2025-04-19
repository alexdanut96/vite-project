import { OutletWrapper } from "@globalWrappers/OutletWrapper";

const LayoutWrapper = () => {
  return (
    <>
      <div
        style={{ width: "100%", height: "70px", background: "red" }}
        className="header"
      >
        Print
      </div>

      <OutletWrapper />
    </>
  );
};

export { LayoutWrapper };
