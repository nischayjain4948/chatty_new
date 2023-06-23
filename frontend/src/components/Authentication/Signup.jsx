import { FormLabel, VStack, FormControl, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import React, { useState } from 'react'

const Signup = () => {

    const [signup, setSignup] = useState({
        name: "",
        email: "",
        password: "",
        setPassword: "",
        pic: "",
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
            <FormControl id='first-name'>
                <FormLabel>Name*</FormLabel>
                <Input type='text' placeholder='Enter Your name' value={signup.name} onChange={(e) => setSignup({ ...signup, name: e.target.value })} />
            </FormControl>

            <FormControl id='email'>
                <FormLabel>Email*</FormLabel>
                <Input type='email' placeholder='Enter Your email' value={signup.email} onChange={(e) => setSignup({ ...signup, email: e.target.value })} />
            </FormControl>



            <FormControl id='password'>
                <FormLabel>Password*</FormLabel>
                <InputGroup>
                    <Input type={show ? 'text' : 'password'} placeholder='Enter Your password' value={signup.password} onChange={(e) => setSignup({ ...signup, password: e.target.value })} />

                    <InputRightElement>

                        <Button h={"10"} w={"4.5rem"} bgColor={"#c0c0c0"} size={"sm"} onClick={handleClick}>{show ? "Hide" : "Show"}</Button>

                    </InputRightElement>

                </InputGroup>
            </FormControl>


            <FormControl id='confirm_password'>
                <FormLabel> Confirm Password*</FormLabel>
                <InputGroup>
                    <Input type={show ? 'text' : 'password'} placeholder='Enter Your password' value={signup.setPassword} onChange={(e) => setSignup({ ...signup, setPassword: e.target.value })} />

                    <InputRightElement>

                        <Button bgColor={"#c0c0c0"} h={"10"} w={"4.5rem"} size={"sm"} onClick={handleClick}>{show ? "Hide" : "Show"}</Button>

                    </InputRightElement>

                </InputGroup>
            </FormControl>




            <FormControl id='pic'>
                <FormLabel>Upload Your Picture</FormLabel>
                <Input type='file' p={1.5} accept='image/*' value={signup.email} onChange={(e) => setSignup({ ...signup, pic: e.target.files[0] })} />
            </FormControl>


            <Button colorScheme='blue' width={"100%"} style={{ marginTop: 15 }} onClick={submitHandler}>SignUp</Button>


        </VStack>
    )
}

export default Signup