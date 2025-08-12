import './Import.css';
import { Input } from './Input';
import { useContext } from 'react';
import { Context } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ClipLoader } from "react-spinners";
export const Import = () => {
	
	const {
		isSidebarCollapsed,
		isVerified,
		currPlaylist,
		vaultPlaylist,
	} = useContext(Context);
	
	const [failed, setFailed] = useState(false);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	
	const handleVault = async () => {
		setIsLoading(true);
		setFailed(false);
		let success = await vaultPlaylist();
		if (success) {
			setIsLoading(false);
			setFailed(false);
			navigate('/vault');
		} else {
			setIsLoading(false);
			setFailed(true);
		}
	};
	return (
		<div
			className={`import-main ${
				!isSidebarCollapsed ? 'dim' : ''
			}`}
		>
			{isVerified ? (
				<>
					<h1>Import Playlist</h1>
					<Input />
				</>
			) : (
				<h1>Please Login First</h1>
			)}
			{Object.keys(currPlaylist).length !== 0 ? (
				<div className="playlist">
					<img
						src={currPlaylist.image}
						alt="playlist image"
					/>
					<h2>{currPlaylist.name}</h2>
					<h4>
						<span style={{ color: 'white' }}>
							{currPlaylist.owner}
						</span>{' '}
						-{` ${currPlaylist.total_tracks} tracks`}
					</h4>
					{isLoading ? (
						<div style={{display:"flex", gap: "10px"}}>
							<p style={{ color: 'teal' }}>
								Adding songs to database... this may
								take a while
							</p>
							<ClipLoader
								color="white"
								loading={isLoading}
								size={30}
								aria-label="Loading Spinner"
								data-testid="loader"
							/>
						</div>
					) : (
						<button onClick={handleVault}>
							Vault this playlist
						</button>
					)}
					{failed ? <p style={{color:"red"}}>failed to upload, please try again later</p> : null}
				</div>
			) : null}
		</div>
	);
};
