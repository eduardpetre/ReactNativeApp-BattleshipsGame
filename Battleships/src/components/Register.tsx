import {Button} from "react-native";
import styled from "styled-components/native";
import {useState} from "react";
import {register} from "../api";
import {useNavigation} from "@react-navigation/native";

const Container = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 50px;
`

const Input = styled.TextInput`
    width: 80%;
    font-size: 30px;
    padding: 4px;
    border: 1px solid black;
`

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation<any>();
    const goToLogin = () => {
        navigation.navigate('Login')
    }

    return (
        <Container>
            <Input onChangeText={setEmail} keyboardType={'email-address'} ></Input>
            <Input onChangeText={setPassword} secureTextEntry ></Input>
            <Button title={"Register"} onPress={ async () => {
                const response = await register(email, password);
                // console.log(response)
            }} />
            <Button title={"Login"} onPress={() => goToLogin()} />
        </Container>
    )
}

export default Register