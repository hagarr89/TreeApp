import React, { useState, useEffect } from "react";
import { TreeNode } from "./TreeNode";
import { INode } from "../../App";
import { Card } from "@mui/material";

const TreeView = ({
  data,
  getNodes,
  sourceName,
}: {
  data?: INode[] | null;
  getNodes?: (node?: INode) => Promise<INode[] | null>;
  sourceName?: string;
}) => {
  const [treeData, setTreeData] = useState<INode[] | null>(data ? data : null);

  const getDataFromLocalStorage = () => {
    if (sourceName) return localStorage.getItem(sourceName);
    return null;
  };
  const saveDataOnLocalStorage = (res?: INode[]) => {
    const data = res ? res : treeData;
    if (sourceName) localStorage.setItem(sourceName, JSON.stringify(data));
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
  }, []]);

  return (
    <Card>
      {treeData?.map((rootNode: INode) => (
        <TreeNode
          key={rootNode.name}
          node={rootNode}
          getNodes={getNodes}
          onUpdateNodeTree={saveDataOnLocalStorage}
          sourceName={sourceName}
        />
      ))}
    </Card>
  );
};
export default TreeView;
