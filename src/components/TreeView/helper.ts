import {INode} from './index'
import {IFile, fetchFiles} from '../../services/fileSystem'

export const UpdateTree = <T extends INode>(tree: T[], newItem:T):T[] => {
  return tree.map((item) =>{
       return item?.name === newItem.name ? newItem : {
        ...(item?.children ? {...item, children: UpdateTree(item.children, newItem) } : item),
        }
    })
  }


// //Files helper to match node type to fix with file type
// export const replaceFilesToNode = (node: IFile) => {
//   const { name, size, type} = node;
//   const desc =  size;
//   return {
//     name,
//     ...(desc && {desc}),
//     isGroup: type === "Folder" ? true : false,
//   } 
// };

//Files helper to get files async
export const getFiles= async (node?: IFile) => {
  if (!node || node?.type === 'Folder' ) {
     return await fetchFiles() as IFile[];
  };
     return null;
};

  export const getDataFromLocalStorage = (source:string) => {
     const itemsStrinigfy = localStorage.getItem(source) as string ;
     const localData = JSON.parse(itemsStrinigfy);
    if (localData) {
      return localData
    }
    return null;
  };

  export const saveDataOnLocalStorage = <T>(data:T[] ,source:string ) => {
    console.log('saveDataOnLocalStorage');
    if(source) localStorage.setItem(source, JSON.stringify(data));
  
  };


