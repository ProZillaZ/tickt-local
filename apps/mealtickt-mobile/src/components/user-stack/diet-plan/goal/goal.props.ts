export interface GoalProps {
	data: { [key: string]: any };
	onUpdate: (field: string, value: string | number) => void;
}
