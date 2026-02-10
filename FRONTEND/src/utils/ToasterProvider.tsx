
"use client"
import { Toaster } from "react-hot-toast";




export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style:{
         fontSize:'13px',
        },
        success: {
          style: {
            background: "#4CAF50",
            color: "#fff",
          },
        },
        error: {
          style: {
            background: "#F44336",
            color: "#fff",
            
          },
        },
        duration: 3000,
      }}
    />
  );
}