import { View, Text, ListRenderItem, Image } from "react-native";
import React from "react";
import { styles } from "./chat-history.styles";
import Input from "components/global/input/input.index";
import { colors } from "utils/styles";
import { useChatHistory } from "./use-chat-history.ts";
import ScrollBarCS from "components/global/scrollbar-cs/scrollbar-cs.index.tsx";

const ChatHistory = () => {
	const { filteredData, handleUpdateFilter } = useChatHistory();

	const renderItem = (item: { [key: string]: any }, index: number) => (
		<View key={index} style={styles.item}>
			<Image
				style={styles.icon}
				source={require("../../../../assets/icons/chevron-right-circle.png")}
			/>
			<View style={styles.textGroup}>
				<Text
					numberOfLines={1}
					ellipsizeMode="tail"
					style={styles.title}
				>
					{item.title}
				</Text>
				<Text style={styles.date}>{item.date}</Text>
			</View>
		</View>
	);

	return (
		<View style={styles.headerContainer}>
			<View style={styles.inputContainer}>
				<Input
					onUpdate={handleUpdateFilter}
					inputBoxStyle={styles.inputBox}
					inputStyle={styles.input}
					placeholder="search chat history"
					placeholderTextColor={colors.blackText}
				/>
			</View>
			<View style={[styles.searchContainer]}>
				<ScrollBarCS data={filteredData} renderItem={renderItem} />
			</View>
		</View>
	);
};

export default ChatHistory;
