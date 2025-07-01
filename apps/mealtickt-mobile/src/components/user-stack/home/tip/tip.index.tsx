import { View, Text, Image } from "react-native";
import React from "react";
import { styles } from "./tip.styles";
import { tipContent } from "app/constants/constants";
import { defaultProps, TipProps } from "./tip.props";
import Button from "components/global/button/button.index";

const Tip = ({
	data,
	onPress = defaultProps.onPress,
	showButton = defaultProps.showButton,
}: TipProps) => {
	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<Image
					style={styles.icon}
					source={require("../../../../assets/icons/bulb.png")}
				/>
				<Text style={styles.tip}>tip</Text>
			</View>
			<Text style={styles.title}>{data.title}</Text>
			<Text style={styles.description}>{data.subTitle}</Text>
			{data.options && (
				<View style={styles.optionContainer}>
					{data.options.map((item: string, id: number) => (
						<View key={id} style={styles.tipItem}>
							<Image
								style={styles.icon2}
								source={require("../../../../assets/icons/CheckCircle.png")}
							/>
							<Text style={styles.item}>{item}</Text>
						</View>
					))}
				</View>
			)}
			{showButton && (
				<Button
					style={styles.button}
					text={data.buttonText}
					disabled={false}
					onClick={onPress}
				/>
			)}
		</View>
	);
};

export default Tip;
