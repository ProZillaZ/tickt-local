import { View, Text, Image } from "react-native";
import React from "react";
import ModalLayout from "components/global/modal/modal.index";
import { styles } from "./loading.styles";
import ReactNativeModal from "react-native-modal";
import { LoadingModalProps } from "./loading.props";

const LoadingModalFull: React.FC<LoadingModalProps> = ({
	visible,
	title,
	description,
}) => {
	return (
		<ReactNativeModal
			hideModalContentWhileAnimating
			animationIn="slideInRight"
			animationOut="slideOutLeft"
			style={styles.container}
			isVisible={visible}
			backdropColor="rgba(0,0,0,0.2)"
		>
			<View style={styles.subContainer}>
				<Image
					style={styles.logo}
					source={require("../../../../assets/images/mealtickt-lightcream-web.png")}
				/>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.description}>{description}</Text>
			</View>
		</ReactNativeModal>
	);
};

export default LoadingModalFull;
