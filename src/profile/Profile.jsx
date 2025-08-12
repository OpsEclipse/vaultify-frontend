import { Input } from "./Input"
import logo from '../assets/profileLogo.png'
import './profile.css'
import { useContext } from "react"
import { Context } from "../context/Context"
import { useNavigate } from "react-router-dom";

export const Profile = () => {
    const {
		isSidebarCollapsed,
		user,
		setUser,
		password,
		setPassword,
		verifyUser,
		isVerified,
	} = useContext(Context);

    const navigate = useNavigate();

    const handleUser = (e) => {
        setUser(e.target.value)
    }
    const handlePassword = (e) => {
		setPassword(e.target.value);
	};

    const handleLogin = async () => {
        const success = await verifyUser();
        if (success) {
            navigate('/import');
        }
    };

    return (
		<div
			className={`profile-main ${
				!isSidebarCollapsed ? 'dim' : ''
			}`}
		>
			{!isVerified ? (
				<>
					<img src={logo} alt="logo" style={{ width: '250px' }} />
					<Input
						text="Username"
						value={user}
						onChange={handleUser}
					/>
					<Input
						text="Password"
						value={password}
						onChange={handlePassword}
					/>
					<button onClick={handleLogin}>Login</button>
				</>
			) : (
				<h1 style={{"color" : "white"}}>Already verified</h1>
			)}
		</div>
	);
}