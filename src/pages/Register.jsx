import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdCloudUpload } from 'react-icons/md'

const Register = () => {


  const navigate = useNavigate()
  const [passwordMatch , setPasswordMatch] = useState(true)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImg: null
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData({
      ...formData,
      [name]: name === 'profileImg' ? files[0] : value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // You can add form validation here
    
    // Form data creation for submission
    const submissionData = new FormData()
    for (let key in formData) {
      submissionData.append(key, formData[key])
    }

    // Example of form submission logic, this will vary based on your backend setup
    fetch('http://localhost:3000/register', {
      method: 'POST',
      body: submissionData
    })
      .then(response => response.json())
      .then(data => {
        // Handle response data, e.g., show a success message or redirect
        if (data.error) {
          // Handle case where there is an error message in the response data
          console.error('Error:', data.error);
          alert(data.error); // Or display the error message on the UI
        } else {
          console.log('Registration successful:', data);
          navigate('/login');
        }
      })
      .catch(error => {
        // Handle error
        console.error('Error registering:', error);
        alert('An error occurred during registration. Please try again.');
      });
    }    

  useEffect(()=>{
    setPasswordMatch(
      formData.password === formData.confirmPassword || formData.confirmPassword === ""
    )
  },[formData.password, formData.confirmPassword])
  return (
    <div className='absolute h-full w-full bg-black/40 z-50 flexCenter'>
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col bg-white w-[430px] px-5 py-3 shadow-md text-[15px] gap-y-4 rounded-xl'>
          <div className='my-2'>
            <h3 className='h3 text-center'>Sign Up</h3>
          </div>
          <input type="text" name='firstName' onChange={handleChange} value={formData.firstName} placeholder='First Name' required className='bg-primary border-none p-2 pl-2 rounded-md outline-none' />
          <input type="text" name='lastName' onChange={handleChange} value={formData.lastName} placeholder='Last Name' required className='bg-primary border-none p-2 pl-2 rounded-md outline-none' />
          <input type="email" name='email' onChange={handleChange} value={formData.email} placeholder='Email' required className='bg-primary border-none p-2 pl-2 rounded-md outline-none' />
          <input type="password" name='password' onChange={handleChange} value={formData.password} placeholder='Password' required className='bg-primary border-none p-2 pl-2 rounded-md outline-none' />
          <input type="password" name='confirmPassword' onChange={handleChange} value={formData.confirmPassword} placeholder='Confirm Password' required className='bg-primary border-none p-2 pl-2 rounded-md outline-none' />
          {!passwordMatch && <p>password not match</p>}
          <input type="file" name="profileImg" onChange={handleChange} id="image" accept='image/*' hidden required />
          <label htmlFor="image">
            <div className='ring-1 ring-slate-900/10 p-1 h-16 w-16 rounded flexCenter'>
              {formData.profileImg ? (
                <img src={URL.createObjectURL(formData.profileImg)} alt="profile" className='p-1 h-16 object-contain aspect-square' />
              ) : (<MdCloudUpload className='text-teritiary text-2xl' />)}
            </div>
          </label>
          <button type='submit' className='btn-secondary rounded-sm my-2.5'>Register</button>
          <div className='text-gray-30 flexCenter'>
            Already have an account?
            <Link to={'/login'} className='text-blue-700 cursor-pointer ml-1'>Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
