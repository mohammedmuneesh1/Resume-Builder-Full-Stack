import template01 from '../../public/resumeTemplates/01.webp';
import template02 from '../../public/resumeTemplates/02.webp';
import template03 from '../../public/resumeTemplates/03.webp';
import template04 from '../../public/resumeTemplates/04.webp';






export const resumeTemplates = [
  {
        id:'01',
        thumbnailImg:template01,
        colorPaletteCode:'themeOne'
    },
    {
        id:'02',
        thumbnailImg:template02,
        colorPaletteCode:'themeOne'
    }
    ,{
        id:'03',
        thumbnailImg:template03,
        colorPaletteCode:'themeTwo'
    },
    {
        id:'04',
        thumbnailImg:template04,
        colorPaletteCode:'themeThree'
    },
];


export const themeColorPalette = {
  themeOne: [
    ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"],
    ["#E9FBF8", "#B4EFE7", "#93E2DA", "#2AC9A0", "#3D4C5A"],
    ["#F5F4FF", "#E0DBFF", "#C9C2F8", "#8579D1", "#4B4B5C"],
    ["#F0FAFF", "#D6F0FF", "#AFDEFF", "#3399FF", "#445361"],
    ["#FFF5F7", "#FFE0EC", "#FAC6D4", "#F6729C", "#5A5A5A"],
    ["#F9FAFB", "#E4E7EB", "#CBD5E0", "#7F9CF5", "#2D3748"],
    ["#F4FFFD", "#D3FDF2", "#B0E9D4", "#34C79D", "#384C48"],
    ["#FFF7F0", "#FFE6D9", "#FFD2BA", "#FF9561", "#4C4743"],
    ["#F9FCFF", "#E3F0F9", "#C0DDEE", "#6CA6CF", "#46545E"],
    ["#FFFDF6", "#FFF4D7", "#FFE7A0", "#FFD000", "#57534E"],
    ["#EFFCFF", "#C8F0FF", "#99E0FF", "#007BA7", "#2B3A42"],
    ["#F7F7F7", "#E4E4E4", "#CFCFCF", "#4A4A4A", "#222222"],
    ["#E3F2FD", "#90CAF9", "#a8d2f4", "#1E88E5", "#0D47A1"],
  ],
};


export const DUMMY_RESUME_DATA = {
  title:"DUMMY_DATA",
// template:"01",
template:{
  theme:"01",
   
},
hobbiests: ["Coding", "Reading", "Playing Video Games", "Watching Movies", "Sleeping"],


  profileInfo: {
    profileImg: null,
    previewUrl: "",
    fullName: "John Doe",
    designation: "Senior Software Engineer",
    summary:
      "Passionate and results-driven developer with 6+ years of experience building f",
  },
  contactInfo: {
    email: "john.doe@example.com",
    phone: "+1234567890",
    location: '#12 Anywhere, Any City, Any Country',
    linkedin: "https://linkedin.com/timetoprogram",
    github: "https://github.com/timetoprogram",
    website: "https://timetoprogram.com",
  },
  workExperience: [
    {
      company: "Tech Solutions",
      role: "Senior Frontend Engineer",
      startDate: "2022-03",
      endDate: "2025-04",
      description:
        "Leading the frontend team to build scalable enterprise applications using Re",
    },
    {
  company: "CloudNova Systems",
  role: "Frontend Engineer",
  startDate: "2019-06",
  endDate: "2022-02",
  description:
    "Built and maintained high-traffic web applications using React, TypeScript, and Redux. Collaborated closely with designers and backend teams to ship features, optimize performance, and reduce load times by 35%.",
},
{
  company: "PixelForge Labs",
  role: "Junior Frontend Developer",
  startDate: "2017-08",
  endDate: "2019-05",
  description:
    "Developed responsive UI components using HTML, CSS, and JavaScript. Assisted in migrating legacy jQuery code to modern React architecture and fixed cross-browser compatibility issues.",
},
],
education: [
  {
    degree: "M.Sc. Software Engineering",
    institution: "Tech University",
    startDate: "2021-08",
    endDate: "2023-06",
  },
  {
    degree: "B.Sc. Computer Science",
    institution: "State University",
    startDate: "2017-08",
    endDate: "2021-05",
  },
  {
    degree: "High School Diploma",
    institution: "Central High School",
    startDate: "2015-06",
    endDate: "2017-05",
  },
],

skills: [
  { name: "JavaScript", progress: 95 },
  { name: "React", progress: 90 },
  { name: "Node.js", progress: 85 },
  { name: "TypeScript", progress: 80 },
  { name: "MongoDB", progress: 75 },
],
projects: [
  {
    title: "Project Manager App",
    description:
      "A task and team management app built with MERN stack. Includes user roles, r",
    github: "https://github.com/timetoprogram/project-manager-app",
  },
  {
    title: "E-Commerce Platform",
    description:
      "An e-commerce site built with Next.js and Stripe integration. Supports cart,",
    liveDemo: "https://ecommerce-demo.timetoprogram.com",
  },
  {
    title: "Blog CMS",
    description:
      "A custom CMS for blogging using Express and React. Includes WYSIWYG editor, r",
    github: "https://github.com/timetoprogram/blog-cms",
    liveDemo: "https://blogcms.timetoprogram.dev",
  },
],
certifications: [
  {
    name: "Full Stack Web Developer",
    issuer: "Udemy",
    year: "2023",
  },
  {
    name: "React Advanced Certification",
    issuer: "Coursera",
    year: "2022",
  },
],
languages: [
  { name: "English", proficiency: 100 },
  { name: "Spanish", proficiency: 70 },
  { name: "French", proficiency: 40 },
],
interests: ["Reading", "Open Source Contribution", "Hiking"],
};
