import type { Lang } from '@/i18n';

export interface AssistantSource { label: string; href: string }

/** Streamed pieces of an answer. Providers yield these in any order. */
export type Chunk =
  | { type: 'text'; text: string }
  | { type: 'source'; source: AssistantSource }
  | { type: 'suggestions'; items: string[] }
  | { type: 'handoff' };

export interface Turn { role: 'user' | 'assistant'; text: string }

export interface AskContext { lang: Lang; history: Turn[]; signal?: AbortSignal }

/**
 * The contract every assistant backend implements. The UI only ever talks to this,
 * so swapping the local FAQ engine for a real LLM is a one-line change in ./index.ts.
 */
export interface AssistantProvider {
  readonly id: string;
  ask(question: string, ctx: AskContext): AsyncIterable<Chunk>;
}
