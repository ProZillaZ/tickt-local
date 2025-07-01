import { useEffect, useState } from 'react';

export const useCollapsible = () => {
	const SECTIONS = [{}];
	const [activeSections, setActiveSections] = useState<number[]>([]);
	useEffect(() => {
		updateSections([0]);
	}, []);

	const updateSections = (activeSections: number[]) => {
		setActiveSections(activeSections);
	};

	return {
		SECTIONS,
		activeSections,
		updateSections,
	};
};
