import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "*",
    element: <h1>404</h1>
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router}>
        <Login />
      </RouterProvider>
    </>
  );
}

export default App;
