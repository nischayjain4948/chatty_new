import { FormLabel, VStack, FormControl, Input, InputGroup, InputRightElement, Button, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Signup = () => {

    const [signup, setSignup] = useState({
        name: "",
        email: "",
        password: "",
        setPassword: "",
        loading : false
    });

    const [pic, setPic] = useState("");

    const [show, setShow] = useState(false);
    const toast = useToast()
    const history = useHistory();

    const handleClick = () => {
        setShow(!show);
    }


    const postDetails = async (pics) =>{
        console.log("Pics => ", pics);
       setSignup({...signup, loading:true});
       if(pics === undefined){
        toast({
            title:"Please Select an Image!",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"bottom"
        })

       }
       if(pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg"){
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "chatty");
        data.append("cloud_name", "nischaycloud");
       await fetch("https://api.cloudinary.com/v1_1/nischaycloud/image/upload",{
            method:"POST", body:data
        }).then((res)=>res.json()).then(data=>{
          const picURL = data.url.toString();
          setPic(picURL);
        setSignup({...signup, loading:false});
        }).catch(err=>{
            console.log("Error while uploading the pic", err);
            setSignup({...signup, loading:false});
        })
       }
       else{
        toast({
          title:"Please Select an Image!",
          status:"warning",
          duration:5000,
          isClosable:true,
          position:"bottom"
        })
        setSignup({ ...signup,loading:false})
        return;
       }

    }



    const submitHandler = async () => {
        setSignup({...signup,loading:true});
        if(!signup.name || !signup.email || !signup.password || !signup.setPassword){
            toast({
                title:"Please fill all the Feilds!",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom",
            });
        setSignup({...signup,loading:false}); 
        return             
        }
        if(signup.password !== signup.setPassword){
               toast({
                title:"Password and confirmPassword are not matched!",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom",
            });
            return;

        }
        try{

            console.log("While saving the data to mongoDB");

            const {name, email, password, setPassword} = signup;

            const config = {
                headers : {
                    "Content-type" :"application/json"
                },

            };
            const {data} = await axios.post("/api/user", {name,email,password,setPassword,pic}, config)
            toast({
                title:"Registration Successful",
                status:"success",
                duration:5000,
                isClosable:true,
                position:"bottom"
            })
            localStorage.setItem("userInfo", JSON.stringify(data));
            setSignup({loading:false});
           history.push("/chats");

        }
        catch(error){
             toast({
                title:"Error Occured!",
                description:error.response.data.message,
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom"
            })
            setSignup({loading:false});
        }




        // console.log("submitHandler called")
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
                <Input type='file' p={1.5} accept='image/*'  onChange={(e) => postDetails(e.target.files[0])} />
            </FormControl>


            <Button colorScheme='blue' width={"100%"} style={{ marginTop: 15 }} onClick={submitHandler} isLoading = {signup.loading}>SignUp</Button>


        </VStack>
    )
}

export default Signup