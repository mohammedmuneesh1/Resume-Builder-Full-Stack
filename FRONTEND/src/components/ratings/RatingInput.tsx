"use client"

import React from 'react'


interface RatingInputInterface{
          value:number;
          total:number;
          onChange:(value:number)=>void;
          color?:string;
          bgColor?:string;
}
const RatingInput:React.FC<RatingInputInterface> = ({
    onChange,
    total,
    value,
    color=`#9125E6`,
    bgColor=`#E9D4FF`,

}) => {

    const displayValue = Math.round((value/100) * total);


  const handleClick = (index: number) => {
    const newValue = Math.round(((index + 1) / total) * 100);
    onChange(newValue);
  };





return (
  <div className='flex gap-3 cursor-pointer flex-nowrap'>
    {Array.from({ length: total }).map((_, index) => {
      const isActive = index < displayValue;
      return (
        <div
          key={index}
          onClick={() => handleClick(index)}
          className="w-4 h-4 flex justify-center items-center cursor-pointer transition-all rounded"
          style={{
            backgroundColor: isActive ? color : bgColor
          }}
        >
        </div>
      );
    })}
  </div>
);
}

export default RatingInput