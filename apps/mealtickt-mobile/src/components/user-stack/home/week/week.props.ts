export interface WeekSliderProps {
    defaultWeek: number;
    onChangeWeek: (id: number) => void;
    weeks: string[];
}

export interface UseWeekProps {
    defaultWeek: number;
    onChangeWeek: (id: number) => void;
    weeks: string[];
}
