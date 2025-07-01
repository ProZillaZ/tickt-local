import { ComponentType, JSXElementConstructor, ReactElement } from 'react';
import { ListRenderItem, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

export type eventProp = {
	event: NativeSyntheticEvent<NativeScrollEvent>
}

export interface ScrollBarProps {
	refrence?: any;
	data: ArrayLike<{ [key: string]: string | number }>;
	renderItem: ListRenderItem<{ [key: string]: string | number }>;
	keyExtractor: (item: { [key: string]: string | number }) => string;
	ListFooterComponent?: ReactElement<any, string | JSXElementConstructor<any>> | ComponentType<any> | null | undefined;
	onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
	style?: object;
}

export interface UseSrollBarProps {
	onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
	refrence?: any;
}
