import React, { useEffect, useRef, useState } from "react";
import {
  useAllmessagesQuery,
  useNewMessageSubscription,
  useSendMutation,
} from "../generated/graphql";
import { store, useGlobalState } from "state-pool";
import { Link, useHistory } from "react-router-dom";
import { ChatFeed, Message } from "react-chat-ui";
import { Subscription, useMutation, useQuery, useSubscription } from "urql";
import "../css/chat.css";
import { ChatBubble } from "react-chat-ui";
import { animateScroll } from "react-scroll";
import ScrollToBottom, { useScrollToBottom, useSticky} from 'react-scroll-to-bottom'
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { Box, Button, Flex, Grid, Input } from "@chakra-ui/core";
import { messsagesState } from "../recoil/atom";
import { Form, Formik } from "formik";
import { InputField } from "./InputField";

interface chatProps {}
const newMessageQuery = `
subscription {
  newMessage {
      id
      message
      senderName
  }
}
`;

const allMessagesQuery = `
query {
  allMessages {
    messages {
      id
      message
      senderName
    }
  }
}
`;

const sendMessage = `
mutation ($message:String!, $senderName:String!){
  send(input: {message:$message, senderName:$senderName}) {
    message {
      senderName
      message
      id
    }
  }
}`;

const Chat: React.FC<chatProps> = () => {
  // store.setState("chat", {messages: data?.allMessages?.messages});
  // const [chat, updateChat, setChat] = useGlobalState("chat");
  const [{ data, fetching, error }]: any = useQuery({query: allMessagesQuery});
  const [result] = useSubscription({ query: newMessageQuery });
  const [messages, setMessages] = useState<String[]>([]);
  const [isLoading, setLoading] = useState(true);
  let history = useHistory();
  const scrollToBottom = () => window.scrollTo({
    top:document.documentElement.scrollHeight,
    behavior: "smooth"
  })
  useEffect(() => {
    if (user.username.length < 3) {
      history.push("/");
    }
    setMessages(data?.allMessages?.messages);
    console.log(data?.allMessages?.messages)
    if (result?.data) {
      const messageText = {
        id: result?.data?.newMessage.id,
        message: result?.data?.newMessage.message,
        senderName: result?.data?.newMessage.senderName,
      } as any;
      if (messages.length < 1) {
        setMessages([messageText]);
        scrollToBottom();
      } else {
        setMessages([...messages, messageText]);
        scrollToBottom();
      }
    }
  }, [setMessages, data, result.data]);
  const [user, updateUser, setUser] = useGlobalState("user");
  const [, send] = useSendMutation();
  return (
    <>
        <Messages messages={messages} />
    </>
  );
};

const Messages = (props: any) => {
  const [_, send] = useMutation(sendMessage);
  const [user, updateUser, setUser] = useGlobalState("user");
  const messages = props.messages;
  if (messages === undefined) {
    return (
      <>
        <div>Loading...</div>
        <Formik
          initialValues={{ message: "" }}
          onSubmit={async (values, actions) => {
            await send({ message: values.message, senderName: user.username });
            actions.setSubmitting(false);
            values.message = "";
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Grid gridColumn={2} gridRow={1} width={"100%"}>
                <Flex>
                  <Box pos={'fixed'} bottom={0}  mb={4} w={"100%"}>
                    <InputField
                      name="message"
                      placeholder="Enter Message"
                      label=""
                    />
                  </Box>
                </Flex>
                <Button
                  pos={"fixed"}
                  bottom={0}
                  mb={4}
                  right={0}
                  borderBottomLeftRadius={0}
                  borderTopLeftRadius={0}
                  type="submit"
                  isLoading={isSubmitting}
                  variantColor="purple"
                  variant="ghost"
                >
                  Send
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </>
    )
  }
  return (
    <>
      <Grid  templateColumns="repeat(1, 1fr)" gap={6}>
        <Flex mb={"5%"} position="absolute">
          <ChatFeed
            messages={messages}
            hasInputField={false}
            showSenderName
            bubbleStyles={{
              text: {
                fontSize: 15,
                color: "black",
              },
              chatbubble: {
                border: "none",
                padding: 10,
                backgroundColor: "white",
              },
            }}
          />
        </Flex>
        <Formik
          initialValues={{ message: "" }}
          onSubmit={async (values, actions) => {
            await send({ message: values.message, senderName: user.username });
            actions.setSubmitting(false);
            values.message = "";
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Grid gridColumn={2} gridRow={1} width={"100%"}>
                <Flex>
                  <Box pos={'fixed'} bottom={0}  mb={4} w={"100%"}>
                    <InputField
                      name="message"
                      placeholder="Enter Message"
                      label=""
                    />
                  </Box>
                </Flex>
                <Button
                  pos={"fixed"}
                  bottom={0}
                  mb={4}
                  right={0}
                  borderBottomLeftRadius={0}
                  borderTopLeftRadius={0}
                  type="submit"
                  isLoading={isSubmitting}
                  variantColor="purple"
                  variant="ghost"
                >
                  Send
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </>
  );
};

export default Chat;
