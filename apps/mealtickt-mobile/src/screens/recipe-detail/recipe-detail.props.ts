import { MacrosProps } from 'components/user-stack/recipe-detail/macros/macros.props';
import { RecipeIngradientProps } from 'components/user-stack/recipe-detail/ingredients/ingredients.props.ts';
import { DirectionsProps } from 'components/user-stack/recipe-detail/directions/directions.props';

export interface index {
}

export type RecipeComponentProps = MacrosProps | RecipeIngradientProps | DirectionsProps;
