# Everson Filipe Portfolio / Portfólio de Everson Filipe

This repository contains the source code for the personal portfolio of Everson Filipe. The project showcases his Jr. Analyst career trajectory, certified credentials, and technical experience in Implementation Engineering and Artificial Intelligence.

Este repositório contém o código fonte do portfólio pessoal de Everson Filipe. O projeto apresenta sua trajetória profissional de analista júnior, credenciais certificadas e experiência técnica em Engenharia de Implantação e Inteligência Artificial.

---

## Tech Stack / Tecnologias Utilizadas

* **HTML5**: Structured markup. / Marcação estruturada.
* **CSS3**: Custom design system and components. / Sistema de design e componentes personalizados.
* **JavaScript**: Dynamic rendering and internationalization module. / Módulo de renderização dinâmica e internacionalização.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## Features / Recursos Principais

### English

* **Language Switcher**: Fast translation across English, Portuguese, and Español.
* **Category Filtering**: Interactive filters to sort academic courses by topics.
* **Evidence Carousel**: Visual presentation of work artifacts with description overlays.

### Português

* **Seletor de Idiomas**: Tradução rápida entre Inglês, Português e Espanhol.
* **Filtro de Categorias**: Filtros interativos para ordenar cursos acadêmicos por tópicos.
* **Carrossel de Evidências**: Apresentação visual de artefatos de trabalho com descrições integradas.

---

## Architecture / Arquitetura

### English

The project is built as a lightweight static web application. It follows a decoupled data approach:

* **Centralized Curriculum Data**: All professional and academic details are stored as a structured data object inside the data file. This allows updates to be made in a single place without modifying the layout.
* **Internationalization**: Translations for English, Portuguese, and Español are handled dynamically by translating key UI identifiers.
* **Dynamic Rendering**: A rendering module listens to language change events and rebuilds the page sections on the fly.

### Português

O projeto foi construído como uma aplicação web estática leve. Ele segue uma abordagem de dados desacoplados:

* **Dados Curriculares Centralizados**: Todos os detalhes profissionais e acadêmicos estão armazenados como um objeto de dados estruturado dentro do arquivo de dados. Isso permite que atualizações sejam feitas em um único local sem alterar o layout do site.
* **Internacionalização**: As traduções para Inglês, Português e Espanhol são tratadas dinamicamente através da tradução de identificadores de interface.
* **Renderização Dinâmica**: Um módulo de renderização escuta eventos de alteração de idioma e reconstrói as seções da página instantaneamente.

---

## Project Structure / Estrutura do Projeto

```
.
├── assets/
│   ├── css/
│   │   ├── components.css     # UI component styles / Estilos de componentes
│   │   ├── layout.css         # Page grid and layout / Grid e layout da página
│   │   ├── tokens.css         # Color and typography tokens / Tokens de cores e tipografia
│   │   └── reset.css          # Style normalization / Normalização de estilos
│   ├── images/                # Evidence and logo images / Imagens e logos
│   └── js/
│       ├── a11y.js            # Accessibility features / Recursos de acessibilidade
│       ├── carousel.js        # Evidence viewer logic / Lógica do visualizador de evidências
│       ├── cv_data.js         # Centralized curriculum data / Dados centralizados do currículo
│       ├── filters.js         # Course filter controls / Controle de filtros de cursos
│       ├── i18n.js            # Translation dictionaries / Dicionários de tradução
│       ├── lines.js           # Visual connection lines / Linhas de conexão visual
│       ├── main.js            # Application entry point / Ponto de entrada da aplicação
│       └── renderer.js        # Dynamic DOM generation / Geração dinâmica do DOM
├── index.html                 # Application shell / Estrutura principal
└── README.md                  # Documentation / Documentação
```