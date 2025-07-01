export interface TipProps {
	data: { [key: string]: any };
	onPress?: () => void;
	showButton?: boolean;
}

export const defaultProps = {
	onPress: () => {
	},
	showButton: false,
};
