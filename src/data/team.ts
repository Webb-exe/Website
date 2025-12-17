import * as people from "./people";

interface TeamMember extends people.Person {
  role: string;
}

interface TeamSubteam {
  name: string;
  description: string;
  members: TeamMember[];
}



export const executiveLeadership: TeamSubteam = {
  name: "Executives",
  description:
    "The executive leadership team oversees the direction, strategy, and operations of the organization. They coordinate across all subteams, manage long-term planning, and ensure the team operates effectively both on and off the field.",
  members: [
    {
      ...people.jerry,
      role: "Lead Captain · Overall Leadership, Strategy & Operations",
    },
    { ...people.timmy, role: "Captain · Business Lead & Game Strategist" },
    { ...people.linda, role: "Captain · Team Coordinator" },
    { ...people.abigail, role: "Captain · Operations & Team Support" },
  ],
};

export const mechanical: TeamSubteam = {
  name: "Mechanical",
  description:
    "The mechanical team designs, builds, and refines the robot's physical systems. This includes drivetrain, mechanisms, and structural components, with an emphasis on durability, efficiency, and precision.",
  members: [
    { ...people.jerry, role: "Lead Mechanical & Lead 3D modeler" },
    { ...people.olivia, role: "Mechanical Member" },
    { ...people.abigail, role: "Mechanical Member" },
    { ...people.leo, role: "Mechanical Member & 3D modeler" },
    { ...people.anni, role: "Mechanical Member" },
    { ...people.ethan, role: "Mechanical Member" },
    { ...people.kaylee, role: "Mechanical Member" },
    { ...people.tq, role: "Mechanical Member" },
  ],
};

export const programming: TeamSubteam = {
  name: "Software",
  description:
    "The software team develops and maintains all robot code, including control systems, automation, and sensor integration. They focus on reliability, performance, and rapid iteration throughout the season.",
  members: [
    { ...people.timmy, role: "Lead Programmer" },
    { ...people.linda, role: "Software Mentor" },
    { ...people.nora, role: "Software Member" },
    { ...people.harry, role: "Software Member" },
    { ...people.claire, role: "Software Member" },
    { ...people.ranin, role: "Software Member" },
  ],
};

export const outreach: TeamSubteam = {
  name: "Outreach",
  description:
    "The outreach team connects the organization with the broader community through events, partnerships, and education initiatives. They manage sponsorships, public engagement, and represent the team beyond competitions.",
  members: [
    { ...people.linda, role: "Outreach Lead & Manager" },
    { ...people.abigail, role: "Outreach Lead" },
    { ...people.nora, role: "Outreach Lead" },
    { ...people.timmy, role: "Outreach Manager" },
    { ...people.ethan, role: "Outreach Supervisor" },
    { ...people.lucy, role: "Outreach & Portfolio Artist" },
    { ...people.ranin, role: "Outreach Project Manager" },
    { ...people.kaylee, role: "Outreach Project Manager" },
    { ...people.claire, role: "Outreach Project Manager" },
    { ...people.anna, role: "Outreach Project Manager" },
  ],
};

export const social: TeamSubteam = {
  name: "Social",
  description:
    "The social team manages the team's public presence and storytelling through media, content creation, and online platforms. They highlight achievements, document the season, and help build the team’s identity.",
  members: [
    { ...people.anna, role: "Social Media Manager" },
    { ...people.tq, role: "Social Media Manager" },
    { ...people.timmy, role: "Social Supervisor" },
  ],
};

export const matchday: TeamSubteam = {
  name: "Matchday",
  description:
    "The matchday team runs drive-team execution and on-field performance. They handle robot operation, quick decision-making, and real-time coordination to maximize scoring and consistency during matches.",
  members: [
    { ...people.jerry, role: "Lead Driver" },
    { ...people.anni, role: "Driver" },
    { ...people.timmy, role: "Coach" },
    { ...people.olivia, role: "Human Player" },
    { ...people.kaylee, role: "Scout" },
  ],
};

export const alumni: TeamSubteam = {
  name: "Alumni",
  description:
    "The alumni team is a group of past members who have graduated from the team. They are still involved in the team and help with the team's operations.",
  members: [
    { ...people.jonathan, role: "Alumni" },
    { ...people.jake, role: "Alumni" },
    { ...people.lucas, role: "Alumni" },
    // { ...people.max, role: "Alumni" },
  ],
};

export const teams: TeamSubteam[] = [
  executiveLeadership,
  mechanical,
  programming,
  outreach,
  social,
  matchday,
  alumni,
];
