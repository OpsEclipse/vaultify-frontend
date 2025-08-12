import {
	CirclePlay,
	Clock,
	PauseCircle,
	PlayCircle,
	Search,
	SkipBack,
	SkipForward,
	User,
} from 'lucide-react';
import './vault.css';
import { Song } from './Song';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';

export const Vault = () => {
	const {
		songs,
		currPlaylist,
		currentSong,
		isPlaying,
		setIsPlaying,
		audioRef,
		playSong,
	} = useContext(Context);

	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [filteredSongs, setFilteredSongs] = useState([]);
	const [filter, setFilter] = useState('');

	const format = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60)
			.toString()
			.padStart(2, '0');

		return `${minutes}:${seconds}`;
	};

	const handlePlay = () => {
		audioRef.current.play();
		setIsPlaying(true);
	};

	const handlePause = () => {
		audioRef.current.pause();
		setIsPlaying(false);
	};

	const handlePlayPause = () => {
		if (isPlaying) handlePause();
		else handlePlay();
	};

	const handleSeek = (e) => {
		audioRef.current.currentTime = e.target.value;
		setCurrentTime(e.target.value);
	};
	const handTimeUpdate = () => {
		setCurrentTime(audioRef.current.currentTime);
		setDuration(
			isNaN(audioRef.current.duration)
				? 0
				: audioRef.current.duration
		);
	};
	const handleNextSong = async () => {
		setIsPlaying(false);
		const randomIndex = Math.floor(Math.random() * songs.length);
		const song = songs[randomIndex];
		await playSong(
			song.awsName,
			song.name,
			song.image,
			song.artists
		);
		audioRef.current.oncanplay = () => {
			handlePlay();
			audioRef.current.oncanplay = null; // cleanup
		};
	};
	const handlePrevSong = () => {
		setIsPlaying(true);
		audioRef.current.currentTime = 0;
		setCurrentTime(0);
	};

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;
		audio.addEventListener('timeupdate', handTimeUpdate);
		const updateDuration = () => {
			setDuration(audio.duration || 0); // fallback to 0
		};
		audio.addEventListener('ended', handleNextSong);
		audio.addEventListener('loadedmetadata', updateDuration);

		return () => {
			audio.removeEventListener(
				'loadedmetadata',
				updateDuration
			);
			audio.removeEventListener('timeupdate', handTimeUpdate);
			audio.removeEventListener('ended', handleNextSong);
		};
	}, []);

	useEffect(() => {
		if (filter.trim() !== '') {
			const lowerFilter = filter.toLowerCase();
			setFilteredSongs(
				songs.filter(
					(song) =>
						song.name
							.toLowerCase()
							.includes(lowerFilter) ||
						song.artists[0]
							.toLowerCase()
							.includes(lowerFilter)
				)
			);
		} else {
			setFilteredSongs(songs);
		}
	}, [filter, songs]);
	return (
		<>
			{Object.keys(currPlaylist).length !== 0 ? (
				<section className="vault">
					<div className="search-container">
						<Search color="teal" />
						<input
							type="text"
							placeholder="search this playlist"
							value={filter}
							onChange={(e) =>
								setFilter(e.target.value)
							}
							className="search"
						/>
					</div>
					<div className="header">
						<img
							src={currPlaylist.image}
							alt="playlist image"
						/>
						<div className="name">
							<h1>{currPlaylist.name}</h1>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									alignContent: 'center',
								}}
							>
								<User
									color="white"
									size={26}
									style={{
										marginRight: '10px',
										opacity: '0.8',
									}}
								/>
								<h4>
									{currPlaylist.owner} ⋅{' '}
									{currPlaylist.total_tracks} tracks
								</h4>
							</div>
						</div>
					</div>
					<hr />
					<table className="main">
						<colgroup>
							<col style={{ width: '50px' }} />
							<col style={{ width: '300px' }} />
							<col style={{ width: '200px' }} />
							<col style={{ width: '150px' }} />
							<col style={{ width: '80px' }} />
						</colgroup>
						<thead>
							<tr>
								<th>#</th>
								<th>title</th>
								<th>album</th>
								<th>date added</th>
								<th>
									<Clock />
								</th>
							</tr>
						</thead>
						<tbody>
							<tr style={{ height: '20px' }}></tr>
							{Array.isArray(filteredSongs) &&
								filteredSongs.map((song, i) => (
									<Song
										key={i}
										image={song.image}
										name={song.name}
										artists={song.artists.join(
											', '
										)}
										album={song.albumName}
										dataAdded={song.addedOn}
										duration={song.duration}
										awsName={song.awsName}
									/>
								))}
							<tr style={{ height: '90px' }}></tr>
						</tbody>
					</table>

					<div
						className={
							currentSong.name === ''
								? 'hidden player'
								: 'player'
						}
					>
						<div className="song-name-player">
							<img
								src={currentSong.image}
								alt="song image"
							/>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<h4>{currentSong.name}</h4>
								<p>{currentSong.artists}</p>
							</div>
						</div>

						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '1px',
								alignItems: 'center',
								margin: '0 auto',
								position: 'absolute',
								left: '50%',
								transform: 'translateX(-50%)',
							}}
						>
							<div className="media-controls">
								<button>
									<SkipBack
										color="white"
										onClick={handlePrevSong}
									/>
								</button>
								<button onClick={handlePlayPause}>
									{!isPlaying ? (
										<PlayCircle
											color="teal"
											size={30}
										/>
									) : (
										<PauseCircle
											color="teal"
											size={30}
										/>
									)}
								</button>
								<button>
									<SkipForward
										color="white"
										onClick={handleNextSong}
									/>
								</button>
							</div>
							<div
								className="track-duration"
								style={{
									display: 'flex',
									flexDirection: 'row',
									gap: '10px',
								}}
							>
								<p>{format(currentTime)}</p>
								<input
									className="slider"
									type="range"
									min="0"
									max={duration}
									value={currentTime}
									onChange={handleSeek}
								/>
								<p>{format(duration)}</p>
							</div>
						</div>
					</div>
				</section>
			) : (
				<h1 style={{ color: 'white' }}>
					import playlist first
				</h1>
			)}
		</>
	);
};
