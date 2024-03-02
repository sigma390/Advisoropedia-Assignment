

import React from 'react'

interface postcardProps{
    title:string;
    description:string;
    image:string;
}




export const PostCard = ({title, description, image}:postcardProps) => {
  return (
    <div className='h-300 w-300 bg-white shadow-lg shadow-slate-600'>
        <h3 className="text-center">{title}</h3>
        <img src={image} alt="image" className='h-100 w-100' />
        <p className="text-sm">{description}</p>

        
    </div>
  )
}
