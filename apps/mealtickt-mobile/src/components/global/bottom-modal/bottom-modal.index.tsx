import React from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import Modal from 'react-native-modal';
import { BottomModalProps } from './bottom-modal.props';
import { styles } from './bottom-modal.styles';
import { isIOS } from 'utils/helpers.ts';

export const BottomModal = ({ isVisible, height, onClose, children, modalStyle }: BottomModalProps) => {


	return (
		<Modal style={{ margin: 0 }} isVisible={isVisible} backdropColor="rgba(0,0,0,0.2)" useNativeDriver={false}
			   useNativeDriverForBackdrop={false}>
			<KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={styles.keyboardView}>
				<View style={styles.modal} onTouchEnd={() => onClose && onClose()}>
					<View
						style={[styles.content, modalStyle, { height: height }]}
						onTouchEnd={(e) => e.stopPropagation()}
					>
						{isVisible && children}
					</View>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	);
};
