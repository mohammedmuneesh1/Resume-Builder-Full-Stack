"use client";
import { ResumeDataInterface } from "@/types/resume.types";
import React from "react";
import TemplateOne from "./template-numbers/TemplateOne";
import TemplateThree from "./template-numbers/TemplateThree";
import TemplateTwo from "./template-numbers/TemplateTwo";
import TemplateFour from "./template-numbers/TemplateFour";

interface RenderResumeInterface {
  templateId: string;
  resumeData: ResumeDataInterface;
  colorPalette: string[];
  containerWidth: number;
}
const RenderResume: React.FC<RenderResumeInterface> = ({
  resumeData,
  templateId,
  colorPalette,
  containerWidth,
}) => {
  switch (templateId) {

    case "01":
      return (
        <TemplateOne
        resumeData={resumeData}
        colorPalette={colorPalette}
        containerWidth={containerWidth}
        />
      )

      
    case "02":
      return (
        <TemplateTwo
        resumeData={resumeData}
        colorPalette={colorPalette}
        containerWidth={containerWidth}
        />
      )

    case "03":
      return (
        <TemplateThree
        resumeData={resumeData}
        colorPalette={colorPalette}
        containerWidth={containerWidth}
        />
      )

    case "04":
      return (
        <TemplateFour
        resumeData={resumeData}
        colorPalette={colorPalette}
        containerWidth={containerWidth}
        />
      )




    default:
      return (
      <TemplateOne
        resumeData={resumeData}
        colorPalette={colorPalette}
        containerWidth={containerWidth}
        />
    );
  }
};

export default RenderResume;

// return (
//     <div>RenderResume</div>
//   )

// templateId={resumeData?.template?.theme || ""}
// resumeData={resumeData}
// colorPalette={resumeData?.template?.colorPalette || []}
// containerWidth={baseWidth}
