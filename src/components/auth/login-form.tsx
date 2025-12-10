"use client"
import React from 'react'
import AuthForm from './auth-form'
import { Button } from '../ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'

const LoginForm = () => {
  return (
    <div className='w-full text-zinc-50 h-screen flex '>
        <div className='flex-1 h-full bg-cover hidden '
        style={{
            backgroundImage: 'url(/auth-bg.png)'
        }}
        ></div>
        <div className='flex flex-col bg-primary items-center justify-center flex-1 p-4'>
            <div className="header flex items-center w-full justify-start gap-1">
                <Image
                src={'/logo.png'}
                alt='logo'
                width={40}
                height={40}
                />
                <p className=' font-bold text-2xl mr-auto'>
                 EventHub
                </p>
            </div> 
            <div className="body flex-1 flex flex-col w-full justify-center items-baseline gap-3">
             <div className="header flex flex-col items-center w-full">
                   <p className='font-semibold text-2xl leading-none'>welcome to EventHub</p>
                <p className='text-xs max-w-xs leading-none opacity-80'>Login with your google account to continue</p>
             </div>
    <div className="content py-5 flex items-center mx-auto max-w-2xs w-full justify-center">
                <Button
                onClick={()=>authClient.signIn.social({provider:"google"})}
                variant={'secondary'} className='w-full py-3 h-fit! rounded-2xl'>
                    <Image
                    src={'/icons/google.svg'}
                    alt='google icon'
                    width={16}
                    height={16}
                    />
                    Login with Google
                </Button>
            </div>
            <div className="footer w-full max-w-sm mx-auto text-center text-sm text-muted">
                By clicking continue, you agree to our
                 <Link className='cursor-pointer underline text-secondary' href={'/conditions'}>
                Terms of Service
                </Link> and <Link className='cursor-pointer underline text-secondary' href={'/privacy-policy'}>
                 Privacy Policy
                 </Link>
                .
            </div>
            </div>
        
        </div>
    </div>
  )
}

export default LoginForm
