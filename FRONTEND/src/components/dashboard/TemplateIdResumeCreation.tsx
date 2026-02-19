"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const TemplateIdResumeCreation = () => {
        const [title,setTitle] = useState<string | null>(null);
        const [error,setError] = useState<null | string>("");
        const [loading,setLoading] = useState<boolean>(false);
        const router = useRouter();


  return (
    <div>TemplateIdResumeCreation</div>
  )
}

export default TemplateIdResumeCreation