import {INode} from '../../App'
import {IFile, fetchFiles} from '../../services/fileSystem'

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

export const getFiles = async (node?: INode) => {
 let data:INode[] | null= null;
  if (!node || node?.isGroup ) {
     const res = (await fetchFiles()) as IFile[];
     data =  res?.map((node: IFile) => replaceFilesToNode(node)) ?? [];
  };
     return data;

};

