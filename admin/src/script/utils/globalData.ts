import { NavigationPaths } from "@script/utils/enums";

const paths = {
  home: {
    id: 1,
    href: NavigationPaths.home,
    name: NavigationPaths.home.replace("/", ""),
  },
  test: {
    id: 1,
    href: NavigationPaths.test,
    name: NavigationPaths.test.replace("/", ""),
  },
};

export { paths };
