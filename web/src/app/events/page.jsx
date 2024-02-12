import { Box } from "@mui/material";
import EventsFilter from "components/events/EventsFilter";

import EventsGrid from "components/events/EventsGrid";

const CLUB_ID = process.env.NEXT_PUBLIC_CLUB_ID || "nss";

export const metadata = {
  title: "Events",
};

export default async function Events({ searchParams }) {
  const targetName = searchParams?.name;
  const targetClub = CLUB_ID;
  const targetState = [
    ...(searchParams?.upcoming === "true" ? ["upcoming"] : []),
    ...(searchParams?.completed === "true" ? ["completed"] : []),
  ];

  return (
    <Box>
      <Box mt={2} mb={3}>
        <EventsFilter name={targetName} club={targetClub} state={targetState} />
      </Box>
      <EventsGrid
        type="all"
        filter={(event) => {
          let selectedClub = false,
            selectedState = false,
            selectedName = false;

          // filter by club
          if (!targetClub) selectedClub = true;
          else selectedClub = event?.clubid === targetClub;

          // filter by state
          if (!targetState) selectedState = true;
          else {
            const isUpcoming = new Date(event?.datetimeperiod[1]) > new Date();
            if (targetState?.includes("upcoming") && isUpcoming)
              selectedState = true;
            if (targetState?.includes("completed") && !isUpcoming)
              selectedState = true;
          }

          // filter by name
          if (!targetName) selectedName = true;
          else
            selectedName = event?.name
              ?.toLowerCase()
              ?.includes(targetName?.toLowerCase());

          return selectedClub && selectedState && selectedName;
        }}
      />
    </Box>
  );
}
