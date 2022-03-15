import { useSession, signIn, signOut } from "next-auth/react"
import { useFormik, validateYupSchema } from "formik"
import { useS3Upload } from 'next-s3-upload';
import Image from 'next/image'
import { useState } from "react";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../lib/s3Client.js"
// import * as yup from 'yup'

export default function Component() {
  const { data: session } = useSession()
  let [imageUrl, setImageUrl] = useState();
  let { uploadToS3 } = useS3Upload();

  const fileSizeValidator = (file) => {
    const uploadedFile = file.target.files[0];
    if (uploadedFile.size > 4000000) {
      console.log("File size cannot exceed more than 4MB");
    } else {
      upload(uploadedFile);
    }
  };

  const bucketParams = { Bucket: "handsoff-my-bucket", Key: "next-s3-uploads/a84c1cdd-5bc8-4d8a-8441-2c7851fbc391/cyberpunk.jpg" };

  const run = async () => {
    try {
      const data = await s3Client.send(new DeleteObjectCommand(bucketParams));
      console.log("Success. Object deleted.", data);
      return data; // For unit tests.
    } catch (err) {
      console.log("Error", err);
    }
  };

  let handleFileChange = async event => {
    let file = event.target.files[0];
    let { url } = await uploadToS3(file);
    console.log(file)
    setImageUrl(url);
  };

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
          <input type="file" onChange={handleFileChange} />
          {imageUrl && <img src={imageUrl} />}
        </div>

        <div>
          {/* <input
            type="file"
            onChange={fileSizeValidator}
            accept="image/*"
          /> */}
          <button onClick={run}>Delete item</button>
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