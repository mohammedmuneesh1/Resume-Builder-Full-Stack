
const ResumeSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true,
    },







    projects:[
        {
        title:{
             type: String,
             trim:true,
             required: true,
             maxlength:[300,'Title cannot exceed 300 characters'], 
            },
        description:{
            type:String,
            trim:true,
            maxlength:[2000,'Description cannot exceed 2000 characters']
        },
        github:{
            type:String,
            trim: true,
            validate: {
                validator: function(v) {
                    return !v || /^(https?:\/\/)?(www\.)?github\.com\/\w+$/.test(v);
                },
                message: 'Invalid GitHub URL format'
            }
        },
        projectLink:{
            type:String,
            trim:true,
            validate:{
            validator: function (v: string) {
  if (!v) return true;
  try {
    new URL(v);
    return true;
  } catch {
    return false;
  }
},
message: 'Invalid project link format'
},
},

liveDemo:{
type:String,
trim:true,
validate:{
validator: function (v: string) {
  if (!v) return true;
  try {
    new URL(v);  // check if it's a valid URL
    return true;
  } catch {
    return false;
  }
},
message: 'Invalid live demo link format'
},
},
technologies: [{
            type: String,
            trim: true,
            maxlength: [50, 'Technology name cannot exceed 50 characters']
}],
order:{
    type: Number,
    default: 0
    },
      status: { // ADD: Project status
            type: String,
            enum: ['completed', 'in-progress', 'archived'],
            default: 'completed'
        },
    highlights: [String],
}
],



    certifications:[{
        name: {
             type: String, 
             trim:true,
             maxlength:[200,'Certification name cannot exceed 200 characters'],
            required: true 
        },
        issuer:{
            type: String,
            trim:true,
            maxlength:[200,'Issuer cannot exceed 200 characters'],
        },
        issueDate:Date,
        expiryDate:Date,
        year:String,
         credentialUrl:{
            type:String,
            trim:true,
            lowercase:true,
          validate:{
               validator: function (v: string) {
                if (!v) return true;
  try {
    new URL(v);  // check if it's a valid URL
    return true;
  } catch {
    return false;
  }
},
message: 'Invalid live demo link format'
},
},
order: {
    type: Number,
    default: 0,
},
credentailId:String,
}],
    languages:[
        {
        name: { type: String, required: true ,trim: true,},
        proficiency: {
          type: String,
          enum: ["beginner", "intermediate", "advanced","Fluent", "native",],
          default:'Intermediate'
        },
        order:{
            type:Number,
            default:0,
        },
        }
    ],

    interests:[{
        type:String,
        trim:true,
        maxlength:[200,'Interest cannot exceed 200 characters'],
    }],

    hobbies:[{
        type:String,
        trim:true,
        maxlength:[200,'Hobby cannot exceed 200 characters'],
    }],

    awards: [{
        title: {
            type: String,
            required: true,
            trim: true
        },
        issuer: String,
        date: Date,
        description: String,
        order: {
            type: Number,
            default: 0
        }
    }],

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






    isPublic: { type: Boolean, default: false , index:true },
    publicUrl: {
         type: String,
          unique: true,
           sparse: true

         },
    downloadCount: { type: Number, default: 0, min:0 },
    viewCount: { type: Number, default: 0 , min:0 },
    shareCount:{
        type:Number,
        default:0,
        min:0,
    },
    lastDownloadedAt: Date,
    lastViewedAt: Date,
    isDeleted:{
        type:Boolean,
        default:false
    },
     deletedAt: Date,

    version:{
     type: Number, default: 1 
    },

},{
    timestamps:true
});

ResumeSchema.index({ userId: 1, createdAt: -1 });
// Text index for search functionality
ResumeSchema.index({
    title: 'text',
    'profileInfo.fullName': 'text',
    'profileInfo.designation': 'text',
    'profileInfo.summary': 'text'
});



// const ResumeModel =  mongoose.models.Resume || mongoose.model<Resume>("Resume", ResumeSchema);
const ResumeModel =  mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);
export default ResumeModel;





