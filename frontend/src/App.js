import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/homePage/HomePage";
import TestAPage from "./pages/testAPage/TestAPage";

function App() {
  const routes = [
    { path: "/login", element: <h1>Login</h1> },
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "testa", element: <TestAPage /> },
        // { path: "demo", element: <DemoPage /> },
        // { path: "video-player0", element: <VideoPlayerZeroPage /> },
        // { path: "video-player1", element: <VideoPlayerOnePage /> },

        // {
        //   path: "threats",
        //   element: <ThreatsPage />,
        // },
        // { path: "threats/:id", element: <SingleDataPage /> },
        // { path: "threats/:id/:threats", element: <ModelEditPage /> }, // New edit route

        // { path: "reference-controls", element: <ReferenceControlsPage /> },
        // { path: "reference-controls/:id", element: <SingleDataPage /> },
        // {
        //   path: "reference-controls/:id/:reference-controls",
        //   element: <ModelEditPage />,
        // }, // New edit route

        // { path: "applied-controls", element: <AppliedControlsPage /> },
        // { path: "applied-controls/:id", element: <SingleDataPage /> },
        // {
        //   path: "applied-controls/:id/:applied-controls",
        //   element: <ModelEditPage />,
        // }, // New edit route

        // { path: "assets", element: <AssetsPage /> },
        // { path: "assets/:id", element: <SingleDataPage /> },
        // { path: "assets/:id/:assets", element: <ModelEditPage /> }, // New edit route

        // // { path: "/assets/?kind=HW", element: <AssetsHardwarePage /> }, // <============================

        // { path: "assets-groups", element: <AssetsGroupsPage /> },
        // { path: "assets-groups/:id", element: <SingleDataPage /> },
        // {
        //   path: "assets-groups/:id/:assets-groups",
        //   element: <ModelEditPage />,
        // },

        // { path: "asset-relations", element: <AssetsGraphPage /> },

        // { path: "assets-discovery", element: <AssetsDiscoveyPage /> },

        // { path: "assets-discovery/:id", element: <SingleDataPage /> },
        // { path: "assets-group/:id/:assets-group", element: <ModelEditPage /> }, // New edit route

        // { path: "human-resources", element: <HumanResourcesPage /> },
        // { path: "human-resources/:id", element: <SingleDataPage /> },
        // {
        //   path: "human-resources/:id/:human-resources",
        //   element: <ModelEditPage />,
        // }, // New edit route

        // { path: "folders", element: <DomainPage /> },
        // { path: "folders/:id", element: <SingleDataPage /> },
        // { path: "folders/:id/:folders", element: <ModelEditPage /> }, // New edit route

        // // { path: "policies", element: <h1>Policies</h1> },
        // // Uncomment for dynamic routing
        // // { path: ":dynamicURL", element: <ModelTablePage /> },
      ],
    },
    // Fallback route
    // { path: "*", element: <h1>NOT FAOUND</h1> },
  ];

  return (
    <>
      <button onClick={() => console.log(localStorage.getItem("access_token"))}>
        Log Store
      </button>
      {/* <button onClick={() => console.log(localStorage.clear())}>
        Log Clear
      </button> */}
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) =>
            route.children ? (
              <Route key={index} path={route.path} element={route.element}>
                {route.children.map((child, childIndex) => (
                  <Route
                    key={childIndex}
                    {...child}
                    demopropinroute={"demo prop in rout"}
                  />
                ))}
              </Route>
            ) : (
              <Route key={index} {...route} />
            )
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
