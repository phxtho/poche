import React, { FunctionComponent } from "react";
import {
  deleteTriple,
  getTriplesFromNode,
  getTriplesToNode,
  insertTriple,
} from "db/level/graph";

interface GraphProps {}

const Graph: FunctionComponent<GraphProps> = () => {
  return (
    <>
      <h1>Graph stuff</h1>
      <div className="flex space-x-1">
        <button
          className="bg-black text-white"
          onClick={() =>
            insertTriple({
              subject: "x",
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
    </>
  );
};

export default Graph;
