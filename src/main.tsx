import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import App from "./App.tsx";
import ESPCalculatorPage from "./components/esp32/ESPCalculatorPage.tsx";
import ESPDevicePage from "./components/esp32/ESPDevicePage.tsx";
import ESPMeterPage from "./components/esp32/ESPMeterPage.tsx";
import CalculatorPage from "./components/tuya/Calculator.tsx";
import DevicePage from "./components/tuya/Device.tsx";
import MeterPage from "./components/tuya/Meter.tsx";
import "./index.css";
import EspLayout from "./layouts/ESPLayout.tsx";
import TuyaLayout from "./layouts/TuyaLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/esp32",
    element: <EspLayout />,
    children: [
      {
        path: "/esp32/",
        element: <Navigate replace to="/esp32/device" />,
      },
      {
        path: "/esp32/device",
        element: <ESPDevicePage />,
      },
      {
        path: "/esp32/meter",
        element: <ESPMeterPage />,
      },
      {
        path: "/esp32/calc",
        element: <ESPCalculatorPage />,
      },
    ],
  },
  {
    path: "/tuya",
    element: <TuyaLayout />,
    children: [
      {
        path: "/tuya/",
        element: <Navigate replace to="/tuya/device" />,
      },
      {
        path: "/tuya/meter",
        element: <MeterPage />,
      },
      {
        path: "/tuya/calc",
        element: <CalculatorPage />,
      },
      {
        path: "/tuya/device",
        element: <DevicePage />,
      },
      {
        path: "/tuya/current",
        element: <DevicePage />,
      },
      {
        path: "/tuya/kwh",
        element: <DevicePage />,
      },
      {
        path: "/tuya/voltage",
        element: <DevicePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#00b96b",
          borderRadius: 2,

          // Alias Token
          colorBgContainer: "#f6ffed",
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);
