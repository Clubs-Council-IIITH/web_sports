"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { alpha, useTheme } from "@mui/material/styles";
import { Box, ListItemText, ListItemButton, ListItemIcon } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import Icon from "components/Icon";

export function isExternalLink(path) {
  return path.includes("http");
}

export function getActive(path, pathname) {
  if (path === "/") return pathname === path;
  return pathname.startsWith(path.split("?")[0]);
}

export default function DrawerItem({ title, path = "", icon, onClick = null }) {
  const theme = useTheme();
  const pathname = usePathname();

  const active = path != "" ? getActive(path, pathname) : false;

  const externalLink = path != "" ? isExternalLink(path) : false;
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <ListItemButton
      component={Link}
      href={path}
      sx={{
        ...theme.typography.body2,
        position: "relative",
        height: "max-content",
        width: "100%",
        display: "flex",
        textTransform: "capitalize",
        paddingLeft: isDesktop ? theme.spacing(1.5) : theme.spacing(3),
        paddingRight: isDesktop ? theme.spacing(3.5) : theme.spacing(3),
        marginBottom: theme.spacing(0.5),
        color:
          title === "login" && isDesktop
            ? theme.palette.primary.contrastText
            : theme.palette.text.menu,
        borderRadius: 1,
        // active
        ...(active && {
          ...theme.typography.subtitle2,
          color: theme.palette.accent,
          backgroundColor: alpha(theme.palette.accent, 0.16),
        }),
      }}
      {...(onClick
        ? { onClick: () => onClick(pathname) }
        : {
            component: Link,
            href: path,
          })}
      {...(externalLink
        ? {
            rel: "noopener noreferrer",
            target: "_blank",
          }
        : {})}
    >
      <ListItemIcon
        sx={{
          width: 22,
          height: 22,
          color: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon && icon}
      </ListItemIcon>
      <ListItemText
        disableTypography
        primary={
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {title}
            {externalLink && <Icon variant="link" />}
          </Box>
        }
      />
    </ListItemButton>
  );
}
