import { getSession } from 'next-auth/react';
import ProfileInput from '../components/ProfileInput'

const userinput = ({session}) => {
    return ( 
        <div>
            <ProfileInput />
        </div>
     );
}
 
export async function getServerSideProps({ req }) {
    const session = await getSession({req});

    if(!session) {
        return {
            redirect: {
                destination: '/api/auth/signin',
                permanent: false,
            }
        }
    }

    return {
        props: {
            session,
        }
    }
}
export default userinput;