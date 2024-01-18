import Tree from "./Tree";

export interface INode {
  name: string;
  isGroup?: boolean;
  children?: INode[];
  desc?: string;
}
export default Tree;
