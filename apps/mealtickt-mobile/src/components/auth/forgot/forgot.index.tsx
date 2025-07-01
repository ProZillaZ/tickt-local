import { SafeAreaView, FlatList, Image } from 'react-native';
import { styles } from './forgot.styles';
import { useForgot } from './use-forgot.ts';
import LoadingModalFull from 'components/auth/forgot-slides/loading/loading.index';
import { Slide, slides } from './forgot.props';
import ScrollViewBase from 'components/global/scroll-view-base/scroll-view-base.index';

const Forgot = () => {
	const {
		flatListRef,
		renderItem,
		visibleLoadingModal,
		loadingModalContent,
	} = useForgot();
	return (
		<SafeAreaView style={styles.container}>
			<ScrollViewBase contentContainerStyle={styles.scrollview}>
				<Image
					style={styles.logo}
					source={require('../../../assets/images/mealtickt-lightcream-web.png')}
				/>
				<FlatList
					ref={flatListRef}
					data={slides}
					renderItem={renderItem}
					horizontal
					pagingEnabled
					scrollEnabled={false}
					keyExtractor={(item: Slide) => item.id.toString()}
					showsHorizontalScrollIndicator={false}
				/>
			</ScrollViewBase>
			<LoadingModalFull
				visible={visibleLoadingModal}
				title={loadingModalContent.title}
				description={loadingModalContent.description}
			/>
		</SafeAreaView>
	);
};

export default Forgot;
