import React, { FunctionComponent, useEffect, useState } from "react";
import {
  deleteTriple,
  getTriplesFromNode,
  getTriplesToNode,
  insertTriple,
} from "db/level/graph";
import { getNotes } from "db/pouch/notes";
import { Graph, GraphData } from "react-d3-graph";
import { INote } from "model/interfaces";

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
const myConfig = {
  nodeHighlightBehavior: true,
  node: {
    color: "lightgreen",
    size: 120,
    highlightStrokeColor: "blue",
  },
  link: {
    highlightColor: "lightblue",
  },
};

interface GraphPageProps {}

const GraphPage: FunctionComponent<GraphPageProps> = () => {
  const [data, setData] = useState<GraphData<any, any>>({
    nodes: [],
    links: [],
  });

  useEffect(() => {
    getNotes().then((x) => {
      let tempData: GraphData<any, any> = { nodes: [], links: [] };
      (x as any as INote[]).forEach((y) => {
        tempData.nodes.push({ id: y.id });
        // Create a random link
        const randomNote = (x as any as INote[])[
          Math.floor(Math.random() * x.length)
        ];
        tempData.links.push({ source: y.id, target: randomNote.id });
      });
      setData(tempData);
    });
  }, []);
  return (
    <>
      <h1>Graph stuff</h1>
      <div className="flex space-x-1">
        <button
          className="bg-black text-white"
          onClick={() =>
            insertTriple({
              subject: Math.random().toString(),
              predicate: "references",
              object: "y",
            }).then((x) => console.log(x))
          }
        >
          Insert Triple
        </button>
        <button
          className="bg-blue-500 text-white"
          onClick={() => getTriplesToNode("y").then((x) => console.log(x))}
        >
          Get triples
        </button>
        <button
          className="bg-red-500 text-white"
          onClick={() =>
            getTriplesToNode("y").then((x) =>
              x.forEach((y) =>
                deleteTriple(y).then((z) =>
                  console.log(`deleted ${JSON.stringify(z)}`)
                )
              )
            )
          }
        >
          Delete triple
        </button>
      </div>
      <Graph
        id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
        data={data}
        config={myConfig}
      ></Graph>
    </>
  );
};

export default GraphPage;
