import About from "../../pages/general/about";
import PrivacyPolicy from "../../pages/general/privacy";
import TermsConditions from "../../pages/general/terms";

export const generalRoutes = [
  {
    path: "/about",
    Component: About
  },
  {
    path: "/terms",
    Component: TermsConditions
  },
  {
    path: "/privacy",
    Component: PrivacyPolicy
  },
];
