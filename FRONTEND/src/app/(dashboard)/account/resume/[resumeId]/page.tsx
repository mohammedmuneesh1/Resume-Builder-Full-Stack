


import React from 'react'
import EditResumeByIdClientPage from './EditResumeByIdClientPage';
import { FETCH_ALL_RESUME_ID } from '@/app/actions/resumeApi/resumeApi';

const EditResumeServerPage = async ({ params }: { params: Promise<{ resumeId: string }> }) => {
  const { resumeId } = await params;

  const data = await FETCH_ALL_RESUME_ID(resumeId);


  return (
    <div>
      <EditResumeByIdClientPage
      resumeApiData={data}
      />
    </div>
  )
}


export default EditResumeServerPage;
