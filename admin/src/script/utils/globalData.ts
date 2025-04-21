import { NavigationPaths } from "@script/utils/enums";
import { ApiEndpoint } from "@script/utils/types";

const paths = {
  home: {
    id: 1,
    href: NavigationPaths.home,
    name: NavigationPaths.home.replace("/", ""),
  },
  analytics: {
    id: 1,
    href: NavigationPaths.analytics,
    name: NavigationPaths.analytics.replace("/", ""),
  },
  sales: {
    id: 1,
    href: NavigationPaths.sales,
    name: NavigationPaths.sales.replace("/", ""),
  },
  users: {
    id: 1,
    href: NavigationPaths.users,
    name: NavigationPaths.users.replace("/", ""),
  },
  products: {
    id: 1,
    href: NavigationPaths.products,
    name: NavigationPaths.products.replace("/", ""),
  },
  login: {
    id: 1,
    href: NavigationPaths.login,
    name: NavigationPaths.login.replace("/", ""),
  },
  admin: {
    id: 1,
    href: NavigationPaths.admin,
    name: NavigationPaths.admin.replace("/", ""),
  },
};

const endpoint = import.meta.env.VITE_API_ENDPOINT;
const apiEndpoints: Record<ApiEndpoint, string> = {
  googleLogin: `${endpoint}/api/login/google`,
  register: `${endpoint}/api/register`,
};

export { paths, apiEndpoints };
