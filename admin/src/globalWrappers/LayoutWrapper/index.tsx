import { OutletWrapper } from "@globalWrappers/OutletWrapper";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core";
import { PageContainer } from "@toolpad/core/PageContainer";
import { paths } from "@script/utils/globalData";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { Chip } from "@mui/material";
import { useTheme } from "@mui/material";
import { HeaderSearch } from "./components";
import { useState, useMemo } from "react";
import { type Session } from "@toolpad/core/AppProvider";
import { useTokenSelector } from "@lib/Redux/token/useTokenSelector";

const LayoutWrapper = () => {
  const [session, setSession] = useState<Session | null>({
    user: {
      name: "Bharat Kashyap",
      email: "bharatkashyap@outlook.com",
      image: "https://avatars.githubusercontent.com/u/19550456",
    },
  });

  const tokenValue = useTokenSelector().value;

  const NAVIGATION: Navigation = [
    {
      kind: "header",
      title: "Main items",
    },
    {
      segment: paths.admin.name,
      title: "Admin",
      icon: <DashboardIcon />,
    },
    {
      segment: paths.home.name,
      title: "Overview",
      icon: <DashboardIcon />,
    },
    {
      segment: paths.analytics.name,
      title: "Analytics",
      icon: <ShoppingCartIcon />,
    },
    {
      segment: paths.sales.name,
      title: "Sales",
      icon: <ShoppingCartIcon />,
    },
    {
      kind: "divider",
    },
    {
      kind: "header",
      title: "Analytics",
    },
    {
      segment: paths.users.name,
      title: "Users",
      icon: <BarChartIcon />,
      action: <Chip label={89} color="primary" size="small" />,
      children: [
        {
          segment: "sales",
          title: "Sales",
          icon: <DescriptionIcon />,
        },
        {
          segment: "traffic",
          title: "Traffic",
          icon: <DescriptionIcon />,
        },
      ],
    },
    {
      segment: paths.products.name,
      title: "Products",
      icon: <LayersIcon />,
    },
    {
      segment: paths.login.name,
      title: "login",
      // icon: <LayersIcon />,
    },
  ];

  const theme = useTheme();

  const dashboardLayoutStyles = {
    "& .MuiContainer-maxWidthLg": {
      maxWidth: "100%",
      margin: 0,
      padding: theme.spacing(2),

      "& .MuiStack-root": {
        margin: 0,
      },
    },
    "& .MuiBreadcrumbs-ol": {
      fontSize: theme.spacing(1.5),
    },
    "& .MuiTypography-h4": {
      fontSize: theme.spacing(2.5),
    },
  };

  const authentication = useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: "Bharat Kashyap",
            email: "bharatkashyap@outlook.com",
            image: "https://avatars.githubusercontent.com/u/19550456",
          },
        });
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  return (
    <ReactRouterAppProvider
      navigation={NAVIGATION}
      session={session}
      authentication={authentication}
    >
      <DashboardLayout
        defaultSidebarCollapsed
        branding={{
          homeUrl: paths.home.href,
          title: "Print Admin",
          logo: false,
          // logo: <img src={whiteLogo} alt="logo" />,
        }}
        slots={{
          toolbarActions: HeaderSearch,
          sidebarFooter: ThemeSwitcher,
        }}
        // sidebarExpandedWidth={"fit-content"}
        // hideNavigation
        sx={dashboardLayoutStyles}
      >
        <PageContainer>
          <OutletWrapper />
        </PageContainer>
      </DashboardLayout>
    </ReactRouterAppProvider>
  );
};

export { LayoutWrapper };
