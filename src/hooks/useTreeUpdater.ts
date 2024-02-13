// useTreeUpdater.js
import { useState } from "react";
import {  INodeBase } from "../components/TreeView";

const useTreeUpdater = <T extends INodeBase>(initialData: T[]) => {
  const [treeData, setTreeData] = useState(initialData);

  const fetchChildren = async (
    node: T,
    fetchFunction: (node: T) => Promise<T[]|null> 
  ) => {
    try {
      // Call the fetch function to get new nodes
      const newNodes = await fetchFunction(node) ?? null;
      if(newNodes) setTreeData(updateTreeNode(treeData, node?.name , newNodes))
      return newNodes
    } catch (error) {
      console.error("Error fetching children:", error);
    }
          return false

  };

  const updateTreeNode = (tree: T[], nodeId: string, updates: T[]): T[] => {
    return tree.map((node) => {
      if (node.name === nodeId) {
        return { ...node, children: updates };
      } else if (node?.children ) {
        return {
          ...node,
          children: updateTreeNode(node.children, nodeId, updates),
        };
      }
      return node;
    });

  };

  return {
    treeData,
    fetchChildren,
  };
};

export default useTreeUpdater;
