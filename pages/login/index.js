import { useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import classes from './Login.module.css';

const LoginPage = () => {
	const router = useRouter();
	const [emailError, setEmailError] = useState(false);
	const [email, setEmail] = useState('');
	const handleClick = () => {
		if (!email || !email.includes('@')) {
			setEmailError(true);
			return;
		}
		// sign in the user
		alert('signing in user now ');
		setEmailError(false);
		router.push('/');
	};
	const handleChange = (e) => {
		setEmailError(false);
		setEmail(e.target.value);
	};
	return (
		<div className={classes.container}>
			<Head>
				<title>Netflix | Sign In </title>
			</Head>
			<header className={classes.header}>
				<div className={classes.headerWrapper}>
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
				</div>
			</header>
			<main className={classes.main}>
				<div className={classes.mainWrapper}>
					<h1 className={classes.signinHeader}>Sign In </h1>
					<input
						type="email"
						placeholder="Email address "
						className={classes.emailInput}
						value={email}
						onChange={handleChange}
					/>
					{emailError && (
						<p className={classes.userMsg}>
							Please enter a valid email
						</p>
					)}
					<button onClick={handleClick} className={classes.loginBtn}>
						Sign In{' '}
					</button>
				</div>
			</main>
		</div>
	);
};
export default LoginPage;
