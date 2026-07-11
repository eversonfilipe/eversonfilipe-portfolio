# Everson Filipe Portfolio / Portfólio de Everson Filipe

This is the repository for the personal portfolio of Everson Filipe, optimized for performance, accessibility, search engines (SEO), and AI discovery agents (LLMO). The application has been redesigned from the ground up to follow a data-driven architecture. The visual layout and structural configuration are decoupled from the content, allowing you to reuse, customize, and deploy this portfolio in minutes.

Este é o repositório do portfólio pessoal de Everson Filipe, otimizado para performance, acessibilidade, motores de busca (SEO) e descoberta por inteligência artificial (LLMO). A aplicação foi remodelada para seguir uma arquitetura orientada a dados. O layout visual e as configurações estruturais estão desacoplados do conteúdo, permitindo que você reutilize, personalize e publique este portfólio em minutos.

***

## Local Development / Desenvolvimento Local

### English
To run the portfolio on your local machine, you only need a basic web server.
1. Make sure you have Node.js installed on your system.
2. Open your terminal in the root directory of this repository.
3. Run the command: `npx -y serve . -p 3000`
4. Access `http://localhost:3000` in your web browser.

### Português
Para executar o portfólio em sua máquina local, você só precisa de um servidor web básico.
1. Certifique-se de ter o Node.js instalado em seu sistema.
2. Abra o seu terminal no diretório raiz deste repositório.
3. Execute o comando: `npx -y serve . -p 3000`
4. Acesse `http://localhost:3000` em seu navegador.

***

## Architecture Overview / Visão Geral da Arquitetura

### English
The project is built as a highly optimized, static client-side web application. It is engineered around four core architecture pillars:
* **Separation of Concerns**: Layout structures (HTML/CSS) are fully decoupled from curriculum content. All professional records are maintained in a centralized database file.
* **GitOps and Validation Pipeline (pre-commit & pre-push)**: A secure validation pipeline governs code quality. Upon commit, `build_static.py` compiles the raw Javascript curriculum database (`cv_data.js`) into a clean `<noscript>` block inside `index.html`, generates the Jeremy Howard Spec-compliant `/llms.txt` index file, and writes individual Markdown files (`resume-en.md`, `resume-pt.md`, `resume-es.md`). Before pushing, the `pre-push` hook validates syntax (via Node lint checks) and executes an integrity audit, blocking the upload if any compiled static asset is out of sync with `cv_data.js` or contains uncommitted local modifications (including `README.md` and `cv_data.js`).
* **Client-Side Reactive Translation (i18n)**: Static UI strings are centralized in dictionaries (`i18n.js`). When a user changes language, a dynamic hydrator translates all DOM elements tagged with `data-i18n` or `data-i18n-aria`. Simultaneously, SEO-relevant head attributes (titles, meta descriptions, and OpenGraph tags) are re-written programmatically to match the active language schema.
* **Entity Connections & Target Propagation (linkedTo)**: An intelligent resolver function (`resolveLinkedItem` in `renderer.js`) scans through project associations. If a project lists a course, experience, or volunteering ID inside its `linkedTo` array, the interface dynamically propagates that entity's logo as an inline icon inside the project's link tags, visually linking skills to accomplishments.
* **Adaptive Design System & Components**: Powered by semantic CSS tokens (`tokens.css`) implementing premium glassmorphism interfaces and Glacial Indifference typography. Spacing, timelines, and grids adapt responsively. Lists (Experiences, Hackathons, Events) automatically render a "Show More/Minimize" toggle. Large grids (Courses and Volunteering) convert dynamically into interactive horizontal sliders on desktop, falling back to swipeable touch tracks on mobile devices.

### Português
O projeto foi construído como uma aplicação web estática de alto desempenho no lado do cliente. A arquitetura foi estruturada com base em quatro pilares principais:
* **Separação de Responsabilidades**: As estruturas de layout (HTML/CSS) estão completamente desacopladas do conteúdo curricular. Todo o histórico profissional é mantido em um banco de dados centralizado.
* **Pipeline de Validação GitOps (pre-commit & pre-push)**: Um fluxo automatizado garante a qualidade do código. Ao commitar, o script `build_static.py` compila o banco de dados curricular (`cv_data.js`) em um bloco `<noscript>` no `index.html`, gera o arquivo `/llms.txt` conforme a especificação do FastHTML e escreve resumos individuais em markdown (`resume-en.md`, `resume-pt.md`, `resume-es.md`). Antes de efetuar o push, o hook `pre-push` valida a sintaxe JS e executa uma auditoria de integridade, abortando o envio se algum arquivo compilado estiver desalinhado em relação ao `cv_data.js` ou contiver modificações locais pendentes de commit (incluindo `README.md` e `cv_data.js`).
* **Tradução Reativa no Client-Side (i18n)**: Rótulos estáticos de interface ficam armazenados em dicionários (`i18n.js`). O selecionador de idiomas hidrata de forma reativa os elementos do DOM marcados com `data-i18n` ou `data-i18n-aria`, reescrevendo em tempo de execução os cabeçalhos de metadados cruciais para motores de busca (títulos, meta descrições e atributos OpenGraph).
* **Mapeamento de Conexões & Propagação de Vínculos (linkedTo)**: Uma função inteligente no renderizador (`resolveLinkedItem`) percorre as associações dos projetos. Se um projeto referencia o ID de um curso, experiência ou voluntariado na chave `linkedTo`, a interface propaga e renderiza automaticamente o logotipo da instituição correspondente como um pequeno ícone inline à esquerda da tag do link.
* **Design System & Componentes Adaptativos**: Estruturado por meio de CSS Vanilla semântico (`tokens.css`) aplicando interfaces premium de glassmorphism e tipografia Glacial Indifference. Linhas de tempo e grades são responsivas. Listas (Experiências, Hackathons, Eventos) contam com botões reativos de expansão e minimização. Grades extensas (Cursos e Voluntariados) convertem-se automaticamente em sliders horizontais iterativos no desktop, adotando rolagem por toque em dispositivos móveis.

***

## Directory Structure / Estrutura de Diretórios

```
.
├── assets/
│   ├── css/
│   │   ├── base.css           # Global defaults and typography reset / Padrões globais e tipografia
│   │   ├── components.css     # UI components, buttons, and slider tracks / Componentes de interface e carrosséis
│   │   ├── layout.css         # Grid layouts, spacing, and responsive timelines / Layout de grids e linhas do tempo
│   │   ├── reset.css          # Normalize margins and border box / Normalização de margens
│   │   └── tokens.css         # Color palettes, transition speeds, and fonts / Paletas de cores e fontes
│   ├── images/                # Images, credentials, and company logos / Imagens de evidências e logotipos
│   └── js/
│       ├── a11y.js            # Accessibility features, font size, and motion / Recursos de acessibilidade
│       ├── carousel.js        # Lightbox evidence viewer logic / Visualizador de fotos do carrossel
│       ├── cv_data.js         # Centralized database (EN, PT, ES) / Banco de dados centralizado do currículo
│       ├── filters.js         # Event listener binds for buttons / Conexão de cliques nos botões de filtros
│       ├── i18n.js            # Dictionaries for static UI labels / Dicionário para rótulos estáticos de interface
│       ├── lines.js           # Animated grid background logic / Fundo animado de linhas de conexões
│       ├── main.js            # Mobile navigation toggles and scroll handlers / Controle do menu móvel e scroll
│       └── renderer.js        # Dynamic DOM generation and list limiter / Renderizador do DOM e limitador de listas
├── index.html                 # Main application structure / Estrutura principal do HTML
├── robots.txt                 # Crawler instructions for search engines and AI / Instruções para rastreadores e IA
├── sitemap.xml                # Site layout index for indexers / Índice de páginas do site
├── llms.txt                   # Clean text version of the CV for AI Agents / Versão em texto limpo para IAs
└── README.md                  # Project documentation / Documentação do projeto
```

***

## Where to Edit, How, and Why / Onde Editar, Como e Por Quê

### 1. Centralized Database (assets/js/cv_data.js)

#### English
* **What**: Contains all resume details (hero introduction, professional experiences, academic degrees, certifications, courses, volunteering, hackathons, and events) translated into English (`en`), Portuguese (`pt`), and Spanish (`es`).
* **How**: Open the file and locate the dictionary for the language you wish to update. Edit the JSON strings inside the respective arrays.
* **Why**: To change the actual content of your resume (add a new job, add a course link, or change the hero description) without having to touch index.html or writing JavaScript logic.
* **List Limits and Automatic Controls**:
  * **Experience (Limit 4)**: The timeline displays the 4 most recent jobs. If there are more than 4, an "Expand" button is rendered. Clicking it reveals the rest and appends a "Minimize" button at the bottom.
  * **Hackathons (Limit 12) & Events (Limit 12)**: Behave the same way as experiences, showing up to 12 items.
  * **Interactive Filters**: If a technology filter is active (such as "Python"), the limits are bypassed to show all matches.
  * **Sliders (Courses & Volunteering)**: If Courses exceed 3 items, or Volunteering exceeds 6 items, they automatically convert into a horizontal slider on desktop with previous and next arrow buttons. On mobile, they fallback to a touch-scroll list. If the count is under the limits, they render as a static, fully visible grid.
  * **Sorting**: Experience, Courses, Volunteering, and Hackathons are sorted automatically in descending order using the end date, ensuring active items appear first.
  * **Specific Achievements**: You can register localized key achievements under the `"specificAchievements"` array of any experience item to render a styled summary box.
  * **Credential Links**: If you fill the `"credentialUrl"` field for a course, a "Show Credential" button is dynamically generated.

#### Português
* **O quê**: Contém todos os detalhes do currículo (introdução hero, experiências profissionais, formação, cursos, voluntariados, hackathons e eventos) nos idiomas Inglês (`en`), Português (`pt`) e Espanhol (`es`).
* **Como**: Abra o arquivo e encontre o dicionário do idioma que deseja atualizar. Edite as informações dentro das respectivas listas.
* **Por quê**: Para alterar o conteúdo do seu currículo (adicionar um emprego, incluir o link de um certificado ou alterar o resumo) sem precisar mexer no arquivo index.html ou programar funções adicionais.
* **Limites de Listas e Controles Automáticos**:
  * **Experiência (Limite 4)**: A linha do tempo mostra por padrão os 4 empregos mais recentes. Se houver mais de 4, um botão "Expandir" é gerado. Clicar nele revela o restante e anexa o botão "Minimizar" ao final.
  * **Hackathons (Limite 12) & Eventos (Limite 12)**: Comportam-se da mesma forma que as experiências, limitando a visualização em 12 itens por padrão.
  * **Filtros Interativos**: Se um filtro de tecnologia estiver ativo (como "Python"), os limites são desativados para exibir todas as correspondências.
  * **Carrosséis (Cursos & Voluntariado)**: Se Cursos excederem 3 itens, ou Voluntariados excederem 6 itens, eles são convertidos automaticamente em um slider de rolagem horizontal no desktop com setas de navegação. No celular, eles passam a aceitar rolagem por toque. Se o total estiver sob o limite, eles são renderizados em formato de grade estática totalmente visível.
  * **Ordenação**: Experiências, Cursos, Voluntariados e Hackathons são ordenados de forma descendente por data de conclusão, mantendo itens ativos no topo.
  * **Conquistas Específicas**: Você pode registrar conquistas importantes sob o array `"specificAchievements"` em qualquer experiência profissional para gerar uma caixa de destaque visual.
  * **Links de Credenciais**: Preencher a propriedade `"credentialUrl"` em um curso gera automaticamente o botão "Exibir credencial".

***

### 2. UI Labels and Static Translations (assets/js/i18n.js)

#### English
* **What**: Contains static interface words (navigation titles, section headings, filter categories, meta tags, and accessibility hints) translated into EN, PT, and ES.
* **How**: Add or edit key-value pairs in the dictionary of the desired language.
* **Why**: To add new sections or rename buttons and filters, ensuring translations remain decoupled from layout files.
* **Meta Tags Optimization**: This file now hosts localized titles, descriptions, and keywords for search indexers under `'meta.title'`, `'meta.description'`, and `'meta.keywords'`.

#### Português
* **O quê**: Contém os rótulos estáticos de interface (títulos do menu de navegação, cabeçalhos de seção, nomes das categorias de filtros, meta tags e textos de acessibilidade) traduzidos para EN, PT e ES.
* **Como**: Adicione ou edite os pares de chave e valor no dicionário do idioma desejado.
* **Por quê**: Para adicionar novas seções ou renomear botões e filtros, garantindo que as traduções da interface fiquem separadas dos arquivos de visualização.
* **Otimização de Meta Tags**: Este arquivo agora armazena títulos, descrições e palavras-chave de indexação em cada idioma sob as chaves `'meta.title'`, `'meta.description'` e `'meta.keywords'`.

***

### 3. Design Tokens and Theme Customization (assets/css/tokens.css)

#### English
* **What**: Contains the core design system variables (color values, typography, animations, borders, and margins).
* **How**: Edit the CSS custom properties inside the `:root` pseudo-class.
  * Use `--color-bg-base: #374f5b` for the main background color.
  * Use `--font-primary: 'Glacial Indifference', sans-serif` to configure the main font.
  * Use `--color-accent-electric-text: #233dff` and `--color-accent-mist: #b6ccd7` for key visual accents and geometric border colors.
* **Why**: To change the branding theme (colors, fonts, sizes, or rounded corners) globally. The layout styles will update automatically to reflect these design tokens.

#### Português
* **O quê**: Contém as variáveis do sistema de design (valores de cores, tipografia, velocidades de animação, bordas e margens).
* **Como**: Edite as propriedades personalizadas do CSS dentro da pseudoclasse `:root`.
  * Use `--color-bg-base: #374f5b` para definir a cor principal de fundo.
  * Use `--font-primary: 'Glacial Indifference', sans-serif` para configurar a fonte principal.
  * Use `--color-accent-electric-text: #233dff` e `--color-accent-mist: #b6ccd7` para definir as cores de destaque e de bordas geométricas.
* **Por quê**: Para alterar o tema visual (cores, fontes, tamanhos ou arredondamento de cantos) de forma global. Os arquivos de layout do site lerão as variáveis atualizadas instantaneamente.

***

### 4. Search and AI Agent Crawlers (index.html, robots.txt, sitemap.xml, llms.txt)

#### English
* **What**: Direct entry points for search engines (Google, Bing) and AI crawlers (Perplexity, ChatGPT, Claude, Gemini).
* **How**:
  * Edit the `<script type="application/ld+json">` inside [index.html](file:///C:/Users/evers/Downloads/eversonfilipe-portfolio/index.html) to customize the structured JSON-LD Person schema.
  * Update the fallback text block inside `<noscript>` in `index.html` to provide clean text alternatives.
  * Edit [llms.txt](file:///C:/Users/evers/Downloads/eversonfilipe-portfolio/llms.txt) to rewrite the clean markdown professional summary read by AI assistants.
  * Update [sitemap.xml](file:///C:/Users/evers/Downloads/eversonfilipe-portfolio/sitemap.xml) and [robots.txt](file:///C:/Users/evers/Downloads/eversonfilipe-portfolio/robots.txt) when deploying to a different custom domain.
* **Why**: To optimize search discoverability (SEO) and ensure that LLM models and RAG applications index your profile correctly.

#### Português
* **O quê**: Pontos de entrada para motores de busca (Google, Bing) e indexadores de inteligência artificial (Perplexity, ChatGPT, Claude, Gemini).
* **Como**:
  * Edite a tag `<script type="application/ld+json">` em [index.html](file:///C:/Users/evers/Downloads/eversonfilipe-portfolio/index.html) para personalizar os dados estruturados do seu perfil.
  * Atualize o bloco de texto alternativo dentro de `<noscript>` em `index.html` para rastreamento sem JavaScript.
  * Edite o arquivo [llms.txt](file:///C:/Users/evers/Downloads/eversonfilipe-portfolio/llms.txt) para reescrever o resumo profissional lido por assistentes de IA.
  * Atualize [sitemap.xml](file:///C:/Users/evers/Downloads/eversonfilipe-portfolio/sitemap.xml) e [robots.txt](file:///C:/Users/evers/Downloads/eversonfilipe-portfolio/robots.txt) se for publicar sob um domínio próprio diferente.
* **Por quê**: Para impulsionar o ranqueamento orgânico do site (SEO) e garantir que modelos de linguagem e assistentes inteligentes mapeiem e citem você de forma correta.

***

## Deployment to GitHub Pages / Publicação no GitHub Pages

### English
Since this is a client-side static application, you can publish it directly to GitHub Pages for free:
1. Create a repository on GitHub.
2. Push this codebase to your repository.
3. Go to the repository **Settings** tab.
4. Locate the **Pages** menu on the left.
5. Select `Deploy from a branch` as your source, set the branch to `main` (or root folder `/root`), and click **Save**.
6. GitHub will generate a live URL for your portfolio (such as `https://username.github.io/repository-name/`).

### Português
Como este projeto é composto apenas por arquivos estáticos de front-end, você pode hospedá-lo de forma gratuita no GitHub Pages:
1. Crie um repositório no seu perfil do GitHub.
2. Envie os arquivos do seu projeto para esse repositório.
3. Vá até a aba **Settings** (Configurações) do repositório no GitHub.
4. Encontre o menu **Pages** na lateral esquerda.
5. Escolha a opção `Deploy from a branch`, selecione o branch `main` (e pasta raiz `/root`), e clique em **Save**.
6. O GitHub irá gerar o link público para o seu portfólio (como `https://usuario.github.io/nome-do-repositorio/`).
