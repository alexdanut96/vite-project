import { NavigationPaths } from "@script/utils/enums";

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
};

export { paths };
