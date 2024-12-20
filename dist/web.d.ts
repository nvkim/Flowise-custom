declare const chatbot: {
    initFull: (props: {
        chatflowid: string;
        apiHost?: string | undefined;
        onRequest?: ((request: RequestInit) => Promise<void>) | undefined;
        chatflowConfig?: Record<string, unknown> | undefined;
        observersConfig?: import("./components/Bot").observersConfigType | undefined;
        theme?: import("./features/bubble/types").BubbleTheme | undefined;
        onSubmit?: ((body: any) => any) | undefined;
        onOpen?: (() => void) | undefined;
        onClose?: (() => void) | undefined;
    } & {
        id?: string | undefined;
    }) => void;
    init: (props: {
        chatflowid: string;
        apiHost?: string | undefined;
        onRequest?: ((request: RequestInit) => Promise<void>) | undefined;
        chatflowConfig?: Record<string, unknown> | undefined;
        observersConfig?: import("./components/Bot").observersConfigType | undefined;
        theme?: import("./features/bubble/types").BubbleTheme | undefined;
        onSubmit?: ((body: any) => any) | undefined;
        onOpen?: (() => void) | undefined;
        onClose?: (() => void) | undefined;
    }) => void;
    destroy: () => void;
    onOpen: () => void;
    onClose: () => void;
};
export default chatbot;
//# sourceMappingURL=web.d.ts.map