import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPostsToStore } from "../store/reducers/postsReducer/postsReducer";
import { addPeoplesToStore } from "../store/reducers/peoplesReducer/peoplesReducer";
import axios from "axios";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Stack,
  Flex,
  Spacer,
  Text,
  Center,
} from "@chakra-ui/react";

export const PostsPage = () => {

  const dispatch = useDispatch();
  const { isLoading, posts } = useSelector((state) => state.posts);
  const {isLoadingPeople, peoples} = useSelector((state) => state.peoples)
  const [filter, setFiltres] = useState(-1);
 
  useEffect(() => {
    getPostsData();
    getPeoples();
  }, []);

  const handleButtonClick = (number) => {
    setFiltres(number);
  };
  const getPostsData = async () => {
    await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (res.status == 200 && res?.data && Array.isArray(res.data)) {
          dispatch(addPostsToStore({ loaded: true, posts: res.data }));
        }
      })
      .catch((error) => {
        dispatch(addPostsToStore({ loaded: true, posts: [] }));
      });
  };
  const getPeoples = async () => {
    await axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (res.status == 200 && res?.data && Array.isArray(res.data)) {
          dispatch(addPeoplesToStore({ loaded: true, peoples: res.data }));
        }
      })
      .catch((error) => {
        dispatch(addPeoplesToStore({ loaded: true, peoples: [] }));
      });
  };
  return (
    <>
    <Stack alignItems='center'
    justifyContent='center'>
    <ButtonGroup m={4} variant='outline' spacing='6'>
            <Button colorScheme='red' onClick={() => handleButtonClick(-1)}>Все посты</Button>
      </ButtonGroup>

    </Stack>
    <Flex flexWrap="wrap">
      <ButtonGroup m={4} variant='outline' spacing='7'>
        {peoples.map((people) => (
          <Button  size='sm' colorScheme='blue' onClick= {() => handleButtonClick(people.id)}key={people.id}>{people.name}</Button>
        ))}
      </ButtonGroup>

    </Flex>

      <Center><Text fontSize='3xl' color='black' as='b'>Посты</Text></Center>
      
     <Center> <Stack m={6} direction={"row"} wrap={"wrap"}>
        
        {filter > -1 ? (
            posts.filter(post => post.userId === filter).map(post => (
              <Center><Card key = {post.id} border={"1px"} m={2} width={200}>
                <CardHeader><Text fontSize='2xl' color='tomato' as='mark'>{post.title}</Text></CardHeader>
                <CardBody><Text fontSize='xl' color='green' as='cite'>{post.body}</Text></CardBody>

                <CardBody> <Text fontSize='l' color='black' as='b'>{peoples.find(ppl => ppl.id === post.userId).name || ''}</Text></CardBody>
              </Card></Center>
            ))
        ) : (
          posts.map((post) => (
            <Center><Card marginLeft={4} key = {post.id} border={"1px"} m={2} width={200}>
                <CardHeader><Text fontSize='2xl' color='tomato' as='mark'>{post.title}</Text></CardHeader>
                <CardBody><Text fontSize='xl' color='green' as='cite'>{post.body}</Text></CardBody>

                <CardBody> <Text fontSize='l' color='black' as='b'>{peoples.find(ppl => ppl.id === post.userId).name || ''}</Text></CardBody>
              </Card></Center>
          ))
        )}
      </Stack></Center>
    </>
  );
};
