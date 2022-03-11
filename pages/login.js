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

  const candidate = useFormik({
    initialValues: { description: '', submission: '' },
    onSubmit: (values) => {
      fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      }),
        alert('Thank you for your submission')
    }
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

        <div>
          <label className="block text-sm font-medium text-gray-700">Submission</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <form className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </form>
              <p className="text-xs text-gray-500">PNG, JPG, GIF or WebP less than 4mb</p>
            </div>
          </div>
        </div>
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