import { Response } from "express"

const ResponseHandler=(res:Response, status:number, success:boolean, data:unknown, response:string)=>{
 
    // Prevent double response
//   if (res.headersSent) {
//     console.warn("Warning: Response already sent. Ignoring duplicate send.");
//     return;
//   }
  
    return res.status(status).json({ success: success, data: data, response: response });
}
export default ResponseHandler;