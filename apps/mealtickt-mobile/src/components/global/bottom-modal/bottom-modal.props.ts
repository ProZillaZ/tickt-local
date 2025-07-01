import { ReactNode } from 'react';

export interface BottomModalProps {
	isVisible: boolean;
	height?: number;
	onClose?: () => void;
	children?: ReactNode;
	modalStyle?: object;
}
