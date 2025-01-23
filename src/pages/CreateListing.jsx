import React, { useState } from 'react';
import { categories, facilities, types } from '../assets/data';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { BiTrash } from 'react-icons/bi';
import { IoIosImages } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import Header from '../components/Header';



const CreateListing = () => {
    const [category, setCategory] = useState("");
    const [type, setType] = useState("")
    const [amenities, setAmenities] = useState([])
    const [photos, setPhotos] = useState([])
    const creatorId = useSelector((state)=>state.user._id)
    const navigate = useNavigate()
    const [address, setAddress] = useState({
        streetAddress:"",
        aptSuite:"",
        city:"",
        province:"",
        country:""
    })

    const handleChangeAddress =(e)=>{
        const {name,value} = e.target
        setAddress({
            ...address,
            [name]: value
        })
    }
    

    const [guestCount, setGuestCount] = useState(1)
    const [bedroomCount, setBedroomCount] = useState(1)
    const [bedCount, setBedCount] = useState(1)
    const [bathroomCount, setBathroomCount] = useState(1)

    // If the facility is already in the array, it gets removed; if it is not, it gets added.
    const handleSelectAmenities = (facility) => {
        if (amenities.includes(facility)) {
            setAmenities((prevAmenities) =>
                prevAmenities.filter((option) => option !== facility))
        } else {
            setAmenities((prev) => [...prev, facility])
        }
    }
    

    const handleUploadPhotos = (e) => {
        const newPhotos = e.target.files
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos])
    }

    const handleDragPhoto = (result) => {
        if (!result.destination)
            return
        const items = Array.from(photos)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        setPhotos(items)
    }

    const handleRemovePhoto = (indexToRemove) => {
        setPhotos((prevPhotos) =>
            prevPhotos.filter((_, index) => index !== indexToRemove))
    }

    const [description,setDescription]= useState({
        title:"",
        description:"",
        price:0
    })


    const handleDescription =(e)=>{
        const {name,value} = e.target
        setDescription({
            ...description,
            [name]:value
        })
    }
    

    const handlePost = async (e) => {
        e.preventDefault();
        try {
            const propertyForm = new FormData();
            propertyForm.append("creator", creatorId);
            propertyForm.append("category", category);
            propertyForm.append("type", type);
            propertyForm.append("streetAddress", address.streetAddress);
            propertyForm.append("aptSuite", address.aptSuite);
            propertyForm.append("city", address.city);
            propertyForm.append("province", address.province);
            propertyForm.append("country", address.country);
            propertyForm.append("amenities", amenities);
            propertyForm.append("guestCount", guestCount);
            propertyForm.append("bedroomCount", bedroomCount);
            propertyForm.append("bedCount", bedCount);
            propertyForm.append("bathroomCount", bathroomCount);
            propertyForm.append("title", description.title);
            propertyForm.append("description", description.description);
            propertyForm.append("price", description.price);
    
            // multiple photos
            photos.forEach((photo) => {
                propertyForm.append("photoPaths", photo); 
            });
    
            const response = await fetch("http://localhost:3000/create", {
                method: 'POST',
                body: propertyForm 
            });
    
            if (response.ok) {
                navigate('/');
            } else {
                console.log("Server error:", await response.json());
            }
        } catch (err) {
            console.log("error:", err);
        }
    };
    
    

    return (
        <>
            <Header />
            <section className='max-padd-container py-6'>
                <h3 className="h3">Add a Property</h3>
                <form action="" onSubmit={handlePost}>
                    <h4 className='h4 my-4'>Describe your Property?</h4>
                    <div className='hide-scrollbar flex gap-x-1 bg-white ring-1 ring-slate-400/5 shadow-sm rounded-full px-2 py-3 overflow-x-auto mb-8'>
                        {categories.map((item) => (
                            <div key={item.label}
                                onClick={() => setCategory(item.label)}
                                className={` ${category === item.label ? "text-secondary" : ""} flexCenter flex-col gap-2 p-2 rounded-xl cursor-pointer min-w-24 xl:min-w-32`}
                                style={{ flexShrink: 0 }}>
                                <div className='rounded-full h-10 w-10 p-2 flexCenter text-lg'
                                    style={{ background: ` ${item.color}` }}>{item.icon}</div>
                                <p className={` ${category === item.label ? "text-secondary" : ""} medium-14`}>{item.label}</p>
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-col xl:flex-row gap-x-16'>
                        <div className='flex-1'>
                            <h4 className='h4 my-4'>What is the type of your place?</h4>
                            <div className="flex flex-col gap-y-3 mb-6">
                                {types.map((item) => (
                                    <div
                                        key={item.name}
                                        onClick={() => setType(item.name)}
                                        className={`${type === item.name
                                            ? "ring-1 ring-slate-900/50"
                                            : "ring-1 ring-slate-900/5"}
                                        flexBetween max-w-[777px] rounded-xl px-4 py-1`}>
                                        <div>
                                            <h5 className='h5'>{item.name}</h5>
                                            <p>{item.description}</p>
                                        </div>
                                        <div className='text-2xl'>{item.icon}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 mb-4">
                            <h4 className="h4 my-5">What's the address  of your place ? </h4>
                            <div>
                                <div>
                                    <h5 className='h5'>Street Address:</h5>
                                    <input type="text" name='streetAddress' value={address.streetAddress} onChange={handleChangeAddress} placeholder='Street' required className='bg-white text-sm outline-none border-none mb-2 rounded p-2 ring-1 ring-slate-900/5 ' />
                                </div>
                            </div>
                            <div className='flex gap-6 '>
                                <div className='w-1/2'>
                                    <h5 className='h5'>Appartment, Suite (opt):</h5>
                                    <input type="text" name="aptSuite" value={address.aptSuite} onChange={handleChangeAddress} placeholder='Apt,Suite (opt)' required className='bg-white text-sm outline-none border-none mb-2 rounded p-2 ring-1 ring-slate-900/5' id="" />
                                </div>
                                <div className='w-1/2'>
                                    <h5 className='h5'>City:</h5>
                                    <input type="text" name="city" value={address.city} onChange={handleChangeAddress} placeholder='City' required className='bg-white text-sm outline-none border-none mb-2 rounded p-2 ring-1 ring-slate-900/5' id="" />
                                </div>
                            </div>
                            <div className='flex gap-6 '>
                                <div className='w-1/2'>
                                    <h5 className='h5'>Province:</h5>
                                    <input type="text" name="province" value={address.province} onChange={handleChangeAddress} placeholder='province' required className='bg-white text-sm outline-none border-none mb-2 rounded p-2 ring-1 ring-slate-900/5' id="" />
                                </div>
                                <div className='w-1/2'>
                                    <h5 className='h5'>Country:</h5>
                                    <input type="text" name="country" value={address.country} onChange={handleChangeAddress} placeholder='Country' required className='bg-white text-sm outline-none border-none mb-2 rounded p-2 ring-1 ring-slate-900/5' id="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Essentisls */}
                    <h4 className="h4 my-4">Provide some essential details about your place?</h4>
                    <div className='flex flex-wrap gap-4 mb-6'>
                        <div className='flexCenter gap-x-4 ring-1 ring-slate-900/5 p-2 rounded'>
                            <h5 className="h5">Guests</h5>
                            <div className='flexCenter gap-x-2 bg-white'>
                                <FaMinus onClick={() => {
                                    guestCount > 1 && setGuestCount(guestCount - 1)
                                }} className='h-6 w-6 text-xl p-1 rounded cursor-pointer' />
                                <p>{guestCount}</p>
                                <FaPlus onClick={() => {
                                    setGuestCount(guestCount + 1)
                                }} className='h-6 w-6 text-xl p-1 ml-1 rounded bg-secondary text-white cursor-pointer' />

                            </div>

                        </div>
                        <div className='flexCenter gap-x-4 ring-1 ring-slate-900/5 p-2 rounded'>
                            <h5 className="h5">Bedroom</h5>
                            <div className='flexCenter gap-x-2 bg-white'>
                                <FaMinus onClick={() => {
                                    bedroomCount > 1 && setBedroomCount(bedroomCount - 1)
                                }} className='h-6 w-6 text-xl p-1 rounded cursor-pointer' />
                                <p>{bedroomCount}</p>
                                <FaPlus onClick={() => {
                                    setBedroomCount(bedroomCount + 1)
                                }} className='h-6 w-6 text-xl p-1 ml-1 rounded bg-secondary text-white cursor-pointer' />

                            </div>

                        </div>
                        <div className='flexCenter gap-x-4 ring-1 ring-slate-900/5 p-2 rounded'>
                            <h5 className="h5">Beds</h5>
                            <div className='flexCenter gap-x-2 bg-white'>
                                <FaMinus onClick={() => {
                                    bedCount > 1 && setBedCount(bedCount - 1)
                                }} className='h-6 w-6 text-xl p-1 rounded cursor-pointer' />
                                <p>{bedCount}</p>
                                <FaPlus onClick={() => {
                                    setBedCount(bedCount + 1)
                                }} className='h-6 w-6 text-xl p-1 ml-1 rounded bg-secondary text-white cursor-pointer' />

                            </div>

                        </div>
                        <div className='flexCenter gap-x-4 ring-1 ring-slate-900/5 p-2 rounded'>
                            <h5 className="h5">Bathrooms</h5>
                            <div className='flexCenter gap-x-2 bg-white'>
                                <FaMinus onClick={() => {
                                    bathroomCount > 1 && setBathroomCount(bathroomCount - 1)
                                }} className='h-6 w-6 text-xl p-1 rounded cursor-pointer' />
                                <p>{bathroomCount}</p>
                                <FaPlus onClick={() => {
                                    setBathroomCount(bathroomCount + 1)
                                }} className='h-6 w-6 text-xl p-1 ml-1 rounded bg-secondary text-white cursor-pointer' />

                            </div>
                        </div>
                    </div>
                    {/* facilities */}
                    <div className="my-10">
                        <h4 className="h4 my-4">Describe about the features of your location</h4>
                        <ul className='flex items-center flex-wrap gap-3 mb-10 '>
                            {facilities.map((card) => (
                                <li
                                    key={card.name}
                                    onClick={() => handleSelectAmenities(card.name)}
                                    className={`${amenities.includes(card.name)
                                        ? "ring-1 ring-slate-900/50"
                                        : "ring-1 ring-slate-900/5"} 
                                         flex items-center gap-3 bg-white p-4 rounded cursor-pointer`}>
                                    <div>{card.icon}</div>
                                    <p>{card.name}</p>
                                </li>
                            ))}
                        </ul>
                        <h4>Include images showcasing your property</h4>
                        <DragDropContext onDragEnd={handleDragPhoto}>
                            <Droppable droppableId='photos' direction='horixontal'>
                                {(provided) => (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid:cols-6 gap-4 p-4 bg-gray-50 rounded-lg shadow-lg"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}>
                                        {photos.length < 1 && (
                                            <>
                                                <input type="file" name='image' accept='image/*' onChange={handleUploadPhotos} multiple id='imageUpload' className='hidden' />
                                                <label htmlFor="imageUpload" className='group flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-100 transition-colors  '>
                                                    <div className="h-52 w-full flexCenter">
                                                        <IoIosImages className='text-6xl text-gray-400 group-hover:text-gray-600 transition-colors' />
                                                    </div>
                                                    <p className='text-gray-500 group-hover:text-gray-700'>
                                                        Upload from your device
                                                    </p>
                                                </label>
                                            </>
                                        )}
                                        {photos.length >= 1 && (
                                            <>
                                                {photos.map((photo, index) => {
                                                    return (
                                                        <Draggable key={index}
                                                            draggableId={index.toString()}
                                                            index={index}>
                                                            {(provided) => (
                                                                <div ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className='relative group'>
                                                                    <img src={URL.createObjectURL(photo)} alt=""
                                                                        className='aspect-square object-cover h-52 w-full rounded-lg shadow-md' />
                                                                    <button type='button' className='absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-200'
                                                                        onClick={() => handleRemovePhoto(index)}>
                                                                        <BiTrash className='text-red-600' />
                                                                    </button>
                                                                </div>
                                                            )}

                                                        </Draggable>
                                                    )
                                                })}
                                                <input
                                                    type="file"
                                                    id='imageUpload'
                                                    accept='image/*'
                                                    onChange={handleUploadPhotos}
                                                    multiple
                                                    className='hidden' />
                                                <label htmlFor="imageUpload"
                                                    className='group flexCenter flex-col rounded-lg p-6 border-2 border-dashed border-gray-300 hover:bg-gray-100 transition-colors cursor-pointer'>
                                                    <div className="h-52 w-full flexCenter">
                                                        <IoIosImages className='text-6xl text-gray-400 group-hover:text-gray-600 transition-colors' />
                                                    </div>
                                                    <p className='text-gray-500 group-hover:text-gray-700'>
                                                        Upload more photos
                                                    </p>
                                                </label>
                                            </>
                                        )}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <h4 className='h4 my-4'> How would you characterize your property?</h4>
                        <div className=''>
                            <h5 className='h5'>Title:</h5>
                            <input type="text" name="title" value={description.title} onChange={handleDescription} placeholder='Title' required
                                className='bg-white p-2 text-sm outline-none border-none mb-2 rounded w-full ring-1 ring-slate-900/5' />
                            <h5>Description:</h5>
                            <textarea name="description" value={description.description} onChange={handleDescription} placeholder='Description' rows={10} className='bg-white p-2 text-sm outline-none border-none mb-2 rounded w-full ring-1 ring-slate-900/5 resize-none' required />
                            <input type="number" name='price' value={description.price} onChange={handleDescription} placeholder='100' required className='bg-white outline-none border-none p-2 text-sm mb-2 rounded ring-1 ring-slate-900/5 ' />
                        </div>
                    </div>
                    <button type='submit' className='btn-secondary rounded-md'>Create Property</button>

                </form>
            </section>
        </>
    );
};

export default CreateListing;
