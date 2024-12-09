import { Bot } from './components/Bot';
import { Bubble } from './features/bubble';
import { customElement } from 'solid-element';
import { parseChatbot, injectChatbotInWindow } from './window';

// Register web components
if (typeof window !== 'undefined') {
  // Register the chat bubble web component
  customElement(
    'flowise-chatbot',
    {
      chatflowid: '',
      apiHost: undefined,
      chatflowConfig: undefined,
      theme: undefined,
      observersConfig: undefined,
      onSubmit: undefined,
      onClose: undefined,
    },
    Bubble,
  );

  // Register the full page chat web component
  customElement('flowise-fullchatbot',
    {
      chatflowid: '',
      apiHost: undefined,
      chatflowConfig: undefined,
      observersConfig: undefined,
      onSubmit: undefined,
      onClose: undefined,
    },
    Bot
  );
}

const chatbot = parseChatbot();
injectChatbotInWindow(chatbot);

export default chatbot;
