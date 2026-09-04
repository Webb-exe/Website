// Herizon STEM 2026 conference details. Edit here to update the page.
export const herizon = {
  name: "Herizon STEM",
  year: "2026",
  tagline: "A conference to inspire the next generation of women in STEM.",
  dateLabel: "Sunday, November 15, 2026",
  timeLabel: "12:30 – 6:00 pm",
  venue: "Harvey Mudd College",
  addressLines: ["301 Platt Blvd.", "Claremont, CA 91711"],
  mapsUrl: "https://maps.google.com/?q=301+Platt+Blvd,+Claremont,+CA+91711",
  mapsEmbedUrl: "https://www.google.com/maps?q=301+Platt+Blvd,+Claremont,+CA+91711&z=16&output=embed",
  // Google Calendar deep link; times are local to Claremont.
  calendarUrl:
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=Herizon+STEM+2026" +
    "&dates=20261115T123000/20261115T180000&ctz=America/Los_Angeles" +
    "&location=301+Platt+Blvd,+Claremont,+CA+91711" +
    "&details=A+conference+to+inspire+the+next+generation+of+women+in+STEM.+Presented+by+Harvey+Mudd+Society+of+Women+Engineers+and+FTC+359+Webb.exe.",
  presenters: [
    {
      name: "Harvey Mudd Society of Women Engineers",
      short: "HMC SWE",
      logo: "/swe-hmc.png",
      url: "https://sites.google.com/view/hmcswe/",
    },
    {
      name: "FTC 359 Webb.exe",
      short: "359 Webb.exe",
      logo: "/logo-stacked.svg",
      url: "/",
    },
  ],
} as const;
