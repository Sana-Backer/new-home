import React from 'react'
import { BsEnvelope, BsFacebook, BsGeoAltFill, BsInstagram, BsLinkedin, BsTelephone, BsTwitter, BsTwitterX } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='max-padd-container pb-1'>
            <div className='max-padd-container bg-black text-white py-7 rounded-3xl'>
             <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-5'>
                    {/* logo */}
                        <Link to={'/'} >
                            <div className='bold-24'>
                                Lease<span className='text-secondary'>lodge</span>
                            </div>
                            <p className="text-white/70 mt-3">Find your perfect home or investment property with us. we offer  seamless,trusted real estate experience
                            </p>
                            <p className="mt-4 text-white/70">
                            Copyright 2025 LeaseLodge.</p>
                        </Link>
                        
                        <div  >
                            <h4 className='h4 mb-5'>Quick Links</h4>
                            <ul className='space-y-3 regular-15'>
                                <li className='text-gray-10'>
                                    <a href="/about">About Us</a>
                                </li>
                                <li className='text-gra-10'>
                                    <a href="/properties">Properties</a>
                                </li>
                                <li className='text-gray-10'>
                                    <a href="/services">Services</a>
                                </li>
                                <li className='text-gray-10'>
                                    <a href="/contact">Contact</a>
                                </li>
                                <li className='text-gray-10'>
                                    <a href="/privacy-policy">Privacy Policy</a>
                                </li>
                            </ul>
                        </div>
    
                        {/* contact info */}
                        <div >
                            <h4 className="h4 mb-5">Contact Us</h4>
                            <p className="text-gray-10 mb-5">
                                <BsTelephone className='inline-block mr-2'/>+92 998-899-0706
                            </p>
                            <p className="text-gray-10 mb-5">
                                <BsEnvelope className='inline-block mr-2'/>support@leaselodge.com
                            </p>
                            <p className="text-gray-10 mb-5">
                                <BsGeoAltFill className='inline-block mr-2'/>321 leaselodge office, Kingston, New York 12401.
                            </p>      
                        </div>
                    {/* socialmedia */}
                    <div>
                        <h4 className="h4 mb-5">Follow Us</h4>
                        <div className='flex space-x-4 text-gray-10'>
                        <a href="#" className='hover:text-blue-400'><BsFacebook/></a>
                        <a href="#" className='hover:text-blue-400'><BsTwitterX/></a>
                        <a href="#" className='hover:text-red-600'><BsInstagram/></a>
                        <a href="#" className='hover:text-blue-600'><BsLinkedin/></a>
                        </div>
                    </div>
                </div>
                <div className='text-center mt-10 text-gray-100'>
                    <p >@ 2025 LeaseLodge. All rights reserved</p>
                </div>
             </div>

        </footer>
    )
}

export default Footer