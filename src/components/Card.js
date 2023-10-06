import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Popup from './Popup';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
const base_url="https://workoutapi-fjcr.onrender.com/api";
function Card(props){

    const deleteCard=async ()=>{
        console.log(props.workout_id);
        const resps = await axios.delete(base_url+'/workouts/'+String(props.workout_id), {
            headers:{Authorization:`Bearer ${Cookies.get('token')}`}
          });
        if(resps.status==200){
            const resps = await axios.get(base_url+'/workouts', {
                headers:{Authorization:`Bearer ${Cookies.get('token')}`}
              });
              const results=[];
              resps.data.map((resp,index)=>{
                  results.push(<Card title={resp.title} workout_id={resp._id} workFunc={props.workFunc} content={`load: ${resp.load} reps: ${resp.reps}`} load={resp.load} reps={resp.reps}/>)
                });
                props.workFunc(results);
        }
    }
    return(
        <div class="p-4 max-w-sm">
                <div class="flex rounded-lg h-full sample-card p-8 flex-col" style={{backgroundColor:"rgb(70, 74, 222)",color:"rgb(204, 204, 204)"}}>
                    <div class="flex items-center mb-3">
                        <div
                            class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 flex-shrink-0">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                        </div>
                        <h2 class="text-lg font-medium">{props.title}</h2>
                    </div>
                    <div class="flex flex-col justify-between flex-grow">
                        <p class="leading-relaxed text-base text-white">{props.content}</p>
                        <Popup workFunc={props.workFunc} workout_id={props.workout_id} load={props.load} reps={props.reps}/>
                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={deleteCard}>Delete</button>
                        {/* <a href="#" class="mt-3 text-black hover:text-blue-600 inline-flex items-center">Learn More
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </a> */}
                    </div>
                </div>
            </div>

    );
}
export default Card;