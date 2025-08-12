import { useContext } from 'react';
import spotifyImg from '../assets/spotify.png';
import { Context } from '../context/Context';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';

export const Input = () => {
	const { playlistID, setPlaylistID, verifyPlaylist } =
		useContext(Context);
	const [failedVerification, setFailedVerification] =
		useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleVerify = async () => {
		setIsLoading(true);
		let success = await verifyPlaylist();
		if (success) {
			setIsLoading(false);
			setFailedVerification(false);
		} else {
			setIsLoading(false);
			setFailedVerification(true);
		}
	};
	return (
		<div className="input">
			<input
				type="text"
				placeholder="Paste Spotify Playlist Link or ID"
				value={playlistID}
				onChange={(e) => setPlaylistID(e.target.value)}
			/>

			<button onClick={handleVerify}>
				<img
					src={spotifyImg}
					alt="waves"
					style={{ width: '25px' }}
				/>
				{isLoading ? null : 'Import'}
				<ClipLoader
					color="black"
					loading={isLoading}
					size={30}
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
			</button>
			{failedVerification ? (
				<p>please enter a valid ID</p>
			) : null}
		</div>
	);
};
