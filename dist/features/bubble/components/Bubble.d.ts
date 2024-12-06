import { BubbleTheme } from '../types';
import { observersConfigType } from '../../../components/Bot';
export type BubbleProps = {
    chatflowid: string;
    apiHost?: string;
    onRequest?: (request: RequestInit) => Promise<void>;
    chatflowConfig?: Record<string, unknown>;
    theme?: BubbleTheme;
    observersConfig?: observersConfigType;
    onSubmit?: (body: any) => any;
};
export declare const Bubble: (props: BubbleProps) => import("solid-js").JSX.Element;
//# sourceMappingURL=Bubble.d.ts.map