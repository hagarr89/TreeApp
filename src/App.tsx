import TreeView from "./components/TreeView";
import { data } from "./data";
import { getFiles } from "./components/TreeView/helper";

export interface INode {
  name: string;
  desc?: string;
  isGroup: boolean;
  color?: string;
  children?: INode[];
}

function App() {
  return (
    <div className="App">
      <TreeView getNodes={getFiles} sourceName={"FILES"} />
      <TreeView data={data} />
    </div>
  );
}

export default App;
