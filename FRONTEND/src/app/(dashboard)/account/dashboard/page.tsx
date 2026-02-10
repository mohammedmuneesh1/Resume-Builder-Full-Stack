import React from 'react'
import DashboardClientPage from './DashboardClientPage';
import { FETCH_ALL_RESUMES } from '@/app/actions/resumeApi/resumeApi';


export const DashboardServerPage = async () => {

  const data = await FETCH_ALL_RESUMES();
  return (
  <>
  <DashboardClientPage
  resumeData ={data}
  />
  </>
  )
}



export default DashboardServerPage;