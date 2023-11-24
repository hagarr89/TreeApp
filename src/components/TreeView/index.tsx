import { useState, useEffect, ReactElement } from "react";
import { TreeNode } from "./TreeNode";
import { Card } from "@mui/material";
import "./index.scss";
import { UpdateTree } from "./helper";
import { IFile } from "../../services/fileSystem";

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
  render,
}: {
  data?: INode[] | IFile[] | null;
  getNodes?: (node?: INode) => Promise<INode[] | null>;
  source?: string;
  getDate?: (source: string) => INode[];
  saveData?: (data: INode[], source: string) => void;
  render: (data: INode) => ReactElement;
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
          render={render}
        />
      ))}
    </Card>
  );
};
export default TreeView;
