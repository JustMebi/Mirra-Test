import React from 'react';
import Svg, { Circle, Defs, G, LinearGradient, Path, Polygon, Rect, Stop } from 'react-native-svg';

export type AppIconName =
  | 'arrow-left'
  | 'arrow-up'
  | 'arrow-up-right'
  | 'bell'
  | 'book-open'
  | 'card'
  | 'check'
  | 'chat'
  | 'chat-dots'
  | 'crosshair'
  | 'double-check'
  | 'edit'
  | 'eye'
  | 'filter'
  | 'grid'
  | 'home'
  | 'info'
  | 'instagram'
  | 'layers'
  | 'list'
  | 'map-pin'
  | 'mic'
  | 'more-vertical'
  | 'navigation'
  | 'person-add'
  | 'plus'
  | 'search'
  | 'send'
  | 'share'
  | 'sliders'
  | 'sparkles'
  | 'target'
  | 'user'
  | 'user-plus'
  | 'users'
  | 'verified'
  | 'x';

interface AppIconProps {
  name: AppIconName;
  size?: number;
  color?: string;
  secondaryColor?: string;
  strokeWidth?: number;
  opacity?: number;
}

const figmaPaths = {
  usersBack:
    'M9.31162 11.8401C9.2422 11.8826 9.15541 11.9082 9.07731 11.9082H9.06863C7.19416 11.619 5.33704 11.4659 3.51464 11.4403C3.50596 11.1256 3.4105 10.8279 3.23694 10.5557C2.62079 9.6286 1.83108 8.82905 0.911203 8.19111C0.624825 7.99548 0.329769 7.80835 0.0173573 7.64674C0.0173573 7.64674 0.0115708 7.6439 0 7.63823C0.104137 7.51915 0.199597 7.39157 0.295056 7.26398C0.937237 6.37087 1.3104 5.29063 1.3104 4.15084C1.3104 3.01106 0.937237 1.91381 0.295056 1.03771C1.04137 0.391268 2.01332 0 3.07205 0C5.40647 0 7.30698 1.85427 7.30698 4.15084C7.30698 5.93707 6.13543 7.45111 4.51262 8.0295C5.2763 8.1656 6.01394 8.40376 6.69083 8.76951C7.80163 9.35641 8.74754 10.2155 9.44179 11.2532C9.57196 11.4488 9.51122 11.7125 9.31162 11.8401Z',
  usersFront:
    'M12.7996 11.2532C12.114 10.2155 11.1594 9.35641 10.0573 8.76951C9.38041 8.40376 8.63409 8.1741 7.87909 8.0295C9.5019 7.45111 10.6648 5.93707 10.6648 4.15084C10.6648 1.85427 8.77294 0 6.43852 0C4.10411 0 2.2036 1.85427 2.2036 4.15084C2.2036 5.94557 3.36647 7.45111 4.98928 8.0295C4.23428 8.1656 3.48796 8.40376 2.81107 8.76951C1.70027 9.35641 0.754358 10.2155 0.0687869 11.2532C-0.0613848 11.4488 -0.000637978 11.7125 0.198959 11.8401C0.277062 11.8911 0.355165 11.8997 0.441946 11.8997C0.459302 11.8997 0.476658 11.8997 0.494015 11.8997C0.511371 11.8997 0.537405 11.8997 0.554761 11.8997C4.39049 11.2787 8.35639 11.2872 12.4438 11.9167C12.4438 11.9167 12.4438 11.9167 12.4525 11.9167C12.5306 11.9167 12.6173 11.8911 12.6868 11.8486C12.8864 11.721 12.9471 11.4574 12.8169 11.2617L12.7996 11.2532Z',
  send:
    'M16.144 0.352656C16.2966 0.504357 16.4058 0.694043 16.4604 0.902092C16.5151 1.11014 16.5131 1.329 16.4547 1.53602L12.616 15.6175C12.5603 15.8189 12.4537 16.0026 12.3064 16.151C12.1694 16.2864 12.002 16.3871 11.8182 16.4447C11.6343 16.5023 11.4394 16.5151 11.2495 16.4821C11.0597 16.449 10.8806 16.3711 10.7271 16.2547C10.5735 16.1384 10.4501 15.987 10.367 15.8133L8.10985 10.6763C8.08221 10.6205 8.0725 10.5575 8.08206 10.496C8.09162 10.4345 8.11997 10.3775 8.16323 10.3327L11.4523 5.90723C11.5109 5.84884 11.557 5.77903 11.5875 5.70211C11.6181 5.6252 11.6324 5.54283 11.6298 5.46012C11.6271 5.37742 11.6075 5.29614 11.5721 5.22134C11.5367 5.14654 11.4863 5.07981 11.424 5.0253C11.3045 4.92523 11.1516 4.87396 10.9959 4.88178C10.8402 4.88959 10.6931 4.95591 10.5843 5.06745L6.17137 8.33976C6.1267 8.38442 6.06915 8.41394 6.0068 8.42418C5.94446 8.43443 5.88048 8.42487 5.82386 8.39685L0.684598 6.14145C0.463665 6.03531 0.280272 5.86449 0.158783 5.6517C0.0372935 5.43891 -0.0165417 5.19421 0.00442902 4.95011C0.0253998 4.70601 0.120184 4.47406 0.276189 4.28508C0.432195 4.0961 0.642038 3.95903 0.877841 3.89209L14.9648 0.0448094C15.171 -0.0129658 15.3889 -0.0149059 15.5961 0.0391889C15.8033 0.0932837 15.9924 0.201469 16.144 0.352656Z',
  chat:
    'M19.25 7.70331C19.25 11.9577 14.9407 15.4066 9.625 15.4066C8.96717 15.4066 8.32475 15.3538 7.704 15.2532C7.20319 15.172 6.69459 15.1801 6.25787 15.4383C5.62442 15.8128 4.73607 16.3733 3.64059 16.4816C3.49274 16.4962 3.41023 16.3265 3.50181 16.2095C4.26983 15.2284 4.74436 14.3523 4.40074 14.1742C1.75241 12.8018 0 10.4164 0 7.70331C0 3.44889 4.30926 0 9.625 0C14.9407 0 19.25 3.44889 19.25 7.70331Z',
  chatBack:
    'M8.04769 0C8.43686 0.62564 8.65641 1.32906 8.65641 2.07324C8.65633 3.73105 7.5716 5.18859 5.93237 6.02726C5.73049 6.13054 5.9847 6.61835 6.41756 7.18026C6.50087 7.28852 6.42478 7.44329 6.28955 7.42375C5.76484 7.34786 5.32133 7.11296 4.97363 6.9117C4.57622 6.68167 4.12474 6.65939 3.66935 6.71834C3.35332 6.75927 3.02877 6.78101 2.69808 6.78101C1.72671 6.78101 0.810197 6.59561 0 6.26986C4.08696 5.78369 7.33241 3.24201 8.04769 0Z',
  search:
    'M12.7365 12.7365L17.5 17.5M14.75 7.875C14.75 11.672 11.672 14.75 7.875 14.75C4.07804 14.75 1 11.672 1 7.875C1 4.07804 4.07804 1 7.875 1C11.672 1 14.75 4.07804 14.75 7.875Z',
};

export function AppIcon({
  name,
  size = 20,
  color = '#FFFFFF',
  secondaryColor,
  strokeWidth = 1.8,
  opacity = 1,
}: AppIconProps) {
  const secondary = secondaryColor ?? color;
  const strokeProps = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    opacity,
  };

  if (name === 'users') {
    return (
      <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
        <Svg x="11.58" y="4.58" width="9.51" height="11.91" viewBox="0 0 9.51058 11.9082">
          <Path d={figmaPaths.usersBack} fill={secondary} fillOpacity={opacity * 0.4} />
        </Svg>
        <Svg x="0.92" y="4.58" width="12.89" height="11.92" viewBox="0 0 12.8857 11.9167">
          <Path d={figmaPaths.usersFront} fill={color} fillOpacity={opacity * 0.75} />
        </Svg>
      </Svg>
    );
  }

  if (name === 'send') {
    return (
      <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
        <Svg x="2.75" y="3.67" width="16.5" height="16.5" viewBox="0 0 16.5 16.5">
          <Path d={figmaPaths.send} fill={color} fillOpacity={opacity} />
        </Svg>
      </Svg>
    );
  }

  if (name === 'chat') {
    return (
      <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
        <Svg x="1.38" y="2.75" width="19.25" height="16.48" viewBox="0 0 19.25 16.4824">
          <Path d={figmaPaths.chat} fill={color} fillOpacity={opacity * 0.75} />
        </Svg>
        <Svg x="12.43" y="11.8" width="8.66" height="7.43" viewBox="0 0 8.65641 7.42543">
          <Path d={figmaPaths.chatBack} fill={secondary} fillOpacity={opacity * 0.4} />
        </Svg>
      </Svg>
    );
  }

  if (name === 'search') {
    return (
      <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
        <Svg x="1.75" y="1.75" width="18.5" height="18.5" viewBox="0 0 18.5 18.5">
          <Path d={figmaPaths.search} {...strokeProps} />
        </Svg>
      </Svg>
    );
  }

  if (name === 'verified') {
    return (
      <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <Defs>
          <LinearGradient id="verifiedGradient" x1="13.8" y1="13.2" x2="2" y2="1.5">
            <Stop offset="0" stopColor="#0084FF" />
            <Stop offset="0.5" stopColor="#56D8FF" />
            <Stop offset="1" stopColor="#0084FF" />
          </LinearGradient>
        </Defs>
        <Circle cx="8" cy="8" r="6.7" fill="url(#verifiedGradient)" />
        <Path d="M5.2 8.2l1.8 1.8 3.8-4.1" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    );
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {renderIcon(name, color, secondary, strokeProps, opacity)}
    </Svg>
  );
}

function renderIcon(
  name: AppIconName,
  color: string,
  secondary: string,
  strokeProps: {
    stroke: string;
    strokeWidth: number;
    strokeLinecap: 'round';
    strokeLinejoin: 'round';
    opacity: number;
  },
  opacity: number
) {
  switch (name) {
    case 'arrow-left':
      return <Path d="M19 12H5m6-6-6 6 6 6" {...strokeProps} />;
    case 'arrow-up':
      return <Path d="M12 19V5m-6 6 6-6 6 6" {...strokeProps} />;
    case 'arrow-up-right':
      return <Path d="M7 17 17 7M9 7h8v8" {...strokeProps} />;
    case 'bell':
      return <Path d="M18 9.8c0-3.5-2.1-5.8-6-5.8S6 6.3 6 9.8c0 4-2 4.9-2 4.9h16s-2-.9-2-4.9ZM10 19h4" {...strokeProps} />;
    case 'book-open':
      return <Path d="M4 5.5c2.8 0 5 .7 8 2.2 3-1.5 5.2-2.2 8-2.2v13c-2.8 0-5 .7-8 2.2-3-1.5-5.2-2.2-8-2.2v-13ZM12 7.7v13" {...strokeProps} />;
    case 'card':
      return (
        <G {...strokeProps}>
          <Rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
          <Path d="M3.5 9.5h17" />
        </G>
      );
    case 'check':
      return <Path d="m5 12 4 4 10-10" {...strokeProps} />;
    case 'chat-dots':
      return (
        <G {...strokeProps}>
          <Path d="M21 11.5a8.5 8.5 0 0 1-9 8.4 8.8 8.8 0 0 1-3.8-.9L3 20l1.1-4.8A8.5 8.5 0 1 1 21 11.5Z" />
          <Path d="M8 12h.01M12 12h.01M16 12h.01" />
        </G>
      );
    case 'crosshair':
    case 'target':
      return (
        <G {...strokeProps}>
          <Circle cx="12" cy="12" r="7" />
          <Circle cx="12" cy="12" r="2.2" />
          <Path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        </G>
      );
    case 'double-check':
      return (
        <G {...strokeProps}>
          <Path d="m3.5 12 3.2 3.2 6.6-7" />
          <Path d="m10.2 12 3.2 3.2 7.1-7.6" />
        </G>
      );
    case 'edit':
      return (
        <G {...strokeProps}>
          <Path d="M4 20h4.5L19 9.5 14.5 5 4 15.5V20Z" />
          <Path d="m13.5 6 4.5 4.5" />
        </G>
      );
    case 'eye':
      return (
        <G {...strokeProps}>
          <Path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
          <Circle cx="12" cy="12" r="2.6" />
        </G>
      );
    case 'filter':
      return <Path d="M4 6h16M7 12h10M10 18h4" {...strokeProps} />;
    case 'grid':
      return (
        <G {...strokeProps}>
          <Rect x="4" y="4" width="6" height="6" rx="1.5" />
          <Rect x="14" y="4" width="6" height="6" rx="1.5" />
          <Rect x="4" y="14" width="6" height="6" rx="1.5" />
          <Rect x="14" y="14" width="6" height="6" rx="1.5" />
        </G>
      );
    case 'home':
      return <Path d="M4 11.2 12 4l8 7.2V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-8.8Z" {...strokeProps} />;
    case 'info':
      return (
        <G {...strokeProps}>
          <Circle cx="12" cy="12" r="9" />
          <Path d="M12 10v6M12 7h.01" />
        </G>
      );
    case 'instagram':
      return (
        <G {...strokeProps}>
          <Rect x="5" y="5" width="14" height="14" rx="4" />
          <Circle cx="12" cy="12" r="3.2" />
          <Path d="M16.5 7.5h.01" />
        </G>
      );
    case 'layers':
      return (
        <G {...strokeProps}>
          <Path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <Path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
        </G>
      );
    case 'list':
      return (
        <G {...strokeProps}>
          <Path d="M8 6h12M8 12h12M8 18h12" />
          <Path d="M4 6h.01M4 12h.01M4 18h.01" />
        </G>
      );
    case 'map-pin':
      return (
        <G {...strokeProps}>
          <Path d="M19 10.5c0 5-7 10-7 10s-7-5-7-10a7 7 0 1 1 14 0Z" />
          <Circle cx="12" cy="10.5" r="2.3" />
        </G>
      );
    case 'mic':
      return (
        <G {...strokeProps}>
          <Rect x="9" y="3.5" width="6" height="11" rx="3" />
          <Path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M8.5 21h7" />
        </G>
      );
    case 'more-vertical':
      return (
        <G fill={color} opacity={opacity}>
          <Circle cx="12" cy="5.5" r="1.6" />
          <Circle cx="12" cy="12" r="1.6" />
          <Circle cx="12" cy="18.5" r="1.6" />
        </G>
      );
    case 'navigation':
      return <Path d="M19.8 4.2 5.1 10.3l6.2 2.4 2.4 6.2 6.1-14.7Z" fill={color} opacity={opacity} />;
    case 'person-add':
    case 'user-plus':
      return (
        <G {...strokeProps}>
          <Path d="M15 20c0-2.2-1.8-4-4-4H7c-2.2 0-4 1.8-4 4" />
          <Circle cx="9" cy="8" r="4" />
          <Path d="M19 8v6M16 11h6" />
        </G>
      );
    case 'plus':
      return <Path d="M12 5v14M5 12h14" {...strokeProps} />;
    case 'share':
      return (
        <G {...strokeProps}>
          <Circle cx="18" cy="5" r="3" />
          <Circle cx="6" cy="12" r="3" />
          <Circle cx="18" cy="19" r="3" />
          <Path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4" />
        </G>
      );
    case 'sliders':
      return (
        <G {...strokeProps}>
          <Path d="M4 6h8M16 6h4M4 12h3M11 12h9M4 18h11M19 18h1" />
          <Circle cx="14" cy="6" r="2" />
          <Circle cx="9" cy="12" r="2" />
          <Circle cx="17" cy="18" r="2" />
        </G>
      );
    case 'sparkles':
      return (
        <G fill={color} opacity={opacity}>
          <Path d="M12 2.5 13.8 8l5.7 1.8-5.7 1.8L12 17l-1.8-5.4-5.7-1.8L10.2 8 12 2.5Z" />
          <Path d="m18 15 .8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15Z" />
        </G>
      );
    case 'user':
      return (
        <G {...strokeProps}>
          <Circle cx="12" cy="8" r="4" />
          <Path d="M20 20c0-3.3-2.7-6-6-6h-4c-3.3 0-6 2.7-6 6" />
        </G>
      );
    case 'x':
      return <Path d="M6 6l12 12M18 6 6 18" {...strokeProps} />;
    default:
      return <Polygon points="12 3 21 21 3 21" fill={secondary} opacity={opacity * 0.6} />;
  }
}
