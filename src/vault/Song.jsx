import { AudioLines, Music } from 'lucide-react';
import { useContext, useState } from 'react';
import { Context } from '../context/Context';
import { ClipLoader } from 'react-spinners';

export const Song = (props) => {
	const { playSong, setIsPlaying, audioRef, currentSong } = useContext(Context);
	const [isLoading, setIsLoading] = useState(false);
	const handleSongPlay = async () => {
		setIsPlaying(false);
		setIsLoading(true);
		await playSong(props.awsName, props.name, props.image, props.artists);
		setIsLoading(false);
		audioRef.current.oncanplay = () => {
			audioRef.current.play();
			setIsPlaying(true);
			audioRef.current.oncanplay = null; // cleanup
		};
	};
	return (
		<tr
			className="song"
			onClick={handleSongPlay}
		>
			<td>
				{isLoading ? (
					<ClipLoader
						color="teal"
						loading={isLoading}
						size={20}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				) : null}
				{currentSong.name !== props.name ? (
					<Music size={20} color="teal" />
				) : <AudioLines />}
			</td>
			<td>
				<div className="song-name-item">
					<img src={props.image} alt="song image" />
					<div className="song-name">
						<h3>{props.name}</h3>
						<p>{props.artists}</p>
					</div>
				</div>
			</td>
			<td>
				<p>{props.album}</p>
			</td>
			<td>
				<p>{props.dataAdded}</p>
			</td>
			<td>
				<p>{props.duration}</p>
			</td>
		</tr>
	);
};
