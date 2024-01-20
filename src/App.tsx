import TreeView, { INode } from "./components/TreeView";
import { data } from "./data";
import { FileNode } from "./components/TreeView/NodeType/FileNode";
import { ITreeRow, NodeRow } from "./components/TreeView/NodeType/NodeRow";
import { IFile } from "./services/fileSystem";
import { useFiels } from "./hooks/useFiels";

const renderNode = (data: ITreeRow<INode>) => {
  return <NodeRow {...data} />;
};

const renderFile = (data: ITreeRow<IFile>) => {
  return <FileNode {...data} />;
};

function App() {
  const { fiels, handelSaveFiels, handelFetchFiels } = useFiels();

  return (
    <div className="App">
      {fiels.length ? (
        <TreeView<IFile>
          data={fiels}
          onFetchFiels={handelFetchFiels}
          onSaveFiels={handelSaveFiels}
          OnRender={(data) => renderFile(data)}
        />
      ) : null}

      <TreeView<INode> data={data} OnRender={(data) => renderNode(data)} />
    </div>
  );
}

export default App;
