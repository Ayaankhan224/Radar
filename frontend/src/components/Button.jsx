import React from 'react'

const Button = (props) => {
  return (
    <div className='bg-zinc-800 text-white py-4 px-10 text-[1.1rem] rounded-full hover:scale-105 active:scale-108 transition ease-in-out cursor-pointer select-none'>{props.name}</div>
  )
}

export default Button