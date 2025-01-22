import React from 'react'
import {MdOutlineQuestionAnswer} from 'react-icons/md'
import {BiSelectMultiple} from 'react-icons/bi'
import {GrCertificate } from 'react-icons/gr'
const Features = () => {
  return (
    <section className='max-padd-container py-16 xl:py-32'>
        <div className='text-center pb-16'>
            <h6 className='capitalize'>Few steps to your new Home</h6>
            <h2 className='h2 capitalize'>This is how easy it can be</h2>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12'>
           <div className='bg-white rounded-3xl p-4' > 
            <MdOutlineQuestionAnswer className='bold-32 mb-3 text-secondary'/>
            <h4>Answer questions</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit non voluptas suscipit esse,  aperiam provident aliquam mollitia necessitatibus distinctio voluptatibus tenetur.</p>
            </div>
            <div className='bg-white rounded-3xl p-4'> 
            <BiSelectMultiple className='bold-32 mb-3 text-yellow-500'/>
            <h4>Select Property</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit non voluptas suscipit esse,  aperiam provident aliquam mollitia necessitatibus distinctio voluptatibus tenetur.</p>
            </div>
            <div  className='bg-white rounded-3xl p-4'> 
            <GrCertificate className='bold-32 mb-3 text-red-500'/>
            <h4>Enjoy Living</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit non voluptas suscipit esse,  aperiam provident aliquam mollitia necessitatibus distinctio voluptatibus tenetur.</p>
            </div>

        </div>

    </section>
  )
}

export default Features