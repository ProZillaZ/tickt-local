import { ReactNode } from 'react';

export interface modalProps {
	children: ReactNode;
	visible: boolean;
	closable?: boolean;
	onClose?: Function;
}
