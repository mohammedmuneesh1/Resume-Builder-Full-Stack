"use client"
import AddNewResume from '@/components/dashboard/AddNewResume';
import ResumeSummaryCard from '@/components/dashboard/ResumeSummaryCard';
import { useModalContext } from '@/context/ModalContext';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React, { useEffect} from 'react'


interface DashboardClientPageInterface{
  resumeData:{
    success:boolean,
    //eslint-disable-next-line
    data?:Array<any>;
    response:string;
  }
}
 const DashboardClientPage:React.FC<DashboardClientPageInterface> = ({resumeData}) => {


  const {setShowModal} = useModalContext();
  const router = useRouter();



  useEffect(()=>{
    const resumeDataValidationFn = ()=>{
      if(!resumeData?.success){
                 setShowModal((prev)=>({
                 ...prev,
                 show:true,
                 success:false,
                 title: "",
                  desc:resumeData?.response ?? "",
             }));
      }
    }
    resumeDataValidationFn();
  },[resumeData]);

  return (
    <section
    className=" screenPadding paddingFromHeader  w-full max-w-full h-screen bg-yellow-100"
    >
      <div className="screenWidth w-full">

        <div className="grid grid-cols-1 xs:grid-cols-2
          md:grid-cols-4
           lg:grid-cols-5 lg:gap-7 gap-4
          ">
            
        {/*ADD NEW RESUME START  */}
        <AddNewResume/>
        {/*ADD NEW RESUME END  */}


        {/*USER RESUME MAPPING START */}

        {
          resumeData?.data && 
          Array.isArray(resumeData?.data) && resumeData?.data?.length > 0 &&
           resumeData?.data?.map((resume)=>(
            <div key={resume?._id}>
              {/* resumeData?.data?.map((resume)=>( */}
              <ResumeSummaryCard
              key={resume?._id}
              uId={resume?._id}
              imgUrl={resume?.thumbnailLink || null}
              title={resume?.title}
              lastUpdatedAt={resume?.updatedAt ? moment(resume?.updatedAt).format("Do MMM YYYY ") : ""}
              onSelect={()=>router.push(`/resume/${resume?._id}`)}            
              />
            </div>
          ))
        }



        {/*USER RESUME MAPPING END */}



        </div>






      {/* <h3>Add New Resume</h3> */}



      </div>




    </section>
  )
}
export default DashboardClientPage;