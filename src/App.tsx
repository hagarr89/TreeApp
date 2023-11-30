import TreeView, { INode } from "./components/TreeView";
import { data } from "./data";
import {
  getFiles,
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "./components/TreeView/helper";
import { FileNode } from "./components/TreeView/FileNode";
import { ITreeRow, NodeRow } from "./components/TreeView/NodeRow";
import { IFile } from "./services/fileSystem";

const renderNode = (data: ITreeRow<INode>) => {
  const { node, index, isLoading, isExpanded } = data;

  return (
    <NodeRow
      index={index}
      node={node}
      isLoading={isLoading}
      isExpanded={isExpanded}
    />
  );
};

const renderFile = (data: ITreeRow<IFile>) => {
  const { node, index, isLoading, isExpanded } = data;
  return (
    <FileNode
      index={index}
      node={node}
      isLoading={isLoading}
      isExpanded={isExpanded}
    />
  );
};

function App() {
  return (
    <div className="App">
      <TreeView<IFile>
        getNodes={getFiles}
        getDate={getDataFromLocalStorage}
        saveData={saveDataOnLocalStorage}
        render={(data) => renderFile(data)}
        source="FILES"
      />

      <TreeView<INode> data={data} render={(data) => renderNode(data)} />
    </div>
  );
}

export default App;
