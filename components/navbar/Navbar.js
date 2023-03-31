import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

import Link from 'next/link';
import Image from 'next/image';

import classes from './Navbar.module.css';

const Navbar = (props) => {
	const { data: session, status } = useSession();
	const [showDropdown, setShowdropdown] = useState(false);
	const { username } = props;
	const handleDropdownClick = () => {
		setShowdropdown(!showDropdown);
	};
	const handleLogout = async (e) => {
		e.preventDefault();
		await signOut();
	};

	return (
		<div className={classes.container}>
			<div className={classes.wrapper}>
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

				<ul className={classes.navItems}>
					<li className={classes.navItem}>
						<Link href="/home">Home</Link>
					</li>
					<li className={classes.navItem}>
						<Link href="/mylist">Mylist</Link>
					</li>
				</ul>
				<nav className={classes.navContainer}>
					{status === 'unauthenticated' && (
						<>
							<Link href="/login">Login</Link>
							<Link href="/register">Register</Link>{' '}
						</>
					)}
					{session && status === 'authenticated' && (
						<div>
							<button
								className={classes.usernameBtn}
								onClick={handleDropdownClick}
							>
								<p className={classes.username}>{username}</p>
								<Image
									src="/static/expand_more.svg"
									width={24}
									height={24}
									alt="drop down arrow"
								/>
								{/* ! expand moore icon  */}
							</button>
							<div className={classes.navDropdown}>
								{showDropdown && (
									<div>
										<Link
											href="/login"
											className={classes.linkName}
											onClick={handleLogout}
										>
											Sign Out
										</Link>
										<div
											className={classes.lineWrapper}
										></div>
									</div>
								)}
							</div>
						</div>
					)}
				</nav>
			</div>
		</div>
	);
};

export default Navbar;
