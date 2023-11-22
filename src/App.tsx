import TreeView from "./components/TreeView";
import { data } from "./data";
import {
  getFiles,
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "./components/TreeView/helper";

function App() {
  return (
    <div className="App">
      <TreeView
        getNodes={getFiles}
        source={"FILES"}
        getDate={getDataFromLocalStorage}
        saveData={saveDataOnLocalStorage}
      />

      <TreeView data={data} />
    </div>
  );
}

export default App;
