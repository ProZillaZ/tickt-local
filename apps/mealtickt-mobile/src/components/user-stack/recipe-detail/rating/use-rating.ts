import AppLogger from "app/logger/logger";
import { useState } from "react";

export const useRating = (recipe_id:string) => {
	const [rating, setRating] = useState(0);
	const updateRatting = (id: number) => {
		AppLogger.trackEvent("recipe_rated",{
			recipe_id: recipe_id, rating: id
		})
		setRating(id);
	}
	const getStar = (type: string) =>
		type == "empty"
			? require("../../../../assets/icons/empty-star.png")
			: require("../../../../assets/icons/fill-star.png");

	return {
		rating,
		updateRatting,
		getStar,
	};
};
