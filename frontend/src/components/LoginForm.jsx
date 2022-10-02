import PropTypes from 'prop-types';
import LoginInput from './LoginInput';
import SubmitButton from './SubmitButton';

const LoginForm = ({
	handleLogin,
	username,
	handleUsernameChange,
	handlePasswordChange,
	password,
}) => {
	return (
		<div>
			<h2>Login</h2>

			<form onSubmit={handleLogin}>
				<LoginInput
					label={'username'}
					type={'text'}
					value={username}
					name={'Username'}
					onChange={handleUsernameChange}
				/>
				<LoginInput
					label={'password'}
					type={'password'}
					value={password}
					name={'Password'}
					onChange={handlePasswordChange}
				/>
				<SubmitButton text={'Login'} />
			</form>
		</div>
	);
};

LoginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	handleUsernameChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	password: PropTypes.string.isRequired,
};

export default LoginForm;
