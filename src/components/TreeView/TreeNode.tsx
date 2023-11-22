import { useState } from "react";
import NodeRow from "./NodeRow";
import { INode } from "./index";
import { List, Collapse } from "@mui/material";

export const TreeNode = ({
  node,
  getNodes,
  onUpdateNodeTree,
  source,
  index,
}: {
  node: INode;
  getNodes?: (node?: INode) => Promise<INode[] | null>;
  onUpdateNodeTree: (newNode: INode) => void;
  source?: string;
  index: number;
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
        <NodeRow
          index={index}
          node={node}
          isLoading={isLoading}
          isExpanded={isExpanded}
          {...(source && { source })}
        />
      </div>
      <Collapse in={!isLoading && isExpanded} timeout="auto" unmountOnExit>
        <List className="child-nodes">
          {node?.children?.map((childNode) => (
            <TreeNode
              key={childNode.name}
              node={childNode}
              getNodes={getNodes}
              index={index + 1}
              onUpdateNodeTree={onUpdateNodeTree}
              {...(source && { source })}
            />
          ))}
        </List>
      </Collapse>
    </div>
  );
};
