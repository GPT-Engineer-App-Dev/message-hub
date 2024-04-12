import { Box, Button, Container, Flex, FormControl, FormLabel, Input, Stack, Text, VStack } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (user.trim()) {
      setIsLoggedIn(true);
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = { id: Date.now(), text: message, user: user };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  return (
    <Container maxW="container.md" py={10}>
      {!isLoggedIn ? (
        <VStack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input id="username" type="text" value={user} onChange={handleUserChange} />
          </FormControl>
          <Button onClick={handleLogin}>Login</Button>
        </VStack>
      ) : (
        <Flex direction="column" height="100vh">
          <Box flex="1" bg="gray.100" p={4} overflowY="auto">
            {messages.map((msg) => (
              <Box key={msg.id} bg="teal.100" p={2} my={2} borderRadius="md">
                <Text fontWeight="bold">{msg.user}</Text>
                <Text>{msg.text}</Text>
              </Box>
            ))}
          </Box>
          <Box p={4}>
            <Flex as="form" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Type a message..." value={message} onChange={handleInputChange} />
              <Button ml={2} colorScheme="teal" onClick={handleSendMessage} leftIcon={<FaPaperPlane />}>
                Send
              </Button>
            </Flex>
          </Box>
        </Flex>
      )}
    </Container>
  );
};

export default Index;
