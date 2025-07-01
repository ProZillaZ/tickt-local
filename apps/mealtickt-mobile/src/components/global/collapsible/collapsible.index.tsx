import React, { useEffect } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import { CollapsableViewProps } from './collapsible.props';
import { useCollapsible } from './useCollapsible';

const CollapsableView = ({ renderHeader, renderCollapsable }: CollapsableViewProps) => {
	const { SECTIONS, activeSections, updateSections } = useCollapsible();
	return (
		<Accordion
			sections={SECTIONS}
			activeSections={activeSections}
			renderHeader={renderHeader}
			renderContent={renderCollapsable}
			onChange={updateSections}
			underlayColor="transparent"
		/>
	);
};

export default CollapsableView;
