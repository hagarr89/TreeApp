import { ReactComponent as Loader } from "../../../assets/loader.svg";
import { IFile } from "../../../services/fileSystem";
import Avatar from "@mui/material/Avatar";
import { faker } from "@faker-js/faker";
import {
  ListItemAvatar,
  ListItemText,
  ListItem,
  ListItemButton,
} from "@mui/material";

import Folder from "@mui/icons-material/Folder";
import File from "@mui/icons-material/Article";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { ITreeRow } from "../NodeRow";

const getIcon = (node: IFile) => {
  if (node?.type === "Folder") return <Folder />;
  return <File />;
};
export const FileNode = ({
  node,
  isExpanded,
  isLoading,
  index,
}: ITreeRow<IFile>) => {
  const [color, setColor] = useState<string>();
  const icon = getIcon(node);
  const isGroup = node?.type === "Folder";

  const loader = isLoading ? <Loader /> : null;
  const arrow = loader ? (
    loader
  ) : isGroup ? (
    isExpanded ? (
      <ExpandLessIcon />
    ) : (
      <ExpandMoreIcon />
    )
  ) : null;

  useEffect(() => {
    const bgColor = faker.color.rgb({ casing: "upper" });
    setColor(bgColor);
  }, []);

  return (
    <ListItemButton>
      <ListItem sx={{ paddingLeft: 2 * index }}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: color }}>{icon}</Avatar>
        </ListItemAvatar>
        <ListItemText
          classes={{ root: "pr" }}
          primary={node.name}
          secondary={node?.size}
        />
        {arrow}
      </ListItem>
    </ListItemButton>
  );
};
