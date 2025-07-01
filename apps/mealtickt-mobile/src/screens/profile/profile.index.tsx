import React from 'react';
import { SafeAreaView, FlatList, ScrollView } from 'react-native';
import { styles } from './profile.styles';
import { Slide, slides } from './profile.props';
import { useProfile } from './use-profile.ts';
import ScrollViewBase from 'components/global/scroll-view-base/scroll-view-base.index';

const Profile = () => {
    const { flatListRef, currentIndex, renderItem } = useProfile();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollViewBase contentContainerStyle={currentIndex == 1 ? { flex: 1 } : undefined}>
                <FlatList
                    ref={flatListRef}
                    data={slides}
                    renderItem={renderItem}
                    horizontal
                    pagingEnabled
                    keyboardDismissMode="none"
                    scrollEnabled={false}
                    keyExtractor={(item: Slide) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                />
            </ScrollViewBase>
        </SafeAreaView>
    );
};

export default Profile;
