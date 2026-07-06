# Design System — Everson Filipe Portfolio
> Version 1.0 · Stack: HTML · CSS · Vanilla JS · GitHub Pages

---

## 1. Contexto & Posicionamento de Mercado

**Persona:** Engenheiro de Implantação (20 anos), trajetória para AI Engineering.  
**Diferencial de mercado:** Portfólio técnico + identidade visual robusta num setor onde 90% dos devs usam templates genéricos.  
**Arquétipo visual:** *Precision Engineer* — sério, minimalista, data-driven, sem frivolidade.  
**Referências de mercado posicionadas acima da média:**
- Brittany Chiang (bchiang7.github.io) — hierarquia limpa, dark bg, tipografia controlada
- Bruno Simon (brunosimon.io) — uso de tridimensionalidade como metáfora técnica
- Luca Marini (lucamarini.dev) — grid geométrico como linguagem de engenharia

**O que nos diferencia deles:** paleta proprietária (#374f5b), geometria 3D de malha como metáfora de **integração de sistemas**, e Glacial Indifference como fonte de identidade (não genérica).

---

## 2. Tokens de Design

### 2.1 Cor

```css
:root {
  /* Superfícies */
  --color-bg-base:      #374f5b;
  --color-bg-deep:      #1e2d35;
  --color-bg-raised:    #435f6e;
  --color-bg-overlay:   rgba(30, 45, 53, 0.85);

  /* Texto */
  --color-text-primary: #f5f9fb;
  --color-text-muted:   #b6ccd7;
  --color-text-inverse: #1e2d35;

  /* Acentos */
  --color-accent-electric:     #233dff;
  --color-accent-electric-dim: rgba(35, 61, 255, 0.12);
  --color-accent-mist:         #b6ccd7;
  --color-accent-mist-dim:     rgba(182, 204, 215, 0.15);

  /* Semântica */
  --color-success: #4ade80;
  --color-warning: #fbbf24;
  --color-error:   #f87171;
  --color-info:    #60a5fa;
}
```

**Regra de uso:**

| Situação | Token |
|---|---|
| Fundo de página | `--color-bg-base` |
| Seção alternada / hero depth | `--color-bg-deep` |
| Card / surface elevada | `--color-bg-raised` |
| CTA primário, link ativo | `--color-accent-electric` |
| Hover de botão | `--color-accent-electric-dim` |
| Textos secundários, labels | `--color-text-muted` |
| Linhas geométricas de malha | `--color-accent-mist-dim` |

---

### 2.2 Tipografia

**Fonte:** Glacial Indifference · Fallback: `'Inter', system-ui, sans-serif`

```css
:root {
  --font-primary: 'Glacial Indifference', 'Inter', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', 'Fira Code', monospace;

  --font-weight-default:  300;  /* Thin — padrão absoluto */
  --font-weight-emphasis: 700;  /* Bold — apenas ênfase pontual */

  /* Escala — base 8px */
  --text-xs:   0.75rem;   /* 12px — labels, tags */
  --text-sm:   0.875rem;  /* 14px — metadados */
  --text-base: 1rem;      /* 16px — corpo */
  --text-md:   1.25rem;   /* 20px — lead */
  --text-lg:   1.75rem;   /* 28px — subtítulos */
  --text-xl:   2.5rem;    /* 40px — títulos de seção */
  --text-2xl:  3.5rem;    /* 56px — headline hero */
  --text-3xl:  5rem;      /* 80px — display statement */

  --tracking-tight:   -0.02em;
  --tracking-normal:   0em;
  --tracking-wide:     0.08em;  /* labels, tags, caps */
  --tracking-widest:   0.2em;   /* overlines */

  --leading-tight:   1.15;
  --leading-normal:  1.6;
  --leading-relaxed: 1.8;
}
```

**Regras:**
- `font-weight: 300` em tudo por padrão
- `font-weight: 700` apenas em palavras de ênfase, métricas numéricas, nome no hero
- Overlines: `tracking-widest` + `text-transform: uppercase` + `text-xs`
- Jamais usar pesos intermediários (400, 500, 600)

---

### 2.3 Espaçamento

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-6:  24px;
  --space-8:  32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
  --space-32: 128px;
  --space-48: 192px;
}
```

---

### 2.4 Grid & Layout

```css
:root {
  --grid-columns: 12;
  --grid-gutter:  var(--space-6);
  --grid-max-w:   1200px;
  --grid-content: 720px;
}

.container {
  max-width: var(--grid-max-w);
  margin-inline: auto;
  padding-inline: var(--space-6);
}
```

---

### 2.5 Bordas & Raios

```css
:root {
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   16px;
  --radius-full: 9999px;

  --border-thin:   1px solid rgba(182, 204, 215, 0.18);
  --border-accent: 1px solid rgba(35, 61, 255, 0.4);
}
```

---

### 2.6 Elevação & Sombras

```css
:root {
  --shadow-card:  0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2);
  --shadow-float: 0 8px 32px rgba(0,0,0,0.4);
  --glow-accent:  0 0 24px rgba(35, 61, 255, 0.25);
}
```

---

## 3. Linguagem Geométrica Visual

### Filosofia
> A malha 3D e as linhas de conexão representam **integração de sistemas** — a especialidade central do profissional. Não é decoração: é metáfora técnica.

### Linhas de Conexão
- Cor: `rgba(182, 204, 215, 0.12)` a `rgba(35, 61, 255, 0.08)`
- Espessura: `0.5px` a `1px`
- Implementação: `<canvas>` ou SVG animado
- Movimento: translação lenta (parallax suave) ou pulso de opacidade (3–5s)
- **Nunca** mais que 15% da atenção visual da tela

### Malha 3D Flutuante
- Implementação: `three.js` via CDN (compatível com GH Pages)
- Objeto: wireframe de icosahedro ou torus
- Rotação: lenta, contínua, sem interação agressiva
- Opacidade: `0.15` a `0.3`
- Tamanho: máx 40% da viewport na hero

### Regras de Composição
1. `--color-bg-deep` nas seções com geometria 3D
2. Geometria no `z-index: 0`, conteúdo em `z-index: 10`
3. Máx 1 elemento animado por viewport visível
4. `prefers-reduced-motion` desativa tudo — obrigatório

---

## 4. Padrões de Componentes

### Botão Primário
```css
.btn-primary {
  font-family: var(--font-primary);
  font-weight: var(--font-weight-default);
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-text-primary);
  background: transparent;
  border: var(--border-accent);
  border-radius: var(--radius-sm);
  padding: var(--space-3) var(--space-8);
  cursor: pointer;
  transition: background 200ms ease, box-shadow 200ms ease;
}
.btn-primary:hover,
.btn-primary:focus-visible {
  background: var(--color-accent-electric-dim);
  box-shadow: var(--glow-accent);
  outline: none;
}
```

### Card de Projeto
```css
.project-card {
  background: var(--color-bg-raised);
  border: var(--border-thin);
  border-radius: var(--radius-md);
  padding: var(--space-8);
  transition: transform 250ms ease, border-color 250ms ease;
}
.project-card:hover {
  transform: translateY(-4px);
  border-color: rgba(35, 61, 255, 0.35);
}
```

### Tag de Tecnologia
```css
.tech-tag {
  font-size: var(--text-xs);
  font-weight: var(--font-weight-default);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-accent-mist);
  border: 1px solid rgba(182, 204, 215, 0.25);
  border-radius: var(--radius-full);
  padding: var(--space-1) var(--space-3);
}
```

### Overline + Título de Seção
```html
<p class="overline">Projetos</p>
<h2 class="section-title">O que construo</h2>
```
```css
.overline {
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-accent-electric);
  margin-bottom: var(--space-2);
}
.section-title {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-default);
  line-height: var(--leading-tight);
  color: var(--color-text-primary);
}
```

---

## 5. Motion System

```css
:root {
  --duration-fast:   150ms;
  --duration-normal: 250ms;
  --duration-slow:   400ms;
  --ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

| Tipo | Propriedade | Duração |
|---|---|---|
| Hover de cards | `transform`, `border-color` | 250ms |
| Fade de seção (scroll) | `opacity`, `translateY` | 400ms |
| Glow de botão | `box-shadow` | 200ms |
| Rotação de malha 3D | loop contínuo | 12–20s |
| Pulso de linha geométrica | `opacity` | 3–5s |

---

## 6. Estrutura de Arquivos

```
/
├── index.html
├── 404.html
└── assets/
    ├── fonts/
    │   ├── GlacialIndifference-Regular.otf
    │   └── GlacialIndifference-Bold.otf
    ├── css/
    │   ├── tokens.css       ← variáveis CSS deste doc
    │   ├── base.css         ← reset + tipografia base
    │   ├── components.css   ← botões, cards, tags
    │   └── layout.css       ← grid, seções, nav
    └── js/
        ├── mesh.js          ← Three.js wireframe 3D
        ├── lines.js         ← Canvas de linhas geométricas
        ├── ux-validator.js  ← Validador Nielsen (dev only)
        └── main.js          ← Lógica geral, scroll, i18n
```

---

## 7. Heurísticas de Nielsen — Âncoras por Componente

| Heurística | Aplicação neste portfólio |
|---|---|
| **H1 — Visibilidade do status** | Focus visible em todos os elementos; loading states em fetches |
| **H2 — Match com o mundo real** | Labels em linguagem humana; sem jargão técnico em navegação |
| **H3 — Controle do usuário** | Nav por teclado; `prefers-reduced-motion`; skip-to-content |
| **H4 — Consistência** | Tokens CSS aplicados uniformemente; zero hardcoded colors |
| **H5 — Prevenção de erros** | Validação inline no formulário de contato antes do submit |
| **H6 — Reconhecimento > Recall** | Nav sticky sempre visível; ícones com tooltip/label |
| **H7 — Flexibilidade** | Skip link acessível; suporte a navegação por teclado completo |
| **H8 — Minimalismo estético** | Máx 3 cores por seção; sem elementos decorativos sem propósito |
| **H9 — Recuperação de erros** | 404.html customizado; mensagens de erro claras e acionáveis |
| **H10 — Ajuda e documentação** | Tooltips em tech stack; aria-labels em todos os ícones |

---

## 8. Stack Recomendado para GitHub Pages

| Opção | Quando usar | Complexidade |
|---|---|---|
| **HTML/CSS/JS puro** | Início — controle total | Baixa |
| **Astro (SSG)** | 5+ projetos, componentes reutilizáveis | Média |
| **Eleventy (11ty)** | Conteúdo dinâmico via JSON/Markdown | Média |

**Recomendação:** Começar puro. Migrar para Astro quando a escala justificar.

**CDNs compatíveis (sem build step):**
```html
<script src="https://cdn.jsdelivr.net/npm/three@0.160/build/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/ScrollTrigger.min.js"></script>
```
