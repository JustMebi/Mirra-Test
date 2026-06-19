import React, { useRef, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Colors } from '@/constants/colors';
import { mockCurrentUser, mockUsers } from '@/data/mock';
import { ChatHeader } from './components/ChatHeader';
import { ChatBubble } from './components/ChatBubble';
import { ChatInput } from './components/ChatInput';
import { MentionProfileCard } from './components/MentionProfileCard';
import type { Thread, ChatMessage, User } from '@/data/mock';

interface Reaction {
  emoji: string;
  count: number;
  mine: boolean;
}

type ReactionsMap = Record<string, Reaction[]>;

interface ChatViewProps {
  thread: Thread;
  onBack: () => void;
}

export function ChatView({ thread, onBack }: ChatViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(thread.messages);
  const [input, setInput] = useState('');
  const [reactions, setReactions] = useState<ReactionsMap>((): ReactionsMap => {
    if (!thread.isGroup) return {};
    return {
      g2: [
        { emoji: '\u2764\uFE0F', count: 34, mine: true },
        { emoji: '\u26A1', count: 123, mine: false },
      ],
    };
  });
  const [mentionUser, setMentionUser] = useState<User | null>(null);
  const [mentionVisible, setMentionVisible] = useState(false);
  const [mentionAnchor, setMentionAnchor] = useState<{ x: number; y: number } | null>(null);
  const listRef = useRef<FlatList>(null);

  const isGroup = thread.isGroup;

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      senderId: 'ariana',
      senderName: 'Me',
      senderAvatar: mockCurrentUser.avatar,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };

    const nextMessages = [...thread.messages, newMsg];
    thread.messages = nextMessages;
    thread.lastMessage = text;
    thread.time = 'Now';

    if (thread.isGroup) {
      thread.lastMessageSenderName = 'You';
      thread.lastMessageIsOwn = true;
    }

    setMessages(nextMessages);
    setInput('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 80);
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setReactions((prev) => {
      const existing = prev[messageId] ?? [];
      const idx = existing.findIndex((reaction) => reaction.emoji === emoji);

      if (idx >= 0) {
        const updated = [...existing];
        const reaction = updated[idx];

        if (reaction.mine) {
          updated[idx] = { ...reaction, count: reaction.count - 1, mine: false };
          return { ...prev, [messageId]: updated.filter((item) => item.count > 0) };
        }

        updated[idx] = { ...reaction, count: reaction.count + 1, mine: true };
        return { ...prev, [messageId]: updated };
      }

      return { ...prev, [messageId]: [...existing, { emoji, count: 1, mine: true }] };
    });
  };

  const handleMentionPress = (name: string, anchor: { x: number; y: number }) => {
    const normalized = name.trim().toLowerCase();
    const found = mockUsers.find((user) =>
      user.name.toLowerCase() === normalized
      || user.name.toLowerCase().startsWith(normalized)
    );
    if (!found) return;

    setMentionUser(found);
    setMentionAnchor(anchor);
    setMentionVisible(true);
  };

  const handleDM = (user: User) => {
    console.log('DM', user.name);
  };

  const renderItem = ({ item, index }: { item: ChatMessage; index: number }) => {
    const prev = messages[index - 1];
    const next = messages[index + 1];
    const showAvatar = !item.isOwn && (!next || next.senderId !== item.senderId);
    const showSenderName = isGroup && !item.isOwn && (!prev || prev.senderId !== item.senderId);

    return (
      <ChatBubble
        message={item}
        showAvatar={showAvatar}
        showSenderName={showSenderName}
        reactions={reactions[item.id] ?? []}
        onReaction={handleReaction}
        onMentionPress={handleMentionPress}
      />
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <ChatHeader thread={thread} onBack={onBack} />

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(message) => message.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
      />

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={handleSend}
        placeholder={isGroup ? 'Message group...' : 'Message...'}
      />

      <MentionProfileCard
        user={mentionUser}
        visible={mentionVisible}
        anchor={mentionAnchor}
        onClose={() => setMentionVisible(false)}
        onDM={handleDM}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  list: {
    paddingTop: 12,
    paddingBottom: 10,
    gap: 10,
  },
});
