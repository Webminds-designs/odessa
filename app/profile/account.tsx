import React, { useState } from 'react';

const Account = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    address: '',
    postalCode: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    address: '',
    postalCode: '',
    password: ''
  });

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.length < 2 ? 'Must be at least 2 characters' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email format' : '';
      case 'contactNumber':
        return !/^\+?[\d\s-]{10,}$/.test(value) ? 'Invalid phone number' : '';
      case 'postalCode':
        return !/^[A-Z0-9]{3,8}$/i.test(value) ? 'Invalid postal code' : '';
      case 'password':
        return value.length < 6 ? 'Password must be at least 6 characters' : '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      address: '',
      postalCode: '',
      password: ''
    });
    setErrors({
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      address: '',
      postalCode: '',
      password: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {} as typeof errors;
    
    // Validate all fields
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key as keyof typeof errors] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Submit form
      console.log('Form is valid:', formData);
      setIsEditing(false);
    }
  };

  return (
    <div className='mb-20'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 font-aeonikregular'>
        <div className='flex'>
          <div className='w-1/3'>
            <p>First Name</p>
          </div>
          <div className='w-2/3'>
            <input 
              type='text'
              name='firstName'
              className={`bg-[#181818] p-2 w-full ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
              placeholder="Emma"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.firstName && <span className='text-red-500 text-sm'>{errors.firstName}</span>}
          </div>
        </div>

        <div className='flex'>
          <div className='w-1/3'>
            <p>Last Name</p>
          </div>
          <div className='w-2/3'>
            <input 
              type='text'
              name='lastName'
              className={`bg-[#181818] p-2 w-full ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
              placeholder="Richardson"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.lastName && <span className='text-red-500 text-sm'>{errors.lastName}</span>}
          </div>
        </div>

        <div className='flex'>
          <div className='w-1/3'>
            <p>Email Address</p>
          </div>
          <div className='w-2/3'>
            <input 
              type='email'
              name='email'
              className={`bg-[#181818] p-2 w-full ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
              placeholder="emma@gmail.com"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.email && <span className='text-red-500 text-sm'>{errors.email}</span>}
          </div>
        </div>

        <div className='flex'>
          <div className='w-1/3'>
            <p>Contact Number</p>
          </div>
          <div className='w-2/3'>
            <input 
              type='text'
              name='contactNumber'
              className={`bg-[#181818] p-2 w-full ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
              placeholder="+44 7700 90123"
              value={formData.contactNumber}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.contactNumber && <span className='text-red-500 text-sm'>{errors.contactNumber}</span>}
          </div>
        </div>

        <div className='flex'>
          <div className='w-1/3'>
            <p>Address</p>
          </div>
          <div className='w-2/3'>
            <input 
              type='text'
              name='address'
              className={`bg-[#181818] p-2 w-full ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
              placeholder="10/06, 7th Lane, London."
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.address && <span className='text-red-500 text-sm'>{errors.address}</span>}
          </div>
        </div>

        <div className='flex'>
          <div className='w-1/3'>
            <p>Postal Code</p>
          </div>
          <div className='w-2/3'>
            <input 
              type='text'
              name='postalCode'
              className={`bg-[#181818] p-2 w-full ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
              placeholder="00100"
              value={formData.postalCode}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.postalCode && <span className='text-red-500 text-sm'>{errors.postalCode}</span>}
          </div>
        </div>

        <div className='flex'>
          <div className='w-1/3'>
            <p>Password</p>
          </div>
          <div className='w-2/3'>
            <input 
              type='password'
              name='password'
              className={`bg-[#181818] p-2 w-full ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
              placeholder="* * * * *"
              value={formData.password}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.password && <span className='text-red-500 text-sm'>{errors.password}</span>}
          </div>
        </div>

        <div className='flex justify-end gap-4'>
          {isEditing ? (
            <>
              <button 
                type='button'
                onClick={handleCancel}
                className='bg-[#181818] text-white font-aeonikregular px-4 py-2 rounded-md'
              >
                Cancel
              </button>
              <button 
                type='submit'
                className='bg-brown text-white font-aeonikregular px-4 py-2 rounded-md'
              >
                Save Changes
              </button>
            </>
          ) : (
            <button 
              type='button'
              onClick={handleEdit}
              className='bg-brown text-white font-aeonikregular px-4 py-2 rounded-md'
            >
              Edit Details
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Account;
