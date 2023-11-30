import { ReactComponent as Loader } from "../../assets/loader.svg";
import { INode } from "./index";
import Avatar from "@mui/material/Avatar";
import { faker } from "@faker-js/faker";

import {
  ListItemAvatar,
  ListItemText,
  ListItem,
  ListItemButton,
} from "@mui/material";

import Groups from "@mui/icons-material/Groups";
import Person from "@mui/icons-material/Person";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";

export interface ITreeRow<T> {
  node: T;
  isExpanded: boolean;
  isLoading: boolean;
  index: number;
}

const getIcon = (node: INode) => {
  if (node?.isGroup) return <Groups />;
  return <Person />;
};

export const NodeRow = ({
  node,
  isExpanded,
  isLoading,
  index,
}: ITreeRow<INode>) => {
  const [color, setColor] = useState<string>();
  const icon = getIcon(node);
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
          primary={node?.name}
          secondary={node?.desc}
        />
        {arrow}
      </ListItem>
    </ListItemButton>
  );
};
