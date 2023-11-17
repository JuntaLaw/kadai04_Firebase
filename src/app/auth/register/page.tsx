"use client";
import { auth } from '@/firebase';
// 新規登録フォームのページ

// Firebaseからインポート
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


// React -hook-formからインポート
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form' 

type Inputs = {
    email: string;
    password: string;
}

const Register = () => { 
    const router = useRouter();
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
     } = useForm<Inputs>(); 

 const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
        const user = userCredential.user;
        router.push("/auth/login")
        
    }
    ).catch((error) => {
        // console.error(error);
        // alert(error);
        if(error.code === "auth/email-already-in-use") {
            alert("このメールアドレスは既に使用されています。")
        } else {
            alert(error.message);
        }
    });
 }; 

//  フォーム＆バリデーション（うまく表示されないので後で確認）
  return (
    <div className="h-screen flex flex-col items-center justify-center"> 
        
        <form onSubmit={handleSubmit(onSubmit)}
         className="bg-white  p-8 rounded-lg shadow-md w-96">
            <h1 className='mb-4 text-2xl text-gray-700 font-medium'>新規登録</h1>
            <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600'>
                    Email
                </label>
                <input {...register("email", {
                    required: "メールアドレスは必須です",
                    pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                        message: "不適切なメールアドレスです",
                    }
                })} type="text" className='mt-1 border-2 rounded-md w-full p-2'
                />
                {errors.email && (
                    <span className='text-red-600 text-sm'>{errors.email.message}</span>
                )}
            </div>

            <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600'>
                    password
                </label>
                <input
                type="password"
                {...register("password", {
                    required: "パスワードは必須です",
                    minLength: {
                        value: 6,
                        message: "6文字以上入力してください。",
                    }
                    
                })} className='mt-1 border-2 rounded-md w-full p-2' 
                />
                    {errors.password && (
                    <span className='text-red-600 text-sm'>{errors.password.message}</span>
                )}
            </div>

            <div className='flex justify-end'>
                <button
                    type="submit"
                    className='bg-pink-500 text-white font-bold py-2 px-4 rounded hover:bg-pink-700'>
                    新規登録
                </button>
            </div>
            <div className='mt-4 flex flex-col'>
                <span className='text-gray-600 text-sm'>既にアカウントをお持ちですか？</span>
                <Link href={"/auth/login"} className='text-pink-500 text-sm font-bold ml-1 hover:text-pink-700'>
                    ログインページへ
                </Link>
            </div>
        </form>
    </div>
  );
};

export default Register;