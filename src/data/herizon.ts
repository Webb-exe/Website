// Herizon STEM 2026 conference details. Edit here to update the page.
// Source: the HERizon '26 Student Packet (linked at /herizon-stem/2026/packet).
export const herizon = {
  name: "Herizon STEM",
  year: "2026",
  tagline: "A conference to inspire the next generation of women in STEM.",
  dateLabel: "Sunday, November 15, 2026",
  timeLabel: "12:00 – 4:50 pm",
  venue: "Harvey Mudd College",
  building: "Shanahan Center for Teaching and Learning",
  addressLines: ["320 E Foothill Blvd", "Claremont, CA 91711"],
  mapsUrl:
    "https://maps.google.com/?q=R.+Michael+Shanahan+Center+for+Teaching+and+Learning,+320+E+Foothill+Blvd,+Claremont,+CA+91711",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=R.+Michael+Shanahan+Center+for+Teaching+and+Learning,+320+E+Foothill+Blvd,+Claremont,+CA+91711&z=17&output=embed",
  // Short links on our site (see redirects in astro.config.mjs).
  ticketsPath: "/herizon-stem/2026/tickets",
  packetPath: "/herizon-stem/2026/packet",
  // Google Calendar deep link; times are local to Claremont.
  calendarUrl:
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=Herizon+STEM+2026" +
    "&dates=20261115T120000/20261115T165000&ctz=America/Los_Angeles" +
    "&location=Shanahan+Center,+320+E+Foothill+Blvd,+Claremont,+CA+91711" +
    "&details=A+conference+to+inspire+the+next+generation+of+women+in+STEM.+Check-in+opens+at+noon+outside+The+Cafe+at+the+Shanahan+Center.+Presented+by+Harvey+Mudd+Society+of+Women+Engineers+and+FTC+359+Webb.exe.",
  // Day-of questions, from the student packet.
  dayOf: {
    name: "Jasmine",
    phoneLabel: "(626) 655-1157",
    phoneHref: "sms:+16266551157",
    email: "ahamilton@webb.org",
  },
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
