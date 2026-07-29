---
title: "Conversor de Fração Geratriz: Decimal para Fração Passo a Passo"
description: "Transforme números decimais e dízimas periódicas em frações irredutíveis. Entenda o método para encontrar a geratriz com exemplos práticos."
date: 2024-05-20
icon: "fracao"
keywords: ["fração geratriz", "converter decimal em fração", "geratriz de dízima periódica", "fração irredutível", "algoritmo de euclides"]
slug: "fracao-geratriz"
---

A **fração geratriz** é a representação fracionária exata de um número decimal. No **Scalar**, nossa ferramenta não apenas converte o valor, mas aplica algoritmos de simplificação para entregar sempre a fração em seu estado irredutível.

Basta inserir o decimal no campo abaixo e clicar em **Converter** para obter o resultado instantâneo.

## O que é uma Fração Geratriz?

Todo número racional pode ser escrito na forma de fração $a/b$. Quando o decimal é exato (como 0,5), a conversão é direta. No entanto, quando lidamos com **dízimas periódicas** (como 0,333...), precisamos encontrar a geratriz — a fração que "gera" aquela repetição infinita.

<details>
<summary>Como calcular a geratriz de uma dízima? (Ver Passo a Passo)</summary>

## Método Prático para Dízimas Periódicas

Para encontrar a fração geratriz de uma dízima simples, como $0,777...$, seguimos estes passos lógicos:

1. **Igualamos a X:** $x = 0,777...$
2. **Multiplicamos por 10:** (para deslocar o período) $10x = 7,777...$
3. **Subtraímos as equações:** * $10x - x = 7,777... - 0,777...$
    * $9x = 7$
4. **Resultado:** $x = 7/9$

### Algoritmo de Simplificação (MDC)

Para decimais exatos, após escrever a fração base (ex: $0,75 = 75/100$), o Scalar utiliza o **Algoritmo de Euclides** para encontrar o Máximo Divisor Comum entre o numerador e o denominador, garantindo que a fração seja simplificada ao máximo.

[Image of Euclidean algorithm flowchart]

| Decimal | Fração Base | Simplificação (MDC) | Fração Irredutível |
| :--- | :--- | :--- | :--- |
| **0,5** | 5/10 | ÷ 5 | 1/2 |
| **0,125** | 125/1000 | ÷ 125 | 1/8 |
| **0,75** | 75/100 | ÷ 25 | 3/4 |
| **0,333...** | - | - | 1/3 |

</details>

## Por que usar o Scalar?

Cálculos manuais com dízimas compostas (ex: $0,1222...$) são complexos e propensos a erros de arredondamento. O **Scalar** trata cada dígito com precisão absoluta, sendo uma ferramenta indispensável para estudantes, engenheiros e entusiastas da matemática que buscam exatidão em seus resultados.
