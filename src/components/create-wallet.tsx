import { Feather } from '@expo/vector-icons';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Thêm interface định nghĩa prop onBack cho TypeScript
interface CreateAccountScreenProps {
    onBack: () => void;
}

export default function CreateAccountScreen({ onBack }: CreateAccountScreenProps) {
    // Mảng chứa dữ liệu của 3 lựa chọn
    const options = [
        {
            id: 'spending',
            title: 'Tạo tài khoản chi tiêu',
            subtitle: 'Quản lý chi tiêu hằng ngày',
            image: require('@/assets/images/shark-vest2.png'),
        },
        {
            id: 'saving',
            title: 'Tạo sổ tiết kiệm',
            subtitle: 'Tiết kiệm cho tương lai',
            image: require('@/assets/images/shark-coin2.png'),
        },
        {
            id: 'accumulation',
            title: 'Tạo sổ tích lũy',
            subtitle: 'Tích lũy cho mục tiêu của bạn',
            image: require('@/assets/images/shark-tie2.png'),
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cardContainer}>
                {/* Nút Back quay lại */}
                <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
                    <Feather name="arrow-left" size={24} color="#000000" />
                </TouchableOpacity>

                {/* Tiêu đề màn hình */}
                <Text style={styles.mainTitle}>Tạo mới tài khoản</Text>

                {/* Danh sách các lựa chọn */}
                {options.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.card}
                        activeOpacity={0.7}
                        onPress={() => console.log(`Bấm vào: ${item.title}`)}
                    >
                        <View style={styles.cardLeft}>
                            {/* Khu vực hiển thị Mascot con cá mập */}
                            <View style={styles.imageWrapper}>
                                {item.image ? (
                                    <Image source={item.image} style={styles.mascotImage} />
                                ) : (
                                    <View style={styles.imagePlaceholder} />
                                )}
                            </View>

                            {/* Phần text tiêu đề và phụ đề */}
                            <View style={styles.textWrapper}>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                            </View>
                        </View>

                        {/* Icon mũi tên bên phải */}
                        <Feather name="chevron-right" size={24} color="#7f7f7f" />
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dcdcdc',
    },
    cardContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    backButton: {
        marginBottom: 15,
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 25,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#e6e6e6',
        borderRadius: 18,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    cardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingRight: 10,
    },
    imageWrapper: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    mascotImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    imagePlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#0b6375',
    },
    textWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 13,
        color: '#666666',
    },
});