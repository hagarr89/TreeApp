import TreeView from "./components/TreeView";
import { data } from "./data";
import { getFiles } from "./components/TreeView/helper";

function App() {
  return (
    <div className="App">
      <TreeView getNodes={getFiles} sourceName={"FILES"} />
      <TreeView data={data} />
    </div>
  );
}

export default App;
