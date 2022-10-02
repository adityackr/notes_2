const LoginInput = ({ label, type, value, name, id, onChange }) => {
	return (
		<div>
			{label}
			<input
				id={id}
				type={type}
				value={value}
				name={name}
				onChange={onChange}
			/>
		</div>
	);
};

export default LoginInput;
