import {useRecoilValue} from "recoil";
import {accountState} from "../utils/atom";
import { Avatar, Box, Text, Button, IconButton, useDisclosure } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem, Center } from '@chakra-ui/react';
import {useRef} from "react";
import { googleLogout } from '@react-oauth/google';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';


export default function MenuHeader()
{
  let account = useRecoilValue(accountState);
  const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef();

  const logout = () =>{
                          googleLogout();
                          window.location.reload();
                      }

  return(<>
          <Box bg="#ededed" display="flex" alignItems="center" px="1rem">
            <Avatar src={account.picture} name={account.name} ref={btnRef}
                    onClick={onOpen} size="md" my="0.5rem" cursor="pointer"
            />

            <Box color="gray.900" ml="auto">
                <i className="bi bi-chat-left-text-fill"></i>

          <Menu>
            <MenuButton as={IconButton} icon={<i className="bi bi-three-dots-vertical"></i>} ml="0.5rem"
                          bg="#ededed" color="gray.900" fontSize="18px" variant="ghost"/>
            <MenuList>
              <MenuItem ref={btnRef} onClick={onOpen}>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem onClick={()=>logout()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>


      <Drawer
              isOpen={isOpen}
              placement='left'
              onClose={onClose}
              finalFocusRef={btnRef}
              size="md"
            >
              <DrawerOverlay />
              <DrawerContent>

                <DrawerBody bg="gray.300">
                  <Box bg="green.800" color="white" h="16vh" w="100%" pt="4rem" pl="1rem" fontSize="lg">
                    <i className="bi bi-arrow-left"></i>&nbsp;&nbsp;&nbsp;Profile
                  </Box>
                  {
                    account &&  (<>
                    <Box bg="#ededed" h="30vh">
                      <Center>
                        <Avatar name={account.name} src={account.picture} size="2xl" my="2rem"/>
                      </Center>
                    </Box>

                    <Box bg="white" h="6rem" pl="1rem" pt="1rem">
                      <Text color="green.600" mb="1rem">
                        Your name
                      </Text>
                      <Text fontSize="lg" textTransform="capitalize">{account.name}</Text>
                    </Box>

                    <Box h="5rem" p="1rem" bg="#ededed" >
                      <Text color="gray.500" fontSize="sm">
                        This is not your username or pin. This name will be visible to your WhatsApp contacts.
                      </Text>
                    </Box>

                    <Box bg="white" h="6rem" pl="1rem" pt="1rem">
                      <Text color="green.500" mb="1rem">
                        About
                      </Text>
                      <Text fontSize="lg">
                        Eat! Sleep! Repeat 🙂👍✌️
                      </Text>
                    </Box>

                    </>)
                  }
                </DrawerBody>

                <DrawerFooter bg="gray.300">
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
        </>)
}
