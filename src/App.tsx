import TreeView from "./components/TreeView";
import { data } from "./data";
import { getFiles } from "./components/TreeView/helper";
import { TextField } from "@mui/material";
import { useState } from "react";

function App() {
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

      <TreeView
        getNodes={getFiles}
        sourceName={"FILES"}
        searchStr={searchStr}
      />
      <TreeView data={data} searchStr={searchStr} />
    </div>
  );
}

export default App;
