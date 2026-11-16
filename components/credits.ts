export type Credit = {
  subject: string;
  author: string;
  licence: string;
  licenceUrl: string;
  fileUrl: string;
  changes: string;
};

export const credits: readonly Credit[] = [
  {
    subject: "Kakatiya torana",
    author: "Ms Sarah Welch",
    licence: "CC0 1.0",
    licenceUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    fileUrl:
      "https://commons.wikimedia.org/wiki/File:A_torana,_gate_to_sacred_precinct,_Warangal_Fort_Park_and_Museum,_Telangana,_India_-_7.jpg",
    changes: "Cropped, traced to vector and split into layers.",
  },
  {
    subject: "Buddha at Hussain Sagar",
    author: "iMahesh",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    fileUrl: "https://commons.wikimedia.org/wiki/File:Monolithic_Buddha_statue_in_Hussain_Sagar,_Hyderabad.jpg",
    changes:
      "Cropped, converted to grayscale with red accents, traced to vector and split into layers. This traced version is shared under CC BY-SA 4.0.",
  },
];
