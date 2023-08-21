import React, { useState } from 'react';
import "expo-router/entry";
import { View, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import { 
    Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome 
} from "../components"; 

function Home() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    // SafeAreaView is a view that displays things "safely",
    // aka avoiding things like notches, cameras, and home buttons
    // on a wide range of mobile devices
    return (
        <SafeAreaView 
            style={{flex: 1, 
            backgroundColor: COLORS.lightWhite}}
        >
            {/* !--- WHAT THE NATIVE STACK IS ---!
            This funky little guy uses React Native's stack component
            the component basically wraps iOS navigator (idk what it is) and
            Android's fragment navigation methods into one, but they can be
            used the same, basically transition to a screen and it's added
            to the top of the stack*/}

            {/* !--- HOW EXPO'S CUSTOMIZATION WORKS ---!
            In my mind this is how the Stack.Screen works, everything is 
            rendered within stacks' viewport, the thing that isn't is the header
            think how the iOS header is always available on mobile apps, so by 
            customizing the stack's screen you can customize how your header will
            look since it is always displayed and independent from the current view*/}
            
            <Stack.Screen 
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn 
                          iconUrl={icons.menu} dimension="60%"/>
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn 
                          iconUrl={images.profile} dimension="100%"/>
                    ),
                    headerTitle: "Wee Woo"
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1,
                        padding: SIZES.medium
                    }}
                >
                    <Welcome 
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleClick={() => {
                            if(searchTerm) {
                                router.push(`/search/${searchTerm}`)
                            }
                        }}
                    />
                    <Popularjobs />
                    <Nearbyjobs />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;