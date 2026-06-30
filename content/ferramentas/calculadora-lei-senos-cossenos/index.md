---
title: "Calculadora de Lei dos Senos e Cossenos (Resolução de Triângulos)"
description: "Resolva qualquer triângulo informando lados ou ângulos. Descubra as medidas restantes, área, perímetro e o teorema correto com o passo a passo."
date: 2026-05-30
categories: ["matemática", "engenharia"]
layout: "single"
icon: "compass"
slug: "calculadora-lei-senos-cossenos"
---

Esta ferramenta interativa analisa as propriedades geométricas de triângulos quaisquer (acutângulos ou obtusângulos) a partir de três componentes conhecidos. O motor matemático valida a existência do triângulo através da desigualdade triangular e determina de forma dinâmica a aplicação dos teoremas trigonométricos adequados para encontrar os lados e ângulos desconhecidos.

<details>
<summary>Conteúdo Acadêmico: Resolução Avançada de Triângulos Obliquângulos</summary>

## Introdução à Trigonometria de Triângulos Quaisquer

Diferente dos triângulos retângulos, onde as relações de seno, cosseno e tangente dependem diretamente de um ângulo reto (90°), os triângulos obliquângulos exigem métodos generalizados para sua resolução. A determinação de todas as medidas de um triângulo a partir de dados parciais é um problema clássico na engenharia civil, topografia, computação gráfica e navegação autônoma.

Para solucionar esses sistemas geométricos, utilizamos dois teoremas fundamentais: a **Lei dos Senos** e a **Lei dos Cossenos**.

---

## 1. Lei dos Cossenos (Teorema de Pitágoras Generalizado)

A Lei dos Cossenos relaciona os três lados de um triângulo com o cosseno de um de seus ângulos internos. Ela funciona como uma extensão direta do Teorema de Pitágoras, aplicando um fator de correção para triângulos que não possuem ângulos retos.

### As Fórmulas Matemáticas
Para um triângulo com lados a, b, c e ângulos opostos A, B, C respectivamente:

* a² = b² + c² - 2bc · cos(A)
* b² = a² + c² - 2ac · cos(B)
* c² = a² + b² - 2ab · cos(C)

### Quando aplicar a Lei dos Cossenos?
Você deve selecionar este método nos seguintes cenários de entrada:
1. **Caso LLL (Lado, Lado, Lado):** Quando a medida de todos os três lados é conhecida e deseja-se descobrir os ângulos internos.
2. **Caso LAL (Lado, Ângulo, Lado):** Quando conhecemos dois lados e o ângulo exato formado entre eles.

---

## 2. Lei dos Senos

A Lei dos Senos estabelece que, em qualquer triângulo, as razões entre as medidas dos lados e os senos dos seus respectivos ângulos opostos são constantes e proporcionais ao diâmetro da circunferência que circunscreve o polígono.

### A Fórmula Matemática
* a / sin(A) = b / sin(B) = c / sin(C)

### Quando aplicar a Lei dos Senos?
Este teorema é ideal para os seguintes cenários:
1. **Caso ALA (Ângulo, Lado, Ângulo):** Quando dois ângulos conhecidos flanqueiam um lado determinado.
2. **Caso AAL (Ângulo, Ângulo, Lado):** Quando conhecemos dois ângulos e um lado oposto a um deles.

---

## Matriz de Decisão Algorítmica (SEO Target)

A tabela abaixo resume como o motor computacional da nossa ferramenta decide qual abordagem lógica adotar no momento do clique:

| Caso Estrutural | Dados Iniciais do Usuário | Teorema Inicial Aplicado | Objetivo do Primeiro Passo |
| :--- | :--- | :--- | :--- |
| **LLL** | Lado a, Lado b, Lado c | Lei dos Cossenos | Isolar e descobrir o primeiro ângulo (A) |
| **LAL** | Lados b e c + Ângulo A | Lei dos Cossenos | Calcular o comprimento do lado oposto (a) |
| **ALA** | Ângulos A e B + Lado c | Soma dos Ângulos (180°) | Determinar o terceiro ângulo faltante (C) |
| **AAL** | Ângulos A e B + Lado a | Lei dos Senos | Isolar o segundo lado oposto (b) |

---

## Validação Geométrica e a Desigualdade Triangular

Nenhum algoritmo trigonométrico pode executar cálculos sem antes passar pelo filtro da **Desigualdade Triangular**. Teoricamente, para que um triângulo exista, a soma das medidas de quaisquer dois lados deve ser estritamente maior do que a medida do terceiro lado.

* Expressão matemática: (a + b > c) E (a + c > b) E (b + c > a)

Caso essa regra seja violada pelos valores inseridos, a ferramenta emitirá uma exceção matemática, evitando que dados inconsistentes corrompam cálculos estruturais ou de projetos de engenharia.

---

## Cálculo de Atributos Secundários: Área e Perímetro

Após a resolução completa dos lados, o sistema calcula as seguintes propriedades derivadas:

### Perímetro
O perímetro (P) é a magnitude linear total do contorno do triângulo:
* P = a + b + c

### Área via Fórmula de Heron
Quando não dispomos da altura direta do triângulo, o software adota a Equação de Heron, baseada no semiperímetro (s = P / 2):
* Área = √[ s · (s - a) · (s - b) · (s - c) ]

</details>