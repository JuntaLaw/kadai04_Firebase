"use client";

import { db } from '@/firebase';
import { unsubscribe } from 'diagnostics_channel';
import { Timestamp, collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'; 
import React, { useEffect, useState } from 'react' 
import { SlLogout } from "react-icons/sl";

type Room = {
    id: string;
    name: string;
    createdAt: Timestamp;
}

const Sidebar = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => { 
    const fetchRooms = async () => {
        const roomCollectionRef = collection(db, "rooms");
        const q = query(
            roomCollectionRef, 
            where("userid", "==", "uyhvQHlFZtQ1Tkzd4DfmcxFcRQd2"),
            orderBy("createdAt"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newRooms: Room[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
                createdAt: doc.data().createdAt,
            }));
            setRooms(newRooms); 
        });
        return () => {
            unsubscribe();
        };
    };

    fetchRooms();
    
   
  }, []);

  return (
    <div className='bg-custom-pink h-full overflow-y-auto px-5 flex flex-col'>
        <div className='flex-grow'>
            <div className='cursor-pointer flex justify-evenly items-center border mt-2 rounded-md hover:bg-pink-300 duration-150'>
                <span className='text-white p-4 text-2xl'>＋</span>
                <h1 className='text-white text-xl font-semibold p-4'>New Chat</h1>
            </div>
            <ul>
                {rooms.map((room) => ( 
                    <li 
                    key ={room.id} 
                    className='cursor-pointer border-b p-4 text-slate-100 hover:bg-pink-400 duration-150'
                    > 
                    {room.name}
                    </li> 
                ))} 
                {/* <li className='cursor-pointer border-b p-4 text-slate-100 hover:bg-pink-400 duration-150'>
                    Room 2
                </li>
                <li className='cursor-pointer border-b p-4 text-slate-100 hover:bg-pink-400 duration-150'>
                    Room 3
                </li>
                <li className='cursor-pointer border-b p-4 text-slate-100 hover:bg-pink-400 duration-150'>
                    Room 4
                </li> */}
            </ul>
        </div>

        <div className='flex items-center justify-between mb-2 cursor-pointer p-4 text-slate-100 hover:bg-pink-300 rounded duration-150'> 
            <SlLogout />
            <span>
                logout
            </span>
        </div>
    </div>
  )
}

export default Sidebar