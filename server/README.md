# NLW Agents - Node.js e React (Server)

## Descrição

Backend do projeto NLW Agents, utilizando Node.js, Fastify e Drizzle ORM, com banco de dados PostgreSQL (com extensão pgvector).

---

## Principais Bibliotecas e Ferramentas

- **Node.js**: Ambiente de execução JavaScript.
- **Fastify**: Framework web para Node.js, focado em performance.
- **@fastify/cors**: Middleware para CORS.
- **Zod**: Validação e tipagem de dados.
- **fastify-type-provider-zod**: Integração de Zod com Fastify.
- **Drizzle ORM**: ORM para TypeScript, utilizado com PostgreSQL.
- **drizzle-kit**: Ferramenta de migrations e geração de schema.
- **postgres**: Cliente PostgreSQL para Node.js.
- **Docker**: Utilizado para subir o banco de dados PostgreSQL com pgvector.
- **TypeScript**: Tipagem estática para JavaScript.

---

## Padrões de Projeto

- **Camada de Rotas**: Organizada em `src/http/routes`, separando endpoints por recurso.
- **Camada de Persistência**: Models definidos em `src/db/schema` usando Drizzle ORM.
- **Migrations**: Scripts SQL em `src/db/migrations`.
- **Validação e Tipagem**: Utilização de Zod para schemas e validação de dados nas rotas.
- **Configuração via Environment Variables**: Utilização de arquivo `.env` para variáveis sensíveis.

---

## Setup e Configuração

### 1. Clonar o repositório

```bash
git clone https://github.com/diogoww/NLW-Agents-Node.jsANDReact.git
cd NLW-Agents-Node.jsANDReact/server
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias:

```
DATABASE_URL=postgres://docker:docker@localhost:5432/agents
PORT=3333
OPENAI_API_KEY=your_openai_api_key_here
```

**Nota:** Para usar a funcionalidade de IA, você precisa de uma chave da OpenAI. Obtenha em: https://platform.openai.com/api-keys

### 4. Subir o banco de dados com Docker

```bash
docker-compose up -d
```

### 5. Rodar migrations e seeds

```bash
npx drizzle-kit migrate
npm run db:seed
```

### 6. Iniciar o servidor

```bash
npm run dev
```

---

## Observações

- O projeto utiliza PostgreSQL com a extensão pgvector para operações com vetores.
- O backend está preparado para integração com frontend React (não incluso neste diretório). 