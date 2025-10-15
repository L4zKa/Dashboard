import React from "react";
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

function useWindowSize() {
  const [size, set] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });

  React.useEffect(() => {
    const onResize = () => set({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return size;
}

export default function App() {
  const { w, h } = useWindowSize();

  const rows = 12; // Anzahl Zeilen, die du über die volle Höhe willst
  const margin: [number, number] = [10, 10];

  const gridWidth = Math.max(0, w);
  const rowHeight = Math.max(40, Math.floor(h / 14));

  const layout: Layout[] = [
    { i: "a", x: 0, y: 0, w: 4, h: 4, static: false },
    { i: "b", x: 4, y: 0, w: 4, h: 4, static: false },
    { i: "c", x: 8, y: 0, w: 4, h: 4, static: false },
  ];

  return (
    <div
      className="app"
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden", // verhindert Scrollen
      }}
    >
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        width={gridWidth}
        rowHeight={rowHeight}
        margin={margin}
        isResizable
        isDraggable
        preventCollision={true}
        compactType={null}
        autoSize={false} // <- verhindert unendliche Containerhöhe
        maxRows={rows} // <- verhindert rausschieben nach unten
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
    </div>
  );
}
