import { useCallback, useState } from "react";
import { INodeBase } from "../components/TreeView";
import useDebounce from "./useDebounce";
export interface ISearch<T extends INodeBase> {
  data: T[] | [];
  searchStr: string;
}
function useSearch<T extends INodeBase>({ data, searchStr }: ISearch<T>) {
  const [searchData, setSearchData] = useState<T[] | []>(data ?? []);

  const cb = useCallback(() => {
    if (data) {
      const filterNodes = searchTreeNode(data);
      setSearchData(filterNodes);
    }
  }, [searchStr]);

  useDebounce(cb, 1000, [data, searchStr]);

  const searchTreeNode = (data: T[]) => {
    return data.reduce((acc: T[], node: T) => {
      const isMatching = node.name
        .toLowerCase()
        .includes(searchStr.toLowerCase());
      if (isMatching) {
        acc.push(node);
      } else if (node.children && node.children.length > 0) {
        //serach in inner childes for every node if exsist in inner child
        const newNodes = searchTreeNode(node.children);
        if (newNodes.length > 0) {
          acc.push({ ...node, children: newNodes });
        }
      }

      return acc;
    }, []);
  };
  return searchData;
}

export default useSearch;
