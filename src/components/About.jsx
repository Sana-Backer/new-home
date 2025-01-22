import React from 'react'
import aboutImg from '../assets/about.png'
import { BsCheck2Circle } from 'react-icons/bs'
const About = () => {
  return (
    <section className='max-padd-container py-16 xl:py-24'>
        <div className='flex flex-col xl:flex-row gap-10'>
            {/* left */}
            <div className='flex-1'>
                <img src={aboutImg} alt="" className='h-[510px] rounded-xl'/>
            </div>
            {/* right */}
            <div className='flex flex-col flex-1 justify-center '>
                <div className='pb-2'>
                    <h6 className='capitalize'>heading</h6>
                    <h3 className='h3 capitalize'>subheading  hhsh ufhcb</h3>
                </div>
                <ul>
                    <li className='flex gap-x-3 py-2 items-center'>
                        <BsCheck2Circle/>Access exclusive property listing
                    </li>
                    <li className='flex gap-x-3 py-2 items-center'>
                        <BsCheck2Circle/>Expert advice from local real estate professionals
                    </li>
                    <li className='flex gap-x-3 py-2 items-center'>
                        <BsCheck2Circle/>Find your dream home in prime locations
                    </li>
                    <li className='flex gap-x-3 py-2 items-center'>
                        <BsCheck2Circle/>Seamless online property search experience
                    </li>
                    <li className='flex gap-x-3 py-2 items-center'>
                        <BsCheck2Circle/>Get personalized property  experience
                    </li>
                    <li className='flex gap-x-3 py-2 items-center'>
                        <BsCheck2Circle/>Transparent and hassle-free transactions
                    </li>
                    <li className='flex gap-x-3 py-2 items-center'>
                        <BsCheck2Circle/>24/7 customer support for all your inquiries
                    </li>
                    <li className='flex gap-x-3 py-2 items-center'>
                        <BsCheck2Circle/>comprehensive market analysis and reports
                    </li>


                </ul>
            </div>
        </div>

    </section>
  )
}

export default About