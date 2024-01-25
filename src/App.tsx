import TreeView, { INode } from "./components/TreeView";
import { data } from "./data";
import { FileNode } from "./components/TreeView/NodeType/FileNode";
import { ITreeRow, NodeRow } from "./components/TreeView/NodeType/NodeRow";
import { IFile } from "./services/fileSystem";
import { useFiels } from "./hooks/useFiels";
import { TextField } from "@mui/material";
import { useState } from "react";

const renderNode = (data: ITreeRow<INode>) => {
  return <NodeRow {...data} />;
};

const renderFile = (data: ITreeRow<IFile>) => {
  return <FileNode {...data} />;
};

function App() {
  const { fiels, handelSaveFiels, handelFetchFiels } = useFiels();
  const [searchStr, setSearchStr] = useState<string>("");

  return (
    <div className="App">
      <div>
        <TextField
          id="search"
          label="search"
          variant="outlined"
          value={searchStr}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchStr(event.target.value);
          }}
        />
      </div>

      {fiels.length ? (
        <TreeView<IFile>
          data={fiels}
          onFetchFiels={handelFetchFiels}
          onSaveFiels={handelSaveFiels}
          OnRender={(data) => renderFile(data)}
          searchStr={searchStr}
        />
      ) : null}

      <TreeView<INode>
        data={data}
        OnRender={(data) => renderNode(data)}
        searchStr={searchStr}
      />
    </div>
  );
}

export default App;
