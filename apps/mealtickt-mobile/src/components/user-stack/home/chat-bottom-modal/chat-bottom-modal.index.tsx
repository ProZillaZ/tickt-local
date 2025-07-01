import { View, Text, Image, ScrollView, Pressable, TextInput } from 'react-native';
import React, { useState } from 'react';
import { ChatBottomModalProps } from './chat-bottom-modal.props';
import { BottomModal } from 'components/global/bottom-modal/bottom-modal.index';
import { styles } from './chat-bottom-modal.styles';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { chatData } from 'app/constants/constants.ts';
import { getCardIcon } from 'utils/helpers.ts';
import Button from 'components/global/button/button.index';
import { colors } from 'utils/styles';
import { useChatModal } from './use-chat-bottom-modal.ts';
import AppLogger from 'app/logger/logger.ts';
const ChatBottomModal = ({ isVisible, onClose }: ChatBottomModalProps) => {
    const { scrollViewRef, scrollToEnd } = useChatModal();
    const [chatStarted, setChatStarted] = useState(false);
    const userMsg = (item: any, id: number) => (
        <View
            key={id}
            style={[
                styles.headerContainer,
                styles.userContainer,
                item.msg?.length > 30 && styles.userContainer2,
            ]}>
            <Text style={styles.userMsg}>{item.msg}</Text>
        </View>
    );

    const aiMsg = (item: any, id: number) => (
        <View key={id} style={[styles.headerContainer, styles.aiContainer]}>
            <View style={styles.aiRow}>
                <View style={styles.aiIconContainer}>
                    <Image style={styles.aiIcon} source={getCardIcon('ai')} />
                </View>
                <Text style={styles.aiMsg}>{item.msg}</Text>
            </View>
            {item?.suggestions?.length > 0 && (
                <View style={styles.optContainer}>
                    {item?.suggestions?.map((suggestion: string, id: number) => (
                        <Button
                            key={id}
                            type="none"
                            text={suggestion}
                            onClick={() => {}}
                            disabled={false}
                            style={styles.aiOptContainer}
                            textStyles={styles.aiOptText}
                        />
                    ))}
                </View>
            )}
            {item?.options?.length > 0 && (
                <View style={styles.rowGap}>
                    {item?.options?.map((option: string, id: number) => (
                        <View key={id} style={styles.row}>
                            <View style={styles.circle}>
                                <Text style={styles.aiMsg2}>{id + 1}</Text>
                            </View>
                            <Text style={styles.aiMsg}>{option}</Text>
                        </View>
                    ))}
                </View>
            )}
            {item?.question && <Text style={styles.question}>{item.question}</Text>}
        </View>
    );

    return (
        <BottomModal
            modalStyle={styles.modal}
            height={hp('60%')}
            isVisible={isVisible}
            onClose={onClose}>
            <View style={styles.bar} />
            <ScrollView
                ref={scrollViewRef}
                onContentSizeChange={scrollToEnd}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollView}>
                <View style={styles.chatContainer}>
                    {chatData?.map((item, id) =>
                        item.role == 'user' ? userMsg(item, id) : aiMsg(item, id),
                    )}
                </View>
            </ScrollView>
            <View style={styles.inputContainer}>
                <Pressable>
                    <Image style={styles.inputLeftIcon} source={getCardIcon('plus')} />
                </Pressable>
                <TextInput
                    multiline={false}
                    style={[styles.inputStyle]}
                    placeholder={'message'}
                    placeholderTextColor={colors.blackText}
                    onChangeText={() => {}}
                    cursorColor={colors.yellow}
                    selectionColor={colors.yellow}
                />
                <Pressable
                    onPress={() => {
                        if (!chatStarted) {
                            AppLogger.trackEvent('ai_chat_started', {
                                session_id: 'xyz',
                                userType: 'free',
                            });
                            setChatStarted(true);
                        }
                        AppLogger.trackEvent('ai_message_sent', {
                            message_type: 'nutrition_question',
                            response_time: 2.3,
                        });
                    }}
                    style={styles.inputRightIconContainer}>
                    <Image style={styles.inputRightIcon} source={getCardIcon('enter')} />
                </Pressable>
            </View>
        </BottomModal>
    );
};

export default ChatBottomModal;
