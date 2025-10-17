import React, { useEffect, useState } from "react";
import GridLayout, { type Layout } from "react-grid-layout";
import { Card, CardHeader, CardPreview } from "@fluentui/react-components";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./App.css";
import Dock from "../components/Dock/Dock";
import { VscEdit } from "react-icons/vsc";
import type { DisplayInfoMessage } from "../models/display";
import WeahterWidget from "../components/WeatherWidget/WeatherWidget";

// Extend global window to include your Electron API
declare global {
  interface Window {
    electronAPI: {
      onDisplayInfo: (
        callback: (event: unknown, data: DisplayInfoMessage) => void
      ) => void;
    };
  }
}

function useWindowSize() {
  const [size, set] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });

  useEffect(() => {
    const onResize = () => set({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return size;
}

export default function App() {
  const { w, h } = useWindowSize();
  const columns = 100;

  const rows = 100; // number of grid rows
  const margin: [number, number] = [10, 10];

  const gridWidth = Math.max(0, w);
  const rowHeight = Math.max(0, Math.floor(h / columns));

  const [displayInformations, setDisplayInformations] =
    useState<DisplayInfoMessage>();

  const [gridIsEditable, setGridIsEditable] = useState<boolean>(false);

  useEffect(() => {
    window.electronAPI.onDisplayInfo((_, data) => {
      console.log("📺 Display info:", data);
      setDisplayInformations(data);
    });
  }, []);
  const [layout, setLayout] = useState<Layout[]>([
    { i: "a", x: 0, y: 0, w: 1, h: 1, static: false },
    { i: "b", x: 4, y: 0, w: 4, h: 4, static: false },
    {
      i: "weatherWidget",
      x: 10,
      y: 10,
      w: 15,
      h: 13,
      static: false,
      isResizable: false,
    },
    { i: "d", x: 10, y: 10, w: 15, h: 13, static: false, isResizable: false },
  ]);

  const items = [
    {
      icon: <VscEdit size={18} />,
      label: "Home",
      onClick: () => setGridIsEditable(!gridIsEditable),
    },
  ];

  /*  const blockMeasures = { width: w / columns, heigth: h / rows }; */

  return (
    <div className="app">
      <GridLayout
        style={{ background: "transparent" }}
        layout={layout}
        onLayoutChange={setLayout}
        cols={columns}
        width={gridWidth}
        rowHeight={rowHeight}
        margin={margin}
        isResizable={gridIsEditable}
        isDraggable={gridIsEditable}
        preventCollision
        compactType={null}
        autoSize={false}
        maxRows={rows}
      >
        <Card key="a" className="card">
          <CardHeader>
            <b>Card A</b>
          </CardHeader>
          <CardPreview></CardPreview>
        </Card>

        <Card key="b" className="card">
          <CardHeader>
            <b>Card B</b>
          </CardHeader>
          <CardPreview>
            <p>Beweg mich!</p>
          </CardPreview>
        </Card>
        <Card key="d" className="card">
          <CardHeader>
            <b>Card B</b>
          </CardHeader>
          <CardPreview>
            <p>Beweg mich!</p>
          </CardPreview>
        </Card>

        <div
          key="weatherWidget"
          style={{
            background: "#91c9db",
            borderRadius: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <WeahterWidget />
        </div>
      </GridLayout>

      {displayInformations != undefined &&
        displayInformations?.currentDisplay.id ==
          displayInformations?.allDisplays[1].id && <Dock items={items} />}
    </div>
  );
}
