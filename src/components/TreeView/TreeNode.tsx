import React, { useState } from "react";
import NodeRow from "./NodeRow";
import { INode } from "./index";
import "./index.scss";
import { List, Collapse } from "@mui/material";

export const TreeNode = ({
  node,
  getNodes,
  onUpdateNodeTree,
  sourceName,
  index,
}: {
  node: INode;
  getNodes?: (node?: INode) => Promise<INode[] | null>;
  onUpdateNodeTree: () => void;
  sourceName?: string;
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
        node.children = nodes;
        console.log("onclick", node);
        onUpdateNodeTree();
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
          {...(sourceName && { sourceName })}
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
              {...(sourceName && { sourceName })}
            />
          ))}
        </List>
      </Collapse>
    </div>
  );
};
