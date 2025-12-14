interface TeamMember {
    name: string;
    role: string;
    bio: string;
    imageSrc: string;
}

interface TeamSubteam {
    name: string;
    description: string;
    members: TeamMember[];
}

export const jerry: TeamMember = {
  name: "John Doe",
  role: "Team Lead",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  imageSrc: "/jerry.png",
};

export const executiveLeadership: TeamSubteam = {
    name: "Executives",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    members: [
        jerry,
        jerry,
        jerry,
    ]
};

export const programming: TeamSubteam = {
    name: "Software",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    members: [
        jerry,
        jerry,
        jerry,
    ]
};

export const mechanical: TeamSubteam = {
    name: "Mechanical",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    members: [
        jerry,
        jerry,
        jerry,
    ]
};

export const outreach: TeamSubteam = {
    name: "Outreach",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    members: [
        jerry,
        jerry,
        jerry,
    ]
};

export const social: TeamSubteam = {
    name: "Social",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    members: [
        jerry,
        jerry,
        jerry,
    ]
};


export const teams: TeamSubteam[] = [
    executiveLeadership,
    mechanical, 
    programming,
    outreach,
    social,
];