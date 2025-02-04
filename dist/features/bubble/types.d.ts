import { observersConfigType } from '@/components/Bot';
export type BubbleParams = {
    theme?: BubbleTheme;
};
export type BubbleTheme = {
    chatWindow?: ChatWindowTheme;
    button?: ButtonTheme;
    tooltip?: ToolTipTheme;
    disclaimer?: DisclaimerPopUpTheme;
    customCSS?: string;
};
export type TextInputTheme = {
    backgroundColor?: string;
    textColor?: string;
    fontWeight?: number;
    placeholder?: string;
    sendButtonColor?: string;
    maxChars?: number;
    maxCharsWarningMessage?: string;
    autoFocus?: boolean;
    sendMessageSound?: boolean;
    sendSoundLocation?: string;
    receiveMessageSound?: boolean;
    receiveSoundLocation?: string;
    disabled?: boolean;
};
export type UserMessageTheme = {
    backgroundColor?: string;
    textColor?: string;
    showAvatar?: boolean;
    avatarSrc?: string;
};
export type BotMessageTheme = {
    backgroundColor?: string;
    textColor?: string;
    showAvatar?: boolean;
    avatarSrc?: string;
};
export type FooterTheme = {
    showFooter?: boolean;
    textColor?: string;
    text?: string;
    company?: string;
    companyLink?: string;
};
export type FeedbackTheme = {
    color?: string;
};
export type ChatWindowTheme = {
    showTitle?: boolean;
    showAgentMessages?: boolean;
    title?: string;
    titleAvatarSrc?: string;
    welcomeMessage?: string;
    errorMessage?: string;
    backgroundColor?: string;
    backgroundImage?: string;
    height?: number;
    width?: number;
    fontSize?: number;
    userMessage?: UserMessageTheme;
    botMessage?: BotMessageTheme;
    textInput?: TextInputTheme;
    feedback?: FeedbackTheme;
    footer?: FooterTheme;
    sourceDocsTitle?: string;
    poweredByTextColor?: string;
    starterPrompts?: string[];
    starterPromptFontSize?: number;
    clearChatOnReload?: boolean;
    dateTimeToggle?: DateTimeToggleTheme;
    renderHTML?: boolean;
    maximizeButton?: {
        show?: boolean;
        backgroundColor?: string;
        iconColor?: string;
    };
};
export type ButtonTheme = {
    size?: 'small' | 'medium' | 'large' | number;
    backgroundColor?: string;
    iconColor?: string;
    customIconSrc?: string;
    bottom?: number;
    right?: number;
    dragAndDrop?: boolean;
    autoWindowOpen?: autoWindowOpenTheme;
};
export type ToolTipTheme = {
    showTooltip?: boolean;
    tooltipMessage?: string;
    tooltipBackgroundColor?: string;
    tooltipTextColor?: string;
    tooltipFontSize?: number;
};
export type autoWindowOpenTheme = {
    autoOpen?: boolean;
    openDelay?: number;
    autoOpenOnMobile?: boolean;
};
export type DisclaimerPopUpTheme = {
    title?: string;
    message?: string;
    textColor?: string;
    buttonColor?: string;
    buttonTextColor?: string;
    buttonText?: string;
    blurredBackgroundColor?: string;
    backgroundColor?: string;
};
export type DateTimeToggleTheme = {
    date?: boolean;
    time?: boolean;
};
export type BubbleProps = {
    chatflowid: string;
    apiHost?: string;
    onRequest?: (request: RequestInit) => Promise<void>;
    chatflowConfig?: Record<string, unknown>;
    theme?: BubbleTheme;
    observersConfig?: observersConfigType;
    onSubmit?: (body: any) => any;
};
//# sourceMappingURL=types.d.ts.map