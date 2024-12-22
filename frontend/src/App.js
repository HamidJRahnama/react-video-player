import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/homePage/HomePage";
import TestAPage from "./pages/testAPage/TestAPage";
import VideoPlayer from "./components/modules/videoPlayer/VideoPlayer";
import Videos from "./components/modules/videos/Videos";
import UploadPage from "./pages/uploadPage/UploadPage";

function App() {
  const routes = [
    { path: "/login", element: <h1>Login</h1> },
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "testa", element: <TestAPage /> },
        { path: "videos", element: <Videos /> },

        // Updated route for videos with a dynamic videoId
        { path: "videos/:videoId", element: <VideoPlayer /> }, // This will render the VideoPlayer
        { path: "upload", element: <UploadPage /> },
      ],
    },
    // Fallback route
    { path: "*", element: <h1>NOT FOUND</h1> },
  ];

  return (
    <>
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
