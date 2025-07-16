import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { styles } from './slide3.styles';
import BackButton from 'components/global/back/back.index';
import { option, Slide3Props } from './slide3.props';
import { useSlide3 } from './use-slide3.ts';
import SingleRadioButton from 'components/global/single-radio-button/single-radio-button.index.tsx';
import Input from 'components/global/input/input.index';
import Button from 'components/global/button/button.index';
import AppLogger from 'app/logger/logger.ts';
import { useUpdateUser } from 'app/hooks/use-update-user.ts';
import { MeasurementSystem } from 'app/components/onboarding/slides/slide1/slide1.props.ts';
import { Gender } from '@tickt-ltd/types';

const Slide3 = ({ handleNext }: Slide3Props) => {
    const { state, isEditMode, data, inputRef, handleBack, updateState, getUnit, toggleEditMode } =
        useSlide3({ handleNext });
    const oldProfile = useRef(state);
    const SystemMeasuremnt = ({ item }: option) => (
        <View style={styles.systemContainer}>
            <Text style={styles.systemText}>{item.title}</Text>
            <SingleRadioButton
                data={item}
                defaultValue={state.measurement_system}
                onChange={(e: string) => updateState(item.key, e)}
            />
        </View>
    );
    const { isEqual, updateUser, user } = useUpdateUser();
    const hasEqual1 = isEqual(user?.height, state.height);
    const hasEqual2 = isEqual(user?.weight, state.weight);
    const hasEqual3 = isEqual(user?.age, state.age);
    const hasEqual4 = isEqual(user?.gender, state.gender);
    const Gender = ({ item }: option) => (
        <View style={styles.genderContainer}>
            <Text style={styles.systemText}>{item.title}</Text>
            <View style={styles.genderRow}>
                {item.options.map((option: option, id: number) => (
                    <TouchableOpacity
                        onPress={() => updateState(item.key, option.title)}
                        key={id}
                        style={[
                            styles.optionContainer,
                            option.title == state.gender && styles.optionContainerActive,
                        ]}>
                        <Image style={styles.inputCardIcon} source={option.icon} />
                        <Text style={styles.systemText2}>{option.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    // for inputs
    const renderCard = (item: option, editMode: boolean, value: string) => {
        if (editMode) {
            return (
                <View style={styles.systemContainer}>
                    <Input
                        inputRef={inputRef}
                        inputStyle={styles.input}
                        placeholder={item.key}
                        value={value || ''}
                        leftIcon={null}
                        onUpdate={(text) => updateState(item.key, text)}
                    />
                    <TouchableOpacity
                        onPress={() => toggleEditMode(item.key, !editMode)}
                        style={styles.inputCardIconContainer}>
                        <Image
                            style={styles.inputCardIcon}
                            source={require('../../../../../assets/icons/CheckCircle.png')}
                        />
                        <Text style={styles.systemText2}>save</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <View style={styles.systemContainer}>
                <Text style={styles.systemText}>{item.title}</Text>
                <View style={styles.inputCardContainer}>
                    <Text style={styles.inputCardValue}>
                        {value} {getUnit(item)}
                    </Text>
                    <TouchableOpacity
                        onPress={() => toggleEditMode(item.key, !editMode)}
                        style={styles.inputCardIconContainer}>
                        <Image
                            style={styles.inputCardIcon}
                            source={require('../../../../../assets/icons/edit-pen.png')}
                        />
                        <Text style={styles.systemText2}>edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.headerContainer}>
            <BackButton onPress={handleBack} />
            <View style={styles.headingContainer}>
                <Image
                    style={styles.profileLogo}
                    source={require('../../../../../assets/icons/info.png')}
                />
                <Text style={styles.title}>user info</Text>
            </View>
            <SystemMeasuremnt item={data[0]} />
            {renderCard(data[1], isEditMode.height, state.height)}
            {renderCard(data[2], isEditMode.weight, state.weight)}
            {renderCard(data[3], isEditMode.age, state.age)}
            <Gender item={data[data.length - 1]} />
            <Button
                text="save changes"
                onClick={() => {
                    updateUser({
                        age: state.age,
                        height: state.height,
                        weight: state.weight,
                        gender: state.gender as Gender,
                        measurementSystem: state.measurement_system as MeasurementSystem,
                    });
                    AppLogger.trackEvent('profile_updated', {
                        old_profile: oldProfile.current,
                        new_profile: state,
                    });
                }}
                disabled={hasEqual1 && hasEqual2 && hasEqual3 && hasEqual4}
            />
        </View>
    );
};

export default Slide3;
