import {useState, useEffect} from 'react';
import { StyleSheet, Text, View , ImageBackground, SafeAreaView, StatusBar} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import StartGameScreen from "./src/screens/StartGameScreen";
import GameScreen from "./src/screens/GameScreen";
import Colors from "./src/constants/colors";
import GameOverScreen from "./src/screens/GameOverScreen";
import {useFonts} from "expo-font";
import AppLoading from "expo-app-loading";
import * as SplashScreen from 'expo-splash-screen';

export default function App() {

    const [userNumber, setUserNumber] = useState(0);
    const [gameIsOver , setGameIsOver] = useState(true);
    const [guessRounds, setGuessRounds] = useState(0);

    const [fontsLoaded] = useFonts({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, []);

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    function pickedNumberHandler(pickedNumber) {
        setUserNumber(pickedNumber);
        setGameIsOver(false);
    }

    function gameOverHandler(numberOfRounds) {
        setGameIsOver(true);
        setGuessRounds(numberOfRounds);
    }

    function startNewGameHandler() {
        setUserNumber();
        setGuessRounds(0);
    }

    let screen = <StartGameScreen onPickedNumber={pickedNumberHandler}/>;

    if (userNumber) {
        screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>;
    }

    if (gameIsOver && userNumber) {
        screen = <GameOverScreen
            userNumber={userNumber}
            roundsNumber={guessRounds}
            onStartNewGame={startNewGameHandler}
        />;
    }

  return (
      <>
          <StatusBar style="light"></StatusBar>
          <LinearGradient colors={[Colors.primary700, Colors.accents500]} style={styles.rootScreen}>
            <ImageBackground
                source={require('./assets/images/background.png')}
                resizeMode="cover"
                style={styles.rootScreen}
                imageStyle={styles.backgroundImage}
            >
                <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
            </ImageBackground>
          </LinearGradient>
      </>
  );
}

const styles = StyleSheet.create({

  rootScreen: {
    flex: 1,
  },
    backgroundImage: {
      opacity: 0.15,
    }
});
