import { ReactElement, useState } from "react";
import { INode } from "./index";
import { ITreeRow } from "./NodeRow";
import { List, Collapse } from "@mui/material";
import { JsxElement } from "typescript";

export interface ITreeNode<T> {
  node: T;
  getNodes?: (node?: T) => Promise<T[] | null>;
  onUpdateNodeTree: (newNode: T) => void;
  source?: string;
  index: number;
  render: (data: ITreeRow<T>) => ReactElement;
}

export const TreeNode = <T extends INode>({
  node,
  getNodes,
  onUpdateNodeTree,
  source,
  index,
  render,
}: ITreeNode<T>) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClickNode = async () => {
    if (node?.children) {
      setIsExpanded(!isExpanded);
      return;
    }
    try {
      setIsLoading(true);
      const nodes = getNodes ? await getNodes(node) : null;
      if (nodes) {
        const newNode = { ...node, children: nodes };
        onUpdateNodeTree(newNode);
        setIsExpanded(!isExpanded);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tree-node">
      <div onClick={onClickNode}>
        <div>{render({ node, index: index, isLoading, isExpanded })}</div>
      </div>
      <Collapse in={!isLoading && isExpanded} timeout="auto" unmountOnExit>
        <List className="tree-node-list">
          {node?.children?.map((childNode) => (
            <TreeNode<T>
              key={childNode.name}
              node={childNode as T}
              getNodes={getNodes}
              onUpdateNodeTree={onUpdateNodeTree}
              source={source}
              index={index + 1}
              render={render}
            />
          ))}
        </List>
      </Collapse>
    </div>
  );
};
