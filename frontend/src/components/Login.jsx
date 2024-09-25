import React, { useState } from 'react';
import authAxios from '../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import toast from 'react-hot-toast';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await authAxios.post('/user/login', values);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      toast.success("Login successful")
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast.errorert('Login failed. Please check your credentials.');
    }
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className='text-violet-600 font-bold text-center text-[22px] mb-6'>User Login</h1>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                type="email"
                placeholder="Email"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-6 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
              />
              <div className="absolute inset-y-0 right-0 top-3 pr-3 flex items-center text-xl leading-5">
                {showPassword ? (
                  <AiOutlineEyeInvisible
                    onClick={() => setShowPassword(false)}
                    className="cursor-pointer"
                  />
                ) : (
                  <AiOutlineEye
                    onClick={() => setShowPassword(true)}
                    className="cursor-pointer"
                  />
                )}
              </div>
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="flex items-center justify-center">
              <button
                className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isSubmitting}
              >
                Sign In
              </button>
            </div>
            <div className='mt-5'>
              <p className="text-gray-500 text-sm text-center pt-2 m-0">Dont have an account?
                <Link to='/register'>
                  <span className='text-violet-600 font-semibold'>Signup</span>
                </Link>

              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
