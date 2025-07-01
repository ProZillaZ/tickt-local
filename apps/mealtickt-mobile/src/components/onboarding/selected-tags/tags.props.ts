export interface SelectedTagProps {
	data: Array<{ [key: string]: string | number }>,
	onClear: (id: string | number) => void
}
