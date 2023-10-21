import { Box, Center, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <div>
        <Box
          p={4}
          // color={"red.900"}
          style={{
            borderBottom: "1px solid #eee",
          }}
        >
          <Stack direction={"row"}>
            <div>
              <Link to={"/"}>Главная</Link>
            </div>
            <div>
              <Link to={"/admin"}>Админка</Link>
            </div>
            <div>
              <Link to={"/posts"}>Посты</Link>
            </div>
          </Stack>
        </Box>
      </div>
      {/* Outlet - выводит все дочерние элементы роутингов */}
      <div>
        <Outlet />
      </div>
      <div>
      <Center>  <Text fontSize='2xl'>Footer</Text></Center>
      </div>
    </>
  );
};
