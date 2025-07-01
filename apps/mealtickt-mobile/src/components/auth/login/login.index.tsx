import { View, Text, Pressable } from "react-native";
import React from "react";
import { useLogin } from "./use-login.ts";
import { styles } from "./login.styles";
import Button from "components/global/button/button.index";
import Input from "components/global/input/input.index";
import LoadingIndicator from "utils/loading-indicator.tsx";

const Login = () => {
	const { handleChange, onSubmit, onForgot, loading } = useLogin();
	return (
		<View style={styles.container}>
			<View style={styles.inputGroup}>
				<Input
					placeholder="john.doe@gmail.com"
					label="email"
					onUpdate={(text) => handleChange("email", text)}
					mode="primary"
					leftIcon={null}
				/>
				<Input
					placeholder="at least 10 characters, including special ones"
					label="password"
					onUpdate={(text) => handleChange("password", text)}
					mode="primary"
					type="password"
					leftIcon={null}
				/>
			</View>
			{loading ? (
				<LoadingIndicator />
			) : (
				<Button
					text="log in"
					onClick={onSubmit}
					disabled={false}
					style={styles.button}
				/>
			)}
			<Pressable onPress={onForgot}>
				<Text style={styles.forgotText}>forgot password</Text>
			</Pressable>
		</View>
	);
};

export default Login;
