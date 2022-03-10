import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image'
import { useState } from "react"

export default function Component() {
  const { data: session } = useSession()
  const [twitter, setTwitter] = useState('');

  if (session) {
    return (
      <>
        <div className="m-1">
          Signed in as {session.user.email}
          <br />
          <Image src={session.user.image} width={100} height={100} className="rounded-full" />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(twitter);
            fetch('/api/socials', { 
              method: 'POST', 
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ twitter }) })
          }}>
          <p className="ml-5">{twitter}</p>
          <input onChange={(e) => setTwitter(e.target.value)} name="twitter" type="input" className="border-2 border-sky-300 rounded-lg ml-5 w-64" />
          <button>Submit</button>
        </form>
        <button onClick={() => signOut()} className="border-2 border-sky-500 bg-blue-200 m-1 p-2 rounded-xl">Sign out</button> <br />
        <button onClick={() => fetch('/api/socials', { method: 'POST' })} className="border-2 border-sky-500 bg-blue-200 m-1 p-2 rounded-xl">Session</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button> <br />
      <button onClick={() => console.log(session)} className="border-2 border-sky-500 bg-blue-200 m-1 p-2 rounded-xl">Session</button>
    </>
  )
}