import {INode} from './index'
import {IFile, fetchFiles} from '../../services/fileSystem'


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


//ADD- any new type of source