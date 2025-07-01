import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./slide5.styles";
import BackButton from "components/global/back/back.index";
import { LabelRightProps, Slide5Props } from "./slide5.props";
import { useSlide5 } from "./use-slide5.ts";
import SingleRadioButton from "components/global/single-radio-button/single-radio-button.index.tsx";
import Input from "components/global/input/input.index";
import Button from "components/global/button/button.index";

const LabelRight = ({ onPress, editable }: LabelRightProps) => (
	<TouchableOpacity onPress={onPress} style={styles.inputCardIconContainer}>
		<Image
			style={styles.inputCardIcon}
			source={
				editable
					? require("../../../../../assets/icons/CheckCircle.png")
					: require("../../../../../assets/icons/edit-pen.png")
			}
		/>
		<Text style={styles.systemText2}>{editable ? "save" : "edit"}</Text>
	</TouchableOpacity>
);
const Slide5 = ({ handleNext }: Slide5Props) => {
	const {
		state,
		radioData,
		editable,
		inputRef,
		updateState,
		handleEditable,
		handleBack,
	} = useSlide5({ handleNext });

	return (
		<View style={styles.headerContainer}>
			<BackButton onPress={handleBack} />
			<View style={styles.headingContainer}>
				<Image
					style={styles.profileLogo}
					source={require("../../../../../assets/icons/gear.png")}
				/>
				<Text style={styles.title}>account settings</Text>
			</View>
			<View style={styles.inputContainer}>
				<Input
					inputRef={editable.email ? inputRef : null}
					editable={editable.email}
					value={state.email}
					mode="primary"
					onUpdate={(text: string) => updateState("email", text)}
					leftIcon={null}
					label="email"
					labelRight={
						<LabelRight
							editable={editable.email}
							onPress={() =>
								handleEditable("email", editable.email)
							}
						/>
					}
				/>
				<Input
					inputRef={editable.password ? inputRef : null}
					editable={editable.password}
					value={state.password}
					type="password"
					onUpdate={(text: string) => updateState("password", text)}
					mode="primary"
					leftIcon={null}
					label="password"
					labelRight={
						<LabelRight
							editable={editable.password}
							onPress={() =>
								handleEditable("password", editable.password)
							}
						/>
					}
				/>
			</View>
			<SingleRadioButton
				onChange={(e: string) => updateState("notification", e)}
				data={radioData}
				defaultValue={state.notification}
			/>
			<Button
				style={styles.button}
				text="save changes"
				onClick={() => {}}
				disabled={false}
			/>
		</View>
	);
};

export default Slide5;
