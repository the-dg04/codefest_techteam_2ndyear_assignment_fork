import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
const base_url="https://workoutapi-fjcr.onrender.com/api";

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');
    const [isInvalid,setIsInvalid]=useState('hidden');
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const response = await axios.post(base_url+'/user/login', {
            email: email,
            password: password,
        });

        setResponse(response);
        console.log(response.status);
        // if(response.status==200){
        //     return(
        //         <Navigate to="/home" />
        //     );
        // }
        } catch (error) {

        console.error('Error:', error);
        setIsInvalid('');
        }
    };
    if(response.status==200){
        Cookies.set('email',response.data.email);
        Cookies.set('token',response.data.token);
        return(
            <Navigate to="/home" />
        );
    }
    return(
        <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  <div class="p-4">
  <h1 class="text-white text-4xl font-bold">
    <span class="text-green-500">W</span>orkout <span class="text-green-500">B</span>uddy
  </h1>
</div>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                            </div>
                            <div className={isInvalid}>
                            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative center" role="alert">
                            <strong class="center">Invalid credentials!</strong>
                            </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Dont have an account? <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register here</a>
                            </p>
                        </form>
          </div>
      </div>
  </div>
</section>
    );
}
export default Login;