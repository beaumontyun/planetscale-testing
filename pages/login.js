import { useSession, signIn, signOut } from "next-auth/react"
import { useFormik, validateYupSchema } from "formik"
import Image from 'next/image'
// import * as yup from 'yup'

export default function Component() {
  const { data: session } = useSession()

  // const PostSchema = Yup.object().shape({
  //   twitter: Yup.string().required('* Required')
  // })

  const formik = useFormik({
    initialValues: { twitter: '', instagram: '', facebook: '', linkedin: '' },
    onSubmit: (values) => {
      fetch('/api/socials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      }),
      alert('Socials submitted')
    },
    // validationSchema: PostSchema,
    // validationOnBlur: true,
  })

  if (session) {
    return (
      <>
        <div className="m-1">
          Signed in as {session.user.email}
          <br />
          <Image src={session.user.image} width={100} height={100} className="rounded-full" />
        </div>

        <form onSubmit={formik.handleSubmit}>
          <p>Twitter: </p>
          <input
            type="text"
            onBlur={formik.handleBlur}
            value={formik.values.twitter}
            onChange={formik.handleChange}
            name="twitter"
            className="border-2 border-sky-300 rounded-lg ml-5 w-64" />

          {/* Yup validation */}
          {/* <p>{formik.touched?.twitter && formik?.errors?.twitter}</p> */}

          <p>Instagram: </p>
          <input
            type="text"
            onBlur={formik.handleBlur}
            value={formik.values.instagram}
            onChange={formik.handleChange}
            name="instagram"
            className="border-2 border-sky-300 rounded-lg ml-5 w-64" />

          <p>Facebook: </p>
          <input
            type="text"
            onBlur={formik.handleBlur}
            value={formik.values.facebook}
            onChange={formik.handleChange}
            name="facebook"
            className="border-2 border-sky-300 rounded-lg ml-5 w-64" />

          <p>LinkedIn: </p>
          <input
            type="text"
            onBlur={formik.handleBlur}
            value={formik.values.linkedin}
            onChange={formik.handleChange}
            name="linkedin"
            className="border-2 border-sky-300 rounded-lg ml-5 w-64" />

          <button type="submit">Submit</button>

        </form>
        <button onClick={() => signOut()} className="border-2 border-sky-500 bg-blue-200 m-1 p-2 rounded-xl">Sign out</button> <br />
        <button onClick={() => console.log(session)} className="border-2 border-sky-500 bg-blue-200 m-1 p-2 rounded-xl">Session</button>
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