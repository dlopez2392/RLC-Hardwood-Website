import { localFaqProvider } from './local-faq';
import { remoteLlmProvider } from './remote-llm';
import type { AssistantProvider } from './types';

export type { AssistantProvider, Chunk, Turn } from './types';

/**
 * Provider selection. Set PUBLIC_ASSISTANT_ENDPOINT at build time to switch the
 * whole site from the local FAQ engine to a real LLM backend. Nothing else changes.
 */
export function getProvider(): AssistantProvider {
  const endpoint = import.meta.env.PUBLIC_ASSISTANT_ENDPOINT as string | undefined;
  return endpoint ? remoteLlmProvider(endpoint) : localFaqProvider;
}
