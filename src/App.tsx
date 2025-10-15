import React, { useEffect, useState } from "react";
import GridLayout, { type Layout } from "react-grid-layout";
import {
  Card,
  CardHeader,
  CardPreview,
  CardFooter,
  Button,
} from "@fluentui/react-components";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./App.css";
import Dock from "../components/Dock/Dock";
import {
  VscAccount,
  VscArchive,
  VscHome,
  VscSettingsGear,
} from "react-icons/vsc";
import type { DisplayInfoMessage } from "../models/display";

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

  const rows = 35; // number of grid rows
  const margin: [number, number] = [10, 10];

  const gridWidth = Math.max(0, w);
  const rowHeight = Math.max(10, Math.floor(h / 50));

  const [displayInformations, setDisplayInformations] =
    useState<DisplayInfoMessage>();

  useEffect(() => {
    window.electronAPI.onDisplayInfo((_, data) => {
      console.log("📺 Display info:", data);
      setDisplayInformations(data);
    });
  }, []);

  const layout: Layout[] = [
    { i: "a", x: 0, y: 0, w: 4, h: 4, static: false },
    { i: "b", x: 4, y: 0, w: 4, h: 4, static: false },
    { i: "c", x: 8, y: 0, w: 4, h: 4, static: false },
  ];

  const items = [
    {
      icon: <VscHome size={18} />,
      label: "Home",
      onClick: () => alert("Home!"),
    },
    {
      icon: <VscArchive size={18} />,
      label: "Archive",
      onClick: () => alert("Archive!"),
    },
    {
      icon: <VscAccount size={18} />,
      label: "Profile",
      onClick: () => alert("Profile!"),
    },
    {
      icon: <VscSettingsGear size={18} />,
      label: "Settings",
      onClick: () => alert("Settings!"),
    },
  ];

  return (
    <div className="app">
      <GridLayout
        style={{ background: "transparent" }}
        layout={layout}
        cols={35}
        width={gridWidth}
        rowHeight={rowHeight}
        margin={margin}
        isResizable
        isDraggable
        preventCollision
        compactType={null}
        autoSize={false}
        maxRows={rows}
      >
        <Card key="a" className="card">
          <CardHeader>
            <b>Card A</b>
          </CardHeader>
          <CardPreview>
            <p>Beispiel-Card mit fester Höhe.</p>
          </CardPreview>
          <CardFooter>
            <Button appearance="primary">Aktion</Button>
          </CardFooter>
        </Card>

        <Card key="b" className="card">
          <CardHeader>
            <b>Card B</b>
          </CardHeader>
          <CardPreview>
            <p>Beweg mich!</p>
          </CardPreview>
        </Card>

        <Card key="c" className="card">
          <CardHeader>
            <b>Card C</b>
          </CardHeader>
          <CardPreview>
            <p>Auch responsive.</p>
          </CardPreview>
        </Card>
      </GridLayout>

      {/* You’ll fix the line below yourself 😉 */}
      {displayInformations != undefined &&
        displayInformations?.currentDisplay.id ==
          displayInformations?.allDisplays[0].id && <Dock items={items} />}
    </div>
  );
}
