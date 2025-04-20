import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage, Analytics, Sales, Users } from "@routes";
import { paths } from "@script/utils/globalData";
import { LayoutWrapper } from "@globalWrappers/LayoutWrapper";
import { CustomThemeProvider } from "@lib/CustomMuiTheme";
import { Products } from "@routes/Products";

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
          element: <Analytics />,
          path: paths.analytics.href,
        },
        {
          element: <Sales />,
          path: paths.sales.href,
        },
        {
          element: <Users />,
          path: paths.users.href,
        },
        {
          element: <Products />,
          path: paths.products.href,
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
