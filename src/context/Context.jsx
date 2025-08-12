import { createContext, useState, useRef } from 'react';
import axios from 'axios';

export const Context = createContext();
const userPath = 'http://localhost:8080/users';
const playlistPath = 'http://localhost:8080/playlist';
export const ContextProvider = (props) => {
	const [isDark, setIsDark] = useState(true);
	const [isSidebarCollapsed, setIsSidebarCollapsed] =
		useState(false);
	const [user, setUser] = useState('');
	const [password, setPassword] = useState('');
	const [isVerified, setIsVerified] = useState(false);
	const [playlistID, setPlaylistID] = useState('');
	const [currPlaylist, setCurrPlaylist] = useState({});
	const [songs, setSongs] = useState([]);
	const [currentSong, setCurrentSong] = useState({ name: '' });
	const [isPlaying, setIsPlaying] = useState(false);

	const audioRef = useRef(null);

	const verifyUser = async () => {
		let req = {
			params: {
				user,
				password,
			},
		};
		try {
			await axios.get(userPath, req);
			setPassword('');
			setIsVerified(true);
			return true; // indicate success
		} catch {
			console.log('error verifying user');
			return false;
		}
	};
	function extractSpotifyId(url) {
		// Match both web URLs and spotify: URIs
		const match = url.match(
			/(?:spotify:(?:track|playlist|album):|spotify\.com\/(?:track|playlist|album)\/)([a-zA-Z0-9]+)(?:\?.*)?/
		);
		return match ? match[1] : null;
	}
	const verifyPlaylist = async () => {
		let req = {
			params: {
				playlistID: extractSpotifyId(playlistID),
			},
		};
		try {
			let response = await axios.get(playlistPath, req);
			setCurrPlaylist(response.data);
			return true;
		} catch {
			console.log('error fetching playlist');
			return false;
		}
	};

	const vaultPlaylist = async () => {
		let req = {
			params: {
				playlistID: extractSpotifyId(playlistID),
			},
		};
		try {
			let response = await axios.get(
				`${playlistPath}/tracks`,
				req
			);
			setSongs(response.data);
			return true;
		} catch {
			console.log('error fetching playlist');
			return false;
		}
	};

	const playSong = async (awsName, name, image, artists) => {
		let req = {
			params: {
				awsName,
			},
		};
		try {
			let response = await axios.get(
				`http://localhost:8080/song`,
				req
			);
			setCurrentSong({
				link: response.data,
				image,
				artists,
				name,
				awsName,
			});
		} catch {
			console.log('error playing song');
			return false;
		}
	};

	const contextValue = {
		isDark,
		setIsDark,
		isSidebarCollapsed,
		setIsSidebarCollapsed,
		user,
		setUser,
		password,
		setPassword,
		verifyUser,
		isVerified,
		playlistID,
		setPlaylistID,
		verifyPlaylist,
		currPlaylist,
		songs,
		vaultPlaylist,
		setCurrentSong,
		currentSong,
		playSong,
		isPlaying,
		setIsPlaying,
		audioRef,
	};
	return (
		<Context.Provider value={contextValue}>
			<audio src={currentSong.link} ref={audioRef}></audio>
			{props.children}
		</Context.Provider>
	);
};
