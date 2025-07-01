import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { Image } from 'expo-image';
import { styles } from './slide1.styles';
import { Slide1Props } from './slide1.props';
import { useSlide1 } from './use-slide1.ts';
import { profileBtns } from 'app/constants/constants.ts';
import Button from 'components/global/button/button.index';
import { useAuth } from 'app/contexts/auth/auth.tsx';
import * as ImagePicker from 'expo-image-picker';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StorageService } from 'app/services/storage.service.ts';
import { User } from 'app/contexts/auth/auth.types.ts';
import { colors } from 'app/utils/styles.ts';
const storageService = new StorageService();
const Slide1 = ({ handleNext }: Slide1Props) => {
    const { handleBack, onSubmit } = useSlide1();
    const [loading, setLoading] = useState(false);
    const { user, login } = useAuth();
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!result.canceled) {
            try {
                setLoading(true);
                const uri = await storageService.updateProfilePicture(
                    result.assets[0].uri,
                    'users',
                    user?.uid as string,
                    `profilePic-${user?.uid}`,
                );
                login({ ...user, profilePic: uri } as User);
            } catch (error) {
                console.log('error ', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={handleBack}>
                <Image
                    style={styles.icon}
                    source={require('../../../../../assets/icons/Cross-inCircle.png')}
                />
            </TouchableOpacity>
            <View style={styles.headingContainer}>
                <TouchableOpacity onPress={pickImage} style={styles.profileLogoContainer}>
                    {loading ? (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',

                                backgroundColor: 'rgba(0,0,0,0.2)',
                                width: 50,
                                height: 50,
                                borderRadius: 30,
                            }}>
                            <ActivityIndicator size={'large'} color={colors.yellow} />
                        </View>
                    ) : (
                        <Image
                            style={[
                                user?.profilePic
                                    ? { width: 35, height: 35, borderRadius: 30 }
                                    : styles.profileLogo,
                            ]}
                            contentFit="cover"
                            onError={(e) => console.log('error :', e)}
                            source={
                                user?.profilePic
                                    ? user.profilePic
                                    : require('../../../../../assets/icons/user.png')
                            }
                        />
                    )}
                    <FontAwesome
                        style={
                            user?.profilePic
                                ? { position: 'absolute', bottom: 10, right: 0 }
                                : { position: 'absolute', bottom: 0, right: -4 }
                        }
                        name="pencil-square"
                        size={16}
                        color="black"
                    />
                </TouchableOpacity>
                <Text style={styles.title}>{'my  account'}</Text>
            </View>
            <View style={styles.btnContainer}>
                {profileBtns.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.btn}
                        onPress={() => handleNext(item.id)}>
                        <View style={styles.btnLeft}>
                            <Image style={styles.btnIcon1} source={item.icon} />
                            <Text style={styles.btnTitle}>{item.title}</Text>
                        </View>
                        <Image
                            style={styles.btnIcon}
                            source={require('../../../../../assets/icons/chevron-right.png')}
                        />
                    </TouchableOpacity>
                ))}
            </View>
            <Button
                style={styles.confirm}
                textStyles={styles.confirmText}
                text={'sign  out'}
                onClick={onSubmit}
                disabled={false}
            />
        </View>
    );
};

export default Slide1;
