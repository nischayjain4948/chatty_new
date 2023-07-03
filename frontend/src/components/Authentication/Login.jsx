import React, { useState } from 'react'
import { FormLabel, VStack, FormControl, Input, InputGroup, InputRightElement, Button, useToast } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [login, setLogin] = useState({
        email: "",
        password: "",

    });
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();

    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(!show);
    }

    const submitHandler = async () => {
        // console.log("submitHandler called")
        setLoading(true);
        if(!login.email || !login.password){
            toast({
                title:"Please fill all the Feilds!",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom"
            })
            setLoading(false);
            return 
        }

        try{
            const config = {
                headers:{
                    "Content-type":"application/json",
                }
            }
            const {email, password} = login
            const {data} = await axios.post("/api/user/login", {email, password}, config)

            toast({
                title:"Login Successful",
                status:"success",
                isClosable:true,
                position:"bottom",
                duration:5000
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push('/chats');

        }
        catch(error){
            toast({
                title:"Error Occured!",
                status:"error",
                description:error.response.data.message,
                duration:5000,
                isClosable:true
            })
            setLoading(false);

        }
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





            <Button colorScheme='blue' width={"100%"} style={{ marginTop: 15 }} onClick={submitHandler} isLoading = {loading}>Login</Button>


        </VStack>

    )
}

export default Login