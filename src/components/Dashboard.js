import Card from './Card';
import NavBar from './NavBar';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
const base_url="https://workoutapi-fjcr.onrender.com/api";

function Popup(props) {
  const [isOpen, setIsOpen] = useState(false);
  
  const openModal = () => {
    setIsOpen(true);
  };
  
  const closeModal = () => {
    setIsOpen(false);
  };
  
  const [title, setTitle] = useState("Barbell Curl");
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [response, setResponse] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(base_url+'/workouts', {
        title:title,
        load:parseInt(load),
        reps:parseInt(reps)
      },{
        headers:{Authorization:`Bearer ${Cookies.get('token')}`}
      });
      
    
      setResponse(response);
      console.log(response.status);
      const resps = await axios.get(base_url+'/workouts', {
        headers:{Authorization:`Bearer ${Cookies.get('token')}`}
      });
      const results=[];
      resps.data.map((resp,index)=>{
          results.push(<Card title={resp.title} workFunc={props.workFunc} workout_id={resp._id} content={`load: ${resp.load} reps: ${resp.reps}`} load={resp.load} reps={resp.reps}/>)
        });
        props.workFunc(results);
        closeModal();
        // console.log(workouts);
        // if(response.status==200){
          //     return(
            //         <Navigate to="/home" />
            //     );
            // }
          } catch (error) {
            
            console.error('Error:', error);
          }
        };
        
        return (
          <div>
        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
          Add
        </button>
  
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
  
            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
              <div className="modal-content py-4 text-left px-6">
               
                <div className="flex justify-end items-center">
                  <button
                    onClick={closeModal}
                    className="text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                    <svg
                      className="h-6 w-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      >
                      <path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59L5 6.41 10.59 12l-5.59 5.59L5 17.41 10.59 12l5.59 5.59L17 17.41 11.41 12l5.59-5.59z" />
                    </svg>
                  </button>
                </div>
                <div className="mt-4">
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-600 text-sm font-semibold mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-lg"
                        value={title} onChange={(e) => setTitle(e.target.value)}
                        placeholder=""
                        />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-600 text-sm font-semibold mb-2">
                        load
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-lg"
                        value={load} onChange={(e) => setLoad(e.target.value)}
                        placeholder=""
                        />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-600 text-sm font-semibold mb-2">
                        reps
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-lg"
                        value={reps} onChange={(e) => setReps(e.target.value)}
                        placeholder=""
                        />
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg w-full"
                        >
                        Add workout
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  
  function Dashboard(){
  const [workouts,setWorkouts]=useState("");
  const handleOpen=async ()=>{
    const base_url="https://workoutapi-fjcr.onrender.com/api";
    const response = await axios.get(base_url+'/workouts', {
      headers:{Authorization:`Bearer ${Cookies.get('token')}`}
    });
    // console.log(response.data.length);
    const results=[];
    if(!workouts){
      response.data.map((resp,index)=>{
        results.push(<Card title={resp.title} content={`load: ${resp.load} reps: ${resp.reps}`} workFunc={setWorkouts} workout_id={resp._id} load={resp.load} reps={resp.reps}/>)
      });
      setWorkouts(results);
      console.log(workouts);
    }
  }
  if (Cookies.get('email') !== undefined){
        handleOpen();
    return(
        <>
        <NavBar />
        <Popup workFunc={setWorkouts}/>
        <div class="flex flex-wrap justify-center mt-10">
            {workouts}
        </div>
        </>
    );
    }else{
        return(
            <Navigate to="/login"/>
        );
    }
}
export default Dashboard;