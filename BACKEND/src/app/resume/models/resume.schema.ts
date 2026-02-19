import mongoose, { Document } from "mongoose";

// interface Resume extend Document {

// }

const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      description: "title will be the name of the resume",
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    // slug:{
    //      type:String,
    //      unique: true,
    //      index: true,
    //     sparse: true,
    //     lowercase:true,
    //     trim:true,
    // },
    thumbnailLink: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: "Invalid URL format",
      },
    },


    
    template: {
      theme: {
        type: String,
        // enum: ["modern", "classic", "minimal", "creative", "professional"],
        // default: "modern",  //THIS VALUES ARE FAKE AND HAS NO CONNECTION WITH CORRECT
      },
      colorPalette: [
        {
          // FIX: Typo "colorPalatte"
          type: String,
          validate: {
            validator: function (v: string) {
              return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v);
            },
            message: "Invalid hex color format",
          },
        },
      ],
      fontFamily: {
        type: String,
      },
      fontSize: {
        type: String,
        // enum: ['small', 'medium', 'large'],
        // default: 'medium'
      },
      spacing: {
        type: String,
        // enum: ['compact', 'normal', 'spacious'],
        // default: 'normal'
      },

      layout: String,
    },





    profileInfo: {
      profilePreviewUrl: {
        type: String,
      },
      profileImg: {
        type: mongoose.Schema.Types.Mixed,
        ref: "Media",
        default: null,
      },
      fullName: {
        type: String,
        // required:true,
        trim: true,
        maxlength: [100, "Name cannot exceed 100 characters"],
      },

      designation: {
        type: String,
        trim: true,
        maxlength: [100, "Designation cannot exceed 100 characters"],
      },
      summary: {
        type: String,
        trim: true,
        maxlength: [1000, "Summary cannot exceed 1000 characters"],
      },
    },

    // =============== RESUME CONTACT INFORMATION SECTION START =================

    contactInfo: {
      email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: {
          validator: function (v) {
            return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
          },
          message: "Invalid email format",
        },
      },
      phone: {
        type: String,
        trim: true,
        validate: {
          validator: function (v) {
            return !v || /^[\d\s\-\+\(\)]+$/.test(v);
          },
          message: "Invalid phone format",
        },
      },
      location: {
        type: String,
        trim: true,
        maxlength: [200, "Location cannot exceed 200 characters"],
      },
      linkedIn: {
        type: String,
        trim: true,
        // validate: {
        //   validator: function (v) {
        //     return !v || /^(https?:\/\/)?(www\.)?linkedin\.com\/\w+$/.test(v);
        //   },
        //   message: "Invalid LinkedIn URL format",
        // },
      },
      github: {
        type: String,
        trim: true,
        // validate: {
        //   validator: function (v) {
        //     return !v || /^(https?:\/\/)?(www\.)?github\.com\/\w+$/.test(v);
        //   },
        //   message: "Invalid GitHub URL format",
        // },
      },
      website: {
        type: String,
        trim: true,
        validator: function (v: string) {
          if (!v) return true;
          try {
            new URL(v);
            return true;
          } catch {
            return false;
          }
        },
      },
      twitter: {
        type: String,
        trim: true,
        // validate: {
        //   validator: function (v) {
        //     return !v || /^(https?:\/\/)?(www\.)?twitter\.com\/\w+$/.test(v);
        //   },
        //   message: "Invalid Twitter URL format",
        // },
      },
    },

    //=============== RESUME CONTACT INFORMATION SECTION END =================

    //=============== WORK EXPERIENCE START =================

    workExperience: [
      {
        company: {
          type: String,
          trim: true,
          required: true,
          maxlength: [150, "Company name cannot exceed 150 characters"],
        },
        role: {
          type: String,
          required: true,
          trim: true,
          maxlength: [150, "Role cannot exceed 150 characters"],
        },
        location: {
          type: String,
          trim: true,
          maxlength: [150, "Location cannot exceed 150 characters"],
        },

        startDate: Date,
        endDate: Date,
        currentlyWorking: { type: Boolean, default: false },
        description: {
          type: String,
          trim: true,
          maxlength: [2000, "Description cannot exceed 2000 characters"],
        },
       highlights: [String],
        order: {
          type: Number,
          default: 0,
        },
      },
    ],

    //=============== WORK EXPERIENCE END =================

    //=============== EDUCATION SECTION START =================

    education: [
      {
        degree: {
          type: String,
          trim: true,
          required: true,
          maxlength: [200, "Degree cannot exceed 200 characters"],
        },
        institution: {
          type: String,
          trim: true,
          required: true,
          maxlength: [200, "Institution cannot exceed 200 characters"],
        },
        location: {
          type: String,
          trim: true,
          maxlength: [150, "Location cannot exceed 150 characters"],
        },
        currentlyStudying: { type: Boolean, default: false },
        startDate: Date,
        endDate: Date,
        grade: {
          type: String,
          trim: true,
          maxlength: [50, "Grade cannot exceed 50 characters"],
        },
        description: {
          type: String,
          trim: true,
          maxlength: [2000, "Description cannot exceed 1000 characters"],
        },
        achievements: [String],
        order: {
          type: Number,
          default: 0,
        },
      },
    ],

    //=============== EDUCATION SECTION END ====================

    //=============== SKILLS SECTION START ====================
    skills: [
      {
        name: {
          type: String,
          trim: true,
          required: true,
          maxlength: [200, "Skill name cannot exceed 200 characters"],
        },
        progress: {
          type: Number,
          min: 0,
          max: 100,
          default: 50,
        },
        category: {
          type: String,
        },
        yearsOfExperience: Number, // ADD: Optional
        // order: {
        //     type: Number,
        //     default: 0
        // }
        // progress:Number,
      },
    ],
    //=============== SKILLS SECTION END ====================

    projects: [
      {
        title: {
          type: String,
          trim: true,
          required: true,
          maxlength: [300, "Title cannot exceed 300 characters"],
        },
        subtitle: {
          type: String,
          maxlength: [300, "Subtitle cannot exceed 300 characters"],
        },
        description: {
          type: String,
          trim: true,
          maxlength: [2000, "Description cannot exceed 2000 characters"],
        },
        startDate:{
          type:Date
        },
        endDate:{
          type:Date
        },

        github: {
          type: String,
          trim: true,
          // validate: {
          //   validator: function (v) {
          //     return !v || /^(https?:\/\/)?(www\.)?github\.com\/\w+$/.test(v);
          //   },
          //   message: "Invalid GitHub URL format",
          // },
        },
        projectLink: {
          type: String,
          trim: true,
          validate: {
            validator: function (v: string) {
              if (!v) return true;
              try {
                new URL(v);
                return true;
              } catch {
                return false;
              }
            },
            message: "Invalid project link format",
          },
        },

        liveDemo: {
          type: String,
          trim: true,
          validate: {
            validator: function (v: string) {
              if (!v) return true;
              try {
                new URL(v); // check if it's a valid URL
                return true;
              } catch {
                return false;
              }
            },
            message: "Invalid live demo link format",
          },
        },
        technologies: [
          {
            type: String,
            trim: true,
            maxlength: [50, "Technology name cannot exceed 50 characters"],
          },
        ],
        order: {
          type: Number,
          default: 0,
        },
        status: {
          // ADD: Project status
          type: String,
          enum: ["completed", "in-progress", "archived"],
          default: "completed",
        },
        highlights: [String],
      },
    ],

    certifications: [
      {
        name: {
          type: String,
          trim: true,
          maxlength: [200, "Certification name cannot exceed 200 characters"],
          required: true,
        },
        issuer: {
          type: String,
          trim: true,
          maxlength: [200, "Issuer cannot exceed 200 characters"],
        },
        issueDate: Date,
        expiryDate: Date,
        year: String,
        credentialUrl: {
          type: String,
          trim: true,
          lowercase: true,
          validate: {
            validator: function (v: string) {
              if (!v) return true;
              try {
                new URL(v); // check if it's a valid URL
                return true;
              } catch {
                return false;
              }
            },
            message: "Invalid live demo link format",
          },
        },
        order: {
          type: Number,
          default: 0,
        },
        credentailId: String,
      },
    ],
    languages: [
      {
        name: { type: String, required: true, trim: true },
        proficiency:{
              type: Number,
          min: 0,
          max: 100,
          default: 50,
        },
        // proficiency: {
        //   type: String,
        //   enum: ["beginner", "intermediate", "advanced", "Fluent", "native"],
        //   default: "Intermediate",
        // },
        order: {
          type: Number,
          default: 0,
        },
      },
    ],

    interests: [
      {
        type: String,
        trim: true,
        maxlength: [200, "Interest cannot exceed 200 characters"],
      },
    ],

    hobbies: [
      {
        type: String,
        trim: true,
        maxlength: [200, "Hobby cannot exceed 200 characters"],
      },
    ],

    awards: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        issuer: String,
        date: Date,
        description: String,
        order: {
          type: Number,
          default: 0,
        },
      },
    ],

    //   publications: [{
    //     title: {
    //         type: String,
    //         required: true,
    //         trim: true
    //     },
    //     publisher: String,
    //     date: Date,
    //     url: String,
    //     description: String,
    //     order: {
    //         type: Number,
    //         default: 0
    //     }
    // }],

    // volunteerWork: [{
    //     organization: {
    //         type: String,
    //         required: true,
    //         trim: true
    //     },
    //     role: String,
    //     startDate: Date,
    //     endDate: Date,
    //     currentlyVolunteering: {
    //         type: Boolean,
    //         default: false
    //     },
    //     description: String,
    //     order: {
    //         type: Number,
    //         default: 0
    //     }
    // }],

    isPublic: { type: Boolean, default: false, index: true },
    publicUrl: {
      type: String,
      unique: true,
      sparse: true,
    },
    downloadCount: { type: Number, default: 0, min: 0 },
    viewCount: { type: Number, default: 0, min: 0 },
    shareCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastDownloadedAt: Date,
    lastViewedAt: Date,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
    version: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

ResumeSchema.index({ userId: 1, createdAt: -1 });
// Text index for search functionality
ResumeSchema.index({
  title: "text",
  "profileInfo.fullName": "text",
  "profileInfo.designation": "text",
  "profileInfo.summary": "text",
});

// const ResumeModel =  mongoose.models.Resume || mongoose.model<Resume>("Resume", ResumeSchema);
const ResumeModel =
  mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);
export default ResumeModel;
