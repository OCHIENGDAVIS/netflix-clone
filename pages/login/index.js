import { useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { magic } from '@/lib/magic-client';
import { signIn } from 'next-auth/react';
import Navbar from '@/components/navbar/Navbar';

import classes from './Login.module.css';

const LoginPage = () => {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [signInError, setSignInError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	async function loginUser({ email, password }) {
		// this will always resolves even is there is backend error
		const res = await signIn('credentials', {
			redirect: false, // ensure you are not redirected when authorization fails
			email, //will be received in the authorize function
			password, // will also be received in the authorize function
		});
		return res;
	}

	const handleClick = async () => {
		if (!email || !email.includes('@')) {
			setEmailError(true);
			return;
		}
		if (!password || !password.length >= 6) {
			setPasswordError(true);
			return;
		}
		setEmailError(false);
		// sign in the user
		try {
			setIsLoading(true);
			const res = await loginUser({ email, password });
			const { error, status, ok } = res;
			if (error && status !== 200 && !ok) {
				setIsLoading(false);
				console.log(error);
				setSignInError('Error!, Could not login! try again');
				return;
			}
			// Set some auth state with context or redux  and use it to change what we see
			router.push('/');
		} catch (error) {
			console.log(error);
		}
	};
	const handleEmailChange = (e) => {
		setEmailError(false);
		setSignInError('');
		setEmail(e.target.value);
	};
	const handlePasswordChange = (e) => {
		setSignInError('');
		setPasswordError(false);
		setPassword(e.target.value);
	};
	return (
		<div className={classes.container}>
			<Head>
				<title>Netflix | Sign In </title>
			</Head>
			<header className={classes.header}>
				<Navbar />
			</header>
			<main className={classes.main}>
				<div className={classes.mainWrapper}>
					{signInError && (
						<div className={classes.error}>{signInError}</div>
					)}

					<h1 className={classes.signinHeader}>Sign In </h1>
					<div>
						<input
							type="email"
							placeholder="Email address "
							className={classes.emailInput}
							value={email}
							onChange={handleEmailChange}
						/>
						{emailError && (
							<p className={classes.userMsg}>
								Please enter a valid email
							</p>
						)}
					</div>
					<div className={classes.passwordContainer}>
						<input
							type="password"
							placeholder="Your password"
							className={classes.emailInput}
							value={password}
							onChange={handlePasswordChange}
						/>
						{passwordError && (
							<p className={classes.userMsg}>
								Please enter a valid password
							</p>
						)}
					</div>
					<button onClick={handleClick} className={classes.loginBtn}>
						{isLoading ? 'loading...' : 'Sign In'}
					</button>
				</div>
			</main>
		</div>
	);
};
export default LoginPage;
