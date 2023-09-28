import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";

export default createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      //   loader: rootLoader,
      children: [
        // {
        //   path: "team",
        //   element: <Team />,
        //   loader: teamLoader,
        // },
      ],
    },
  ],
  {
    basename: "/app/",
    future: {
      // https://reactrouter.com/en/main/routers/create-browser-router#window:~:text=An%20optional%20set%20of%20Future%20Flags%20to%20enable%20for%20this%20Router.%20We%20recommend%20opting%20into%20newly%20released%20future%20flags%20sooner%20rather%20than%20later%20to%20ease%20your%20eventual%20migration%20to%20v7.
      // Normalize `useNavigation()`/`useFetcher()` `formMethod` to uppercase
      v7_normalizeFormMethod: true,
    },
  }
);

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
