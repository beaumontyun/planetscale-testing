import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image'

export default function Component() {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        <div className="m-1">
         Signed in as {session.user.email} 
         <br />
          <Image src={session.user.image} width={100} height={100} className="rounded-full"/>
        </div>
        <button onClick={() => signOut()} className="border-2 border-sky-500 bg-blue-200 m-1 p-2 rounded-xl">Sign out</button> <br/>
        <button onClick={() => console.log(session)} className="border-2 border-sky-500 bg-blue-200 m-1 p-2 rounded-xl">Session</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button> <br/>
      <button onClick={() => console.log(session)} className="border-2 border-sky-500 bg-blue-200 m-1 p-2 rounded-xl">Session</button>
    </>
  )
}