import { useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { magic } from '@/lib/magic-client';

import Navbar from '@/components/navbar/Navbar';
import classes from './Register.module.css';

const RegisterPage = () => {
	const router = useRouter();
	const [emailError, setEmailError] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);

	const handleClick = async () => {
		if (!email || !email.includes('@')) {
			setEmailError(true);
			return;
		}
		setEmailError(false);
		if (!password || !password.length >= 6) {
			setPasswordError(true);
			return;
		}
		setPasswordError(false);
		// Register the user
		try {
			if (magic) {
				magic.auth.loginWithMagicLink({ email });

				const didToken = await magic.auth.loginWithMagicLink({
					email,
				});
				console.log({ didToken });
				router.push('/');
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleEmailChange = (e) => {
		setEmailError(false);
		setEmail(e.target.value);
	};
	const handlePasswordChange = (e) => {
		setEmailError(false);
		setPassword(e.target.value);
	};
	return (
		<div className={classes.container}>
			<Head>
				<title>Netflix | Register </title>
			</Head>
			<header className={classes.header}>
				<Navbar />
				{/* <div className={classes.headerWrapper}>
					<Link className={classes.logoLink} href="/">
						<div className={classes.logoWrapper}>
							<Image
								src="/static/netflix_logo.svg"
								width={132}
								height={34}
								alt="netflix logo"
							/>
						</div>
					</Link>
				</div> */}
			</header>
			<main className={classes.main}>
				<div className={classes.mainWrapper}>
					<h1 className={classes.signinHeader}>Sign Up </h1>
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
					<div className={classes.inputContainer}>
						<input
							type="password"
							placeholder="Your Password "
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
						Register
					</button>
				</div>
			</main>
		</div>
	);
};
export default RegisterPage;
