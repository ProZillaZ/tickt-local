import { Slide4Props } from './slide4.props';

export const useSlide4 = ({ handleNext }: Partial<Slide4Props>) => {
	const handleBack = () => handleNext && handleNext(0);

	return {
		handleBack,
	};
};
