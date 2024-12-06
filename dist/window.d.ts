import { observersConfigType } from './components/Bot';
import { BubbleTheme } from './features/bubble/types';
type BotProps = {
    chatflowid: string;
    apiHost?: string;
    onRequest?: (request: RequestInit) => Promise<void>;
    chatflowConfig?: Record<string, unknown>;
    observersConfig?: observersConfigType;
    theme?: BubbleTheme;
    onSubmit?: (body: any) => any;
};
type Chatbot = {
    initFull: (props: BotProps & {
        id?: string;
    }) => void;
    init: (props: BotProps) => void;
    destroy: () => void;
};
declare global {
    interface Window {
        Chatbot: Chatbot;
    }
}
export declare const parseChatbot: () => {
    initFull: (props: BotProps & {
        id?: string;
    }) => void;
    init: (props: BotProps) => void;
    destroy: () => void;
};
export declare const injectChatbotInWindow: (bot: Chatbot) => void;
export {};
//# sourceMappingURL=window.d.ts.map