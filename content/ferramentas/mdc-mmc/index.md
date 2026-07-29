---
title: "Calculadora de MDC e MMC: Máximo Divisor Comum e Mínimo Múltiplo Comum"
description: "Calcule o MDC e o MMC entre números instantaneamente. Entenda a decomposição em fatores primos e o Algoritmo de Euclides com exemplos."
date: 2026-05-26
icon: "calculator"
keywords: ["MDC", "MMC", "máximo divisor comum", "mínimo múltiplo comum", "cálculo de frações", "fatores primos", "algoritmo de euclides"]
slug: "mdc-mmc"
---

O cálculo do **MDC** (Máximo Divisor Comum) e do **MMC** (Mínimo Múltiplo Comum) é um requisito fundamental na aritmética, sendo essencial para a simplificação de frações, resolução de problemas de lógica, criptografia e sincronização de eventos periódicos. 

No **Scalar**, utilizamos algoritmos otimizados para entregar o resultado exato instantaneamente. Basta inserir os valores no campo acima para processar o cálculo em tempo real.

## Definições Fundamentais

* **MDC (Máximo Divisor Comum):** Representa o maior número inteiro que divide dois ou mais números simultaneamente sem deixar resto. É a base para a simplificação de estruturas e razões.
* **MMC (Mínimo Múltiplo Comum):** É o menor número inteiro positivo que é múltiplo comum de dois ou mais números. É indispensável para somar frações com denominadores diferentes.

<details>
<summary>Como calcular manualmente? (MDC, MMC e Fatores Primos)</summary>

## O Método da Decomposição em Fatores Primos

A forma mais didática de encontrar esses valores é através da fatoração simultânea. Vamos usar os números **12 e 18** como exemplo:

| Valores a Fatorar | Fator Primo | Divisor Comum? (MDC) |
| :--- | :--- | :--- |
| **12, 18** | **2** | Sim (divide 12 e 18) |
| **6, 9** | **3** | Sim (divide 6 e 9) |
| **2, 3** | **2** | Não (divide apenas 2) |
| **1, 3** | **3** | Não (divide apenas 3) |
| **1, 1** | $-$ | Fim do processo |

### Cálculo do MMC
Multiplicamos **todos** os fatores primos encontrados na decomposição:
$$\text{MMC}(12, 18) = 2 \times 3 \times 2 \times 3 = 36$$

### Cálculo do MDC
Multiplicamos apenas os fatores primos que dividiram **todos** os números simultaneamente (destacados):
$$\text{MDC}(12, 18) = 2 \times 3 = 6$$

## O Algoritmo de Euclides

Para números de grande magnitude, a fatoração torna-se ineficiente. O **Scalar** utiliza o **Algoritmo de Euclides** baseado em divisões sucessivas pelo resto:

$$\text{MDC}(a, b) = \text{MDC}(b, a \bmod b)$$

Obtido o MDC, o MMC é calculado diretamente pela propriedade fundamental:

$$\text{MMC}(a, b) = \frac{|a \times b|}{\text{MDC}(a, b)}$$

</details>

## Quando usar cada um?

* **Use o MDC** quando o problema pedir para "dividir em partes iguais", "o maior tamanho possível" ou "máximo de elementos por grupo".
* **Use o MMC** quando o problema envolver "tempo de ciclos", "coincidência de eventos", "quando os eventos ocorrerão juntos novamente" ou "menor intervalo comum".

O **Scalar** automatiza essa lógica com complexidade $O(\log(\min(a, b)))$, permitindo que você foque na análise do problema enquanto garantimos a precisão aritmética.