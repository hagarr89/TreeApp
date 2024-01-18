import TreeView, { INode } from "./components/TreeView";
import { data } from "./data";
import { FileNode } from "./components/TreeView/FilesTree/FileNode";
import { ITreeRow, NodeRow } from "./components/TreeView/NodeRow";
import { IFile } from "./services/fileSystem";
import { useFiels } from "./hooks/useFiels";
import { useEffect } from "react";

const renderNode = (data: ITreeRow<INode>) => {
  return <NodeRow {...data} />;
};

const renderFile = (data: ITreeRow<IFile>) => {
  return <FileNode {...data} />;
};

function App() {
  const { saveFiels, fiels, fetchFiels } = useFiels();
  useEffect(() => {
    console.log("fiels updated", fiels);
  }, [fiels]);
  return (
    <div className="App">
      {fiels.length ? (
        <TreeView<IFile>
          data={fiels}
          fetchFiels={fetchFiels}
          saveFiels={saveFiels}
          OnRender={(data) => renderFile(data)}
        />
      ) : null}

      <TreeView<INode> data={data} OnRender={(data) => renderNode(data)} />
    </div>
  );
}

export default App;
