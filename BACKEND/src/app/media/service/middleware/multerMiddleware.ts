import { NextFunction, Request, Response } from "express";
import multer from "multer";
import ResponseHandler from "../../../../utils/Response-Error-Handler/responseHandler";
import compressImageSharp from "../compressImage";

const storage = multer.memoryStorage();
type MulterUploadType = 'single' | 'array' | 'any' | 'fields' | 'none';

interface FieldConfig {
  name: string;     // The name of the input field
  maxCount: number; // Maximum files allowed for this field
}



interface multerMiddlewareOptions{
  type?:MulterUploadType,
  fieldName?:string | FieldConfig[],
  isOptional?: boolean,
  compress?: boolean,
  compressQualityToKeep?:number,    //means keep 80% quality and 20%compress 
  compressFormat?:"jpeg" | "png" | "webp" | "tiff" | "avif" | "heif" | "gif"| "raw",
  maxCount?: number,
  maxSizeMB?:number // maximum file size in MB
}

  

const multerUploadMiddleware =  (
  options:multerMiddlewareOptions
) => {
  const {
    type = "single",
  fieldName = "file",
  isOptional = true,
  compress= true,
  compressQualityToKeep=80,    //means keep 80% quality and 20%compress 
  compressFormat="webp",
  maxCount = 5,
  maxSizeMB = 7 // maximum file size in MB
  } = options;
  const upload = multer({ storage });
  let middleware;

  switch (type) {
    case "single":
      middleware = upload.single(fieldName as string);
      break;
    case "array":
      middleware = upload.array(fieldName as string, maxCount);
      break;
    case "fields":
      if (!Array.isArray(fieldName)) {
        throw new Error(
          'For "fields" type, fieldName must be an array of { name, maxCount } objects'
        );
      }
      middleware = upload.fields(fieldName);
      break;
    case "any":
      middleware = upload.any();
      break;
    case "none":
      middleware = upload.none();
      break;
    default:
      middleware = upload.single(fieldName as string);
  }

  return   (req: Request, res: Response, next: NextFunction) => {
    middleware(req, res,async (err) => {
      if (err) {
        return ResponseHandler(res, 400, false, null, err.message ?? "Image Upload Failed (M)");
      }

      const maxSizeBytes = maxSizeMB * 1024 * 1024;
       const filesToProcess: Express.Multer.File[] = [];


      if (type === "single" && req.file) {
        filesToProcess.push(req.file);
      } else if (type === "array" && Array.isArray(req.files)) {
        filesToProcess.push(...req.files);
      } else if (type === "fields" && req.files && typeof req.files === "object") {
        Object.values(req.files).forEach((arr: any) => filesToProcess.push(...arr));
      } else if (type === "any" && Array.isArray(req.files)) {
        filesToProcess.push(...req.files);
      }


      // Validate presence of files
      if (!isOptional &&  type === "single" && !req.file) {
        return ResponseHandler(res, 400, false, null, `File "${fieldName}" is required.`);
      }
      if (!isOptional &&  ["array", "any"].includes(type) && (!req.files || (Array.isArray(req.files) && req.files.length === 0))) {
        return ResponseHandler(res, 400, false, null, `Files "${fieldName}" are required.`);
      }

      if (!isOptional &&  type === "fields" && (!req.files || Object.keys(req.files).length === 0)) {
        return ResponseHandler(res, 400, false, null, `Files for the specified fields are required.`);
      }
     
      if (filesToProcess.length === 0) return next();


            // Check file size
      // for (const file of filesToProcess) {
      //   if (file.size > maxSizeBytes) {
      //     return ResponseHandler(
      //       res,
      //       400,
      //       false,
      //       null,
      //       `File "${file.originalname}" exceeds max size of ${maxSizeMB}MB.`
      //     );
      //   }
      // }

        try {
        // Validate and compress files
        for (const file of filesToProcess) {



          // Check original size
          if (file.size > maxSizeBytes) {
            return ResponseHandler(
              res,
              400,
              false,
              null,
              `File "${file.originalname}" exceeds ${maxSizeMB}MB limit`
            );
          }

          // Compress image files
          if (compress && file.mimetype.startsWith('image/')) {

            const compressed = await compressImageSharp(file.buffer,{
              quality: compressQualityToKeep|| 80,
              format: compressFormat || 'webp',
              // maxWidth: 1920,
              // maxHeight: 1920
            });


            // maxWidth: compressionOptions.maxWidth || 1920,
              // maxHeight: compressionOptions.maxHeight || 1920,
            file.buffer = compressed;
            file.mimetype = 'image/webp';
            file.originalname = file.originalname.replace(/\.[^.]+$/, '.webp');
            file.size = compressed.length;
          }
        }

        next();
      } catch (error: any) {
        console.error('File processing error:', error);
        return ResponseHandler(
          res,
          500,
          false,
          null,
          error.message || 'Failed to process files'
        );
      }
    });
  };
};
export default multerUploadMiddleware;




//PHASE-1 CODE WITHOUT FIELDS OPTION 
// const multerUploadMiddleware = (type:MulterUploadType = 'single', fieldName = 'file', maxCount?: number) => {
//   const upload = multer({ storage });
//   let middleware;
//   switch(type) {
//     case 'single':
//       middleware = upload.single(fieldName);
//       break;
//     case 'array':
//       middleware = upload.array(fieldName, maxCount);
//       break;
//     case 'any':
//       middleware = upload.any();
//       break;
//     case 'none':
//       middleware = upload.none();
//       break;
//     default:
//       middleware = upload.single(fieldName);
//   }
//   // Wrap middleware to validate file presence
//   return (req: Request, res: Response, next: NextFunction) => {
//     middleware(req, res, (err) => {
//       if (err) {
//         return ResponseHandler(res,400,false,null,err.message ?? "Image Upload Failed (M) ");
//       }
//       // Validation for empty file
//       if (type === 'single' && !req.file) {
//         return ResponseHandler(res,400,false,null, `File "${fieldName}" is required.Image Upload Failed (M) `);
//       }
//       if ((type === 'array' || type === 'any') && (!req.files || (Array.isArray(req.files) && req.files.length === 0))) {
//         return ResponseHandler(res,400,false,null, `Files "${fieldName}" are required.Image Upload Failed (M) `);
//       }
//       next();
//     });
//   };
// };
// export default multerUploadMiddleware;
