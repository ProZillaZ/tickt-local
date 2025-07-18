import { View, Text, Image, ScrollView, Pressable, TextInput, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { ChatBottomModalProps } from './chat-bottom-modal.props';
import { BottomModal } from 'components/global/bottom-modal/bottom-modal.index';
import { styles } from './chat-bottom-modal.styles';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getCardIcon } from 'utils/helpers.ts';
import Button from 'components/global/button/button.index';
import { colors } from 'utils/styles';
import { useChatModal } from './use-chat-bottom-modal.ts';
import AppLogger from 'app/logger/logger.ts';
const ChatBottomModal = ({ isVisible, onClose }: ChatBottomModalProps) => {
    const { 
        scrollViewRef, 
        scrollToEnd, 
        chatStarted, 
        setChatStarted,
        currentSession,
        currentMessage,
        updateCurrentMessage,
        sendMessage,
        isLoading,
        error,
        clearError
    } = useChatModal();

    const userMsg = (message: any, id: number) => (
        <View
            key={id}
            style={[
                styles.headerContainer,
                styles.userContainer,
                message.content?.length > 30 && styles.userContainer2,
            ]}>
            <Text style={styles.userMsg}>{message.content}</Text>
        </View>
    );

    const aiMsg = (message: any, id: number) => (
        <View key={id} style={[styles.headerContainer, styles.aiContainer]}>
            <View style={styles.aiRow}>
                <View style={styles.aiIconContainer}>
                    <Image style={styles.aiIcon} source={getCardIcon('ai')} />
                </View>
                <Text style={styles.aiMsg}>{message.content}</Text>
            </View>
            {message?.metadata?.suggestions?.length > 0 && (
                <View style={styles.optContainer}>
                    {message?.metadata?.suggestions?.map((suggestion: string, id: number) => (
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
            {message?.metadata?.options?.length > 0 && (
                <View style={styles.rowGap}>
                    {message?.metadata?.options?.map((option: string, id: number) => (
                        <View key={id} style={styles.row}>
                            <View style={styles.circle}>
                                <Text style={styles.aiMsg2}>{id + 1}</Text>
                            </View>
                            <Text style={styles.aiMsg}>{option}</Text>
                        </View>
                    ))}
                </View>
            )}
            {message?.metadata?.question && <Text style={styles.question}>{message.metadata.question}</Text>}
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
                    {currentSession?.messages?.map((message, id) =>
                        message.participantId === 'user_1' ? userMsg(message, id) : aiMsg(message, id),
                    )}
                    {isLoading && (
                        <View style={[styles.headerContainer, styles.aiContainer]}>
                            <View style={styles.aiRow}>
                                <View style={styles.aiIconContainer}>
                                    <Image style={styles.aiIcon} source={getCardIcon('ai')} />
                                </View>
                                <ActivityIndicator size="small" color={colors.yellow} />
                                <Text style={[styles.aiMsg, { marginLeft: 8 }]}>Thinking...</Text>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
            {error && (
                <View style={{ padding: 12, backgroundColor: '#ffebee', borderRadius: 8, margin: 12 }}>
                    <Text style={{ color: '#c62828', fontSize: 14 }}>{error}</Text>
                    <Pressable onPress={clearError} style={{ marginTop: 8 }}>
                        <Text style={{ color: '#1976d2', fontSize: 14, fontWeight: '500' }}>Dismiss</Text>
                    </Pressable>
                </View>
            )}
            <View style={styles.inputContainer}>
                <Pressable>
                    <Image style={styles.inputLeftIcon} source={getCardIcon('plus')} />
                </Pressable>
                <TextInput
                    multiline={false}
                    style={[styles.inputStyle]}
                    placeholder={'message'}
                    placeholderTextColor={colors.blackText}
                    value={currentMessage}
                    onChangeText={updateCurrentMessage}
                    cursorColor={colors.yellow}
                    selectionColor={colors.yellow}
                    editable={!isLoading}
                />
                <Pressable
                    onPress={() => {
                        if (!chatStarted) {
                            AppLogger.trackEvent('ai_chat_started', {
                                session_id: 'xyz',
                                userType: 'free',
                            });
                        }
                        AppLogger.trackEvent('ai_message_sent', {
                            message_type: 'nutrition_question',
                            response_time: 2.3,
                        });
                        sendMessage();
                    }}
                    disabled={isLoading || !currentMessage.trim()}
                    style={[
                        styles.inputRightIconContainer,
                        (isLoading || !currentMessage.trim()) && { opacity: 0.5 }
                    ]}>
                    <Image style={styles.inputRightIcon} source={getCardIcon('enter')} />
                </Pressable>
            </View>
        </BottomModal>
    );
};

export default ChatBottomModal;
