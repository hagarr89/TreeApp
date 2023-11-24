import { ReactElement, useState } from "react";
import NodeRow from "./NodeRow";
import { INode } from "./index";
import { List, Collapse } from "@mui/material";

export const TreeNode = ({
  node,
  getNodes,
  onUpdateNodeTree,
  source,
  index,
  render,
}: {
  node: INode;
  getNodes?: (node?: INode) => Promise<INode[] | null>;
  onUpdateNodeTree: (newNode: INode) => void;
  source?: string;
  index: number;
  render: (data: INode) => ReactElement;
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
          {node?.children?.map((childNode) => (
            // <TreeView key={index} data={childNode?.children} render={render} />

            <TreeNode
              key={childNode.name}
              node={childNode}
              getNodes={getNodes}
              index={index + 1}
              onUpdateNodeTree={onUpdateNodeTree}
              {...(source && { source })}
              render={render}
            />
          ))}
        </List>
      </Collapse>
    </div>
  );
};
