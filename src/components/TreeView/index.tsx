import { useState, useEffect } from "react";
import { TreeNode } from "./TreeNode";
import { Card } from "@mui/material";
import useSearch from "../../hooks/useSearch";
export interface INode {
  name: string;
  desc?: string;
  isGroup: boolean;
  color?: string;
  children?: INode[];
}
const TreeView = ({
  data,
  getNodes,
  sourceName,
  searchStr,
}: {
  data?: INode[] | null;
  getNodes?: (node?: INode) => Promise<INode[] | null>;
  sourceName?: string;
  searchStr: string;
}) => {
  const [treeData, setTreeData] = useState<INode[] | null>(data ? data : null);
  const searchData = useSearch<INode>({
    data: treeData,
    searchStr,
  });

  const getDataFromLocalStorage = () => {
    if (sourceName) return localStorage.getItem(sourceName);
    return null;
  };
  const saveDataOnLocalStorage = (res?: INode[]) => {
    const data = res ? res : treeData;
    console.log("saveDataOnLocalStorage treeData:", treeData);
    console.log("saveDataOnLocalStorage res:", res);

    if (sourceName) localStorage.setItem(sourceName, JSON.stringify(data));

    setTreeData(data);
  };

  const loadData = async () => {
    const res = getNodes && ((await getNodes()) ?? null);
    if (res) {
      saveDataOnLocalStorage(res);
      setTreeData(res);
    }
  };

  useEffect(() => {
    if (treeData) return;
    const localFiles = getDataFromLocalStorage();
    const filesLocal: INode[] | null = localFiles
      ? JSON.parse(localFiles)
      : null;
    if (filesLocal) setTreeData(filesLocal);
    else loadData();
  }, []);

  return (
    <Card>
      {searchData?.map((rootNode: INode) => (
        <TreeNode
          key={rootNode.name}
          node={rootNode}
          getNodes={getNodes}
          onUpdateNodeTree={saveDataOnLocalStorage}
          sourceName={sourceName}
          index={0}
        />
      ))}
    </Card>
  );
};
export default TreeView;
