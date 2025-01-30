import React, { useEffect, useState } from 'react'
import { categories } from '../assets/data'
import { useDispatch, useSelector } from 'react-redux'
import { setListings } from '../redux/state'
const Listing = () => {

    const dispatch = useDispatch()
    const [loading,setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState('All')
    const listings = useSelector((state)=> state.listings)

    const getQueryListings = async ()=>{
        try {
            const response = await fetch(
                selectedCategory !== 'All' ?
                `http://localhost:3000//?category=${selectedCategory}` :
                `http://localhost:3000/`, {
                    method: 'GET'
                }
            )
            const data = await response.json()
            dispatch(setListings({listings:data}))
            setLoading(false)
        } catch (err) {
            console.log("fetch listing failed", err.message );
            
        }
    }
    useEffect(()=>{
        getQueryListings()
    },[selectedCategory])
    console.log(listings);
    
    
   return (
    <section id='listing' className='max-padd-container py-12'>
        <div className="text-center pb-16">
            <h6 className="capitalize">From concept to reality</h6>
            <h2 className="h2 capitalize">discover our newest listings</h2>
        </div>
        {/* categories */}
        <div className='hide-scrollbar flex gap-x-1 bg-white ring-1 ring-slate-400/5 shadow-sm rounded-full px-2 py-3 overflow-x-auto mb-16' >
            {categories.map((category)=>(
                <div key={category.label} onClick={()=>setSelectedCategory(category.label)} className='flexCenter flex-col gap-2 p-2 rounded-xl cursor-pointer min-w-24 xl:min-w-32' style={{flexShrink: 0}}> 
                    <div className='rounded-full h-10 w-10 p-2 flexCenter text-lg' style={{ background:` ${category.color}`}}>{category.icon}</div>
                    <p className={`${category.label === selectedCategory? "text-secondary": ""} medium-14`}>{category.label}</p>
                </div>
            ))}
        </div>
<p> </p>
    </section>
  )
}

export default Listing