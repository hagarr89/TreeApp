import { useState, useEffect, ReactElement } from "react";
import { TreeNode } from "./TreeNode";
import { Card } from "@mui/material";
import "./index.scss";
import { UpdateTree } from "./helper";
import { List } from "@mui/material";
import { JsxElement } from "typescript";
import { ITreeRow } from "./NodeRow";

export interface INode {
  name: string;
  isGroup?: boolean;
  children?: INode[];
  desc?: string;
}

const TreeView = <T extends INode>({
  data,
  getNodes,
  source,
  getDate,
  saveData,
  render,
}: {
  data?: T[] | null;
  getNodes?: (node?: T) => Promise<T[] | null>;
  source?: string;
  getDate?: (source: string) => T[];
  saveData?: (data: T[], source: string) => void;
  render: (data: ITreeRow<T>) => ReactElement;
}) => {
  const [treeData, setTreeData] = useState<T[] | null>(data ? data : null);

  const loadData = async () => {
    try {
      const res = getNodes && ((await getNodes()) ?? null);
      if (res) {
        source && saveData && saveData(res, source);
        setTreeData(res);
      }
    } finally {
    }
  };

  const handelUpdateTree = (newNode: T) => {
    const res = treeData && UpdateTree(treeData, newNode);
    if (res) {
      setTreeData(res);
      source && saveData && saveData(res, source);
    }
  };

  useEffect(() => {
    // console.log("useEffect treeView", treeData);
    if (treeData) return;
    const localData = source && getDate && getDate(source);
    if (localData) setTreeData(localData);
    else loadData();
  }, [treeData]);

  return (
    <Card classes={{ root: "tree" }}>
      <List className="tree-node-list">
        {treeData?.map((rootNode) => (
          <TreeNode<T>
            key={rootNode.name}
            node={rootNode}
            getNodes={getNodes}
            onUpdateNodeTree={handelUpdateTree}
            source={source}
            index={0}
            render={render}
          />
        ))}
      </List>
    </Card>
  );
};
export default TreeView;
