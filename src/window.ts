import { observersConfigType } from './components/Bot';
import { BubbleTheme } from './features/bubble/types';

/* eslint-disable solid/reactivity */
type BotProps = {
  chatflowid: string;
  apiHost?: string;
  onRequest?: (request: RequestInit) => Promise<void>;
  chatflowConfig?: Record<string, unknown>;
  observersConfig?: observersConfigType;
  theme?: BubbleTheme;
  onSubmit?: (body: any) => any;
  onOpen?: () => void;
};

type Chatbot = {
  initFull: (props: BotProps & { id?: string }) => void;
  init: (props: BotProps) => void;
  destroy: () => void;
  onOpen: () => void;
};

declare global {
  interface Window {
    Chatbot: Chatbot;
  }
}

let elementUsed: Element | undefined;

export const parseChatbot = () => {
  let onOpen: (() => void) | undefined;

  return {
    initFull: (props: BotProps & { id?: string }) => {
      onOpen = props.onOpen;
      const target = document.createElement('flowise-fullchatbot');
      Object.assign(target, props);
      document.body.appendChild(target);
    },
    init: (props: BotProps) => {
      onOpen = props.onOpen;
      const target = document.createElement('flowise-chatbot');
      Object.assign(target, {
        ...props,
        onSubmit: props.onSubmit,
        chatflowid: props.chatflowid,
        apiHost: props.apiHost,
        chatflowConfig: props.chatflowConfig,
        theme: props.theme,
        observersConfig: props.observersConfig,
      });
      document.body.appendChild(target);
    },
    destroy: () => {
      onOpen = undefined;
      document.querySelectorAll('flowise-chatbot').forEach((el) => el.remove());
      document.querySelectorAll('flowise-fullchatbot').forEach((el) => el.remove());
    },
    onOpen: () => {
      if (onOpen) {
        onOpen();
      }
    },
  };
};

export const injectChatbotInWindow = (bot: Chatbot) => {
  if (typeof window === 'undefined') return;
  window.Chatbot = bot;
};
