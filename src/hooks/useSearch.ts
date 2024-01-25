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
  const [searchData, setSearchData] = useState<T[]|null>(data);


  useEffect(() => {
    console.log('searchStr updates' , searchStr)
    if(data) filterByName(data);
  }, [searchStr , data]);


  const filterByName = (data:T[])=>{
    const res:T[]  =  data  
        ?.filter((item) => item?.name?.toLowerCase().indexOf(searchStr.toLocaleLowerCase()) > -1)
        ?.map((item) => ({
        ...item,
        ...(item?.children && {children: filterByName(item.children) })
        }))
        setSearchData(res);
        return res;
  }



  return searchData
}

export default useSearch