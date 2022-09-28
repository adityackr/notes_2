const LoginInput = ({ label, type, value, name, onChange }) => {
	return (
		<div>
			{label}
			<input type={type} value={value} name={name} onChange={onChange} />
		</div>
	);
};

export default LoginInput;
