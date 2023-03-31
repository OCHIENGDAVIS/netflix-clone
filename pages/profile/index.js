import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Navbar from '@/components/navbar/Navbar';

const Profile = ({ session }) => {
	const router = useRouter();
	console.log(session);
	return (
		<div>
			<Navbar />
			<h1>Welcome to your profile {session.user.email}</h1>
		</div>
	);
};

export default Profile;

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });
	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}
	return {
		props: {
			session,
		},
	};
}
