import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { BounceLoader } from "react-spinners";

import { StyleProvider } from "../../context/styleContext.jsx";
import Error404 from "../../pages/error404.jsx";
// import App from "../../App.jsx";
import Home from "../../pages/home.jsx";
import ProfilePage from "../../pages/Security/profile.jsx";
import TestDropdown from "../../pages/test_page/components.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <Suspense
          fallback={
            <BounceLoader
              color="#D3D3D3"
              loading
              size={60}
              speedMultiplier={0.8}
            />
          }
        >
          <StyleProvider>
            <Home />
          </StyleProvider>
        </Suspense>
      ),
      errorElement: (
        <StyleProvider>
          <Error404 />
        </StyleProvider>
      ),
    },
    {
      path: "/test/dropdown",
      element: (
        <StyleProvider>
          <TestDropdown />
        </StyleProvider>
      ),
      errorElement: (
        <StyleProvider>
          <Error404 />
        </StyleProvider>
      ),
    },
    {
      path: "/security/profile",
      element: <ProfilePage />,
      errorElement: <Error404 />,
    },
  ],
  {
    basename: "/",
    future: {
      // https://reactrouter.com/en/main/routers/create-browser-router#window:~:text=An%20optional%20set%20of%20Future%20Flags%20to%20enable%20for%20this%20Router.%20We%20recommend%20opting%20into%20newly%20released%20future%20flags%20sooner%20rather%20than%20later%20to%20ease%20your%20eventual%20migration%20to%20v7.
      // Normalize `useNavigation()`/`useFetcher()` `formMethod` to uppercase
      v7_normalizeFormMethod: true,
    },
  }
);

export default router;

/* type declaration for createBrowserRouter
function createBrowserRouter(
  routes: RouteObject[],
  opts?: {
    basename?: string;
    future?: FutureConfig;
    hydrationData?: HydrationState;
    window?: Window;
  }
): RemixRouter;
*/

/* type declaration for route object
interface RouteObject {
  path?: string;
  index?: boolean;
  children?: React.ReactNode;
  caseSensitive?: boolean;
  id?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  element?: React.ReactNode | null;
  Component?: React.ComponentType | null;
  errorElement?: React.ReactNode | null;
  ErrorBoundary?: React.ComponentType | null;
  handle?: RouteObject["handle"];
  shouldRevalidate?: ShouldRevalidateFunction;
  lazy?: LazyRouteFunction<RouteObject>;
}
*/
