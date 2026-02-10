import { ResumeDataInterface, TemplateConfig } from '@/types/resume.types';
import React, { useEffect, useRef, useState } from 'react'
import { DUMMY_RESUME_DATA,resumeTemplates,themeColorPalette } from '@/utils/resumeTemplateHelper';
import TabsBar from '../tabs/TabsBar';
import { LuCircleCheckBig } from 'react-icons/lu';
import TemplateCard from '../card/TemplateCard';
import RenderResume from '../ResumeTemplates/RenderResume';


interface ThemeSelectorInterface{
    selectedTheme:TemplateConfig;
    setSelectedTheme:(val:Partial<TemplateConfig>)=>void;
    resumeData: ResumeDataInterface | null;
    onClose?:()=>void;
}


const tabData =[
    {label:"Templates"},
    {label:"Color Palettes"},
];


const ColorPalette = ({
    colors,
    isSelected,
    onSelect
}: {
    colors: string[],
    isSelected: boolean,
    onSelect: () => void
}) => {
    return (

        
        <div
            onClick={onSelect}
            className={`
                w-full h-16 rounded-lg cursor-pointer
                border-2 transition-all
                ${isSelected ? 'border-blue-500 scale-105' : 'border-gray-300'}
            `}
        >
            
            <div className="flex h-full rounded-lg overflow-hidden">
                {colors.map((color, idx) => (
                    <div
                        key={idx}
                        style={{ backgroundColor: color }}
                        className="flex-1"
                    />
                ))}
            </div>
        </div>
    );
};



const ThemeSelector:React.FC<ThemeSelectorInterface> = ({
    selectedTheme,
    setSelectedTheme,
    resumeData,
    onClose
}) => {

    const resumeRef = useRef<HTMLDivElement | null>(null);
    const [baseWidth,setBaseWidth] = useState<number>(800);
    const [tabValue,setTabValue] = useState("Templates");
    const [selectedColorPalette,setSelectedColorPalette] = useState<{
        colors:string[],
        index:number,
    }>({
        colors:selectedTheme?.colorPalette || [],
        index:-1,
    });

    const [selectedTemplate,setSelectedTemplate] = useState({
        theme:selectedTheme?.theme || "",
        index:-1,
    });


    //HANDLE THEME CHANGE 
    const handleThemeSelection = ()=>{
        setSelectedTheme({
            colorPalette:selectedColorPalette?.colors,
            theme:selectedTemplate?.theme,
        });
        onClose?.();
    }


    // Fixed scaling logic - uses actual container width
    const updateBaseWidth = () => {
        if (resumeRef?.current) {
            const actualWidth = resumeRef.current.offsetWidth;
            console.log('actualWidth',actualWidth);
            // Cap at 800px for large screens, use actual width for smaller screens
            // setBaseWidth(actualWidth > 800 ? 800 : (actualWidth-20 ));
            setBaseWidth(actualWidth);
        }
    };


    useEffect(()=>{
        // Initial measurement
        updateBaseWidth();
        
        // Update on window resize
        window.addEventListener('resize', updateBaseWidth);
        
        return () => {
            window.removeEventListener('resize', updateBaseWidth);
        };
    },[]);


    return (
        <div className='mx-auto px-2 md:px-0'>
            
            {/* HEADER SECTION START */}
            <div className="flex items-center justify-between mb-5 mt-2 px-3">
                <TabsBar 
                    tabs={tabData} 
                    activeTab={tabValue}
                    setActiveTab={setTabValue}
                />

                <button 
                    className='btn-small-light'
                    onClick={()=>handleThemeSelection()}
                >
                    <LuCircleCheckBig className='' />
                    Done
                </button>
            </div>
            {/* HEADER SECTION END */}

 {/*CV SECTION START  */}


        <div className='grid grid-cols-12 gap-5'>
            <div className='col-span-12 md:col-span-7 bg-white '>
                <div 
                //md:pr-5
                className='grid grid-cols-2 gap-5
                  max-h-[80vh] overflow-scroll custom-scrollbar
                  '>


                    {
                        tabValue === "Templates" && (
                            resumeTemplates?.map((template,index)=>(
                                <TemplateCard 
                                key={`template-${index}`}
                                thumbnailImage={template?.thumbnailImg}
                                isSelected={selectedTemplate?.index === index}
                                onSelect={()=>{
                                    setSelectedTemplate({
                                        theme:template?.id,
                                        index:index,
                                    })
                                         setSelectedColorPalette({
                                        colors:[],
                                        index:-1,
                                    })
                                }}
                                />


                            ))

                        )
                    }


                    {
                        tabValue?.toLowerCase() === "color palettes" && (

                            themeColorPalette?.themeOne?.map((palette,index)=>(
                                <ColorPalette 
                                key={`palette-${index}`}
                                colors={palette}
                                isSelected={selectedColorPalette?.index === index}
                                onSelect={()=>{
                                    setSelectedColorPalette({
                                        colors:palette,
                                        index:index,
                                    })
                                }}
                                />
                                
                            ))



                        )
                    }



                </div>
            </div>

            <div
             ref={resumeRef}
             className='col-span-12 md:col-span-5  '
             >
                
                <RenderResume
                resumeData={resumeData || DUMMY_RESUME_DATA }
                templateId={selectedTemplate?.theme || ""}
                colorPalette={selectedColorPalette?.colors || []}
                containerWidth={baseWidth}
                />
            </div>

        </div>

{/*CV SECTION END  */}


        </div>
    )
}

export default ThemeSelector


































// import { ResumeDataInterface, TemplateConfig } from '@/types/resume.types';
// import React, { useEffect, useRef, useState } from 'react'
// import { DUMMY_RESUME_DATA,resumeTemplates,themeColorPalette } from '@/utils/resumeTemplateHelper';
// import TabsBar from '../tabs/TabsBar';
// import { LuCircleCheckBig } from 'react-icons/lu';
// import TemplateCard from '../card/TemplateCard';
// import RenderResume from '../ResumeTemplates/RenderResume';


// interface ThemeSelectorInterface{
// selectedTheme:TemplateConfig;
// setSelectedTheme:(val:Partial<TemplateConfig>)=>void;
// resumeData: ResumeDataInterface | null;
// }



// const tabData =[
//     {label:"Templates"},
//     {label:"Color Palettes"},
// ];







// const ThemeSelector:React.FC<ThemeSelectorInterface> = ({selectedTheme,setSelectedTheme,resumeData}) => {


//     const resumeRef = useRef<HTMLDivElement | null>(null);
//     const [baseWdith,setBaseWidth] = useState<number>(800);
//     const [tabValue,setTabValue] = useState("Templates");
//     const [selectedColorPalette,setSelectedColorPalette] = useState<{
//         colors:string[],
//         index:number,
//     }>({
//         colors:selectedTheme?.colorPalette || [],
//         index:-1,
//     });

//     const [selectedTemplate,setSelectedTemplate] = useState({
//         theme:selectedTheme?.theme || "",
//         index:-1,
//     });


//     //HANDLE THEME CHANGE 

//     const handleThemeSelection = ()=>{
//         setSelectedTheme({
//             colorPalette:selectedColorPalette?.colors,
//             theme:selectedTemplate?.theme,
//         })
//     }




//     const updateBaseWidth = ()=>{
//         if(resumeRef?.current){
//             setBaseWidth(resumeRef.current?.offsetWidth);
//         }
//     }




//     useEffect(()=>{
//         updateBaseWidth();
//         window.addEventListener('resize',updateBaseWidth);
//         return () => {
//             window.removeEventListener('resize', updateBaseWidth);
//         };
//     },[])







//   return (
//     <div className='mx-auto px-2 md:px-0'>
        
//         <div className="flex items-center justify-between mb-5 mt-2  px-3">
//             <TabsBar 
//             tabs={tabData} 
//             activeTab={tabValue}
//             setActiveTab={setTabValue}
//             />

//             <button 
//             className='btn-small-light'
//             onClick={()=>handleThemeSelection()}
//             >
//                 <LuCircleCheckBig
//                 className='' />
// Done
//             </button>
//         </div>


//         <div className='grid grid-cols-12 gap-5'>
//             <div className='col-span-12 md:col-span-5 bg-white '>
//                 <div 
//                 //md:pr-5
//                 className='grid grid-cols-2 gap-5
//                   max-h-[80vh] overflow-scroll custom-scrollbar
//                   '>


//                     {
//                         tabValue === "Templates" && (
//                             resumeTemplates?.map((template,index)=>(
//                                 <TemplateCard 
//                                 key={`template-${index}`}
//                                 thumbnailImage={template?.thumbnailImg}
//                                 isSelected={selectedTemplate?.index === index}
//                                 onSelect={()=>{
//                                     setSelectedTemplate({
//                                         theme:template?.id,
//                                         index:index,
//                                     })
//                                 }}
//                                 />


//                             ))

//                         )
//                     }


//                     {
//                         tabValue?.toLowerCase() === "color palettes" && (

//                             themeColorPalette?.themeOne?.map((palette,index)=>(
//                                 <ColorPalette 
//                                 key={`palette-${index}`}
//                                 colors={palette}
//                                 isSelected={selectedColorPalette?.index === index}
//                                 onSelect={()=>{
//                                     setSelectedColorPalette({
//                                         colors:palette,
//                                         index:index,
//                                     })
//                                 }}
//                                 />
                                
//                             ))



//                         )
//                     }



//                 </div>
//             </div>

//             <div className="col-span-12 md:col-span-7 bg-blue-300" ref={resumeRef}>
//                 <RenderResume
//                 resumeData={resumeData || DUMMY_RESUME_DATA }
//                 templateId={selectedTemplate?.theme || ""}
//                 colorPalette={selectedColorPalette?.colors || []}
//                 containerWidth={baseWdith}
//                 />
//             </div>



//         </div>


//     </div>
//   )
// }

// export default ThemeSelector





// interface ColorPaletteInterface{
//     colors:string[];
//     isSelected:boolean;
//     onSelect:()=>void;
// }

// const ColorPalette:React.FC<ColorPaletteInterface> = ({
//     colors,
//     isSelected,
//     onSelect
// })=>{
//     return(
// <div
//  className={`h-28 bg-purple-50 flex rounded-lg
//      overflow-hidden border-2 ${isSelected ? "border-purple-500":"border-none"}`}
//  >
//     {
//         colors?.map((clr,index:number)=>(
//             <div 
//             key={`color-${index}`}
//             className={`flex-1 `}
//             style={{backgroundColor:colors[index]}}
//             onClick={onSelect}
//             />
//         ))}
// </div>
//     )
// }

