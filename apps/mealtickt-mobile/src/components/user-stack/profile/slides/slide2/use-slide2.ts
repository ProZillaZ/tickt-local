import { useEffect, useState } from 'react';
import { UseSlide2Props } from './slide2.props';
import { ingredientMenu } from 'app/constants/constants';
import { useAuth } from 'app/contexts/auth/auth';
import { Allergen } from 'app/enums/allergen.enum';

const initialState = { selectedAllergies: ['eggs'] };

export const useSlide2 = ({ handleNext }: UseSlide2Props) => {
    const { user } = useAuth();
    const [state, setState] = useState({
        selectedAllergies: user?.allergies || initialState.selectedAllergies,
    });

    const initialData = ingredientMenu;
    const [filteredData, setFilteredData] =
        useState<Array<{ [key: string]: string | number }>>(initialData);
    const [selectedData, setSelectedData] = useState<Array<{ [key: string]: string | number }>>(
        user?.avoidedIngredients || [],
    );

    const handleBack = () => handleNext(0);

    const updateState = (field: string, value: any) => {
        setState((s) => ({ ...s, [field]: value }));
    };

    const handleChangeAllergies = (item: any) => {
        updateState('selectedAllergies', item);
    };

    const handleFilterData = (data: Array<{ [key: string]: string | number }>) => {
        updateFilterData(data);
    };

    const handleResetData = () => {
        setFilteredData(initialData);
    };

    const updateFilterData = (data: Array<{ [key: string]: string | number }>) => {
        const updatedData = data?.filter(
            (item: { [key: string]: string | number }) => !selectedData?.includes(item),
        );
        setFilteredData(updatedData);
    };

    const handleItemSelection = (item: { [key: string]: string | number }) => {
        setSelectedData((prev) => {
            if (prev.some((s) => s.id === item.id)) {
                return prev;
            }
            return [...prev, item];
        });
    };

    const handleRemoveItem = (id: string | number) => {
        const removedSelected = selectedData?.filter((s) => s.id == id);
        setFilteredData((s) => [...s, ...removedSelected]);
        setSelectedData(selectedData?.filter((s) => s.id != id));
    };

    useEffect(() => {
        updateFilterData(filteredData);
    }, [selectedData]);

    return {
        state,
        allergyLabel: 'any allergies we should know about',
        handleBack,
        filteredData,
        initialData,
        selectedData,
        handleFilterData,
        handleResetData,
        handleItemSelection,
        handleRemoveItem,
        handleChangeAllergies,
    };
};
