export const welcomeMessages = [
  {
    title: "Welcome to Your Resume Builder",
    description: "Create a polished and professional resume tailored to your career goals."
  },
  {
    title: "Start Your Journey",
    description: "Build a resume that showcases your strengths and helps you stand out."
  },
  {
    title: "Your Career, Upgraded",
    description: "Design a modern, ATS-friendly resume with just a few clicks."
  },
  {
    title: "Easy. Fast. Professional.",
    description: "Generate a clean and effective resume without any technical skills."
  },
  {
    title: "Showcase Your Skills",
    description: "Highlight your experience and achievements in a structured format."
  },
  {
    title: "Make Your First Impression Count",
    description: "Craft a resume that catches recruiters’ attention instantly."
  },
  {
    title: "Build With Confidence",
    description: "Our guided builder helps you write each section step-by-step."
  },
  {
    title: "Your Resume, Your Style",
    description: "Choose templates that match your profession and personality."
  },
  {
    title: "Stand Out in the Job Market",
    description: "Create a resume that helps you secure more interviews."
  },
  {
    title: "Ready When You Are",
    description: "Start editing anytime and download your resume instantly."
  },
    {
    title: "Welcome !",
    description: "Let’s create a resume that opens doors."
  },
  {
    title: "Let’s Begin!",
    description: "Your next career step starts right here."
  },
  {
    title: "You’re Ready!",
    description: "Build a resume that reflects your best self."
  },
  {
    title: "Dream Big",
    description: "Your resume is the first chapter—let’s make it strong."
  },
  {
    title: "Start Strong",
    description: "Craft a resume that gets you noticed."
  },
  {
    title: "Let’s Do This",
    description: "Create a resume you’ll be proud to share."
  },
  {
    title: "You’ve Got This",
    description: "Build a resume that shows your real potential."
  },
  {
    title: "Make It Happen",
    description: "Your career upgrade starts with one click."
  },
  {
    title: "Believe in Yourself",
    description: "Let’s build a resume that matches your ambitions."
  },
  {
    title: "Ready to Shine?",
    description: "Showcase your skills with a clean, modern resume."
  },
  {
    title: "Welcome Aboard",
    description: "Let's craft your path to new opportunities."
  },
  {
    title: "Unlock Opportunities",
    description: "A great resume is your first step forward."
  },
  {
    title: "Build Your Future",
    description: "Create a resume that inspires confidence."
  },
  {
    title: "Your Journey Starts Now",
    description: "Let’s build something amazing together."
  },
  {
    title: "Ready to Grow?",
    description: "Show the world what you can do."
  }
];




export function welcomeMessageFn(): {
  title: string;
  description: string;
} {
    const arrLength = welcomeMessages.length;
    const randomIndex = Math.floor(Math.random() * arrLength);
    return welcomeMessages[randomIndex];
}