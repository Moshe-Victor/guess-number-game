import {useState} from 'react';
import {TextInput, View, StyleSheet, Alert, Text, Dimensions,
    useWindowDimensions, KeyboardAvoidingView, ScrollView
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({onPickedNumber}) {

    const [enteredNumber, setEnteredNumber] = useState('');

    const {width, height} = useWindowDimensions();

    function numberInputHandler(enteredText) {
        setEnteredNumber(enteredText);
    }

    function resetInputHandler() {
        setEnteredNumber('');
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredNumber);

        if (isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber > 99) {
            Alert.alert(
              'Invalid number!',
              'Number has to be a number between 1 nd 99.',
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
            );
            return;
        }

        onPickedNumber(chosenNumber);

    }

    const marginTopDistance = height < 380 ? 30 : 100;

    return (
        <ScrollView style={styles.screen}>
        <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.roorContainer, {marginTop: marginTopDistance}]}>
            <Title>Guess My Number</Title>
            <Card>
                <InstructionText>Enter number</InstructionText>
            <TextInput
                style={styles.numberInput}
                maxLength={2}
                keyboardType="number-pad"
                autoCorrect={false}
                onChangeText={numberInputHandler}
                value={enteredNumber}
            >
            </TextInput>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>
                    Reset
                </PrimaryButton>
                </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>
                    Confirm
                </PrimaryButton>
            </View>
            </View>
        </Card>
        </View>
        </KeyboardAvoidingView>
            </ScrollView>
    )
}
export default StartGameScreen;

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    screen:{
        flex:1,
    },
    roorContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: "center",
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        //marginTop: deviceHeight < 380 ? 30 : 100,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 6,
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accents500,
        borderBottomWidth: 2,
        color: Colors.accents500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    }
})