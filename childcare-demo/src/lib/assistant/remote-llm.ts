import type { AssistantProvider, Chunk } from './types';

/**
 * Remote LLM provider (stub, not active in the demo).
 *
 * Wire-up: deploy a small server function at `PUBLIC_ASSISTANT_ENDPOINT` (e.g. /api/ask)
 * that calls the Claude Messages API with streaming enabled, using the FAQ dataset in
 * src/data/faq.ts as grounding context in the system prompt, and returns
 * newline-delimited JSON `Chunk` objects:
 *   {"type":"text","text":"We open at "}\n{"type":"text","text":"7:00…"}\n{"type":"source",...}
 *
 * Keep the API key server-side only. The browser never sees it.
 */
export function remoteLlmProvider(endpoint: string): AssistantProvider {
  return {
    id: 'remote-llm',
    async *ask(question, ctx) {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, lang: ctx.lang, history: ctx.history.slice(-8) }),
        signal: ctx.signal,
      });
      if (!res.ok || !res.body) throw new Error(`Assistant endpoint failed: ${res.status}`);
      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
      let buf = '';
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += value;
        let nl: number;
        while ((nl = buf.indexOf('\n')) >= 0) {
          const line = buf.slice(0, nl).trim();
          buf = buf.slice(nl + 1);
          if (line) yield JSON.parse(line) as Chunk;
        }
      }
    },
  };
}
