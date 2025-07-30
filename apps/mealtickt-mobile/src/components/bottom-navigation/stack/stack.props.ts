import { Slide } from 'app/components/user-stack/home/showcase/showcase.props';

export type RootStackParamList = {
    home: undefined;
    profile: undefined;
    diet: undefined;
    'recipe-detail': { recipe: Slide };
};
