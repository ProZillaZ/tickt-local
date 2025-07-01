export interface CollapsableViewProps {
	renderHeader: (content: any, index: number, isActive: boolean, sections: any[]) => React.ReactElement;
	renderCollapsable: (content: any, index: number, isActive: boolean, sections: any[]) => React.ReactElement;
}
