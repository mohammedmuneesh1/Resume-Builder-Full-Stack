import html2canvas from "html2canvas";
import moment from "moment";

export function validateEmail(email:string) {
  // Regular expression to validate common email formats
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}



// get lightest average color 

export const getLightColorFromImage = (imageUrl:string):Promise<string>=>{
  return new Promise((resolve,reject)=>{
    //Check if imageUrl is valid 
    if(!imageUrl || typeof imageUrl !=="string"){
     return reject(new Error('Invalid image URL')); 
    }
    const img = new Image();


    //If not a base64 string, set crossOrigin (important for CORS)
    if(!imageUrl.startsWith('data:')){
      img.crossOrigin = 'anonymous';
    }

    img.src = imageUrl;

    img.onload = ()=>{
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img,0,0);

      const imageData = ctx?.getImageData(0,0,canvas.width,canvas.height).data;
      if (!imageData) {
  throw new Error("Unable to read canvas image data");
}


      let r= 0 ,g=0 ,b=0,count=0;

      for(let i=0; i<imageData.length;i+=4){

        const red = imageData[i];
        const green = imageData[i+1];
        const blue = imageData[i+2];
        const brightness = (red + green + blue ) / 3;
        // Only count light pixels (tweak threshold as needed)

        if(brightness>180){
          r+=red;
          g+=green;
          b+=blue;
          count++;
        }

      }

if(count === 0){
  resolve('#ffffff');
}

else{

  //for light color start
  r= Math.round(r/count);
  g= Math.round(g/count);
  b= Math.round(b/count);
  //for light color end
  
  
  
  //for intensity color start
//        const boost = 2.0; // Increase color strength by 40%
// r = Math.min(255, Math.round((r / count) * boost));
// g = Math.min(255, Math.round((g / count) * boost));
// b = Math.min(255, Math.round((b / count) * boost));

  //for intensity color end



  resolve(`rgb(${r},${g},${b})`);
}




}

img.onerror = (e) => {
  console.error("❌ Failed to load image:", e);
  reject(e);
};
 })

 //NOTE 
//It loads an image → scans all pixels → finds the bright (light-colored) pixels → averages their color → returns a light color like rgb(220, 240, 250).
// This is useful for:
// ✔ generating background colors
// ✔ extracting UI theme color from cover images
// ✔ making gradients based on image brightness

// 1️⃣ Function starts — returns a Promise
// export const getLightColorFromImage = (imageUrl:string)=>{
//   return new Promise((resolve,reject)=>{
// Since loading an image is async, we wrap everything inside a Promise so we can return the result later.

//2️⃣ Validate image URL
// if(!imageUrl || typeof imageUrl !=="string"){
//   return reject(new Error('Invalid image URL')); 
// }
//If the URL is missing or not a string → stop and throw error.


// 3️⃣ Create an <img> element in JavaScript
// const img = new Image();
// This creates an image in memory (not shown on the page).

// 4️⃣ Handle CORS
// if(!imageUrl.startsWith('data:')){
//   img.crossOrigin = 'anonymous';
// }
// If the image is NOT base64 (data:), enable cross-origin loading —
// this is required to read pixel data.

// 5️⃣ Start loading the image
// img.src = imageUrl;
//The browser starts downloading the image now.

//6️⃣ Once image loads → draw it to a <canvas>
// img.onload = ()=>{
//   const canvas = document.createElement('canvas');
//   const ctx = canvas.getContext('2d');
//Canvas lets you read pixel data of the image.


// 7️⃣ Resize canvas to match image size
// canvas.width = img.width;
// canvas.height = img.height;
// Canvas must match the image size so pixel data matches properly.

// 8️⃣ Draw the image onto canvas
// ctx?.drawImage(img,0,0);
// 👉 Draw the image starting at X = 0 and Y = 0
// 👉 i.e., draw it at the top-left corner
// Now the image exists on the canvas, and you can read the pixels.


// 9️⃣ Read ALL pixels from the image
// const imageData = 
// ctx?.getImageData(0,0,canvas.width,canvas.height).data;
// imageData becomes a huge array like this:
// [r, g, b, a, r, g, b, a, r, g, b, a, ...]
// Every 4 numbers = 1 pixel.
//The imageData.data array is a flat 1-dimensional array, NOT nested.
//[255, 120, 60, 255,  200, 100, 50, 255,  10, 20, 30, 255, ...]

// index:  value:
// 0       red of pixel 1
// 1       green of pixel 1
// 2       blue of pixel 1
// 3       alpha of pixel 1

// 4       red of pixel 2
// 5       green of pixel 2
// 6       blue of pixel 2
// 7       alpha of pixel 2

// 8       red of pixel 3
// 9       green of pixel 3
// 10      blue of pixel 3
// 11      alpha of pixel 3
// So the 4 numbers belong together —
// they describe one single pixel.


// 🔄 10️⃣ Loop through EACH pixel
// for(let i=0; i<imageData.length;i+=4){

// i+=4  means 0 → 4 → 8 → 12 → ...
// 1 pixel = 4 values
// → Red
// → Green
// → Blue
// → Alpha (opacity)

// We move i by 4 each time because pixel = 4 values.

// 11️⃣ Extract RGB values of each pixel
// const red = imageData[i];
// const green = imageData[i+1];
// const blue = imageData[i+2];

// 12️⃣ Calculate pixel brightness
// const brightness = (red + green + blue ) / 3;

// If brightness is high → pixel is "light".

// 13️⃣ Count only very bright pixels
// if(brightness>180){
//   r+=red;
//   g+=green;
//   b+=blue;
//   count++;
// }

// We accumulate light pixels only.

// 14️⃣  If NO bright pixels → return white
// if(count === 0){
//   resolve('#ffffff');
// }

// 15️⃣ Otherwise → compute AVERAGE color
// r= Math.round(r/count);
// g= Math.round(g/count);
// b= Math.round(b/count);

// This gives the average bright color of the entire image.

// 16️⃣ Return final color
// resolve(`rgb(${r},${g},${b})`);


// 17️⃣ Handle image load error
// img.onerror = (e) => {
//   console.error("❌ Failed to load image:", e);
//   reject(e);
// };

// 🎉 Final Summary (Super Simple)

// This function does this:
// Loads the image
// Draws it to a canvas
// Examines ALL pixels
// Filters only light pixels
// Averages their light colors
// Returns a nice bright color like:
// rgb(240, 245, 250)

}








export const fixTailwindColors = (root: HTMLElement = document.body)=>{

//   👉 Scan the entire DOM
// 👉 Find elements whose computed styles use oklch() colors
// 👉 Replace those colors with a fallback (#000)
// Why?
// Because some environments (PDF generation, older browsers, 
// canvas, html-to-image, etc.) don’t support oklch(),
//  and rendering breaks.





  const elements = root.querySelectorAll<HTMLElement>("*");


//   Selects every single DOM element
// This is expensive but works
// Ignores the element argument you passed

//Iterates over every element in the page
  elements.forEach((el)=>{
    const style = window.getComputedStyle(el);
    // Gets the final computed CSS values (after Tailwind, browser defaults, etc.)
    // This is why you can detect oklch()

        const colorProps: Array<"color" | "backgroundColor" | "borderColor"> = [
      "color",
      "backgroundColor",
      "borderColor",
    ];



// Loops through the 3 CSS properties you care about
    colorProps.forEach((prop)=>{
      //eslint-disable-next-line
      const value = style[prop];
      //Reads the computed value, e.g. "oklch(62% 0.23 264)" "rgb(0, 0, 0)"

      // if (typeof value === "string" && value.includes("oklch")) {
      if (typeof value === "string" && (value.includes("oklch") || value.includes("lab")) ) {
      // /Checks if the color uses the oklch() color space
        el.style[prop] = "#000";
      //   Forces inline style override to black
      //  This overwrites Tailwind styles

        //     switch (prop) {
        //   case "color":
        //     el.style.color = "#000000";
        //     break;
        //   case "backgroundColor":
        //     el.style.backgroundColor = "#ffffff";
        //     break;
        //   case "borderColor":
        //     el.style.borderColor = "#000000";
        //     break;
        // }

      }
    })
  })
}




//CONVERT COMPONENT TO IMAGE 

export async function captureElementAsImage(element:HTMLElement){
  
// No — this function does NOT return an image file.
// It returns a Base64-encoded image string (Data URL).

//Prevents crashes if null or undefined is passed
  if(!element) throw new Error("Element not found"); 

// html2canvas:
// Takes a snapshot of the DOM element
// Renders it into a <canvas>
// This is not a screenshot
// It re-renders HTML + styles into pixels

//canvas instanceof HTMLCanvasElement // true
  const canvas = await html2canvas(element);
//Converts canvas pixels into a Base64 Data URL


  return canvas.toDataURL("image/png");

// Converts canvas pixels into a Base64 Data URL
// Example return value:
// data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
// This is:
// ❌ Not a File
// ❌ Not a Blob
// ✅ A string

//A data:image/png;base64,... URL is meant to be used directly in an <img> tag.
// A Data URL contains:
// the MIME type (image/png)
// the encoding (base64)
// the image bytes
//The browser treats it exactly like a normal image URL.
}
 

//UTITLITY TO CONVERT BASE64 DATA URL TO A FILE OBJECT 

 export const dataURLtoFile = (dataUrl:string, fileName:string)=>{
  const arr = dataUrl.split(",");
   const match = arr[0].match(/:(.*?);/);
   if (!match) {
    throw new Error("Invalid data URL");
  }

  
  const mime = match[1];


  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
 }











  export function formatYearMonth (yearMonth:string){
//EG: MARCH 2025 
  return yearMonth ? moment(yearMonth, "YYYY-MM").format("MMM YYYY") : "";
 }


 //this function used for form to convert updated date to month 
 //THE FUNCTION USED INT THE INPUT VALUE OF THE FORM 
 export const formatToMonth = (date:string | Date | undefined) => {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 7);
};