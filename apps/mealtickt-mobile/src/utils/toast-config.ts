import ToastComponent from 'components/global/toast/toast.index';
import React from 'react';
import Toast from 'react-native-toast-message';
import { ShowSuccessProps } from './props';

export const toastConfig = {
	success: ({ props }: { props: ShowSuccessProps }) => {
		const { text, buttonText, onActionPress } = props;
		// <ToastComponent text={props.text} actionButonText={props.actionButtonText} onActionPress={props.onPress} />
		return React.createElement(ToastComponent, { text, buttonText, onActionPress });
	},
};

export const showSuccess = ({ text, buttonText, onActionPress }: ShowSuccessProps) => {
	Toast.show({
		type: 'success',
		props: {
			text,
			buttonText,
			onActionPress,
		},
	});
};
