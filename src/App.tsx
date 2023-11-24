import TreeView, { INode } from "./components/TreeView";
import { data } from "./data";
import {
  getFiles,
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "./components/TreeView/helper";
import FileNode from "./components/TreeView/FileNode";
import NodeRow from "./components/TreeView/NodeRow";
import { IFile } from "./services/fileSystem";

function App() {
  const renderNode = (data: any) => {
    const { node, index, isLoading, source, isExpanded } = data;
    if (source && source === "FILES")
      return (
        <FileNode
          index={index}
          node={node}
          isLoading={isLoading}
          isExpanded={isExpanded}
          {...(source && { source })}
        />
      );
    return (
      <NodeRow
        index={index}
        node={node}
        isLoading={isLoading}
        isExpanded={isExpanded}
        {...(source && { source })}
      />
    );
  };
  return (
    <div className="App">
      <TreeView<IFile>
        getNodes={getFiles}
        getDate={getDataFromLocalStorage}
        saveData={saveDataOnLocalStorage}
        render={(data) => renderNode(data)}
      />

      <TreeView<INode> data={data} render={(data) => renderNode(data)} />
    </div>
  );
}

export default App;
