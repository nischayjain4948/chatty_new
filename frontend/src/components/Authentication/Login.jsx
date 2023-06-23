import React, { useState } from 'react'
import { FormLabel, VStack, FormControl, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'

const Login = () => {
    const [login, setLogin] = useState({
        email: "",
        password: "",

    });

    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(!show);
    }

    const submitHandler = () => {
        console.log("submitHandler called")
    }
    return (

        <VStack spacing={"5px"} color={"black"}>


            <FormControl id='email'>
                <FormLabel>Email*</FormLabel>
                <Input type='email' placeholder='Enter Your email' value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} />
            </FormControl>



            <FormControl id='password'>
                <FormLabel>Password*</FormLabel>
                <InputGroup>
                    <Input type={show ? 'text' : 'password'} placeholder='Enter Your password' value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} />

                    <InputRightElement>

                        <Button h={"10"} w={"4.5rem"} size={"sm"} bgColor={"#c0c0c0"} onClick={handleClick}>{show ? "Hide" : "Show"}</Button>

                    </InputRightElement>

                </InputGroup>
            </FormControl>





            <Button colorScheme='blue' width={"100%"} style={{ marginTop: 15 }} onClick={submitHandler}>Login</Button>


        </VStack>

    )
}

export default Login