// ====================
// Cloudinary Upload Middleware
// ====================
interface CloudinaryUploadOptions {
  folderName?: string;
  uploadInBackground?: boolean;
}

export const uploadToCloudinary = (options: CloudinaryUploadOptions = {}) => {
  const { folderName = 'test', uploadInBackground = false } = options;

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let files: Express.Multer.File[] = [];

    if (req.file) {
      files = [req.file];
    } else if (Array.isArray(req.files)) {
      files = req.files;
    } else if (typeof req.files === 'object' && !Array.isArray(req.files)) {
      files = Object.values(req.files).flat();
    }

    if (files.length === 0) return next();

    const uploadPromise = async () => {
      try {
        const uploadedFiles = await Promise.all(
          files.map(
            file =>
              new Promise<any>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                  {
                    folder: `${process.env.CLOUDINARY_PARENT_FOLDER}/${folderName}`,
                    resource_type: 'auto',
                    transformation: [
                      { quality: 'auto:good' },
                      { fetch_format: 'auto' }
                    ]
                  },
                  (error, result) => {
                    if (error) return reject(error);

                    resolve({
                      asset_id: result!.asset_id,
                      cloudinaryKey: result!.public_id,
                      path: result!.secure_url,
                      ...(result!.resource_type === 'image' && {
                        width: result!.width,
                        height: result!.height
                      }),
                      localFileName: file.originalname ?? '',
                      uploadedFileName: result!.display_name ?? '',
                      storageType: 'cloudinary',
                      mimeType: `${result!.resource_type}/${result!.format}`,
                      mediaType: 'userProfile',
                      size: file.size
                    });
                  }
                );

                streamifier.createReadStream(file.buffer).pipe(uploadStream);
              })
          )
        );

        return uploadedFiles;
      } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
      }
    };

    if (uploadInBackground) {
      // Store files temporarily in request for background processing
      req.body.pendingFiles = files;
      next();

      // Upload in background (fire and forget)
      uploadPromise()
        .then(uploadedFiles => {
          // console.log('Background upload completed:', uploadedFiles);
          // Here you could update the user record with the image URLs
          // This requires having the user ID from the registration
        })
        .catch(error => {
          console.error('Background upload failed:', error);
          // Implement retry logic or notification system
        });
    } else {
      // Synchronous upload
      try {
        const uploadedFiles = await uploadPromise();
        req.body.cloudinaryFiles = uploadedFiles;
        next();
      } catch (error: any) {
        console.error('Cloudinary upload error:', error);
        return ResponseHandler(
          res,
          500,
          false,
          null,
          'Failed to upload image to cloud storage'
        );
      }
    }
  };
};

// ====================
// Usage Examples
// ====================

// Example 1: Profile image with compression (blocking upload)
/*
router.route('/user/registration').post(
  multerUploadMiddleware({
    type: 'single',
    fieldName: 'image',
    isOptional: true,
    maxSizeMB: 7,
    compress: true,
    compressionOptions: {
      maxWidth: 1024,
      maxHeight: 1024,
      quality: 80
    }
  }),
  uploadToCloudinary({
    folderName: '/profile',
    uploadInBackground: false
  }),
  tryCatch(userRegisterFn)
);
*/

// Example 2: Fast registration with background upload
/*
router.route('/user/registration-fast').post(
  multerUploadMiddleware({
    type: 'single',
    fieldName: 'image',
    isOptional: true,
    compress: true
  }),
  uploadToCloudinary({
    folderName: '/profile',
    uploadInBackground: true  // Upload after response sent
  }),
  tryCatch(userRegisterFn)
);
*/

// Example 3: Multiple images
/*
router.route('/post/create').post(
  multerUploadMiddleware({
    type: 'array',
    fieldName: 'images',
    maxCount: 5,
    maxSizeMB: 5,
    compress: true,
    compressionOptions: {
      maxWidth: 1920,
      quality: 85
    }
  }),
  uploadToCloudinary({
    folderName: '/posts'
  }),
  tryCatch(createPostFn)
);
*/




//background user image upload 

uploadPromise()
  .then(async (uploadedFiles) => {
    const userId = req.body.userId;
    if (!userId) return;

    // Save file(s) to media collection
    const media = await MediaModel.create(uploadedFiles);

    // Update user profile image
    await UserModel.findByIdAndUpdate(userId, {
      profileImg: media[0]._id
    });

    console.log("Background upload completed & user updated");
  })
  .catch(error => {
    console.error('Background upload failed:', error);
  });




  