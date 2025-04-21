import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage, Analytics, Sales, Users, Login, Admin } from "@routes";
import { paths } from "@script/utils/globalData";
import { LayoutWrapper } from "@globalWrappers/LayoutWrapper";
import { CustomThemeProvider } from "@lib/CustomMuiTheme";
import { Products } from "@routes/Products";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "@lib/Redux/store";

function App() {
  const router = createBrowserRouter([
    {
      path: paths.home.href,
      element: (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <LayoutWrapper />
          </PersistGate>
        </Provider>
      ),
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
        {
          element: <Login />,
          path: paths.login.href,
        },
        {
          element: <Admin />,
          path: paths.admin.href,
        },
      ],
    },
  ]);
  const client_id = import.meta.env.VITE_CLIENT_ID;
  return (
    <CustomThemeProvider>
      <GoogleOAuthProvider clientId={client_id}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </CustomThemeProvider>
  );
}

export default App;
