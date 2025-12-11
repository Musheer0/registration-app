import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import  db  from "@/db/drizzle";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
  }), 
    socialProviders:{
    google:{
                    clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    }
  },
  experimental:{
    joins:true
  }
});


export const requireAuth = async()=>{
  const session = await auth.api.getSession({
    headers:await headers()
  });
  if(!session?.user){
    redirect("/sign-in")
  }
  return session;
}

export const requireUnAuth = async()=>{
  const session = await auth.api.getSession({
    headers:await headers()
  });
  if(session?.user){
    redirect("/events")
  }
  return session;
}