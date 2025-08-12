export const SidebarItem = ({ item, isActive }) => {
    return (
        <button className={`item-btn ${isActive ? "active" : ""}`}>
            <p>{item}</p>
        </button>
    )
}