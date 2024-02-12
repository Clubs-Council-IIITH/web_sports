"use client";

import Link from "next/link";

import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Icon from "components/Icon";
import { BUG_REPORT_URL } from "components/Layout";

export default function GlobalError({ error, reset }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Container
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
      }}
    >
      <Stack direction="column" spacing={4} alignItems="center">
        <Stack direction="row" spacing={3} alignItems="center">
          <Icon
            external
            variant="fluent-emoji-flat:crying-face"
            sx={{ width: 150, height: 150 }}
          />
          <Typography variant={isDesktop ? "h2" : "h3"}>
            Oh no! Something went wrong.
          </Typography>
        </Stack>

        <Stack direction="column" spacing={2} alignItems="center">
          <Typography variant="body1">
            If you weren't expecting to see this,{" "}
            <Link href={BUG_REPORT_URL}>report it to our dev team</Link> along
            with the error details below so we can get it fixed ASAP!
          </Typography>

          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              color="secondary"
              component={Link}
              href="/"
              startIcon={<Icon variant="home-outline" />}
            >
              Go Home
            </Button>
            <Button
              onClick={reset}
              variant="outlined"
              color="secondary"
              startIcon={<Icon variant="refresh-rounded" />}
            >
              Retry
            </Button>
          </Stack>
        </Stack>

        <Alert severity="error" sx={{ mt: 8, maxWidth: "80vw" }}>
          <AlertTitle>
            {error?.name} {error?.digest}
          </AlertTitle>
          <Typography variant="body1" gutterBottom mb={2}>
            {error?.message}
          </Typography>
          <Typography variant="overline">Stacktrace</Typography>
          {error?.stack.split("\n").map((line, i) => (
            <Typography
              variant="body2"
              fontFamily="monospace"
              key={i}
              ml={i > 0 ? 2 : 0}
            >
              {line}
            </Typography>
          ))}
        </Alert>
      </Stack>
    </Container>
  );
}
