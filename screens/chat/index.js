import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat'


export default function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Alo gatao',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Gustavo Leme',
          avatar: 'https://pps.whatsapp.net/v/t61.24694-24/306361422_2140310376130309_3782833221718604836_n.jpg?ccb=11-4&oh=01_AVyrDhxF_RvB82uAIvt_0opdiAOmZ8zeqAM7VL3lLr8J3Q&oe=634178ED',
        },
      },
    ])
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <>
      <InputToolbar
      containerStyle={{
        borderTopColor: "transparent",
        borderTopWidth: 0,
        padding: 1
      }}
    />
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      containerStyle={{
        backgroundColor: "#fff",
      }}
    />
    </>
  )
}


  