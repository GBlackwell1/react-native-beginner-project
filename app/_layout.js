import { Stack } from "expo-router";
import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
    // useFonts will return a boolean if the fonts are loaded.
    const [fontsLoaded] = useFonts({
        DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
        DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
        DMRegular: require('../assets/fonts/DMSans-Regular.ttf')
    })

    // This is really similar to a useEffect in React
    // aka, dependendent on fontsLoaded, useCallback will actually
    // not rerender when the child renders like how react usually works,
    // it will only render when the dependency has changed

    const onLayoutRootView = useCallback( async () => {
        if(fontsLoaded) {
            await SplashScreen.hideAsync();
        }}, [fontsLoaded]);

    // Don't load anything until the fonts have loaded
    // Since callback isn't dependent on a render it should
    // still be waiting for the fonts to load
    if(!fontsLoaded) return null;
    
    // Not quite sure what onLayout is right here
    return <Stack onLayout={onLayoutRootView} />;
}