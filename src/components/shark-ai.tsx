import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// ─── Types ───────────────────────────────────────────────
interface Message {
    id: string;
    role: 'user' | 'assistant';
    text: string;
    time: string;
}

// ─── Helpers ─────────────────────────────────────────────
const now = () => {
    const d = new Date();
    return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
};

// ─── Suggested prompts ────────────────────────────────────
const SUGGESTIONS = [
    '🤔 Giá vàng hiện tại?',
    '🤔 Bao giờ thì tôi mới giàu?',
];

// ─── Initial messages (demo data) ────────────────────────
const INITIAL_MESSAGES: Message[] = [
    {
        id: '1',
        role: 'user',
        text: 'Chào TinyShark 👋\nHôm nay mình tiêu hơi nhiều, có ổn không?',
        time: '7:20',
    },
    {
        id: '2',
        role: 'assistant',
        text: 'Chào bạn! 🦈\nĐể mình kiểm tra nhanh cho bạn nhé.\nHôm nay bạn đã chi 320.000đ, cao hơn mức trung bình hàng ngày khoảng 15%. Phần lớn là chi cho ăn uống 🍜.\nNếu bạn giữ mức chi này, cuối tháng vẫn không vượt ngân sách 👍 Nhưng ngày mai nên chi tiêu nhẹ hơn một chút là đẹp đó!',
        time: '7:20',
    },
];

// ─── Bubble component ─────────────────────────────────────
const MessageBubble = ({ message }: { message: Message }) => {
    const isUser = message.role === 'user';

    if (isUser) {
        return (
            <View style={styles.userRow}>
                <View style={styles.userBubble}>
                    <Text style={styles.userText}>{message.text}</Text>
                </View>
                <View style={styles.metaRow}>
                    <Text style={styles.timeText}>{message.time}</Text>
                    <Image
                        source={require('@/assets/images/avatar-user.png')}
                        style={styles.avatarUser}
                        contentFit="cover"
                    />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.assistantRow}>
            <View style={styles.assistantBubble}>
                <Text style={styles.assistantText}>{message.text}</Text>
            </View>
            <View style={styles.metaRowAssistant}>
                <Image
                    source={require('@/assets/images/bubble-shark.png')}
                    style={styles.avatarShark}
                    contentFit="contain"
                />
                <Text style={styles.timeText}>{message.time}</Text>
            </View>
        </View>
    );
};

// ─── Main screen ─────────────────────────────────────────
export default function SharkAIScreen() {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const listRef = useRef<FlatList>(null);

    const sendMessage = async (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            text: text.trim(),
            time: now(),
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);

        // ── TODO: thay đoạn này bằng Gemini API ──────────────
        // const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_KEY', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ contents: [{ parts: [{ text }] }] }),
        // });
        // const data = await response.json();
        // const reply = data.candidates[0].content.parts[0].text;

        // Demo reply
        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                text: 'Mình đang xử lý câu hỏi của bạn... 🦈\n(Tích hợp Gemini sẽ trả lời ở đây!)',
                time: now(),
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
            setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
        }, 1200);
        // ─────────────────────────────────────────────────────
    };

    return (
        <LinearGradient
            colors={['#B2E8F0', '#A0D8E8', '#8ECDE0', '#7EC4D8']}
            locations={[0, 0.35, 0.7, 1]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    style={styles.flex}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                >
                    {/* ─── Header ─── */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                            <Feather name="chevron-left" size={28} color="#1a1a1a" />
                        </TouchableOpacity>
                        <View style={styles.headerCenter}>
                            <Text style={styles.headerTitle}>TINYSHARK</Text>
                            <Image
                                source={require('@/assets/images/shark-small.png')}
                                style={styles.headerAvatar}
                                contentFit="contain"
                            />
                        </View>
                        <View style={styles.headerRight} />
                    </View>

                    {/* Online status */}
                    <View style={styles.statusRow}>
                        <View style={styles.onlineDot} />
                        <Text style={styles.statusText}>Hoạt động</Text>
                    </View>

                    {/* ─── Messages ─── */}
                    <FlatList
                        ref={listRef}
                        data={messages}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <MessageBubble message={item} />}
                        contentContainerStyle={styles.messageList}
                        showsVerticalScrollIndicator={false}
                        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
                        ListFooterComponent={
                            isTyping ? (
                                <View style={styles.typingRow}>
                                    <View style={styles.typingBubble}>
                                        <Text style={styles.typingDots}>• • •</Text>
                                    </View>
                                </View>
                            ) : null
                        }
                    />

                    {/* ─── Suggestion chips ─── */}
                    <View style={styles.suggestionsRow}>
                        {SUGGESTIONS.map((s, i) => (
                            <TouchableOpacity
                                key={i}
                                style={styles.suggestionChip}
                                onPress={() => sendMessage(s)}
                                activeOpacity={0.75}
                            >
                                <Text style={styles.suggestionText}>{s}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* ─── Input bar ─── */}
                    <View style={styles.inputBar}>
                        <TextInput
                            style={styles.input}
                            placeholder="Hãy thử đặt câu hỏi..."
                            placeholderTextColor="#aaa"
                            value={input}
                            onChangeText={setInput}
                            multiline
                            returnKeyType="send"
                            onSubmitEditing={() => sendMessage(input)}
                        />
                        <TouchableOpacity
                            style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
                            onPress={() => sendMessage(input)}
                            disabled={!input.trim()}
                            activeOpacity={0.8}
                        >
                            <Feather name="send" size={18} color={input.trim() ? '#278b97' : '#ccc'} />
                        </TouchableOpacity>
                    </View>

                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
}

// ─── Styles ──────────────────────────────────────────────
const styles = StyleSheet.create({
    gradient: { flex: 1 },
    flex: { flex: 1 },
    safeArea: { flex: 1 },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 4,
    },
    backBtn: {
        width: 36,
        height: 36,
        justifyContent: 'center',
    },
    headerCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#3ABCCC',
        letterSpacing: 2,
    },
    headerAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#fff',
    },
    headerRight: { width: 36 },

    // Status
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        gap: 6,
    },
    onlineDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4CAF50',
    },
    statusText: {
        fontSize: 13,
        color: '#2a2a2a',
        fontWeight: '500',
    },

    // Messages
    messageList: {
        paddingHorizontal: 16,
        paddingBottom: 12,
        flexGrow: 1,
        justifyContent: 'flex-end',
    },

    // User bubble
    userRow: {
        alignItems: 'flex-end',
        marginVertical: 10,
    },
    userBubble: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderBottomRightRadius: 4,
        paddingHorizontal: 16,
        paddingVertical: 12,
        maxWidth: '78%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
    userText: {
        fontSize: 15,
        color: '#1a1a1a',
        lineHeight: 22,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        gap: 8,
    },
    avatarUser: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 2,
        borderColor: '#fff',
    },

    // Assistant bubble
    assistantRow: {
        alignItems: 'flex-start',
        marginVertical: 10,
    },
    assistantBubble: {
        backgroundColor: '#5BBFB5',
        borderRadius: 20,
        borderBottomLeftRadius: 4,
        paddingHorizontal: 16,
        paddingVertical: 12,
        maxWidth: '82%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    assistantText: {
        fontSize: 15,
        color: '#fff',
        lineHeight: 22,
    },
    metaRowAssistant: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        gap: 8,
    },
    avatarShark: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: '#fff',
    },
    timeText: {
        fontSize: 11,
        color: 'rgba(0,0,0,0.4)',
    },

    // Typing indicator
    typingRow: {
        alignItems: 'flex-start',
        marginVertical: 6,
        paddingLeft: 4,
    },
    typingBubble: {
        backgroundColor: '#5BBFB5',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    typingDots: {
        color: '#fff',
        fontSize: 18,
        letterSpacing: 4,
    },

    // Suggestions
    suggestionsRow: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 8,
        gap: 10,
    },
    suggestionChip: {
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 9,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    suggestionText: {
        fontSize: 13,
        color: '#333',
        fontWeight: '500',
    },

    // Input bar
    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 16,
        backgroundColor: '#EDEDED',
        borderRadius: 28,
        paddingHorizontal: 18,
        paddingVertical: 10,
        gap: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: '#1a1a1a',
        maxHeight: 100,
        paddingTop: 0,
        paddingBottom: 0,
    },
    sendBtn: {
        width: 34,
        height: 34,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendBtnDisabled: {
        opacity: 0.4,
    },
});