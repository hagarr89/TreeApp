import Tree from "./Tree";

export interface INode {
  name: string;
  isGroup?: boolean;
  children?: INode[];
  desc?: string;
  color?: string;
  visability?: true;
}
export default Tree;
