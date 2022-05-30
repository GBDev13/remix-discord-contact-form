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
  useToast,
  VStack,
} from '@chakra-ui/react';
import type { ActionFunction } from '@remix-run/node';
import { Form, useActionData, useTransition } from '@remix-run/react';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { BsPerson } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const url = process.env.WEBHOOK_URL;

  if(!url) {
    return {
      error: true,
      code: 'WEBHOOK_URL is missing',
      message: 'Ocorreu um erro inesperado ao enviar sua mensagem. Tente novamente!'
    }
  }

  const sender = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message")
  };

  if(!sender?.name || !sender?.email || !sender?.message) {
    return {
      error: true,
      message: 'Todos os campos são obrigatórios!'
    }
  }

  const messageData = {
    embeds: [
      {
        title: "Nova mensagem",
        color: 3447003,
        thumbnail: {
          url: "https://i.imgur.com/tm5F0f1.png",
        },
        fields: [
          {
            name: "Nome",
            value: sender.name,
            inline: true,
          },
          {
            name: "E-mail",
            value: sender.email,
            inline: true,
          },
          {
            name: "Mensagem",
            value: sender.message,
          },
        ],
      },
    ],
  };

  try {
    await axios.post(url, messageData);
  } catch {
    return {
      error: true,
      message: "Ocorreu um erro inesperado ao enviar sua mensagem. Tente novamente!"
    }
  }
  
  return { ok: true };
}

export default function Contact() {
  const actionData = useActionData();
  const toast = useToast();

  const formRef = useRef<HTMLFormElement>(null);

  const transition = useTransition();
  const isSending = transition.state === "submitting" && transition.submission.formData.get("_action") === 'send';

  useEffect(() => {
    if(!isSending) {
      formRef.current?.reset();
    }
  }, [isSending])

  useEffect(() => {
    if(actionData?.error) {
      toast({
        title: "Erro",
        description: actionData?.message,
        status: "error",
        position: 'top-right'
      });
    }
    
    if(actionData?.ok) {
      toast({
        title: "Sucesso",
        description: "Mensagem enviada!",
        status: "success",
        position: 'top-right'
      });

    }
  }, [actionData, toast])

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
        <Form ref={formRef} method="post">
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

            <Button w="full" type="submit" isLoading={!!isSending} name="_action" value="send">
              Enviar mensagem
            </Button>
          </VStack>
        </Form>
      </Box>
    </Flex>
  );
}