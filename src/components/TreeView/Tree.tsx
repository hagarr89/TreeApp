import { ReactElement, useEffect } from "react";
import { TreeNode } from "./TreeNode";
import { Card } from "@mui/material";
import "./index.scss";
import { List } from "@mui/material";
import { ITreeRow } from "./NodeRow";
import { INode } from ".";
import useTreeUpdate from "../../hooks/useTreeUpdater";

const Tree = <T extends INode>({
  data,
  fetchFiels,
  saveFiels,
  OnRender,
}: {
  data: T[];
  fetchFiels?: (node: T) => Promise<T[] | null>;
  saveFiels?: (data: T[]) => void;
  OnRender: (data: ITreeRow<T>) => ReactElement;
}) => {
  const { treeData, fetchChildren } = useTreeUpdate(data ?? []);

  const handelUpdateTree = async (node: T) => {
    if (!treeData || !node || !fetchFiels) return false;

    const isFetched = await fetchChildren(node, fetchFiels);
    return !!isFetched;
  };

  useEffect(() => {
    saveFiels && saveFiels(treeData);
  }, [treeData, saveFiels]);

  return (
    <Card classes={{ root: "tree" }}>
      <List className="tree-node-list">
        {treeData?.map((rootNode) => (
          <TreeNode<T>
            key={rootNode.name}
            node={rootNode}
            onUpdateTree={handelUpdateTree}
            index={0}
            render={OnRender}
          />
        ))}
      </List>
    </Card>
  );
};
export default Tree;
