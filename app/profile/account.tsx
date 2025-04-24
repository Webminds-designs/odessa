import React, { useState, useEffect } from 'react';
import PasswordResetModal from './passwordResetModal';
import toast from 'react-hot-toast';

interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  contactNumber?: string;
  address?: string;
  postalCode?: string;
}

const Account = ({ user }: { user: User }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    address: '',
    postalCode: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    address: '',
    postalCode: ''
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [userData, setUserData] = useState<any>({});

  // Update formData when user prop changes
  useEffect(() => {
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      contactNumber: user.contactNumber || '',
      address: user.address || '',
      postalCode: user.postalCode || ''
    });
  }, [user]);

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
    
    const errorMessage = validateField(name, value);
    
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to user prop values
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      contactNumber: user.contactNumber || '',
      address: user.address || '',
      postalCode: user.postalCode || ''
    });
    setErrors({
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      address: '',
      postalCode: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    // In the validateField function or before submitting form
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors before submitting", {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    // If no validation errors, proceed with update
    if (Object.keys(newErrors).length === 0) {
      // In handleSubmit before the try block
      const toastId = toast.loading("Updating your profile...");

      try {
        // Get user ID from localStorage
        if (typeof window !== 'undefined' && window.localStorage) {
          setUserData(localStorage?.getItem('user'));
          if (!userData) {
            toast.dismiss(toastId);
            toast.error("You need to be logged in to update your profile", {
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            });
            return;
          } 
        }
        
        const { id } = JSON.parse(userData);
        
        // Send PUT request to update user data
        const response = await fetch(`/api/users/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        if (!response.ok) {
          toast.dismiss(toastId);
          throw new Error(data.error || "Failed to update profile");
        }
        
        toast.dismiss(toastId);
        toast.success("Profile updated successfully!", {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        setIsEditing(false);
        
      } catch (error) {
        toast.dismiss(toastId);
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile. Please try again.", {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }
    }
  };

  return (
    <div className='md:px-24 pb-20 bg-black text-white'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 font-aeonikregular'>

        <h1 className='text-2xl mb-10'>Personal Details</h1>

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
              className='bg-brown text-white font-aeonikregular px-4 py-2 rounded-md hover:cursor-pointer'
            >
              Edit Details
            </button>
          )}
        </div>

        {/* <h1 className='text-2xl mb-10'>Change Password</h1>

        <div className='flex'>
          <div className='w-1/3'>
            <p>Old Password</p>
          </div>
          <div className='w-2/3'>
            <input
              type='password'
              name='password'
              className={`bg-[#181818] p-2 w-full`}
              placeholder="* * * * *"
              disabled
            />
          </div>
        </div>

        <div className='flex justify-end gap-4'>
          <button
            type='button'
            className='bg-[#181818] text-white font-aeonikregular px-4 py-2 rounded-md hover:cursor-pointer'
          >
            Cancel
          </button>
          <button
            type='button'
            className='bg-brown text-white font-aeonikregular px-4 py-2 rounded-md hover:cursor-pointer'
            onClick={() => setIsPasswordModalOpen(true)}
          >
            Change Password
          </button>
        </div>

        <PasswordResetModal 
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
        /> */}

      </form>
    </div>
  );
};

export default Account;
