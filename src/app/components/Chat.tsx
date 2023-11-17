import React from 'react'
import { IoPaperPlane } from 'react-icons/io5';

const Chat = () => {
  return (
    <div className='bg-gray-200 h-full p-4 flex flex-col'>
        <h1 className='text-2xl text-violet-900 font-semibold mb-4'>Room1</h1>
        <div className='flex-grow overflow-y-auto mb-4'>
            <div className='text-right'>
                <div className='bg-pink-300 inline-block rounded px-4 py-2 mb-2'>
                    <p className='text-slate-700'>Hello</p>
                </div>
            </div>
            <div className='text-left'>
                <div className='bg-violet-300 inline-block rounded px-4 py-2 mb-2'>
                    <p className='text-slate-800'>How are you?</p>
                </div>
            </div>
        </div>

        <div className='flex-shrink-0 relative'>
            <input type="text" 
            placeholder='ここにメッセージを入力してください' 
            className='border-2 rounded w-full pr-10 focus:outline-none p-2'
            />
            <button className='absolute inset-y-0 right-4 flex items-center'><IoPaperPlane /></button>
            
        </div>
    </div>
  )
}

export default Chat;