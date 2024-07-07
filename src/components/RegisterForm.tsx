import React, { useState } from 'react';
import Input from './global/Input';
import DropdownInput from './global/DropdownInput';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/registerService';
import { Bounce, toast } from 'react-toastify';

const Register: React.FC = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        address: '',
        email: '',
        password: '',
        gender: '',
    });

    console.log(formData.date_of_birth, "<<< date of birth")
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGenderChange = (value: string) => {
        setFormData({ ...formData, gender: value });
    };

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     try {
    //         // Implementasi logika submit
    //         console.log(formData); // Contoh untuk sementara, Anda dapat mengirimkan data ini ke backend
    //     } catch (error) {
    //         console.error('Gagal registrasi:', error);
    //         // Handle error
    //     }
    // };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            toast.success('Register successfully', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              });
            navigate('/auth/login');
        } catch (error) {
            toast.error('Register failled!', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
            setError('Failed to register');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label htmlFor="first-name" className="sr-only">
                                    First Name
                                </label>
                                <Input
                                    id="first-name"
                                    name="first_name"
                                    type="text"
                                    autoComplete="given-name"
                                    required
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="last-name" className="sr-only">
                                    Last Name
                                </label>
                                <Input
                                    id="last-name"
                                    name="last_name"
                                    type="text"
                                    autoComplete="family-name"
                                    required
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label htmlFor="date-of-birth" className="sr-only">
                                    Date of Birth
                                </label>
                                <Input
                                    id="date-of-birth"
                                    name="date_of_birth"
                                    type="date"
                                    required
                                    value={formData.date_of_birth}
                                    onChange={handleChange}
                                    placeholder="Date of Birth"
                                />
                            </div>
                            <div>
                                <label htmlFor="gender" className="sr-only">
                                    Gender
                                </label>

                                <DropdownInput
                                    selectedValue={formData.gender}
                                    onChange={handleGenderChange}
                                    placeholder="Select Gender"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="address" className="sr-only">
                                Address
                            </label>
                            <Input
                                id="address"
                                name="address"
                                type="text"
                                autoComplete="address"
                                required
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Address"
                            />
                        </div>
                    </div>
                    <div className="text-sm">
                        <a href="/auth/login" className="font-medium flex justify-end text-indigo-600 hover:text-indigo-500">
                            Do you have Account?
                        </a>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
