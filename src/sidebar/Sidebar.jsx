import { useContext, useState } from 'react';
import { Logo } from './Logo';
import { SidebarItem } from './SidebarItem';
import './sidebar.css';
import { MenuIcon } from 'lucide-react';
import { Context } from '../context/Context';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
	const location = useLocation();

	const items = [
		{ text: 'Profile', link: '/profile' },
		{ text: 'My Vault', link: '/vault' },
		{ text: 'Import Playlist', link: '/import' },
	];
	const { isSidebarCollapsed, setIsSidebarCollapsed } =
		useContext(Context);
	const handleCollapse = () => {
		setIsSidebarCollapsed((prev) => !prev);
	};
	return (
		<div
			className={`sideBar ${
				isSidebarCollapsed ? 'collapsed' : null
			}`}
		>
			<div className="top">
				<Logo />
				<MenuIcon
					color="white"
					className="menuIcon"
					onClick={handleCollapse}
				/>
			</div>

			{items.map((item, i) => (
				<Link
					to={item.link}
					key={i}
					style={{ textDecoration: 'none' }}
				>
					<SidebarItem
						item={item.text}
						isActive={
							location.pathname === item.link
								? true
								: false
						}
					/>
				</Link>
			))}
			<button className='cover-screen'></button>
		</div>
	);
};
