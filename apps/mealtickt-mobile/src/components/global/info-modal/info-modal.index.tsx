import React from 'react';
import { Text, View } from 'react-native';

import ModalLayout from '../modal/modal.index';

import { modalProps } from './info-modal.props.ts';
import styles from './info-modal.styles.tsx';

function InfoModal({ visible, setVisible, heading, description }: modalProps) {

	return (
		<ModalLayout closable={true} visible={visible} onClose={() => setVisible(false)}
					 children={
						 <View style={styles.container}>
							 <Text style={styles.heading}>{heading}</Text>
							 <Text style={styles.description}>{description}</Text>
						 </View>
					 } />
	);
}

export default InfoModal;
