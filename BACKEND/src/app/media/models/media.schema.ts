
import mongoose from "mongoose";

const mediaFileSchema = new mongoose.Schema(
  {
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:false,
    },
    path: {
      type: String,
      required: true,
    },
    isPrivate:{
      type:Boolean,
      default:false
    },
    localFileName:{
      type:String,
    },
    uploadedFileName:{
      type:String,
    },
    mediaType:{
      type:String,
      // enum:['profile']
    },
    height:{
      type:Number,
    },
    width:{
      type:Number,
    },
    storageType: {
      type: String,
      required: true,
      enum: ["local", "s3","cloudinary"],
    },

    cloudinaryKey:{
      type:String,
    },
    s3Key: {
      type: String,
    },
    duration:{
      type:Number,
    },
    mimeType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const MediaModel = mongoose.models.Media || mongoose.model("Media", mediaFileSchema);
export default MediaModel;





