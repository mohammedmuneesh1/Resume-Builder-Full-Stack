export interface ProfileInfo {
  profileImg: string | null;
  profilePreviewUrl?: string;
  fullName: string;
  designation: string;
  summary: string;
}


export interface TemplateConfig {
  theme: string;
  colorPalette?: string[];
  fontFamily?: string;
  fontSize?: string;
  spacing?: string;
  layout?: string;
}


export interface ContactInfo {
  email?: string;
  phone?: string;
  location?: string;
  linkedIn?: string;
  github?: string;
  website?: string;
  twitter?: string;
}


export interface WorkExperience {
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string;
  currentlyWorking?: boolean;
  highlights?: string[];
  order?: number;
}



export interface Education {
  degree?: string;
  institution?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  currentlyStudying?: boolean;
  grade?: string;
  description?: string;
  achievements?: string[];
  order?: number;
}




export interface SkillsObjInterface {
          name:string,
          progress:number,
          subSkills?:string;
          category?:string,
}




export interface ProjectsResumeObjInterface{
                title:string;
                subtitle?:string;
                startDate?: string;
                endDate?:string;
                description?:string;
                github?:string;
                projectLink?:string;
                liveDemo?: string;
                technologies?: string[];
                order?: number;
                status?: string;
                highlights?: string[];
}



export interface CertificationsObjInterface{
            name:string;
            issuer:string;
            issueDate?:string;
            expiryDate?:string;
            year?:string | number;
            order?:number;
            credentialUrl?:string;
            credentailId?:string;
}


export interface LanguagesObjInterface{
            name:string;
            proficiency:number;
            order?:number;
};







export interface ResumeDataInterface{
  userId?: string ;
  title: string;
  thumbnailLink?: string;

  profileInfo: ProfileInfo;
  template: TemplateConfig;
  contactInfo: ContactInfo;

  workExperience: WorkExperience[];
  education: Education[];
  skills: SkillsObjInterface[];
  projects: ProjectsResumeObjInterface[];
  certifications: CertificationsObjInterface[];
  languages: LanguagesObjInterface[];

  interests?: string[];
  hobbies?: string[];
}