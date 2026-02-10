"use client"

import Input from "@/components/Input/Input";


interface ContactInfoFormInterface{
      contactInfo:{
          email: string,
            phone: string,
            location:string,
            linkedIn: string,
            github: string,
            website: string,
            twitter:string,
      };
      //eslint-disable-next-line
      updateSection:(key:string,value:any)=>void;
      //eslint-disable-next-line
      onNext:(e:any)=>void;
}


const ContactInfoForm:React.FC<ContactInfoFormInterface> = ({contactInfo,updateSection,onNext})=>{
    return(

        <div className="px-5 pt-5">
            <h2
            className="text-lg font-semibold text-gray-900"
            >
                Contact Information
            </h2>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 ">

            <div className="col-span-2">
                          <Input
                     value={contactInfo?.location || ""}
                     onChange={(e)=>updateSection("location",e.target.value)}
                     label="Location"
                     placeholder="California, USA"
                     type="text"
                    />
            </div>

                    <Input
                     value={contactInfo?.email || ""}
                     onChange={(e)=>updateSection("email",e.target.value)}
                     label="Email"
                     placeholder="jhon@gmail.com"
                     type="email"
                    />

                    <Input
                     value={contactInfo?.phone || ""}
                     onChange={(e)=>updateSection("phone",e.target.value)}
                     label="Phone Number"
                     placeholder="+91 964547682530"
                     type="text"
                    />

                    <Input
                     value={contactInfo?.linkedIn || ""}
                     onChange={(e)=>updateSection("linkedIn",e.target.value)}
                     label="LinkedIn"
                     placeholder="https://linkedin.com/in/username"
                     type="text"
                    />
                    
                    <Input
                     value={contactInfo?.github || ""}
                     onChange={(e)=>updateSection("github",e.target.value)}
                     label="Github"
                     type="text"
                     placeholder="https://github.com/in/username"
                    />

                    <div className="md:col-span-2">
                        <Input 
                        label="Portfolio / Website"
                        placeholder="https://yourwebsite.com"
                        value={contactInfo?.website || ""}
                        onChange={(e)=>updateSection("website",e.target.value)}
                        type="text"
                        />
                    </div>






            </div>

            
        </div>
    )
}

export default ContactInfoForm;