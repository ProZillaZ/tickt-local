import { useEffect, useState } from "react"
import { RecipeBottomModalProps } from "./recipe-bottom-modal.props";

export const useRepeatRecipe = ({onClose,onUpdate,currentIndex, defaultValue}:Partial<RecipeBottomModalProps>) => {
    const [currentStep,setCurrentStep] = useState<number|null>(null);
    const [repeatDays,setRepeatDays] = useState<string[]>([]);

    const handleCurrentStep = (step: number|null) => setCurrentStep(step);
    const handleConfirm = () => {
        if(repeatDays) onUpdate && onUpdate(repeatDays);
        handleCurrentStep(null);
        onClose && onClose()
    }
    const handleMealLog = (type:number) => {
        onUpdate && onUpdate(type == 0 ? true : false);
        handleCurrentStep(null);
        onClose && onClose()
    }
    const handleCancel=()=>{
        handleCurrentStep(null);
        onClose && onClose()
    }
    useEffect(()=>{
        if (currentIndex != null) handleCurrentStep(currentIndex);
        if (defaultValue) setRepeatDays(defaultValue);
    },[currentIndex, defaultValue])
    return {
        currentStep,
        setRepeatDays,
        handleConfirm,
        handleCancel,
        handleMealLog,
        handleCurrentStep
    }
}