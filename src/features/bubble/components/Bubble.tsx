import { createSignal, Show, splitProps, onCleanup, createEffect } from 'solid-js';
import styles from '../../../assets/index.css';
import { BubbleButton } from './BubbleButton';
import { BubbleParams } from '../types';
import { Bot, BotProps } from '../../../components/Bot';
import Tooltip from './Tooltip';
import { getBubbleButtonSize } from '@/utils';

const defaultButtonColor = '#3B81F6';
const defaultIconColor = 'white';

export type BubbleProps = BotProps & BubbleParams;

export const Bubble = (props: BubbleProps) => {
  const [bubbleProps] = splitProps(props, ['theme']);

  const [isBotOpened, setIsBotOpened] = createSignal(false);
  const [isBotStarted, setIsBotStarted] = createSignal(false);
  const [buttonPosition, setButtonPosition] = createSignal({
    bottom: bubbleProps.theme?.button?.bottom ?? 20,
    right: bubbleProps.theme?.button?.right ?? 20,
  });

  const openBot = () => {
    if (!isBotStarted()) setIsBotStarted(true);
    setIsBotOpened(true);
  };

  const closeBot = () => {
    setIsBotOpened(false);
    setIsMaximized(false)
  };

  const toggleBot = () => {
    isBotOpened() ? closeBot() : openBot();
  };

  onCleanup(() => {
    setIsBotStarted(false);
  });

  const buttonSize = getBubbleButtonSize(props.theme?.button?.size); // Default to 48px if size is not provided
  const buttonBottom = props.theme?.button?.bottom ?? 20;
  const chatWindowBottom = buttonBottom + buttonSize + 10; // Adjust the offset here for slight shift

  // Add viewport meta tag dynamically
  createEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, interactive-widget=resizes-content';
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  });

  const showTooltip = bubbleProps.theme?.tooltip?.showTooltip ?? false;

  // Add new state for maximize
  const [isMaximized, setIsMaximized] = createSignal(false);

  // Add this function to handle maximize/minimize
  const toggleMaximize = () => {
    setIsMaximized(!isMaximized());
  };

  return (
    <>
      <Show when={props.theme?.customCSS}>
        <style>{props.theme?.customCSS}</style>
      </Show>
      <style>{styles}</style>
      <Tooltip
        showTooltip={showTooltip && !isBotOpened()}
        position={buttonPosition()}
        buttonSize={buttonSize}
        tooltipMessage={bubbleProps.theme?.tooltip?.tooltipMessage}
        tooltipBackgroundColor={bubbleProps.theme?.tooltip?.tooltipBackgroundColor}
        tooltipTextColor={bubbleProps.theme?.tooltip?.tooltipTextColor}
        tooltipFontSize={bubbleProps.theme?.tooltip?.tooltipFontSize} // Set the tooltip font size
      />
      <BubbleButton
        {...bubbleProps.theme?.button}
        toggleBot={toggleBot}
        isBotOpened={isBotOpened()}
        setButtonPosition={setButtonPosition}
        dragAndDrop={bubbleProps.theme?.button?.dragAndDrop ?? false}
        autoOpen={bubbleProps.theme?.button?.autoWindowOpen?.autoOpen ?? false}
        openDelay={bubbleProps.theme?.button?.autoWindowOpen?.openDelay}
        autoOpenOnMobile={bubbleProps.theme?.button?.autoWindowOpen?.autoOpenOnMobile ?? false}
      />
      <div
        part="bot"
        style={{
          height: isMaximized()
            ? '100vh'
            : bubbleProps.theme?.chatWindow?.height
              ? `${bubbleProps.theme?.chatWindow?.height.toString()}px`
              : 'calc(100% - 150px)',
          width: isMaximized() ? '100vw' : bubbleProps.theme?.chatWindow?.width ? `${bubbleProps.theme?.chatWindow?.width.toString()}px` : undefined,
          transition: 'all 200ms cubic-bezier(0, 1.2, 1, 1)',
          'transform-origin': isMaximized() ? 'center center' : 'bottom right',
          transform: isBotOpened() ? 'scale3d(1, 1, 1)' : 'scale3d(0, 0, 1)',
          'box-shadow': 'rgb(0 0 0 / 16%) 0px 5px 40px',
          'background-color': bubbleProps.theme?.chatWindow?.backgroundColor || '#ffffff',
          position: isMaximized() ? 'fixed' : 'absolute',
          top: isMaximized() ? '0' : 'auto',
          left: isMaximized() ? '0' : 'auto',
          right: isMaximized() ? '0' : `${buttonPosition().right}px`,
          bottom: isMaximized() ? '0' : `${buttonPosition().bottom + buttonSize + 10}px`,
          'z-index': 42424242,
        }}
        class={
          `fixed sm:right-5 rounded-lg w-full sm:w-[400px] max-h-[704px]` +
          (isBotOpened() ? ' opacity-1' : ' opacity-0 pointer-events-none') +
          (isMaximized() ? ' !max-h-full !w-full !h-full !m-0 !rounded-none' : '')
        }
      >
        <Show when={isBotStarted()}>
          <div class="relative h-full">
            <Show when={isBotOpened()}>
              {/* Cross button For only mobile screen use this <Show when={isBotOpened() && window.innerWidth <= 640}>  */}
              <div class="flex items-center absolute top-0 right-0 m-[6px] z-50">
                <Show when={bubbleProps.theme?.chatWindow?.maximizeButton?.show !== false}>
                  <button
                    onClick={toggleMaximize}
                    class="py-2 pr-10 bg-transparent text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 transition-all filter hover:brightness-90 active:brightness-75"
                    title={isMaximized() ? 'Minimize Chat' : 'Maximize Chat'}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill={bubbleProps.theme?.chatWindow?.maximizeButton?.iconColor ?? defaultIconColor}
                    >
                      {isMaximized() ? (
                        // Minimize icon
                        <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                      ) : (
                        // Maximize icon - clean corner brackets style
                        <path d="M3 3h6v2H5v4H3V3m18 0h-6v2h4v4h2V3M3 21h6v-2H5v-4H3v6m18 0h-6v-2h4v-4h2v6" />
                      )}
                    </svg>
                  </button>
                </Show>
                <button
                  onClick={closeBot}
                  class="py-2 pr-3 bg-transparent text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 transition-all filter hover:brightness-90 active:brightness-75"
                  title="Close Chat"
                >
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path
                      fill={bubbleProps.theme?.button?.iconColor ?? defaultIconColor}
                      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                    />
                  </svg>
                </button>
              </div>
            </Show>
            <Bot
              badgeBackgroundColor={bubbleProps.theme?.chatWindow?.backgroundColor}
              bubbleBackgroundColor={bubbleProps.theme?.button?.backgroundColor ?? defaultButtonColor}
              bubbleTextColor={bubbleProps.theme?.button?.iconColor ?? defaultIconColor}
              showTitle={bubbleProps.theme?.chatWindow?.showTitle}
              showAgentMessages={bubbleProps.theme?.chatWindow?.showAgentMessages}
              title={bubbleProps.theme?.chatWindow?.title}
              titleAvatarSrc={bubbleProps.theme?.chatWindow?.titleAvatarSrc}
              welcomeMessage={bubbleProps.theme?.chatWindow?.welcomeMessage}
              errorMessage={bubbleProps.theme?.chatWindow?.errorMessage}
              poweredByTextColor={bubbleProps.theme?.chatWindow?.poweredByTextColor}
              textInput={bubbleProps.theme?.chatWindow?.textInput}
              botMessage={bubbleProps.theme?.chatWindow?.botMessage}
              userMessage={bubbleProps.theme?.chatWindow?.userMessage}
              feedback={bubbleProps.theme?.chatWindow?.feedback}
              fontSize={bubbleProps.theme?.chatWindow?.fontSize}
              footer={bubbleProps.theme?.chatWindow?.footer}
              sourceDocsTitle={bubbleProps.theme?.chatWindow?.sourceDocsTitle}
              starterPrompts={bubbleProps.theme?.chatWindow?.starterPrompts}
              starterPromptFontSize={bubbleProps.theme?.chatWindow?.starterPromptFontSize}
              chatflowid={props.chatflowid}
              chatflowConfig={props.chatflowConfig}
              apiHost={props.apiHost}
              onRequest={props.onRequest}
              observersConfig={props.observersConfig}
              clearChatOnReload={bubbleProps.theme?.chatWindow?.clearChatOnReload}
              disclaimer={bubbleProps.theme?.disclaimer}
              dateTimeToggle={bubbleProps.theme?.chatWindow?.dateTimeToggle}
              renderHTML={props.theme?.chatWindow?.renderHTML}
            />
          </div>
        </Show>
      </div>
    </>
  );
};
