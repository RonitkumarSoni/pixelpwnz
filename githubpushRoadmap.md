# Signet – GitHub Push Roadmap
**Repo:** `pixelpwnz-HackSprint`  
**Rule:** One feature = one commit = one PR. Never push unfinished work to `main`.

---

## Branch Strategy

```
main          ← production-ready only
dev           ← integration branch (all PRs merge here first)
├── feat/vineet/...
├── feat/daksh/...
├── feat/rishab/...
└── feat/ronit/...
```

> [!IMPORTANT]
> Always branch off `dev`. PR → `dev`. Only merge `dev` → `main` at end of each sprint.

---

## Sprint 1 — Week 1 (Jul 10–16): Data Pipeline

### Vineet
| # | Commit Message | Files |
|---|---|---|
| 1 | `feat(backend): init express server + health route` | `backend/src/index.js`, `package.json`, `.env.example` |
| 2 | `feat(parser): whatsapp regex timestamp + sender extraction` | `backend/src/parser/regex.js` |
| 3 | `feat(parser): pair extraction algorithm` | `backend/src/parser/pairExtractor.js` |
| 4 | `feat(api): POST /upload route with multer` | `backend/src/routes/upload.js` |
| 5 | `test(parser): unit tests for 3 chat formats` | `backend/tests/parser.test.js` |

### Daksh
| # | Commit Message | Files |
|---|---|---|
| 1 | `feat(mobile): init expo 54 project` | `mobile/` root scaffold |
| 2 | `feat(mobile): upload screen + expo-document-picker` | `mobile/screens/UploadScreen.jsx` |
| 3 | `feat(mobile): axios instance + session header interceptor` | `mobile/api/client.js` |
| 4 | `feat(mobile): basic navigation stack` | `mobile/App.js`, `mobile/navigation/` |

### Rishab
| # | Commit Message | Files |
|---|---|---|
| 1 | `feat(infra): docker-compose for chromadb` | `docker-compose.yml` |
| 2 | `feat(brain): embedder module (all-MiniLM-L6-v2)` | `backend/src/brain/embedder.js` |
| 3 | `feat(brain): chromadb client (add/query/delete/count)` | `backend/src/brain/chromaClient.js` |
| 4 | `feat(brain): brain index + ingestPairs pipeline` | `backend/src/brain/index.js` |

### Ronit
| # | Commit Message | Files |
|---|---|---|
| 1 | `feat(web): init vite + react project` | `web/` root scaffold |
| 2 | `feat(web): upload page + react-dropzone` | `web/src/pages/UploadPage.jsx` |
| 3 | `feat(web): responsive layout + base CSS` | `web/src/index.css`, `web/src/App.jsx` |
| 4 | `feat(web): env wiring (VITE_API_BASE_URL)` | `web/.env.example`, `web/src/api/client.js` |

---

## Sprint 2 — Week 2 (Jul 17–23): Brain & Retrieval

### Vineet
| # | Commit Message | Files |
|---|---|---|
| 1 | `feat(api): POST /chat endpoint skeleton` | `backend/src/routes/chat.js` |
| 2 | `feat(llm): openai sdk integration + token tracking` | `backend/src/llm/openaiClient.js` |
| 3 | `feat(llm): dynamic prompt assembly from examples` | `backend/src/llm/generate.js` |
| 4 | `feat(session): in-memory session store (Map)` | `backend/src/session/store.js` |

### Daksh
| # | Commit Message | Files |
|---|---|---|
| 1 | `feat(mobile): chat screen UI with FlashList` | `mobile/screens/ChatScreen.jsx` |
| 2 | `feat(mobile): integrate POST /chat + loading skeleton` | `mobile/screens/ChatScreen.jsx` |
| 3 | `feat(mobile): stats header (pair count display)` | `mobile/components/StatsHeader.jsx` |

### Rishab
| # | Commit Message | Files |
|---|---|---|
| 1 | `feat(brain): semantic retriever (dense + keyword hybrid)` | `backend/src/brain/retriever.js` |
| 2 | `feat(brain): prompt builder + tone profile` | `backend/src/brain/promptBuilder.js` |
| 3 | `feat(brain): buildRAGPrompt pipeline` | `backend/src/brain/index.js` |
| 4 | `test(brain): retriever unit tests` | `backend/tests/retriever.test.js` |
| 5 | `perf(brain): retrieval latency benchmark (<200ms)` | `backend/tests/retriever.bench.js` |

### Ronit
| # | Commit Message | Files |
|---|---|---|
| 1 | `feat(web): chat page split-panel layout` | `web/src/pages/ChatPage.jsx` |
| 2 | `feat(web): integrate POST /chat + zustand store` | `web/src/store/chatStore.js` |
| 3 | `feat(web): auto-scroll to latest message` | `web/src/components/MessageList.jsx` |

---

## Sprint 3 — Week 3 (Jul 24–30): Privacy, Polish & Edge Cases

### Vineet
| # | Commit Message | Files |
|---|---|---|
| 1 | `feat(session): TTL auto-expiry logic` | `backend/src/session/store.js` |
| 2 | `feat(parser): handle <Media omitted> gracefully` | `backend/src/parser/pairExtractor.js` |
| 3 | `feat(api): DELETE /session/:id endpoint` | `backend/src/routes/session.js` |
| 4 | `feat(api): GET /stats/:session_id endpoint` | `backend/src/routes/stats.js` |

### Daksh
| # | Commit Message | Files |
|---|---|---|
| 1 | `feat(mobile): privacy modal screen` | `mobile/screens/PrivacyModal.jsx` |
| 2 | `feat(mobile): persist session in AsyncStorage` | `mobile/store/sessionSlice.js` |
| 3 | `feat(mobile): clear data button + DELETE /session call` | `mobile/screens/ChatScreen.jsx` |

### Rishab
| # | Commit Message | Files |
|---|---|---|
| 1 | `feat(brain): inject tone profile into system prompt` | `backend/src/brain/promptBuilder.js` |
| 2 | `feat(brain): chromadb fallback (graceful degradation)` | `backend/src/brain/chromaClient.js` |
| 3 | `test(brain): prompt builder unit tests` | `backend/tests/promptBuilder.test.js` |
| 4 | `test(brain): E2E retrieval pipeline test (mocked LLM)` | `backend/tests/pipeline.e2e.test.js` |

### Ronit
| # | Commit Message | Files |
|---|---|---|
| 1 | `feat(web): privacy modal (forced acceptance)` | `web/src/components/PrivacyModal.jsx` |
| 2 | `feat(web): light/dark mode toggle` | `web/src/index.css`, `web/src/store/uiStore.js` |
| 3 | `feat(web): parsing stats display` | `web/src/components/StatsPanel.jsx` |
| 4 | `feat(web): copy-to-clipboard for clone reply` | `web/src/components/MessageBubble.jsx` |

---

## Sprint 4 — Week 4 (Jul 31–Aug 6): Deploy & Harden

### Vineet
| # | Commit Message | Files |
|---|---|---|
| 1 | `feat(api): rate limiting (10 req/min per session)` | `backend/src/middleware/rateLimiter.js` |
| 2 | `feat(infra): render deploy config` | `render.yaml` |
| 3 | `test(api): integration tests (supertest)` | `backend/tests/api.integration.test.js` |

### Daksh
| # | Commit Message | Files |
|---|---|---|
| 1 | `fix(mobile): keyboard avoidance iOS` | `mobile/screens/ChatScreen.jsx` |
| 2 | `feat(mobile): EAS build config` | `eas.json`, `app.config.js` |

### Rishab
| # | Commit Message | Files |
|---|---|---|
| 1 | `perf(brain): parallelize embed + retrieval` | `backend/src/brain/index.js` |
| 2 | `docs(brain): final prompt structure documentation` | `backend/src/brain/PROMPTS.md` |
| 3 | `test(brain): latency test suite (<5s E2E)` | `backend/tests/latency.test.js` |

### Ronit
| # | Commit Message | Files |
|---|---|---|
| 1 | `feat(web): vercel deploy config` | `vercel.json` |
| 2 | `fix(web): CORS + env for production` | `backend/src/middleware/cors.js` |
| 3 | `perf(web): lighthouse audit fixes` | `web/index.html`, `web/src/` |

---

## Shared Files (Push Once, Early)

| File | Owner | When |
|---|---|---|
| `docker-compose.yml` | Rishab | Sprint 1, Day 1 |
| `.env.example` | Vineet | Sprint 1, Day 1 |
| `README.md` | Anyone | Sprint 1, Day 2 |
| `.gitignore` | Anyone | Sprint 1, Day 1 |
| `backend/package.json` | Vineet | Sprint 1, Day 1 |

---

## PR Checklist (before merging to `dev`)

- [ ] No `.env` files committed (only `.env.example`)
- [ ] No `node_modules/` or `chroma_data/` in commit
- [ ] Tests pass locally (`pnpm test`)
- [ ] Commit message follows `type(scope): description` format
- [ ] One logical change per PR