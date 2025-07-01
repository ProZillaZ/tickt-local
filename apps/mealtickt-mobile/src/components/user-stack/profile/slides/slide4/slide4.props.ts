import { ReactElement } from 'react';

export interface Slide4Props {
	handleNext: (id: number) => void;
}

export interface option {
	price: number,
	duration: string
}

export interface parts {
	parts: Array<string | ReactElement>;
}
