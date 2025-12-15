interface Person {
    name: string;
    bio: string;
    imageSrc: string;
}

interface TeamMember extends Person {
    role: string;
}

interface TeamSubteam {
    name: string;
    description: string;
    members: TeamMember[];
}

export const jerry: Person = {
  name: "Jerry",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  imageSrc: "/team/jerry.png",
};

export const linda: Person = {
    name: "Linda",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageSrc: "/team/linda.png",
};

export const timmy: Person = {
    name: "Timmy",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageSrc: "/team/timmy.png",
};

export const abigail: Person = {
    name: "Abigail",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageSrc: "/team/abigail.png",
};

export const executiveLeadership: TeamSubteam = {
    name: "Executives",
    description:
        "The executive leadership team oversees the direction, strategy, and operations of the organization. They coordinate across all subteams, manage long-term planning, and ensure the team operates effectively both on and off the field.",
        members: [
            {
                ...jerry,
                role: "Lead Captain · Overall Leadership, Strategy & Operations"
            },
            {
                ...linda,
                role: "Captain · Team Coordinator"
            },
            {
                ...timmy,
                role: "Captain · Business Lead & Game Strategist"
            },
            {
                ...abigail,
                role: "Captain · Operations & Team Support"
            },
        ]
};

export const programming: TeamSubteam = {
    name: "Software",
    description:
        "The software team develops and maintains all robot code, including control systems, automation, and sensor integration. They focus on reliability, performance, and rapid iteration throughout the season.",
    members: [
        { ...timmy, role: "Software Lead" },
        {...linda, role: "Software Mentor/Alumni"}
    ]
};

export const mechanical: TeamSubteam = {
    name: "Mechanical",
    description:
        "The mechanical team designs, builds, and refines the robot's physical systems. This includes drivetrain, mechanisms, and structural components, with an emphasis on durability, efficiency, and precision.",
    members: [
        { ...jerry, role: "Mechanical Lead" },
        {...abigail, role: "Mechanical Member"}
    ]
};

export const outreach: TeamSubteam = {
    name: "Outreach",
    description:
        "The outreach team connects the organization with the broader community through events, partnerships, and education initiatives. They manage sponsorships, public engagement, and represent the team beyond competitions.",
    members: [
        { ...linda, role: "Outreach Lead & Supervisor" },
        { ...abigail, role: "Outreach Lead" },
        { ...timmy, role: "Outreach Supervisor" }
    ]
};

export const social: TeamSubteam = {
    name: "Social",
    description:
        "The social team manages the team's public presence and storytelling through media, content creation, and online platforms. They highlight achievements, document the season, and help build the team’s identity.",
    members: [
        { ...timmy, role: "Social Supervisor" }
    ]
};

export const teams: TeamSubteam[] = [
    executiveLeadership,
    mechanical,
    programming,
    outreach,
    social,
];
