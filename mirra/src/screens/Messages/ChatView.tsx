import React, { useRef, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  LayoutAnimation,
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

type ListItem = ChatMessage | { type: 'mention_card'; id: string; user: User };

const MENTION_SPRING = {
  duration: 360,
  create: { type: 'spring' as const, property: 'scaleY' as const, springDamping: 0.72 },
  update: { type: 'spring' as const, springDamping: 0.72 },
  delete: { type: 'spring' as const, property: 'scaleY' as const, springDamping: 0.72 },
};

interface ChatViewProps {
  thread: Thread;
  onBack: () => void;
}

export function ChatView({ thread, onBack }: ChatViewProps) {
  const [listItems, setListItems] = useState<ListItem[]>(thread.messages);
  const [input, setInput] = useState('');
  const [reactions, setReactions] = useState<ReactionsMap>((): ReactionsMap => {
    if (!thread.isGroup) return {};
    return {
      g2: [
        { emoji: '❤️', count: 34, mine: true },
        { emoji: '⚡', count: 123, mine: false },
      ],
    };
  });
  const [activeMentionMessageId, setActiveMentionMessageId] = useState<string | null>(null);
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

    const baseMessages = listItems.filter((item): item is ChatMessage => !('type' in item));
    const nextMessages = [...baseMessages, newMsg];
    thread.messages = nextMessages;
    thread.lastMessage = text;
    thread.time = 'Now';

    if (thread.isGroup) {
      thread.lastMessageSenderName = 'You';
      thread.lastMessageIsOwn = true;
    }

    setListItems(nextMessages);
    setActiveMentionMessageId(null);
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

  const handleMentionPress = (name: string, messageId: string) => {
    const normalized = name.trim().toLowerCase();
    const found = mockUsers.find(
      (user) =>
        user.name.toLowerCase() === normalized ||
        user.name.toLowerCase().startsWith(normalized),
    );
    if (!found) return;

    LayoutAnimation.configureNext(MENTION_SPRING);

    if (activeMentionMessageId === messageId) {
      setListItems((prev) => prev.filter((item) => !('type' in item)));
      setActiveMentionMessageId(null);
      return;
    }

    setListItems((prev) => {
      const base = prev.filter((item): item is ChatMessage => !('type' in item));
      const idx = base.findIndex((m) => m.id === messageId);
      if (idx < 0) return prev;
      const next = [...base] as ListItem[];
      next.splice(idx, 0, { type: 'mention_card', id: `mc-${messageId}`, user: found });
      return next;
    });
    setActiveMentionMessageId(messageId);
  };

  const dismissCard = () => {
    LayoutAnimation.configureNext(MENTION_SPRING);
    setListItems((prev) => prev.filter((item) => !('type' in item)));
    setActiveMentionMessageId(null);
  };

  const msgItems = listItems.filter((item): item is ChatMessage => !('type' in item));

  const renderItem = ({ item }: { item: ListItem }) => {
    if ('type' in item && item.type === 'mention_card') {
      return (
        <MentionProfileCard
          user={item.user}
          onClose={dismissCard}
        />
      );
    }

    const message = item as ChatMessage;
    const msgIndex = msgItems.findIndex((m) => m.id === message.id);
    const prev = msgItems[msgIndex - 1];
    const next = msgItems[msgIndex + 1];
    const showAvatar = !message.isOwn && (!next || next.senderId !== message.senderId);
    const showSenderName = isGroup && !message.isOwn && (!prev || prev.senderId !== message.senderId);

    return (
      <ChatBubble
        message={message}
        showAvatar={showAvatar}
        showSenderName={showSenderName}
        reactions={reactions[message.id] ?? []}
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
        data={listItems}
        keyExtractor={(item) => item.id}
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
