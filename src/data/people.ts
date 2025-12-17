import type { GetImageResult } from "astro";

export interface Person {
    name: string;
    bio: string;
    imageKey: string;
  }

export interface PersonComponent extends Person{
  img: GetImageResult
}

export const jerry: Person = {
    name: "Jerry",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageKey: "jerry.jpg",
  };
  
  export const timmy: Person = {
    name: "Timmy",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageKey: "timmy.png",
  };
  
  export const linda: Person = {
    name: "Linda",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageKey: "linda.png",
  };
  
  export const abigail: Person = {
    name: "Abigail",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageKey: "abigail.png",
  };
  
  export const olivia: Person = {
    name: "Olivia",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageKey: "olivia.png",
  };
  
  export const kaylee: Person = {
    name: "Kaylee",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageKey: "kaylee.png",
  };
  
  export const claire: Person = {
    name: "Claire",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageKey: "claire.png",
  };
  
  export const anna: Person = {
    name: "Anna",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageKey: "anna.png",
  };
  
  export const ranin: Person = {
    name: "Ranin",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageKey: "ranin.png",
  };
  
  export const lucy: Person = {
    name: "Lucy",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageKey: "lucy.png",
  };
  
  export const tq: Person = {
    name: "TongQin",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageKey: "tq.png",
  };
  
  export const nora: Person = {
    name: "Nora",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageKey: "nora.png",
  };
  
  export const ethan: Person = {
    name: "Ethan",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageKey: "ethan.png",
  };
  
  export const harry: Person = {
    name: "Harry",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageKey: "harry.png",
  };
  
  export const leo: Person = {
    name: "Leo",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageKey: "leo.png",
  };
  
  export const anni: Person = {
    name: "Anni",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageKey: "anni.png",
  };

  export const jonathan: Person = {
    name: "Jonathan",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageKey: "jonathan.png",
  };

  export const jake: Person = {
    name: "Jake",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageKey: "jake.png",
  };

  export const lucas: Person = {
    name: "Lucas",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageKey: "lucas.png",
  };

  export const max: Person = {
    name: "Max",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageKey: "max.png",
  };