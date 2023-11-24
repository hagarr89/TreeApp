import TreeView from "./components/TreeView";
import { data } from "./data";
import {
  getFiles,
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "./components/TreeView/helper";
import FileNode from "./components/TreeView/FileNode";
import NodeRow from "./components/TreeView/NodeRow";

function App() {
  const renderNode = (data: any) => {
    const { index, isLoading, source, isExpanded } = data;
    if (source && source === "FILES")
      return (
        <FileNode
          index={index}
          node={data?.node}
          isLoading={isLoading}
          isExpanded={isExpanded}
          {...(source && { source })}
        />
      );
    return (
      <NodeRow
        index={index}
        node={data?.node}
        isLoading={isLoading}
        isExpanded={isExpanded}
        {...(source && { source })}
      />
    );
  };
  return (
    <div className="App">
      <TreeView
        getNodes={getFiles}
        source={"FILES"}
        getDate={getDataFromLocalStorage}
        saveData={saveDataOnLocalStorage}
        render={(data) => renderNode(data)}
      />

      <TreeView data={data} render={(data) => renderNode(data)} />
    </div>
  );
}

export default App;
