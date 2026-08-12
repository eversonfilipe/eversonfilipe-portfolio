/**
 * blog_data.js — Fonte de dados editorial do Blog de Everson Filipe.
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │  COMO ADICIONAR UM NOVO POST                                │
 * │  1. Copie o objeto de post existente como template          │
 * │  2. Crie um id único em formato: "post-slug-descritivo"     │
 * │  3. publishedAt: "YYYY-MM-DD" (ISO 8601)                   │
 * │  4. Preencha en, pt e es com title, summary e content       │
 * │  5. content: usa Markdown rico (ver guia abaixo)            │
 * │  6. SEO: preencha seo.description (≤ 160 chars) e keywords │
 * │  7. Salve — o portfólio atualiza automaticamente            │
 * └─────────────────────────────────────────────────────────────┘
 *
 * MARKDOWN SUPORTADO:
 *  # H1  ## H2  ### H3
 *  **negrito**  *itálico*  `código inline`
 *  | tabela | colunas |
 *  > blockquote
 *  - item de lista
 *  ---  (divider)
 *  ```código em bloco```  (via marked.js)
 *
 * CAMPOS DO POST:
 *  id           — slug único (kebab-case, sem espaços)
 *  publishedAt  — data ISO "YYYY-MM-DD" (usado para ordenar e exibir)
 *  coverImage   — caminho da imagem de capa (opcional; null = placeholder)
 *  featured     — true = destaque no topo do carrossel
 *  tags         — array de strings para SEO e filtragem futura
 *  seo          — campos de otimização para motores de busca e LLMs
 *    .description — meta description (ideal: 120–160 caracteres)
 *    .keywords    — palavras-chave separadas por vírgula
 *  en / pt / es — versões localizadas do post
 *    .title       — título do artigo
 *    .summary     — resumo curto (exibido no card)
 *    .content     — corpo completo em Markdown
 *
 * SEGURANÇA E PERFORMANCE:
 *  - Conteúdo é sanitizado pelo marked.js antes de ser inserido no DOM
 *  - O arquivo é carregado antes de renderer.js (ver index.html)
 *  - Não há dependências externas além de marked.js para parse de MD
 *  - window.BLOG_DATA é imutável após carregamento (Object.freeze aplicado)
 *
 * SEO / LLMO:
 *  - O conteúdo renderizado usa semântica HTML5 (<article>, <h1-h3>)
 *  - JSON-LD será gerado dinamicamente pelo renderer para cada post aberto
 *  - Os campos seo.description e tags são usados como meta tags dinâmicas
 */

(function BlogDatabase() {
  'use strict';

  const posts = [
    {
      id: "post-implementation-engineering-vs-software-engineering",
      publishedAt: "2026-07-20",
      coverImage: null,
      featured: true,
      tags: ["implementation-engineering", "software-engineering", "career", "b2b-saas", "python", "django"],
      seo: {
        description: "A practical comparison between Implementation Engineering and Software Engineering — scopes, workflows, and where they overlap in B2B SaaS environments.",
        keywords: "implementation engineering, software engineering, b2b saas, python, django, jsonlogic, kartado, career comparison"
      },
      en: {
        title: "Implementation Engineering vs. Software Engineering: What's the Difference?",
        summary: "Both roles build with technology — but with very different scopes, clients, and workflows. A practical breakdown from someone doing both.",
        content: `## Implementation Engineering vs. Software Engineering

*A practical perspective from the field.*

---

When people hear "Implementation Engineer," they often assume it's just a softer title for a junior developer. It's not. And understanding the difference matters — both for hiring managers and for engineers figuring out where their strengths fit.

### What Software Engineers Build

Software Engineers design, build, and maintain software systems from scratch (or near-scratch). They write core logic, architect APIs, and ship features to production.

Their primary artifact is **source code**.

### What Implementation Engineers Configure

Implementation Engineers deploy and configure existing software systems into new client environments. They work at the intersection of product, data, and client requirements.

Their primary artifact is **a working, validated client environment**.

---

## The Real Overlap

The best implementation engineers write code — they have to. At Kartado, my day-to-day involves:

- Writing **Python ETL scripts** integrated with Django ORM
- Configuring **JSONLogic rules** for dynamic form behavior across 42+ client environments
- Validating **GIS spatial data** and correcting Shapefiles
- Using **AWS Step Functions**, S3, Athena for analytics pipeline work

This isn't "clicking buttons in a GUI." It requires understanding data models, writing logic, and debugging production-like environments.

---

## Where They Diverge

| Dimension | Software Engineering | Implementation Engineering |
|---|---|---|
| **Primary output** | New software features | Configured client environments |
| **Client proximity** | Indirect (product team) | Direct (B2B clients) |
| **Codebase ownership** | Core product | Automation & config scripts |
| **Testing scope** | Unit, integration, E2E | Data integrity, regression, UAT |
| **Velocity metric** | Features shipped | Clients onboarded / SLA met |

---

## Why I Work This Way

I chose Implementation Engineering because I wanted production impact from day one. Not a year of code reviews before touching anything real.

The tradeoff: you own less of the product architecture. But you own 100% of client success for every environment you configure.

Both paths are valid. Knowing which one fits your working style is the first step.

---

*This is the first post on this blog. More coming on Python automation, JSONLogic patterns, and working within Agile frameworks at B2B SaaS companies.*`
      },
      pt: {
        title: "Implementation Engineering vs. Engenharia de Software: Qual é a Diferença?",
        summary: "Ambos os papéis constroem com tecnologia — mas com escopos, clientes e fluxos de trabalho muito diferentes. Uma análise prática de quem faz os dois.",
        content: `## Implementation Engineering vs. Engenharia de Software

*Uma perspectiva prática do campo.*

---

Quando as pessoas ouvem "Implementation Engineer", geralmente assumem que é apenas um título mais suave para um desenvolvedor júnior. Não é. E entender a diferença importa — tanto para gestores de contratação quanto para engenheiros descobrindo onde seus pontos fortes se encaixam.

### O que Engenheiros de Software Constroem

Engenheiros de Software projetam, constroem e mantêm sistemas de software do zero (ou quase). Eles escrevem lógica central, arquitetam APIs e entregam funcionalidades para produção.

Seu artefato primário é **código-fonte**.

### O que Implementation Engineers Configuram

Implementation Engineers implantam e configuram sistemas de software existentes em novos ambientes de clientes. Eles trabalham na interseção entre produto, dados e requisitos de clientes.

Seu artefato primário é **um ambiente de cliente funcional e validado**.

---

## A Real Sobreposição

Os melhores implementation engineers escrevem código — eles precisam. Na Kartado, meu dia a dia envolve:

- Escrita de **scripts ETL em Python** integrados com Django ORM
- Configuração de **regras JSONLogic** para comportamento dinâmico de formulários em 42+ ambientes
- Validação de **dados espaciais GIS** e correção de Shapefiles
- Uso de **AWS Step Functions**, S3, Athena para trabalho em pipelines de analytics

Isso não é "clicar em botões numa interface". Requer entender modelos de dados, escrever lógica e depurar ambientes de produção.

---

## Onde Eles Divergem

| Dimensão | Engenharia de Software | Implementation Engineering |
|---|---|---|
| **Saída primária** | Novas funcionalidades | Ambientes de cliente configurados |
| **Proximidade com cliente** | Indireta (equipe de produto) | Direta (clientes B2B) |
| **Propriedade de codebase** | Produto central | Scripts de automação e config |
| **Escopo de testes** | Unitários, integração, E2E | Integridade de dados, regressão, UAT |
| **Métrica de velocidade** | Features entregues | Clientes onboarded / SLA cumprido |

---

## Por que Trabalho Assim

Escolhi Implementation Engineering porque queria impacto em produção desde o primeiro dia. Não um ano de code reviews antes de tocar em algo real.

A troca: você possui menos da arquitetura do produto. Mas você é 100% responsável pelo sucesso do cliente em cada ambiente que configura.

Ambos os caminhos são válidos. Saber qual se encaixa no seu estilo de trabalho é o primeiro passo.

---

*Este é o primeiro post deste blog. Mais sobre automação em Python, padrões JSONLogic e trabalho dentro de frameworks Ágeis em empresas SaaS B2B em breve.*`
      },
      es: {
        title: "Implementation Engineering vs. Ingeniería de Software: ¿Cuál es la Diferencia?",
        summary: "Ambos roles construyen con tecnología — pero con alcances, clientes y flujos de trabajo muy diferentes. Un análisis práctico de alguien que hace los dos.",
        content: `## Implementation Engineering vs. Ingeniería de Software

*Una perspectiva práctica desde el campo.*

---

Cuando las personas escuchan "Implementation Engineer", generalmente asumen que es solo un título más suave para un desarrollador junior. No lo es. Y entender la diferencia importa — tanto para gerentes de contratación como para ingenieros que buscan dónde encajan sus fortalezas.

### Lo que los Ingenieros de Software Construyen

Los Ingenieros de Software diseñan, construyen y mantienen sistemas de software desde cero (o casi). Escriben lógica central, arquitectan APIs y lanzan funcionalidades a producción.

Su artefacto primario es **código fuente**.

### Lo que los Implementation Engineers Configuran

Los Implementation Engineers despliegan y configuran sistemas de software existentes en nuevos entornos de clientes. Trabajan en la intersección entre producto, datos y requisitos de clientes.

Su artefacto primario es **un entorno de cliente funcional y validado**.

---

## La Superposición Real

Los mejores implementation engineers escriben código — tienen que hacerlo. En Kartado, mi día a día incluye:

- Escribir **scripts ETL en Python** integrados con Django ORM
- Configurar **reglas JSONLogic** para comportamiento dinámico de formularios en 42+ entornos
- Validar **datos espaciales GIS** y corregir Shapefiles
- Usar **AWS Step Functions**, S3, Athena para trabajo en pipelines de analytics

Esto no es "hacer clic en botones en una interfaz". Requiere entender modelos de datos, escribir lógica y depurar entornos de producción.

---

## Dónde Divergen

| Dimensión | Ingeniería de Software | Implementation Engineering |
|---|---|---|
| **Salida primaria** | Nuevas funcionalidades | Entornos de cliente configurados |
| **Proximidad con cliente** | Indirecta (equipo de producto) | Directa (clientes B2B) |
| **Propiedad de codebase** | Producto central | Scripts de automatización y config |
| **Alcance de pruebas** | Unitarias, integración, E2E | Integridad de datos, regresión, UAT |
| **Métrica de velocidad** | Features entregadas | Clientes onboarded / SLA cumplido |

---

## Por qué Trabajo de Esta Manera

Elegí Implementation Engineering porque quería impacto en producción desde el primer día. No un año de code reviews antes de tocar algo real.

La compensación: posees menos de la arquitectura del producto. Pero eres 100% responsable del éxito del cliente en cada entorno que configuras.

Ambos caminos son válidos. Saber cuál se adapta a tu estilo de trabajo es el primer paso.

---

*Este es el primer post de este blog. Más sobre automatización en Python, patrones JSONLogic y trabajo dentro de frameworks Ágiles en empresas SaaS B2B próximamente.*`
      }
    }
    // ──────────────────────────────────────────────────────────────
    // ADICIONE NOVOS POSTS ABAIXO, SEGUINDO O TEMPLATE ACIMA.
    // Dica: copie o objeto inteiro, altere o id e publishedAt,
    // e preencha en/pt/es com o conteúdo real.
    // ──────────────────────────────────────────────────────────────
  ];

  // Expor como imutável para evitar mutações acidentais em runtime
  window.BLOG_DATA = Object.freeze(posts.map(p => Object.freeze(p)));

})();
