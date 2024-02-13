import { ReactElement, useEffect, useMemo } from "react";
import { TreeNode } from "./TreeNode";
import { Card } from "@mui/material";
import "./index.scss";
import { List } from "@mui/material";
import { ITreeRow } from "./NodeType/NodeRow";
import { INodeBase } from ".";
import useTreeUpdate from "../../hooks/useTreeUpdater";
import useSearch from "../../hooks/useSearch";

const Tree = <T extends INodeBase>({
  data,
  onFetchFiels,
  onSaveFiels,
  OnRender,
  searchStr,
}: {
  data: T[];
  onFetchFiels?: (node: T) => Promise<T[] | null>;
  onSaveFiels?: (data: T[]) => void;
  OnRender: (data: ITreeRow<T>) => ReactElement;
  searchStr: string;
}) => {
  const { treeData, fetchChildren } = useTreeUpdate(data ?? []);

  const handelUpdateTree = async (node: T) => {
    if (!onFetchFiels) return false;

    const isFetched = await fetchChildren(node, onFetchFiels);
    return !!isFetched;
  };

  const searchData = useSearch<T>({
    data: treeData,
    searchStr,
  });

  useEffect(() => {
    onSaveFiels && onSaveFiels(treeData);
  }, [treeData, onSaveFiels]);

  return (
    <Card classes={{ root: "tree" }}>
      <List className="tree-node-list">
        {searchData?.map((rootNode) => (
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
