import { getSession } from 'next-auth/react';
import S3 from 'react-aws-s3';
import { useState } from 'react';

const testupload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [fileName, setFileName] = useState('JonathanPie')

    const config = {
        bucketName: process.env.NEXT_PUBLIC_S3_UPLOAD_BUCKET,
        dirName: 'next-s3-uploads',
        region: process.env.NEXT_PUBLIC_S3_UPLOAD_REGION,
        accessKeyId: process.env.NEXT_PUBLIC_S3_UPLOAD_KEY,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_UPLOAD_SECRET,
        s3Url: `https://handsoff-my-bucket.s3.${process.env.NEXT_PUBLIC_S3_UPLOAD_REGION}.amazonaws.com/`
    }

    const handleFileInput = (e) => {
        setSelectedFile(URL.createObjectURL(e.target.files[0]));
        setUploadedFile(e.target.files[0])
    }

    const handleUpload = async (file) => {
        const ReactS3Client = new S3(config);
        ReactS3Client
            .uploadFile(file, fileName)
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }

    return (
        <div>
            <div>React S3 File Upload</div>
            <br />
            <p>File Name: {fileName}</p>
            <br />
            <input type="text" onChange={(e) => setFileName(e.target.value)} />
            <input type="file" onChange={handleFileInput} />
            <button onClick={() => handleUpload(uploadedFile)}> Upload to S3</button>
            <div>
                <img src={selectedFile} width={200} />
            </div>
        </div>
    );
}

// check whether session is there, else - redirect
// export async function getServerSideProps({ req }) {
//     const session = await getSession({ req });

//     if (!session) {
//         return {
//             redirect: {
//                 destination: '/api/auth/signin',
//                 permanent: false,
//             }
//         }
//     }

//     return {
//         props: {
//             session,
//         }
//     }
// }
export default testupload;