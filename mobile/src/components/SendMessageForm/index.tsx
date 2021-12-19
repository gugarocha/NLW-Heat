import React, { useState } from 'react';
import { Alert, Keyboard, TextInput, View } from 'react-native';

import { Button } from '../Button';

import { api } from '../../services/api';

import { styles } from './styles';
import { COLORS } from '../../theme';

export function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [ sendingMessage, setSendingMessage] = useState(false);

  async function handleMessageSubmit() {
    const messageFormated = message.trim();

    if (messageFormated.length > 0) {
      setSendingMessage(true);
      
      await api.post('/messages', { message: messageFormated});

      setMessage('');
      Keyboard.dismiss();
      setSendingMessage(false);

      Alert.alert('Mensagem enviada com sucesso!');
    } else {
      Alert.alert('Escreva a mensagem para enviar.')
    };
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardAppearance='dark'
        placeholder='Qual sua expectativa para o evento?'
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        onChangeText={setMessage}
        value={message}
        editable= {!sendingMessage}
        maxLength={140}
      />

      <Button
        title='ENVIAR MENSAGEM'
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        onPress={handleMessageSubmit}
        isLoading={sendingMessage}
      />
    </View>
  );
};