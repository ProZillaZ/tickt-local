import { ComponentType, JSXElementConstructor, ReactElement, ReactNode } from 'react';
import { ListRenderItem, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

export type eventProp = {
	event: NativeSyntheticEvent<NativeScrollEvent>
}

export interface ScrollBarCSProps {
	refrence?: any;
	data: { [key: string]: any }[];
	renderItem: (item: { [key: string]: any }, index: number) => ReactNode;
	ListFooterComponent?: ReactNode | null;
	onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export interface UseSrollBarCSProps {
	onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
	refrence?: any;
}
