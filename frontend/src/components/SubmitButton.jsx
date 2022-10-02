const SubmitButton = ({ text, id }) => {
	return (
		<button id={id} type="submit">
			{text}
		</button>
	);
};

export default SubmitButton;
