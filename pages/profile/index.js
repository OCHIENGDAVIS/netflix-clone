import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getToken } from 'next-auth/jwt';

import Navbar from '@/components/navbar/Navbar';

const Profile = ({ session }) => {
	const router = useRouter();
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
	const token = await getToken({
		req: context.req,
		secret: process.env.NEXT_AUTH_SECRET,
		raw: true,
	});
	console.log({ token });
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
