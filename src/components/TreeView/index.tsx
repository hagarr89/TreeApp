import Tree from "./Tree";

export interface INodeBase {
  name: string;
  children: INodeBase[];
}
export interface INode extends INodeBase {
  isGroup?: boolean;
  desc?: string;
}

export default Tree;
