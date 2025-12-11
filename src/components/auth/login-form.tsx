"use client"
import React from "react"
import { Button } from "../ui/button"
import Image from "next/image"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"

const LoginForm = () => {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Left visual panel */}
      <div
        className="relative hidden flex-1 bg-cover bg-center md:block"
        style={{
          backgroundImage: "url(/auth-bg.png)",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Right form panel */}
      <div className="flex w-full max-w-xl flex-col justify-center px-6 py-10 md:px-10">
        <div className="mb-8 flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <p className="text-2xl font-bold text-foreground">EventHub</p>
        </div>

        <div className="w-full rounded-2xl border bg-card p-6 shadow-lg">
          <div className="flex flex-col items-start gap-2">
            <p className="text-2xl font-semibold leading-tight text-foreground">
              Welcome to EventHub
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Sign in with Google to continue.
            </p>
          </div>

          <div className="mt-6">
            <Button
              onClick={() => authClient.signIn.social({ provider: "google" })}
              variant="default"
              className="w-full py-3"
            >
              <Image
                src="/icons/google.svg"
                alt="google icon"
                width={16}
                height={16}
              />
              <span className="ml-2">Login with Google</span>
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              className="underline text-primary hover:text-primary/80"
              href="/conditions"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              className="underline text-primary hover:text-primary/80"
              href="/privacy-policy"
            >
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
