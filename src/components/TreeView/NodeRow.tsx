import { ReactComponent as Loader } from "../../assets/loader.svg";
import { INode } from "../../App";
import Avatar from "@mui/material/Avatar";
import {
  ListItemAvatar,
  ListItemText,
  ListItem,
  ListItemButton,
} from "@mui/material";

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
  index,
}: {
  node: INode;
  isExpanded: boolean;
  isLoading: boolean;
  sourceName?: string;
  index: number;
}) {
  const icon = getIcon(node, sourceName && sourceName);
  const loader = isLoading ? <Loader /> : null;
  const arrow = loader ? (
    loader
  ) : node?.isGroup ? (
    isExpanded ? (
      <ExpandLessIcon />
    ) : (
      <ExpandMoreIcon />
    )
  ) : null;
  return (
    <ListItemButton>
      <ListItem sx={{ paddingLeft: 2 * index }}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: node?.color }}>{icon}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={node?.name} secondary={node?.desc} />
        {arrow}
      </ListItem>
    </ListItemButton>
  );
}
