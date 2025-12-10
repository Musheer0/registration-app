import LoginForm from '@/components/auth/login-form'
import { requireUnAuth } from '@/lib/auth'
import React from 'react'

const page = async() => {
    await requireUnAuth()
  return (
   <LoginForm/>
  )
}

export default page
