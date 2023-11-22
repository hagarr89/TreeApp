import { useState, useEffect } from "react";
import { TreeNode } from "./TreeNode";
import { Card } from "@mui/material";
import "./index.scss";
import { UpdateTree } from "./helper";

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
}: {
  data?: INode[] | null;
  getNodes?: (node?: INode) => Promise<INode[] | null>;
  sourceName?: string;
}) => {
  const [treeData, setTreeData] = useState<INode[] | null>(data ? data : null);

  const getDataFromLocalStorage = () => {
    if (sourceName) {
      const localData = localStorage.getItem(sourceName) as string;
      return JSON.parse(localData);
    }
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

  const handelUpdateTree = (newNode: INode) => {
    const res = treeData && UpdateTree(treeData, newNode);
    if (res) {
      setTreeData(res);
      saveDataOnLocalStorage(res);
    }
  };

  useEffect(() => {
    if (treeData) return;
    const localData: INode[] | null = getDataFromLocalStorage() ?? null;
    if (localData) setTreeData(localData);
    else loadData();
  }, []);

  return (
    <Card classes={{ root: "tree" }}>
      {treeData?.map((rootNode: INode) => (
        <TreeNode
          key={rootNode.name}
          node={rootNode}
          getNodes={getNodes}
          onUpdateNodeTree={handelUpdateTree}
          sourceName={sourceName}
          index={0}
        />
      ))}
    </Card>
  );
};
export default TreeView;
