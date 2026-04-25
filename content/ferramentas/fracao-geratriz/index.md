---
# Metadados Básicos
title: "Conversor de Fração Geratriz: Decimal para Fração"
date: 2024-05-20
description: "Transforme números decimais e dízimas periódicas em frações irredutíveis passo a passo."

# Configurações de Engenharia
layout: "single"
tool_partial: "fracao-geratriz" # Nome do arquivo em layouts/partials/tools/
engine: "math-v1"              # Tag para carregar scripts específicos
is_educational: true

# SEO & AdSense (Custom Params)
keywords: ["fração geratriz", "converter decimal em fração", "geratriz de dízima"]
ads_priority: "high"
---

A **fração geratriz** é a representação fracionária de um número decimal. Quando lidamos com dízimas periódicas, o cálculo exige a identificação do período e a aplicação de potências de 10 para isolar a parte repetitiva. 

### Como utilizar a ferramenta:
1. Insira o valor decimal (use ponto para decimais).
2. Clique em **Converter**.
3. Obtenha a fração simplificada (irredutível).

A conversão de um número decimal para fração é um processo fundamental na aritmética e engenharia. Quando um número decimal é finito, o denominador é sempre uma potência de 10 ($10, 100, 1000...$), dependendo do número de casas decimais.

### O Algoritmo de Simplificação
Para chegar à **fração irredutível**, o Scalar utiliza o **Algoritmo de Euclides** para encontrar o Máximo Divisor Comum (MDC) entre o numerador e o denominador.

[Image of Euclidean algorithm flowchart]

### Exemplo Prático:
Ao converter **0,75**:
1. Escrevemos como $75/100$.
2. O MDC de 75 e 100 é **25**.
3. Dividimos ambos por 25, resultando em **3/4**.