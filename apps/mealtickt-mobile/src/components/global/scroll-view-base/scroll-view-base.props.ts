import React from 'react';

export interface ScrollViewBaseProps {
	children: React.ReactNode;
	contentContainerStyle?: object;
	showsHorizontalScrollIndicator?: boolean;
	showsVerticalScrollIndicator?: boolean;
	scrollEnabled?: boolean | undefined;
}

export const defaultProps = {
	showsHorizontalScrollIndicator: false,
	showsVerticalScrollIndicator: false,
};
