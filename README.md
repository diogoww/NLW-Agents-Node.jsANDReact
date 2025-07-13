# NLW Agents - Node.js e React

Sistema de salas de perguntas e respostas com gravação de áudio, desenvolvido durante o NLW (Next Level Week).

## 🚀 Sobre o Projeto

Aplicação full-stack que permite criar salas virtuais onde usuários podem fazer perguntas e receber respostas. O sistema inclui funcionalidade de gravação de áudio para facilitar a interação.

### Funcionalidades
- ✅ Criar salas de perguntas
- ✅ Fazer perguntas em salas específicas
- ✅ Gravar áudio para envio de perguntas
- ✅ Interface responsiva e moderna
- ✅ **Respostas automáticas por IA** (OpenAI, Ollama, Hugging Face)

## 🛠️ Tecnologias

### Backend
- **Node.js** - Runtime JavaScript
- **Fastify** - Framework web performático
- **Drizzle ORM** - ORM TypeScript-first
- **PostgreSQL** - Banco de dados com extensão pgvector
- **IA Multiplataforma** - OpenAI, Ollama (gratuito), Hugging Face (gratuito)
- **Zod** - Validação de schemas
- **TypeScript** - Tipagem estática

### Frontend
- **React 19** - Biblioteca para interfaces
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **React Query** - Gerenciamento de estado server
- **React Router** - Roteamento
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones

## 📁 Estrutura do Projeto

```
├── server/          # Backend Node.js + Fastify
│   ├── src/
│   │   ├── db/      # Schema e migrations
│   │   ├── http/    # Rotas da API
│   │   └── server.ts
│   └── docker/      # Configuração PostgreSQL
└── web/             # Frontend React
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── http/    # Hooks para API
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose
- PostgreSQL (via Docker)
- **IA** (escolha uma opção):
  - **Ollama** (recomendado - gratuito e local)
  - **Hugging Face** (gratuito com limites)
  - **OpenAI** (pago)

### Backend

```bash
cd server

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env conforme sua opção de IA (veja seção "Configuração de IA" abaixo)

# Subir banco de dados
docker-compose up -d

# Executar migrations
npx drizzle-kit migrate

# Popular banco com dados iniciais
npm run db:seed

# Iniciar servidor
npm run dev
```

### Frontend

```bash
cd web

# Instalar dependências
npm install

# Iniciar aplicação
npm run dev
```

## 🤖 Configuração de IA

### Opção 1: Ollama (Recomendado - Gratuito)
1. Instale o Ollama: https://ollama.ai
2. Baixe um modelo: `ollama pull llama2`
3. Não precisa de chave no `.env`

### Opção 2: Hugging Face (Gratuito com limites)
1. Crie conta em: https://huggingface.co
2. Obtenha token em: https://huggingface.co/settings/tokens
3. Adicione no `.env`: `HUGGING_FACE_TOKEN=seu_token`

### Opção 3: OpenAI (Pago)
1. Obtenha chave em: https://platform.openai.com/api-keys
2. Adicione no `.env`: `OPENAI_API_KEY=sua_chave`

## 📡 API Endpoints

- `POST /rooms` - Criar nova sala
- `GET /rooms` - Listar salas
- `POST /rooms/:roomId/questions` - Criar pergunta
- `GET /rooms/:roomId/questions` - Listar perguntas da sala
- `POST /rooms/:roomId/audio` - Enviar áudio (funcionalidade futura)

## 🎯 Próximos Passos

- [ ] **Processamento de áudio** com Whisper para transcrição
- [ ] **Webhooks/Jobs** para processar perguntas em background
- [ ] Sistema de autenticação
- [ ] Notificações em tempo real
- [ ] **Streaming de respostas** em tempo real

---

Desenvolvido durante o NLW Agents da Rocketseat 🚀 