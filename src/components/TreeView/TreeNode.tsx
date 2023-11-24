import { ReactElement, useState } from "react";
import TreeView, { INode } from "./index";
import { List, Collapse } from "@mui/material";

export const TreeNode = <T extends INode>({
  node,
  getNodes,
  onUpdateNodeTree,
  source,
  index,
  render,
}: {
  node: T;
  getNodes?: (node?: T) => Promise<T[] | null>;
  onUpdateNodeTree: (newNode: T) => void;
  source?: string;
  index: number;
  render: (data: T) => ReactElement;
}) => {
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
        <div>{render({ node, index, isLoading, source, isExpanded })}</div>
      </div>
      <Collapse in={!isLoading && isExpanded} timeout="auto" unmountOnExit>
        <List className="child-nodes">
          <TreeView<T>
            // data={node?.children ?? null}
            render={render}
            getNodes={getNodes}
          />
        </List>
      </Collapse>
    </div>
  );
};
