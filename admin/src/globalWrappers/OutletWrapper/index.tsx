import { memo } from "react";
import { Outlet } from "react-router-dom";

const OutletWrapper = memo(() => (
  <>
    <Outlet />
  </>
));

export { OutletWrapper };
