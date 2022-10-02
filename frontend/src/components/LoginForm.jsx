import PropTypes from 'prop-types';
import LoginInput from './LoginInput';

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
					id={'user'}
					label={'username'}
					type={'text'}
					value={username}
					name={'Username'}
					onChange={handleUsernameChange}
				/>
				<LoginInput
					id={'password'}
					label={'password'}
					type={'password'}
					value={password}
					name={'Password'}
					onChange={handlePasswordChange}
				/>
				<button id="login-button" type="submit">
					Login
				</button>
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
