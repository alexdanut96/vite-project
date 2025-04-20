import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage, TestPage } from "@routes";
import { paths } from "@script/utils/globalData";
import { LayoutWrapper } from "@globalWrappers/LayoutWrapper";
import { CustomThemeProvider } from "@lib/CustomMuiTheme";

function App() {
  const router = createBrowserRouter([
    {
      path: paths.home.href,
      element: <LayoutWrapper />,
      children: [
        {
          element: <HomePage />,
          index: true,
        },
        {
          element: <TestPage />,
          path: paths.test.href,
        },
      ],
    },
  ]);
  return (
    <CustomThemeProvider>
      <RouterProvider router={router} />
    </CustomThemeProvider>
  );
}

export default App;
