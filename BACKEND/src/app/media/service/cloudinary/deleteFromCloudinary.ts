import cloudinary from "../../../../configs/cloudinaryConfigure";


export async function deleteFromCloudinary(public_id:string){
 await cloudinary.uploader.destroy(public_id, {
  resource_type: 'image', // or 'video', 'raw' for PDFs
});
}






