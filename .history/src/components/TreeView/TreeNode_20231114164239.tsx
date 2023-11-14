import React, { useState } from "react";
import NodeRow from "./NodeRow";
import { INode } from "../../App";
import "./index.scss";
import { CardContent, Collapse } from "@mui/material";

export const TreeNode = ({
  node,
  getNodes,
  onUpdateNodeTree,
  sourceName,
}: {
  node: INode;
  getNodes?: (node?: INode) => Promise<INode[] | null>;
  onUpdateNodeTree: () => void;
  sourceName?: string;
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
        onUpdateNodeTree();
        setIsExpanded(!isExpanded);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tree-node">
      <div
        onClick={onClickNode}
        className={`node-toggle ${isExpanded ? "expanded" : ""}`}
      >
        <NodeRow
          node={node}
          isLoading={isLoading}
          isExpanded={isExpanded}
          {...(sourceName && { sourceName })}
        />
      </div>
      <Collapse in={!isLoading && isExpanded} timeout="auto" unmountOnExit>
        <CardContent className="child-nodes">
          {node?.children?.map((childNode) => (
            <div key={childNode.name}>
              <TreeNode
                node={childNode}
                getNodes={getNodes}
                onUpdateNodeTree={onUpdateNodeTree}
                {...(sourceName && { sourceName })}
              />
            </div>
          ))}
        </CardContent>
      </Collapse>
    </div>
  );
};
