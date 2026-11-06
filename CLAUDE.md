# Notes for Claude

## Higgsfield image/video generation
- Always use the **Higgsfield API** (open.higgsfield.ai billing; `https://api.higgsfield.ai`, header `Authorization: Key <KEY_ID>:<KEY_SECRET>`, injected by the session proxy) — not the Higgsfield MCP app connector, which bills a different (near-empty) workspace.
- Estimate first: `POST https://api.higgsfield.ai/estimate/<model-path>` with the same body; poll `GET /requests/<id>/status`.
