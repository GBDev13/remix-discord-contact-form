import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { BsPerson } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';

export default function Contact() {
  return (
    <Flex
      w="100%"
      h="100%"
      bg='gray.900'
      align="center"
      justify="center">
      <Box
        w="500px"
        bg='gray.700'
        borderRadius="lg"
        p={8}
        color='whiteAlpha.900'
        shadow="base">
        <VStack spacing={5}>
          <FormControl isRequired>
            <FormLabel>Nome</FormLabel>

            <InputGroup>
              <InputLeftElement children={<BsPerson />} />
              <Input type="text" name="name" placeholder="Seu Nome" />
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>E-mail</FormLabel>

            <InputGroup>
              <InputLeftElement children={<MdOutlineEmail />} />
              <Input
                type="email"
                name="email"
                placeholder="Seu e-mail"
              />
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Mensagem</FormLabel>

            <Textarea
              name="message"
              placeholder="Sua mensagem"
              rows={6}
              resize="none"
            />
          </FormControl>

          <Button w="full" type="submit">
            Enviar mensagem
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}