import { MenuIcon } from 'lucide-react'
import './App.css'
import { Import } from './import/Import'
import { Sidebar } from './sidebar/Sidebar'
import { useContext } from 'react'
import { Context } from './context/Context'
import {
    Routes,
    Route,
	Navigate,
} from 'react-router-dom';
import { Profile } from './profile/Profile'
import { Vault } from './vault/Vault'
import { Cover } from './sidebar/Cover'

function App() {
  const {setIsSidebarCollapsed} = useContext(Context);
  const handleHamburger = () => {
    setIsSidebarCollapsed(false);
  }
  return (
		<div className="app">
			<MenuIcon
				color="white"
				className="hamburger"
				onClick={handleHamburger}
			/>
			<Cover />
			<Sidebar />
			<Routes>
				<Route
					path="/"
					element={<Navigate to="/profile" replace />}
				/>
				<Route path="/import" element={<Import />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/vault" element={<Vault />} />
			</Routes>
		</div>
  );
}

export default App
