

import React from 'react'

interface postcardProps{
    title:string;
    description:string;
    image:string;
}




export const PostCard = ({title, description, image}:postcardProps) => {
  return (
    <div className='hover:scale-105 duration-200 border-black h-250 w-250 bg-white shadow-lg shadow-slate-600'>
        <h3 className="text-center font-bold text-2xl">{title}</h3>
        <img src={image} alt="image" className='h-100 w-100 p-5' />
        <p className=" pl-5 text-sm">{description}</p>
        

        
    </div>
  )
}
