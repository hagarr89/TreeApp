import { useState, useEffect } from "react";
import { TreeNode } from "./TreeNode";
import { Card } from "@mui/material";
import "./index.scss";
import { UpdateTree } from "./helper";

export interface INode {
  name: string;
  desc?: string;
  isGroup: boolean;
  children?: INode[];
}

const TreeView = ({
  data,
  getNodes,
  source,
  getDate,
  saveData,
}: {
  data?: INode[] | null;
  getNodes?: (node?: INode) => Promise<INode[] | null>;
  source?: string;
  getDate?: (source: string) => INode[];
  saveData?: (data: INode[], source: string) => void;
}) => {
  const [treeData, setTreeData] = useState<INode[] | null>(data ? data : null);

  const initialLoadData = async () => {
    const res = getNodes && ((await getNodes()) ?? null);
    if (res) {
      source && saveData && saveData(res, source);
      setTreeData(res);
    }
  };

  const handelUpdateTree = (newNode: INode) => {
    const res = treeData && UpdateTree(treeData, newNode);
    if (res) {
      setTreeData(res);
      source && saveData && saveData(res, source);
    }
  };

  useEffect(() => {
    if (treeData) return;
    const localData = source && getDate && getDate(source);
    if (localData) setTreeData(localData);
    else initialLoadData();
  }, []);

  return (
    <Card classes={{ root: "tree" }}>
      {treeData?.map((rootNode: INode) => (
        <TreeNode
          key={rootNode.name}
          node={rootNode}
          getNodes={getNodes}
          onUpdateNodeTree={handelUpdateTree}
          source={source}
          index={0}
        />
      ))}
    </Card>
  );
};
export default TreeView;
