import { ReactComponent as Loader } from "../../assets/loader.svg";
import { INode } from "../../App";
import Avatar from "@mui/material/Avatar";
import { CardHeader } from "@mui/material";

import Folder from "@mui/icons-material/Folder";
import File from "@mui/icons-material/Article";

import Groups from "@mui/icons-material/Groups";
import Person from "@mui/icons-material/Person";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const getIcon = (node: INode, sourceName?: string) => {
  if (sourceName === "FILES") {
    if (node?.isGroup) return <Folder />;
    return <File />;
  }
  if (node?.isGroup) return <Groups />;
  return <Person />;
};

export default function NodeRow({
  node,
  isExpanded,
  isLoading,
  sourceName,
}: {
  node: INode;
  isExpanded: boolean;
  isLoading: boolean;
  sourceName?: string;
}) {
  const icon = getIcon(node, sourceName && sourceName);
  const arrow = node?.isGroup ? (
    isExpanded ? (
      <ExpandLessIcon />
    ) : (
      <ExpandMoreIcon />
    )
  ) : null;
  return (
    <CardHeader
      classes={{ action: "actionIcon" }}
      avatar={<Avatar>{icon}</Avatar>}
      action={arrow}
      title={node?.name}
      subheader={node?.desc}
    />
  );
}
