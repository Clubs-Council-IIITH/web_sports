import dynamic from "next/dynamic";
import Link from "next/link";

import { Box, Card, CardActionArea, Typography, Stack } from "@mui/material";

import EventPoster from "components/events/EventPoster";
import EventFallbackPoster from "components/events/EventFallbackPoster";

const DateTime = dynamic(() => import("components/DateTime"), { ssr: false });

export default function EventCard({
  _id,
  name,
  datetimeperiod,
  poster,
  clubid,
}) {
  return (
    <Card>
      <CardActionArea component={Link} href={`/events/${_id}`}>
        <Box sx={{ pt: "70%", position: "relative" }}>
          {poster ? (
            <EventPoster name={name} poster={poster} width={600} height={600} />
          ) : (
            <EventFallbackPoster clubid={clubid} width={300} height={400} />
          )}
        </Box>

        <Stack spacing={1} sx={{ p: 3 }}>
          <Typography
            variant="subtitle2"
            fontSize={16}
            noWrap
            color="#461616"
          >
            {name}
          </Typography>
          <Typography
            variant="caption"
            noWrap
            color="white"
          >
            <DateTime dt={datetimeperiod?.[0]} showWeekDay={true} />
          </Typography>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
