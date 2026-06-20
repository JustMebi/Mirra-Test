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
  | 'chat-dp'
  | 'chat-dots'
  | 'compose'
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
  | 'person-check'
  | 'plus'
  | 'search'
  | 'send'
  | 'send-outline'
  | 'share'
  | 'sliders'
  | 'sort'
  | 'sort-lines'
  | 'sparkles'
  | 'sparkles-outline'
  | 'target'
  | 'three-lines-vertical'
  | 'user'
  | 'user-plus'
  | 'users'
  | 'users-outline'
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
        <Path transform="translate(11.58, 4.58)" d={figmaPaths.usersBack} fill={secondary} fillOpacity={opacity * 0.4} />
        <Path transform="translate(0.92, 4.58)" d={figmaPaths.usersFront} fill={color} fillOpacity={opacity * 0.75} />
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

  if (name === 'send-outline') {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M21 3 10.8 13.2" {...strokeProps} />
        <Path d="M21 3 14.5 20.5 10.8 13.2 3.5 9.5 21 3Z" {...strokeProps} />
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

  if (name === 'chat-dp') {
    return (
      <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
        <G {...strokeProps} strokeWidth={strokeWidth}>
          <Path d="M12.65 10.85C11.66 12.1 10 12.9 8.12 12.9C7.74 12.9 7.37 12.87 7.02 12.8C6.72 12.75 6.41 12.77 6.14 12.93C5.75 13.15 5.21 13.48 4.55 13.55C4.46 13.56 4.41 13.46 4.47 13.39C4.92 12.81 5.19 12.29 4.98 12.18C3.39 11.36 2.35 9.96 2.35 8.35C2.35 5.84 4.93 3.8 8.12 3.8C10.56 3.8 12.65 4.99 13.5 6.67" />
          <Path d="M13.78 2.58L14.28 3.88L15.58 4.38L14.28 4.88L13.78 6.18L13.28 4.88L11.98 4.38L13.28 3.88L13.78 2.58Z" />
          <Path d="M14.8 8.15L15.1 8.95L15.9 9.25L15.1 9.55L14.8 10.35L14.5 9.55L13.7 9.25L14.5 8.95L14.8 8.15Z" />
        </G>
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
        <Path
          d="M8,0.8 L10.03,3.10 L13.09,2.91 L12.90,5.97 L15.2,8 L12.90,10.03 L13.09,13.09 L10.03,12.90 L8,15.2 L5.97,12.90 L2.91,13.09 L3.10,10.03 L0.8,8 L3.10,5.97 L2.91,2.91 L5.97,3.10 Z"
          fill="url(#verifiedGradient)"
        />
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
      return (
        <G {...strokeProps} transform="translate(5 4.4) scale(1.03)">
          <Path d="M4.73412 12.05C4.73412 12.6467 4.97117 13.219 5.39313 13.641C5.81508 14.0629 6.38738 14.3 6.98412 14.3C7.58085 14.3 8.15315 14.0629 8.57511 13.641C8.99706 13.219 9.23412 12.6467 9.23412 12.05M1.92162 5.8625C1.92162 4.51984 2.45499 3.23217 3.40439 2.28277C4.35379 1.33337 5.64146 0.8 6.98412 0.8C8.32678 0.8 9.61444 1.33337 10.5638 2.28277C11.5132 3.23217 12.0466 4.51984 12.0466 5.8625C12.0466 8.38109 12.6302 10.4047 13.0943 11.2063C13.1436 11.2916 13.1695 11.3884 13.1696 11.487C13.1697 11.5856 13.1439 11.6824 13.0948 11.7679C13.0456 11.8533 12.9749 11.9244 12.8897 11.9739C12.8044 12.0234 12.7077 12.0497 12.6091 12.05H1.35912C1.26066 12.0494 1.16409 12.023 1.07905 11.9734C0.994013 11.9238 0.923483 11.8527 0.874514 11.7673C0.825545 11.6819 0.799851 11.5851 0.800001 11.4867C0.80015 11.3882 0.826138 11.2915 0.875366 11.2063C1.33873 10.4047 1.92162 8.38039 1.92162 5.8625Z" />
        </G>
      );
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
    case 'compose':
      return (
        <G {...strokeProps}>
          <Path d="M10.6 5.5H8.2C6.42 5.5 5.5 6.42 5.5 8.2v7.6c0 1.78.92 2.7 2.7 2.7h7.6c1.78 0 2.7-.92 2.7-2.7v-2.4" />
          <Path d="M10.65 14.05 16.35 8.35" />
          <Path d="M15.08 7.08 17.62 9.62" />
          <Path d="M9.85 14.85 11.65 14.25" />
        </G>
      );
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
          <Circle cx="12" cy="12" r="5.2" />
          <Circle cx="12" cy="12" r="1.8" />
          <Path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3" />
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
      return <Path d="M4.5 5.5h15l-6 7v4.3l-3 1.7v-6l-6-7Z" {...strokeProps} />;
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
        <G {...strokeProps} transform="translate(3.5 4.1) scale(1.03)">
          <Path d="M13.3407 3.6L13.8968 3.77289C15.2534 4.19471 15.9318 4.40562 16.2192 4.9487C16.5066 5.49177 16.2909 6.15495 15.8594 7.48127L14.4865 11.7016C14.055 13.0279 13.8393 13.6911 13.2838 13.9721C12.7283 14.2531 12.0499 14.0422 10.6933 13.6204L4.21795 11.6071C3.83623 11.4884 2.75572 11.1974 2.475 11.1M13.35 3.6C13.35 5.1 13.35 6.6 13.35 8.1C13.35 9.51422 13.35 10.2213 12.9107 10.6607C12.4713 11.1 11.7642 11.1 10.35 11.1C8.1 11.1 5.85 11.1 3.6 11.1C2.18579 11.1 1.47868 11.1 1.03934 10.6607C0.600002 10.2213 0.600002 9.51422 0.600002 8.1C0.600002 6.6 0.600002 5.1 0.600002 3.6C0.600002 2.18579 0.600002 1.47868 1.03934 1.03934C1.47868 0.600002 2.18579 0.600002 3.6 0.600002C5.85 0.600002 8.1 0.600002 10.35 0.600002C11.7642 0.600002 12.4713 0.600002 12.9107 1.03934C13.35 1.47868 13.35 2.18579 13.35 3.6Z" />
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
    case 'three-lines-vertical':
      return (
        <G {...strokeProps} transform="translate(10 6.5)">
          <Path d="M0.8 5.3L3.8 5.30044M0.8 9.8H3.8M0.8 0.8L3.8 0.806729" />
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
    case 'person-check':
      return (
        <G fill={color} opacity={opacity}>
          <Path d="M8.8 11.4C10.787 11.4 12.4 9.787 12.4 7.8C12.4 5.813 10.787 4.2 8.8 4.2C6.813 4.2 5.2 5.813 5.2 7.8C5.2 9.787 6.813 11.4 8.8 11.4Z" />
          <Path d="M2.75 19.1C3.2 15.85 5.62 13.8 8.8 13.8C10.3 13.8 11.58 14.26 12.6 15.08C12.15 15.86 11.88 16.78 11.88 17.78V19.1H2.75Z" />
          <Path d="M15.2 13.62C15.45 13.37 15.86 13.37 16.11 13.62L17.14 14.65L19.42 12.22C19.66 11.96 20.07 11.95 20.33 12.2C20.59 12.44 20.6 12.85 20.35 13.11L17.62 16.02C17.5 16.15 17.33 16.22 17.15 16.22C16.97 16.23 16.8 16.16 16.67 16.03L15.2 14.55C14.95 14.3 14.95 13.88 15.2 13.62Z" />
          <Path d="M18.55 15.88C18.8 15.63 19.21 15.63 19.46 15.88L20.07 16.49L21.38 15.08C21.62 14.82 22.03 14.8 22.29 15.04C22.55 15.29 22.57 15.7 22.32 15.96L20.54 17.86C20.42 17.99 20.25 18.06 20.07 18.07C19.89 18.07 19.72 18 19.59 17.87L18.55 16.82C18.3 16.56 18.3 16.14 18.55 15.88Z" />
        </G>
      );
    case 'plus':
      return <Path d="M12 5v14M5 12h14" {...strokeProps} />;
    case 'share':
      return (
        <G {...strokeProps} transform="translate(4.6 4.6) scale(1.05)">
          <Path d="M14.1 7.35V10.5C14.1 11.7601 14.1 12.3902 13.8548 12.8715C13.639 13.2948 13.2948 13.639 12.8715 13.8548C12.3902 14.1 11.7601 14.1 10.5 14.1H4.2C2.93988 14.1 2.30982 14.1 1.82852 13.8548C1.40516 13.639 1.06095 13.2948 0.845236 12.8715C0.6 12.3902 0.6 11.7601 0.6 10.5V7.35M4.35 3.6L7.35 0.6L10.35 3.6M7.35 0.6V9.6" />
        </G>
      );
    case 'sliders':
      return (
        <G {...strokeProps}>
          <Path d="M5 9h8M16 9h3" />
          <Path d="M13 7.5v3" />
          <Path d="M5 15h3M11 15h8" />
          <Path d="M8 13.5v3" />
        </G>
      );
    case 'sort':
      return (
        <G {...strokeProps}>
          <Path d="M5 9h8M16 9h3" />
          <Path d="M13 7.5v3" />
          <Path d="M5 15h3M11 15h8" />
          <Path d="M8 13.5v3" />
        </G>
      );
    case 'sort-lines':
      return (
        <G {...strokeProps}>
          <Path d="M5 7.25h7.25" />
          <Path d="M5 12h5.25" />
          <Path d="M5 16.75h3.25" />
          <Path d="M15.25 6.5v9.7" />
          <Path d="m12.95 14.1 2.3 2.3 2.3-2.3" />
        </G>
      );
    case 'sparkles':
      return (
        <G fill={color} opacity={opacity}>
          <Path d="M12 2.5 13.8 8l5.7 1.8-5.7 1.8L12 17l-1.8-5.4-5.7-1.8L10.2 8 12 2.5Z" />
          <Path d="m20 1.4.62 1.68 1.68.62-1.68.62L20 6l-.62-1.68-1.68-.62 1.68-.62L20 1.4Z" />
          <Path d="m18 15 .8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15Z" />
        </G>
      );
    case 'sparkles-outline':
      return (
        <G opacity={opacity}>
          <Path d="M12 2.5 13.8 8l5.7 1.8-5.7 1.8L12 17l-1.8-5.4-5.7-1.8L10.2 8 12 2.5Z" {...strokeProps} />
          <Path d="m20 1.4.62 1.68 1.68.62-1.68.62L20 6l-.62-1.68-1.68-.62 1.68-.62L20 1.4Z" fill={color} />
          <Path d="m18 15 .8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15Z" fill={color} />
        </G>
      );
    case 'user':
      return (
        <G {...strokeProps}>
          <Circle cx="12" cy="8" r="4" />
          <Path d="M20 20c0-3.3-2.7-6-6-6h-4c-3.3 0-6 2.7-6 6" />
        </G>
      );
    case 'users-outline':
      return (
        <G {...strokeProps}>
          <Circle cx="9" cy="8.5" r="3.2" />
          <Path d="M3.5 19c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8" />
          <Path d="M15.2 6.2a3 3 0 0 1 0 5.6" />
          <Path d="M15.8 14.4c2.4.3 4.1 2 4.7 4.6" />
        </G>
      );
    case 'x':
      return <Path d="M6 6l12 12M18 6 6 18" {...strokeProps} />;
    default:
      return <Polygon points="12 3 21 21 3 21" fill={secondary} opacity={opacity * 0.6} />;
  }
}
