import { useEffect, useState } from "react";
import TreeView from "./components/TreeView";
import { data } from "./data";
import { getFiles } from "./components/TreeView/helper";

export interface INode {
  name: string;
  desc?: string;
  isGroup: boolean;
  children?: INode[];
}

function App() {
  const [files, setFiels] = useState<INode[] | null>(null);

  const loadData = async () => {
    const res = (await getFiles()) as INode[] | [];
    localStorage.setItem("FILES", JSON.stringify(res));
    setFiels(res);
  };

  useEffect(() => {
    if (!files) {
      const localFiles = localStorage.getItem("FILES");
      const filesLocal: INode[] = localFiles && JSON.parse(localFiles);
      if (filesLocal) setFiels(filesLocal);
      else loadData();
    }
  }, [files]);

  return (
    <div className="App">
      <TreeView data={files} getNodes={getFiles} sourceName={"FILES"} />
      <TreeView data={data} />
    </div>
  );
}

export default App;
