import { ReactElement, useRef, useState } from "react";
import { INode } from "./index";
import { ITreeRow } from "./NodeRow";
import { List, Collapse } from "@mui/material";

export interface ITreeNode<T> {
  node: T;
  onUpdateTree?: (node: T) => Promise<void>;
  index: number;
  render: (data: ITreeRow<T>) => ReactElement;
}

export const TreeNode = <T extends INode>({
  node,
  onUpdateTree,
  index,
  render,
}: ITreeNode<T>) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClickNode = async () => {
    if (node?.children) {
      setIsExpanded(!isExpanded);
    } else {
      if (onUpdateTree) {
        setIsLoading(true);
        await onUpdateTree(node);
        setIsExpanded(!isExpanded);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="tree-node">
      <div onClick={onClickNode}>
        <div>
          {render({ node, index: index, isLoading: isLoading, isExpanded })}
        </div>
      </div>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <List className="tree-node-list">
          {node?.children?.map((childNode) => (
            <TreeNode<T>
              key={childNode.name}
              node={childNode as T}
              onUpdateTree={onUpdateTree}
              index={index + 1}
              render={render}
            />
          ))}
        </List>
      </Collapse>
    </div>
  );
};
