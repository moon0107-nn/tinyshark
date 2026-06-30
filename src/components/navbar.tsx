import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';



import { useRouter } from 'expo-router';

interface WavyTabBarProps {
    activeTabProp?: 'Home' | 'Wallet' | 'Analyst' | 'Other';
}



export default function WavyTabBar({
    activeTabProp = 'Wallet'
}: WavyTabBarProps) {
    const router = useRouter();

    const handleNavigate = (tab: 'Home' | 'Wallet' | 'Analyst' | 'Other') => {
        if (tab === 'Home') router.replace('/');
        else if (tab === 'Wallet') router.replace('/wallet' as any);
        else if (tab === 'Analyst') router.replace('/analysis' as any);
        else if (tab === 'Other') router.replace('/other' as any);
    };

    return (

        <View style={styles.bottomNavContainer}>

            <View style={styles.bottomNavBackground}>



                {/* Home */}

                <TouchableOpacity
                    style={[styles.navItem, activeTabProp === 'Home' && styles.activeNavItem]}
                    onPress={() => handleNavigate('Home')}
                    activeOpacity={0.8}

                >

                    <Text style={styles.navLabel}>Home</Text>

                    <View style={activeTabProp === 'Home' ? styles.activeNavIconCircle : styles.navIconCircle}>

                        <Feather name="home" size={activeTabProp === 'Home' ? 24 : 20} color={activeTabProp === 'Home' ? "#112d32" : "#fff"} />

                    </View>

                </TouchableOpacity>



                {/* Wallet */}

                <TouchableOpacity
                    style={[styles.navItem, activeTabProp === 'Wallet' && styles.activeNavItem]}
                    onPress={() => handleNavigate('Wallet')}
                    activeOpacity={0.8}

                >

                    <Text style={styles.navLabel}>Wallet</Text>

                    <View style={activeTabProp === 'Wallet' ? styles.activeNavIconCircle : styles.navIconCircle}>

                        <MaterialCommunityIcons name="wallet-outline" size={activeTabProp === 'Wallet' ? 24 : 20} color={activeTabProp === 'Wallet' ? "#112d32" : "#fff"} />

                    </View>

                </TouchableOpacity>



                {/* Analyst */}

                <TouchableOpacity
                    style={[styles.navItem, activeTabProp === 'Analyst' && styles.activeNavItem]}
                    onPress={() => handleNavigate('Analyst')}
                    activeOpacity={0.8}

                >

                    <Text style={styles.navLabel}>Analyst</Text>

                    <View style={activeTabProp === 'Analyst' ? styles.activeNavIconCircle : styles.navIconCircle}>

                        <Ionicons name="stats-chart" size={activeTabProp === 'Analyst' ? 24 : 20} color={activeTabProp === 'Analyst' ? "#112d32" : "#fff"} />

                    </View>

                </TouchableOpacity>



                {/* Other */}

                <TouchableOpacity
                    style={[styles.navItem, activeTabProp === 'Other' && styles.activeNavItem]}
                    onPress={() => handleNavigate('Other')}
                    activeOpacity={0.8}

                >

                    <Text style={styles.navLabel}>Other</Text>

                    <View style={activeTabProp === 'Other' ? styles.activeNavIconCircle : styles.navIconCircle}>

                        <Feather name="more-horizontal" size={activeTabProp === 'Other' ? 24 : 20} color={activeTabProp === 'Other' ? "#112d32" : "#fff"} />

                    </View>

                </TouchableOpacity>



            </View>

        </View>

    );

}



const styles = StyleSheet.create({

    bottomNavContainer: {

        position: 'absolute',

        bottom: 0,

        width: '100%',

        paddingHorizontal: 10,

        paddingBottom: 20,

    },

    bottomNavBackground: {

        backgroundColor: '#278b97',

        flexDirection: 'row',

        justifyContent: 'space-around',

        alignItems: 'flex-end',

        height: 70,

        borderRadius: 35,

        paddingHorizontal: 10,

    },

    navItem: {

        alignItems: 'center',

        justifyContent: 'center',

        marginBottom: 10,

    },

    activeNavItem: {

        marginBottom: 20,

    },

    navLabel: {

        color: '#fff',

        fontSize: 10,

        marginBottom: 4,

    },

    navIconCircle: {

        width: 40,

        height: 40,

        borderRadius: 20,

        borderWidth: 1,

        borderColor: '#4ba096',

        justifyContent: 'center',

        alignItems: 'center',

    },

    activeNavIconCircle: {

        width: 50,

        height: 50,

        borderRadius: 25,

        backgroundColor: '#f6d3c5',

        justifyContent: 'center',

        alignItems: 'center',

    },

});