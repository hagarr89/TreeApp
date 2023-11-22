import {INode} from './index'
import {IFile, fetchFiles} from '../../services/fileSystem'

export const UpdateTree = (tree: INode[], newItem:INode):INode[] => {
  return tree.map((item:INode) =>{
       return item?.name === newItem.name ? newItem : {
        ...(item?.children ? {...item, children: UpdateTree(item.children, newItem) } : item),
        }
    })
  }


//Files helper to match node type to fix with file type
export const replaceFilesToNode = (node: IFile) => {
  const { name, size, type, color="#bdbdbd" } = node;
  const desc =  size;
  return {
    name,
    ...(desc && {desc}),
    color:color,
    isGroup: type === "Folder" ? true : false,
  } 
};

//Files helper to get files async
export const getFiles = async (node?: INode) => {
 let data:INode[] | null= null;
  if (!node || node?.isGroup ) {
     const res = (await fetchFiles()) as IFile[];
     data =  res?.map((node: IFile) => replaceFilesToNode(node)) ?? [];
  };
     return data;
};




  export const getDataFromLocalStorage = (sourceName:string) => {
     const itemsStrinigfy = localStorage.getItem(sourceName) as string ;
     const localData = JSON.parse(itemsStrinigfy);
     console.log('localData' , localData)
    if (localData) {
      return localData
    }
    return null;
  };

  export const saveDataOnLocalStorage = <T>(data:T[] ,sourceName?:string ) => {
    if(sourceName){
      localStorage.setItem(sourceName, JSON.stringify(data));
    }
  };


