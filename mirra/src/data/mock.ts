import { MediaAssets } from '@/constants/assets';

export type SocialPlatform = 'instagram' | 'twitter' | 'linkedin';

export interface HeroMedia {
  type: 'image' | 'video';
  source: any;
}

export interface Interest {
  id: string;
  image: ReturnType<typeof require>;
  label: string;
}

export interface ProSkill {
  id: string;
  image: ReturnType<typeof require>;
  label: string;
}

export interface User {
  id: string;
  name: string;
  role: string;
  location: string;
  city: string;
  avatar: any;
  heroImage: any;
  heroMedia?: HeroMedia;
  verified: boolean;
  followers?: number;
  followersFormatted?: string;
  socialPlatform?: SocialPlatform;
  interests: Interest[];
  proSkills: ProSkill[];
  roleType?: string;
  connections: number;
  thingsInCommon?: number;
}

export interface Stat {
  value: number;
  label: string;
  period: string;
  growth: string;
  positive: boolean;
}

export interface DPConversation {
  id: string;
  isAnonymous: boolean;
  preview: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: any;
  text: string;
  time: string;
  isOwn: boolean;
  isChoiceBubble?: boolean;
}

export interface Thread {
  id: string;
  isGroup: boolean;
  name: string;
  avatar?: any;
  groupAvatars?: any[];
  lastMessage: string;
  lastMessageSenderName?: string;
  lastMessageIsOwn?: boolean;
  time: string;
  unread: number;
  verified?: boolean;
  city?: string;
  dpLabel?: string;
  userId?: string;
  isOnline?: boolean;
  messages: ChatMessage[];
}

const interests = {
  tennis:     { id: 'tennis',     image: MediaAssets.emojis.interests.tennis,     label: 'Tennis' },
  golf:       { id: 'golf',       image: MediaAssets.emojis.interests.golf,        label: 'Golf' },
  travel:     { id: 'travel',     image: MediaAssets.emojis.interests.travel,      label: 'Travel' },
  sportscar:  { id: 'sportscar',  image: MediaAssets.emojis.interests.sportscar,   label: 'Sports Cars' },
  iceskating: { id: 'iceskating', image: MediaAssets.emojis.interests.iceskating,  label: 'Ice Skating' },
};

const skills = {
  photography: { id: 'photography', image: MediaAssets.emojis.proSkills.photography, label: 'Photography' },
  videography: { id: 'videography', image: MediaAssets.emojis.proSkills.videography, label: 'Videography' },
  film:        { id: 'film',        image: MediaAssets.emojis.proSkills.film,         label: 'Film' },
  laptop:      { id: 'laptop',      image: MediaAssets.emojis.proSkills.laptop,       label: 'Tech' },
};

export const mockCurrentUser: User = {
  id: 'ariana',
  name: 'Ariana Luterman',
  role: 'Triathlete, Creator',
  location: 'Cardiff-by-the-Sea, Encinitas, CA',
  city: 'Encinitas, CA',
  avatar: MediaAssets.images.ariana,
  heroImage: MediaAssets.images.ariana,
  heroMedia: { type: 'video', source: MediaAssets.videos.arianaHero },
  verified: true,
  followers: 72500,
  followersFormatted: '72.5k',
  socialPlatform: 'instagram',
  interests: [interests.tennis, interests.golf, interests.travel],
  proSkills: [skills.photography, skills.film],
  roleType: 'Creator',
  connections: 18,
};

export const mockStats: Stat[] = [
  { value: 64, label: 'PROFILE VIEWS', period: 'Last 7 days', growth: '20%', positive: true },
  { value: 35, label: 'DP CHATS', period: 'Last 7 days', growth: '+14%', positive: true },
  { value: 18, label: 'CONNECTIONS', period: 'Last 7 days', growth: '5%', positive: true },
];

export const mockDPConversationCount = 260;

export const mockDPConversations: DPConversation[] = [
  { id: 'dp1', isAnonymous: true, preview: 'What does Ariana do for work?', timestamp: '2m ago' },
  { id: 'dp2', isAnonymous: false, preview: "What's your training routine like?", timestamp: '15m ago' },
  { id: 'dp3', isAnonymous: true, preview: 'How did you start creating content?', timestamp: '1h ago' },
];

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Logan Armstrong',
    role: 'Creator, Entrepreneur',
    location: 'Cardiff-by-the-Sea, Encinitas, CA',
    city: 'Encinitas, CA',
    avatar: MediaAssets.images.loganArmstrong,
    heroImage: MediaAssets.images.loganArmstrong,
    heroMedia: { type: 'image', source: MediaAssets.images.loganArmstrong },
    verified: true,
    connections: 264,
    interests: [interests.tennis, interests.golf, interests.travel],
    proSkills: [skills.film, skills.videography],
    roleType: 'Startup Founder',
  },
  {
    id: 'u2',
    name: 'Evan Nicolini',
    role: 'Founder - Custom Esignature',
    location: 'Mission Beach, San Diego',
    city: 'San Diego',
    avatar: MediaAssets.images.evanNicolini,
    heroImage: MediaAssets.images.arianaWall,
    heroMedia: { type: 'image', source: MediaAssets.images.arianaWall },
    verified: true,
    connections: 264,
    interests: [interests.tennis, interests.golf, interests.travel],
    proSkills: [skills.laptop, skills.photography],
    roleType: 'Founder',
  },
  {
    id: 'u3',
    name: 'Chelsea Smithback',
    role: 'Resident Naturopathic Doctor',
    location: 'Mission Beach, San Diego',
    city: 'San Diego',
    avatar: MediaAssets.images.chelseaSmithback,
    heroImage: MediaAssets.images.oliviaBrown,
    heroMedia: { type: 'image', source: MediaAssets.images.oliviaBrown },
    verified: true,
    connections: 264,
    thingsInCommon: 3,
    interests: [interests.tennis, interests.golf, interests.travel],
    proSkills: [skills.film, skills.videography],
    roleType: 'Doctor',
  },
  {
    id: 'u4',
    name: 'Darin Smith',
    role: 'Software Consultant, Athlete',
    location: 'Mission Beach, San Diego',
    city: 'San Diego',
    avatar: MediaAssets.images.arianaWall,
    heroImage: MediaAssets.images.arianaWall,
    heroMedia: { type: 'video', source: MediaAssets.videos.darinSmith },
    verified: true,
    connections: 264,
    interests: [interests.sportscar, interests.iceskating],
    proSkills: [skills.laptop, skills.film],
    roleType: 'Consultant',
  },
  {
    id: 'u5',
    name: 'Emmitt Burk',
    role: 'Software Consultant',
    location: 'Mission Beach, San Diego',
    city: 'San Diego',
    avatar: MediaAssets.images.emmittBurk,
    heroImage: MediaAssets.images.loganArmstrong,
    heroMedia: { type: 'image', source: MediaAssets.images.loganArmstrong },
    verified: true,
    connections: 180,
    interests: [interests.iceskating, interests.golf],
    proSkills: [skills.laptop, skills.film],
    roleType: 'Consultant',
  },
  {
    id: 'u6',
    name: 'Olivia Brown',
    role: 'Admin',
    location: 'San Francisco',
    city: 'San Francisco',
    avatar: MediaAssets.images.oliviaBrown,
    heroImage: MediaAssets.images.oliviaBrown,
    heroMedia: { type: 'video', source: MediaAssets.videos.sageMiller },
    verified: true,
    connections: 86,
    interests: [interests.tennis, interests.golf, interests.travel],
    proSkills: [skills.videography, skills.film],
    roleType: 'Admin',
  },
  {
    id: 'u7',
    name: 'Andriy Boychuk',
    role: 'Creator',
    location: 'San Francisco',
    city: 'San Francisco',
    avatar: MediaAssets.images.andriyBoychuk,
    heroImage: MediaAssets.images.andriyBoychuk,
    heroMedia: { type: 'video', source: MediaAssets.videos.celiaSmith },
    verified: false,
    connections: 42,
    interests: [interests.travel, interests.sportscar],
    proSkills: [skills.photography, skills.film],
    roleType: 'Creator',
  },
];

const evan = mockUsers[1];
const emmitt = mockUsers[4];
const chelsea = mockUsers[2];
const olivia = mockUsers[5];
const andriy = mockUsers[6];

export const mockThreads: Thread[] = [
  {
    id: 't1',
    isGroup: false,
    name: evan.name,
    avatar: evan.avatar,
    lastMessage: "Sounds great, let's do it!",
    time: 'Now',
    unread: 2,
    verified: true,
    city: 'San Diego',
    dpLabel: "Evan's DP",
    userId: 'u2',
    isOnline: true,
    messages: [
      { id: 'ev1', senderId: 'u2', senderName: 'Evan', senderAvatar: evan.avatar, text: 'Hey, are you still free to hit Mission Beach later?', time: '11:42 am', isOwn: false },
      { id: 'ev2', senderId: 'ariana', senderName: 'Me', senderAvatar: mockCurrentUser.avatar, text: 'Yes, I can do after my run. Around 4?', time: '11:44 am', isOwn: true },
      { id: 'ev3', senderId: 'u2', senderName: 'Evan', senderAvatar: evan.avatar, text: 'Perfect. I can bring an extra paddle if you need one.', time: '11:45 am', isOwn: false },
      { id: 'ev4', senderId: 'ariana', senderName: 'Me', senderAvatar: mockCurrentUser.avatar, text: 'Please do. Mine is still in my car from yesterday.', time: '11:48 am', isOwn: true },
      { id: 'ev5', senderId: 'u2', senderName: 'Evan', senderAvatar: evan.avatar, text: "Sounds great, let's do it!", time: 'Now', isOwn: false },
    ],
  },
  {
    id: 't2',
    isGroup: false,
    name: emmitt.name,
    avatar: emmitt.avatar,
    lastMessage: 'Can you send the file over?',
    time: '1 Hour',
    unread: 0,
    verified: true,
    city: 'San Diego',
    dpLabel: "Emmitt's DP",
    userId: 'u5',
    isOnline: false,
    messages: [
      { id: 'em1', senderId: 'ariana', senderName: 'Me', senderAvatar: mockCurrentUser.avatar, text: 'I cleaned up the deck and added the new contact screenshots.', time: '9:12 am', isOwn: true },
      { id: 'em2', senderId: 'u5', senderName: 'Emmitt', senderAvatar: emmitt.avatar, text: 'Nice. Did you include the intro slide too?', time: '9:20 am', isOwn: false },
      { id: 'em3', senderId: 'ariana', senderName: 'Me', senderAvatar: mockCurrentUser.avatar, text: 'Not yet. I wanted your eyes on the flow first.', time: '9:23 am', isOwn: true },
      { id: 'em4', senderId: 'u5', senderName: 'Emmitt', senderAvatar: emmitt.avatar, text: 'Can you send the file over?', time: '1 Hour', isOwn: false },
    ],
  },
  {
    id: 't3',
    isGroup: false,
    name: chelsea.name,
    avatar: chelsea.avatar,
    lastMessage: 'What would you like to ask about Chelsea?',
    time: '2 Hours',
    unread: 0,
    verified: true,
    city: 'San Diego',
    dpLabel: "Chelsea's DP",
    userId: 'u3',
    isOnline: false,
    messages: [
      { id: 'ch1', senderId: 'u3', senderName: 'Chelsea', senderAvatar: chelsea.avatar, text: 'How did your long ride feel this morning?', time: '7:18 am', isOwn: false },
      { id: 'ch2', senderId: 'ariana', senderName: 'Me', senderAvatar: mockCurrentUser.avatar, text: 'Better than expected. My legs were heavy at first but opened up after 20 minutes.', time: '7:34 am', isOwn: true },
      { id: 'ch3', senderId: 'u3', senderName: 'Chelsea', senderAvatar: chelsea.avatar, text: 'That is a good sign. Make sure you actually eat before the swim block.', time: '7:39 am', isOwn: false },
      { id: 'ch4', senderId: 'ariana', senderName: 'Me', senderAvatar: mockCurrentUser.avatar, text: 'Deal. I am packing snacks now.', time: '7:43 am', isOwn: true },
      { id: 'ch5', senderId: 'u3', senderName: 'Chelsea', senderAvatar: chelsea.avatar, text: 'What would you like to ask about Chelsea?', time: '2 Hours', isOwn: false },
    ],
  },
  {
    id: 't4',
    isGroup: true,
    name: 'MIRRA Team',
    avatar: MediaAssets.images.arianaWall,
    lastMessage: 'It looks good, but we need to...',
    lastMessageSenderName: 'Evan',
    lastMessageIsOwn: false,
    time: 'Yesterday',
    unread: 0,
    groupAvatars: [evan.avatar, MediaAssets.images.arianaWall],
    messages: [
      { id: 'g1', senderId: 'olivia', senderName: 'Olivia Brown', senderAvatar: olivia.avatar, text: "We're planning a small tournament next weekend — I'll share details soon!", time: '9:40 am', isOwn: false },
      { id: 'g2', senderId: 'olivia', senderName: 'Olivia Brown', senderAvatar: olivia.avatar, text: "Yesterday's games were super fun, thanks everyone!!", time: '9:48 am', isOwn: false },
      { id: 'g3', senderId: 'ariana', senderName: 'Me', senderAvatar: mockCurrentUser.avatar, text: 'Hey, does anyone want to play today?', time: '2 Minutes', isOwn: true },
      { id: 'g4', senderId: 'ariana', senderName: 'Me', senderAvatar: mockCurrentUser.avatar, text: '@Olivia Brown This is a sample message used for chat bubble layout testing and it continues to the next line naturally', time: '2 Minutes', isOwn: true },
      { id: 'g5', senderId: 'olivia', senderName: 'Olivia Brown', senderAvatar: olivia.avatar, text: '@Andriy Boychuk one line message', time: 'Now', isOwn: false },
    ],
  },
  {
    id: 't5',
    isGroup: true,
    name: 'California Explorers',
    avatar: MediaAssets.images.californiaExplorers,
    lastMessage: "Let's visit the museum first",
    lastMessageSenderName: 'You',
    lastMessageIsOwn: true,
    time: 'Sunday',
    unread: 0,
    groupAvatars: [MediaAssets.images.californiaExplorers, evan.avatar, chelsea.avatar],
    messages: [
      { id: 'ca1', senderId: 'u2', senderName: 'Evan Nicolini', senderAvatar: evan.avatar, text: 'I found a route that starts near the pier and ends close to the museum.', time: '10:03 am', isOwn: false },
      { id: 'ca2', senderId: 'u3', senderName: 'Chelsea Smithback', senderAvatar: chelsea.avatar, text: 'That works for me. I can meet everyone at the coffee shop first.', time: '10:08 am', isOwn: false },
      { id: 'ca3', senderId: 'ariana', senderName: 'Me', senderAvatar: mockCurrentUser.avatar, text: 'Coffee first sounds perfect. I want to take a few photos before it gets crowded.', time: '10:12 am', isOwn: true },
      { id: 'ca4', senderId: 'u7', senderName: 'Andriy Boychuk', senderAvatar: andriy.avatar, text: '@Chelsea Smithback save me a seat if you get there early.', time: '10:16 am', isOwn: false },
      { id: 'ca5', senderId: 'ariana', senderName: 'Me', senderAvatar: mockCurrentUser.avatar, text: 'Of course. I will grab a table outside.', time: '10:18 am', isOwn: true },
      { id: 'ca6', senderId: 'u2', senderName: 'Evan Nicolini', senderAvatar: evan.avatar, text: 'Should we do the walk before lunch or after?', time: '10:25 am', isOwn: false },
      { id: 'ca7', senderId: 'ariana', senderName: 'Me', senderAvatar: mockCurrentUser.avatar, text: "Let's visit the museum first", time: 'Sunday', isOwn: true },
    ],
  },
];

export const mockGroupMessages: ChatMessage[] = mockThreads[3].messages;

export const mockDPMessages: ChatMessage[] = [
  {
    id: 'dp1',
    senderId: 'dp-evan',
    senderName: "Evan's DP",
    senderAvatar: evan.avatar,
    text: "Hey what's up, I'm trained to think and speak just like Evan, so ask me anything you want like you would normally text me.\n\nFirst, let me know if you want to stay anonymous or use your name?",
    time: '4:56 pm',
    isOwn: false,
  },
  {
    id: 'dp2',
    senderId: 'ariana',
    senderName: 'Me',
    senderAvatar: mockCurrentUser.avatar,
    text: 'Stay Anonymous',
    time: '4:56 pm',
    isOwn: true,
    isChoiceBubble: true,
  },
];
