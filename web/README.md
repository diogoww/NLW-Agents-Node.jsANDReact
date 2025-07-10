# NLW Agents - Web

Aplicação web desenvolvida em React para o evento NLW Agents.

## Tecnologias e Bibliotecas Principais

- **React 19** – Biblioteca principal para construção da interface.
- **Vite** – Bundler e servidor de desenvolvimento rápido.
- **TypeScript** – Tipagem estática para JavaScript.
- **React Router DOM** – Roteamento SPA.
- **@tanstack/react-query** – Gerenciamento de dados assíncronos.
- **Tailwind CSS** – Utilitário para estilização.
- **Lucide React** – Ícones SVG.
- **Radix UI** – Componentes acessíveis.
- **Class Variance Authority, clsx, tailwind-merge, tailwind-variants** – Utilitários para composição de classes CSS.

## Estrutura e Padrões de Projeto

- **Componentização**: Componentes reutilizáveis organizados em `src/components` e subpastas como `ui`.
- **Páginas**: Separação de rotas/páginas em `src/pages`.
- **Utilitários**: Funções auxiliares em `src/lib`.
- **Alias**: Importações usando `@` como atalho para `src/` (configurado no Vite e TypeScript).

## Setup e Execução

1. **Instale as dependências:**
   ```bash
   npm install
   ```
2. **Rode o projeto em modo desenvolvimento:**
   ```bash
   npm run dev
   ```
3. **Build de produção:**
   ```bash
   npm run build
   ```
4. **Preview do build:**
   ```bash
   npm run preview
   ```

## Configuração

- O projeto utiliza Vite, Tailwind CSS e TypeScript já configurados.
- Alias `@` para facilitar imports.
- Scripts disponíveis no `package.json`. 