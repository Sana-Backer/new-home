import React from 'react'
import { Link } from 'react-router-dom'
import circle from '../assets/circle.png'
import client1 from '../assets/person-1.jpg'
import client2 from '../assets/person-2.jpg'
import sideImg from '../assets/sideImg.png'
import sideImg1 from '../assets/sideImg1.png'
import sideImg2 from '../assets/sideImg2.png'
import { useSelector } from 'react-redux'

const Hero = () => {

  const user = useSelector((state)=> state.user)

  return (
    <section className='max-padd-container mt-16 xl:mt-10'>
      <div className='flex flex-col xl:flex-row gap-16'>
        {/* Left Section */}
        <div className='flex flex-col flex-1 justify-center gap-y-8 xl:max-w-[555px] relative'>
          <h1 className='h1'>Invest in <span className='text-secondary'>Your Future</span> with confidence</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam saepe eum corrupti, blanditiis repudiandae, nostrum, accusamus consectetur animi accusantium mollitia fuga? Distinctio, explicabo consequatur nostrum sequi expedita debitis non harum!</p>
          <div className='flex gap-3'>
            <a href="#listing" className='btn-dark flexCenter rounded-full'>Explore Properties</a>
           { user ?(
             <Link to={"/create"} className='btn-secondary flexCenter rounded-full'>
             <span className='medium-20 pr-1'>+</span>Add Property
           </Link>
           ): (
            <Link to={"/login"} className='btn-secondary flexCenter rounded-full'>
            <span className='medium-20 pr-1'>+</span>Add Property
          </Link>
           )
           }
          </div>
          {/* Client Images */}
          <div className='flex relative'>
            <img src={circle} alt="Background Circle" className='rounded-full h-[99px] z-30' />
            <img src={client1} alt="Client 1" className='rounded-full h-[80px] z-20 shadow-sm absolute left-16' />
            <img src={client2} alt="Client 2" className='rounded-full h-[80px] z-10 shadow-sm absolute left-32' />
          </div>
        </div>

        {/* Right Section */}
        <div className='flex flex-1 flex-col gap-4 '>
          <div className='rounded-2xl h-[266px]  overflow-hidden'>
            <img src={sideImg} alt="Side Image" className='rounded-xl object-cover' />
          </div>
          <div className='flexBetween gap-4'>
            <div className='flex flex-1 rounded-xl'>
              <img src={sideImg1} alt="Side Image 1" className='rounded-xl object-cover aspect-square' />
            </div>
            <div className='flex flex-1 rounded-xl'>
              <img src={sideImg2} alt="Side Image 2" className='rounded-xl object-cover aspect-square' />
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero
