import { useEffect, useState } from "react";

export interface ISearchDefualtProps<T> {
  name:string;
  children?:T[]
}
export interface ISearch<T extends  ISearchDefualtProps<T>> {
  data:T[] | null;
  searchStr:string;
} 
function useSearch<T extends  ISearchDefualtProps<T>>({data , searchStr}:ISearch<T>) {
  const [searchData, setSearchData] = useState<T[]|[]>(data ??  [] );


  useEffect(() => {
    if(data) {
      const filterNodes = searchTreeNode(data);
      setSearchData(filterNodes)
    }
  }, [searchStr , data]);


  const searchTreeNode = (data:T[]) => {
    return data.reduce((acc:T[], node:T) => {
     const isMatching = node.name.toLowerCase().includes(searchStr.toLowerCase());
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
  
}
  return searchData
}

export default useSearch