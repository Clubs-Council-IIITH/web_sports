"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  Box,
  List,
  Grid,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Drawer as MUIDrawer,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Icon from "components/Icon";
import { login } from "utils/auth";
import DrawerItem from "components/DrawerItem";
import Logo from "components/Logo";
import ScrollbarWrapper from "components/ScrollbarWrapper";
import Footer from "components/Footer";

// define top bar width
const BAR_HEIGHT_MOBILE = 64;
const BAR_HEIGHT_DESKTOP = 70;

// define navigation drawer width
const DRAWER_HEIGHT = 70;
const DRAWER_WIDTH = 240;

// bug report external link  :: To change
export const BUG_REPORT_URL = "https://forms.office.com/r/zBLuvbBPXZ";

const sites = {
  website: { icon: "mdi:web", color: "#7F7F7F" },
  facebook: { icon: "ic:baseline-facebook", color: "#3C5999" },
  instagram: { icon: "mdi:instagram", color: "#E94475" },
  twitter: { icon: "mdi:twitter", color: "#05ACED" },
  linkedin: { icon: "mdi:linkedin", color: "#027FB1" },
  discord: { icon: "ic:baseline-discord", color: "#5865F3" },
  youtube: { icon: "mdi:youtube", color: "#FF3333" },
};

function Bar({ onOpenDrawer }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <AppBar
      sx={{
        ...{
          backgroundColor: theme.palette.background.menu,
          color: theme.palette.text.opposite,
        },
        boxShadow: "none",
        [isDesktop]: {
          width: "100%",
        },
      }}
    >
      <Toolbar
        sx={{
          height: BAR_HEIGHT_MOBILE,
          [isDesktop]: {
            minHeight: BAR_HEIGHT_DESKTOP,
            padding: theme.spacing(0, 5),
          },
        }}
      >
        <IconButton
          onClick={onOpenDrawer}
          sx={{
            mr: 1,
            color: "text.opposite",
            display: { lg: "none" },
          }}
        >
          <Icon variant="menu-rounded" />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          {/* <AccountPopover /> */}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

function Drawer({ drawerOpen, onCloseDrawer, club={} }) {
  const theme = useTheme();
  const pathname = usePathname();

  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (drawerOpen) onCloseDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // nav items that everybody can see
  const publicItems = (
    <List
      disablePadding
      sx={{
        display: "inherit",
        pt: 1,
        flexDirection: "inherit",
        alignItems: "center",
        width: "100%",
        gap: isDesktop ? "50px" : "20px",
      }}
    >
      <DrawerItem
        title="home"
        path="/"
        icon={<Icon variant="home-outline-rounded" />}
      />
      <DrawerItem
        title="events"
        path="/events?upcoming=true&completed=true"
        icon={<Icon variant="event-rounded" />}
      />
      <DrawerItem
        title="members"
        path="/members"
        icon={<Icon variant="groups-rounded" />}
      />
      <DrawerItem
        title="gallery"
        path="/gallery"
        icon={<Icon variant="photo-library-rounded" />}
      />
    </List>
  );

  const LoginItems = (
    <List disablePadding sx={{ p: 1, ml: 0.5 }}>
      <DrawerItem
        title="login"
        onClick={login}
        icon={<Icon variant="vpn-key-rounded" />}
      />
    </List>
  );
  const drawerContent = (
    <div>
      {isDesktop ? (
        <>
        <Box
          sx={{ px: 1.5, mt: "10px", display: "flex",justifyContent: "space-around" }}
          >
          <Logo isDesktop={true} />
          </Box>
          <Box
          sx={{ px: 1.5, display: "flex",justifyContent: "space-around", mb: "10px" }}
          >
            {/* <AccountPopover /> */}
            <Box
              sx={{
                px: 2.5,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {publicItems}
            </Box>
          
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            display="flex"
            justifyContent="space-around"
            bgcolor={theme.palette.background.menu}
            color={theme.palette.primary.contrastText}
            spacing={{
              xs: 0.5,
              sm: 1,
            }}
          >
            <Grid
              item
              display="flex"
            >
              <IconButton
                component="a"
                target="_blank"
                href={`mailto:${club.email}`}
                sx={{ mx: 1, color: "primary.contrastText" }}
              >
                <Icon external variant="akar-icons:envelope" />
              </IconButton>
              {Object.keys(sites)
                ?.filter((k) => club.socials[k])
                ?.map((item, index) => (
                  <IconButton
                    component="a"
                    href={club.socials[item]}
                    target="_blank"
                    sx={{ mx: 1, color: "primary.contrastText" }}
                    key={index}
                  >
                    <Icon external variant={sites[item].icon} />
                  </IconButton>
                ))}
            </Grid>
            <Stack>
            {LoginItems}
            </Stack>
          </Stack>
        </>
      ) : (
        <>
        <ScrollbarWrapper>
          <Box sx={{ px: 2.5, py: 3, display: "flex", alignSelf: "center", justifyContent: "center" }}>
            <Logo />
          </Box>
          {publicItems}
          <Box sx={{ flexGrow: 1 }} />
        </ScrollbarWrapper>
        <Stack mt={"-10vh"}>
        {LoginItems}
        </Stack>
      </>
      )}
    </div>
  );
  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: "100%" },
      }}
    >
      {isDesktop ? (
        <MUIDrawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: "100vw",
              height: "max-content",
              bgcolor: "background.default",
              // borderBottomStyle: "dashed",
            },
          }}
        >
          {drawerContent}
        </MUIDrawer>
      ) : (
        <MUIDrawer
          open={drawerOpen}
          onClose={onCloseDrawer}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              display: "flex",
              flexDirection: "column",
              bgcolor: "background.opposite",
            },
          }}
        >
          {drawerContent}
        </MUIDrawer>
      )}
    </Box>
  );
}

export function Navigation({ ...props }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Bar onOpenDrawer={() => setDrawerOpen(true)} />
      <Drawer
        drawerOpen={drawerOpen}
        onCloseDrawer={() => setDrawerOpen(false)} club={props.club}
      />
    </>
  );
}

export function Content({ children, ...props }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <ScrollbarWrapper>
      <Box
        sx={{
          display: "flex",
          width: "100%",
        }}
      >
        <Box
          component="main"
          sx={{
            overflow: "auto",
            width: "100%",
            marginTop: `${
              isDesktop ? BAR_HEIGHT_DESKTOP + 20 : BAR_HEIGHT_MOBILE + 15
            }px`,
            paddingTop: `${isDesktop ? theme.spacing(5) : 0}`,
            paddingBottom: theme.spacing(5),
            [theme.breakpoints.up("md")]: {
              marginTop: `${isDesktop ? DRAWER_HEIGHT + 160 : DRAWER_HEIGHT}px`,
              paddingRight: theme.spacing(2),
            },
          }}
        >
          <Box px={isDesktop ? 4 : 2}>
            {children}
            <Footer club={props.club} />
          </Box>
        </Box>
      </Box>
    </ScrollbarWrapper>
  );
}
