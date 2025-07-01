import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from './nav.styles'; 
import { useNav } from './use-nav.ts';
import { useAuth } from 'app/contexts/auth/auth.tsx';
import { Image } from 'expo-image';
import { logo } from 'app/constants/constants.ts';

const Navbar = () => {
    const { toProfile } = useNav();
    const { user } = useAuth();

    return (
        <View style={styles.headerContainer}>
            <Image style={styles.logo} source={logo} />
            <TouchableOpacity
                onPress={toProfile}
                style={[styles.profileLogoContainer, user?.profilePic && { padding: 3 }]}>
                <Image
                    style={[
                        user?.profilePic
                            ? { width: 35, height: 35, borderRadius: 30 }
                            : styles.profileLogo,
                    ]}
                    contentFit="cover"
                    source={
                        user?.profilePic
                            ? user.profilePic
                            : require('../../../../assets/icons/user.png')
                    }
                />
            </TouchableOpacity>
        </View>
    );
};

export default Navbar;
