import { useState, useEffect, ReactElement } from "react";
import { TreeNode } from "./TreeNode";
import { Card } from "@mui/material";
import "./index.scss";
import { UpdateTree } from "./helper";
import { List, Collapse } from "@mui/material";

export interface INode {
  name: string;
  desc?: string;
  isGroup?: boolean;
  children?: INode[];
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
  render: (data: T) => ReactElement;
}) => {
  const [treeData, setTreeData] = useState<T[] | null>(data ? data : null);

  const initialLoadData = async () => {
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
    console.log("use effect treedata", treeData);
    if (treeData) return;
    const localData = source && getDate && getDate(source);
    if (localData) setTreeData(localData);
    else initialLoadData();
  }, []);

  return (
    <Card classes={{ root: "tree" }}>
      <List className="tree">
        {treeData?.map((rootNode: T) => (
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
