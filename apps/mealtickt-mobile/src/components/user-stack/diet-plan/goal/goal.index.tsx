import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { styles } from './goal.styles';
import Input from 'components/global/input/input.index';
import { useGoal } from './use-goal.ts';
import { goalOptions } from 'app/constants/constants.ts';
import Dropdown from 'components/global/dropdown/dropdown.index';
import { GoalProps } from './goal.props';

const Goal = ({ data, onUpdate }: GoalProps) => {
    const { editable, inputRef, toggleEditMode } = useGoal();

    const renderCard = () => {
        if (editable) {
            return (
                <View style={styles.systemContainer}>
                    <Input
                        inputRef={inputRef}
                        inputStyle={styles.input}
                        placeholder={'goal weight'}
                        value={data.goalWeight || ''}
                        leftIcon={null}
                        onUpdate={(text) => onUpdate('goalWeight', text)}
                    />
                    <TouchableOpacity
                        onPress={toggleEditMode}
                        style={styles.inputCardIconContainer}>
                        <Image
                            style={styles.inputCardIcon}
                            source={require('../../../../assets/icons/CheckCircle.png')}
                        />
                        <Text style={styles.systemText2}>save</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <View style={[styles.systemContainer]}>
                <Text style={styles.systemText}>suggested goal weight</Text>
                <View style={styles.inputCardContainer}>
                    <Text style={styles.inputCardValue}>{data.goalWeight} kg</Text>
                    <TouchableOpacity
                        onPress={toggleEditMode}
                        style={styles.inputCardIconContainer}>
                        <Image
                            style={styles.inputCardIcon}
                            source={require('../../../../assets/icons/edit-pen.png')}
                        />
                        <Text style={styles.systemText2}>edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.headerContainer}>
            {renderCard()}
            <View style={styles.dropdown}>
                {goalOptions.map((goal, id) => {
                    console.log(goal.key, ' :: ', data[goal.key]);
                    return (
                        <Dropdown
                            key={id}
                            label={goal.placeholder}
                            data={goal.options}
                            initialValue={{ value: data[goal.key], label: data[goal.key] }}
                            onSelect={(l, v) => onUpdate(goal.key, v)}
                        />
                    );
                })}
            </View>
        </View>
    );
};

export default Goal;
