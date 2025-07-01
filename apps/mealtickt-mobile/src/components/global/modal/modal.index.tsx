import React from "react";
import {
	Image,
	KeyboardAvoidingView,
	TouchableOpacity,
	View,
} from "react-native";
import ReactNativeModal from "react-native-modal";
import { modalProps } from "./modal.props";
import { styles } from "./modal";

function ModalLayout({
	children,
	visible,
	closable = false,
	onClose = () => {},
}: modalProps) {
	return (
		<KeyboardAvoidingView>
			<ReactNativeModal
				isVisible={visible}
				backdropColor="rgba(0,0,0,0.2)"
			>
				<View style={styles.container}>
					{closable && (
						<View style={styles.header}>
							<TouchableOpacity
								onPress={() => {
									onClose();
								}}
							>
								<Image
									source={require("../../../assets/icons/Cross-inCircle.png")}
									style={[styles.crossIcon]}
								/>
							</TouchableOpacity>
						</View>
					)}
					{children}
				</View>
			</ReactNativeModal>
		</KeyboardAvoidingView>
	);
}

export default ModalLayout;
