import React, { useState, useEffect } from "react";
import { TreeNode } from "./TreeNode";
import { INode } from "../../App";
import { Card } from "@mui/material";

const TreeView = ({
  data,
  getNodes,
  sourceName,
}: {
  data: INode[] | null;
  getNodes?: (node?: INode) => Promise<INode[] | null>;
  sourceName?: string;
}) => {
  const [treeData, setTreeData] = useState<INode[] | null>(null);

  useEffect(() => {
    if (data) setTreeData(data);
  }, [data]);

  const UpdateTree = () => {
    if (sourceName) localStorage.setItem(sourceName, JSON.stringify(treeData));
  };
  return (
    <Card>
      {treeData?.map((rootNode: INode) => (
        <TreeNode
          key={rootNode.name}
          node={rootNode}
          getNodes={getNodes}
          onUpdateNodeTree={UpdateTree}
          sourceName={sourceName}
        />
      ))}
    </Card>
  );
};
export default TreeView;
