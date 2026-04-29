# 📐 Projeto Scalar | Engenharia & Precisão

### 📋 Descrição do Projeto
O **Scalar** é uma plataforma estática de ferramentas utilitárias voltada para engenharia, computação e matemática de alta precisão. Diferente de conversores genéricos repletos de anúncios e layouts confusos, o Scalar foca em **performance extrema, design industrial minimalista e experiência de uso imediata**.

O site foi construído utilizando o gerador de sites estáticos (SSG) **Hugo**, aproveitando o processamento em tempo de build para entregar páginas que carregam instantaneamente e funcionam sem dependências externas pesadas.

---

### 🎯 Objetivos
1.  **Exatidão Matemática:** Fornecer resultados confiáveis para cálculos técnicos (Bases, Bytes, Frações).
2.  **Performance "Zero-Bloat":** Utilizar CSS e JS nativos (Vanilla), evitando frameworks pesados para garantir um LCP (Largest Contentful Paint) abaixo de 1 segundo.
3.  **Interface Orientada à Foco:** Design escuro (Slate/Zinc) com tipografia monoespaçada, simulando interfaces de terminais e instrumentos de medição.
4.  **SEO e Acessibilidade:** Estrutura semântica leve que facilita a indexação por motores de busca para termos técnicos específicos.

---

### 🛠️ O que foi desenvolvido até aqui

#### 1. Arquitetura de Software
* **SSG:** Implementação completa em Hugo (v0.161.0).
* **Deploy Automatizado:** Pipeline configurado via Cloudflare Pages com integração contínua (CI/CD) ao GitHub.
* **Estrutura de Conteúdo:** Uso de *Leaf Bundles* para encapsulamento de lógica, onde cada ferramenta possui seu próprio `index.md` e `solver.js`.

#### 2. Interface e Design (UI/UX)
* **Layout Adaptativo:** Sistema de grid dinâmico na Home para listagem de ferramentas através de cards interativos.
* **Feedback Visual:** Implementação de efeitos de elevação (Hover) e brilho de bordas para indicar interatividade nos cards de ferramentas.
* **Tipografia Técnica:** Integração de fontes monoespaçadas para leitura precisa de dados numéricos.
* **Componentização:** Criação de *partials* reutilizáveis para Headers, Footers, Ícones e lógica de Adsense.

#### 3. Ferramentas Implementadas (Core)
* **Conversor de Bases Numéricas:** Interface sincronizada para conversão simultânea entre Decimal, Binário, Hexadecimal e Octal.
* **Conversor de Bytes/Memória:** Lógica para tradução de unidades de armazenamento (em progresso).
* **Fração Geratriz:** Algoritmo para conversão de dízimas periódicas em frações irredutíveis (em progresso).

#### 4. Otimizações de Engenharia
* **Single-File Logic:** Cada ferramenta carrega apenas o JS necessário para sua execução via `Resources.GetMatch`.
* **Clean URLs:** Configuração de permalinks via `:contentbasename` para URLs amigáveis e lógicas (ex: `scalar.com/ferramentas/conversor-bases/`).
* **Zero External Requests:** Estilização focada em CSS interno/inline para evitar requisições HTTP adicionais e garantir funcionamento offline-first.