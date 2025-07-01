import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { ReactElement } from 'react';
import { styles } from './slide4.styles';
import BackButton from 'components/global/back/back.index';
import { option, parts, Slide4Props } from './slide4.props';
import { useSlide4 } from './use-slide4.ts';
import Button from 'components/global/button/button.index';
import { planContent } from 'app/constants/constants.ts';
import AppLogger from 'app/logger/logger.ts';

const Slide4 = ({ handleNext }: Slide4Props) => {
    const { handleBack } = useSlide4({ handleNext });

    const AdvancedText = ({ parts }: parts) => {
        return (
            <View style={styles.benefitsContainer}>
                <Image
                    style={styles.benefitsIcon}
                    source={require('../../../../../assets/icons/CheckCircle.png')}
                />
                <Text style={styles.benefitText}>
                    {parts.map((part: string | ReactElement, index: number) =>
                        typeof part === 'string' ? (
                            <Text key={index} style={styles.text}>
                                {part}
                            </Text>
                        ) : (
                            React.cloneElement(part, { key: index }) // Preserve original Text props
                        ),
                    )}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.headerContainer}>
            <BackButton onPress={handleBack} />
            <View style={styles.headingContainer}>
                <Image
                    style={styles.profileLogo}
                    source={require('../../../../../assets/icons/certificate.png')}
                />
                <Text style={styles.title}>subscriptions</Text>
            </View>
            <Text style={styles.text}>
                you're currently on the <Text style={styles.currentPlanText}>basic</Text> plan.
            </Text>
            <Text style={styles.heading}>premium benefits</Text>
            <View style={styles.rowGap}>
                <AdvancedText
                    parts={[
                        <Text style={styles.currentPlanText}>advanced tracking </Text>,
                        'for your nutrition and goals.',
                    ]}
                />
                <AdvancedText
                    parts={[
                        'access to the ',
                        <Text style={styles.currentPlanText}>interactive ai coach </Text>,
                    ]}
                />
                <AdvancedText parts={['dynamic, personalised meal plans adapted to you.']} />
            </View>
            <View style={styles.genderRow}>
                {planContent.map((option: option, id: number) => (
                    <TouchableOpacity
                        key={id}
                        onPress={() => {
                            AppLogger.trackEvent('subscription_purchase', {
                                item_id: 'premium_monthly',
                                value: 9.99,
                                currency: 'USD',
                            });
                        }}
                        style={[styles.optionContainer]}>
                        <Text style={styles.duration}>{option.duration}</Text>
                        <Text style={styles.price}>${option.price}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Button text="save changes" onClick={() => {}} disabled={false} />
        </View>
    );
};

export default Slide4;
