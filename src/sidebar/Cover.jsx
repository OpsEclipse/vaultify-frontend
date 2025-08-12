import { useContext } from 'react'
import './sidebar.css'
import { Context } from '../context/Context'
export const Cover = () => {
    const { isSidebarCollapsed, setIsSidebarCollapsed } =
		useContext(Context);
    return (
        <button className= {isSidebarCollapsed ? 'cover-screen' : 'cover-screen active'} onClick={() => setIsSidebarCollapsed(true)}></button>
    )
}