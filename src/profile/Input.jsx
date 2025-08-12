export const Input = ({ text, value, onChange }) => {
	return <input type="text" placeholder={text} value={value} onChange={(e) => onChange(e)}/>;
};
