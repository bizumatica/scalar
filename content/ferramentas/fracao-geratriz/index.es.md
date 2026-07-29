---
title: "Conversor de Fracción Generatriz: Decimal a Fracción Paso a Paso"
description: "Transforme números decimales exactos y periódicos en fracciones irreducibles. Entienda el método algebraico con ejemplos prácticos."
date: 2026-05-26
icon: "fracao"
keywords: ["fraccion generatriz", "convertir decimal a fraccion", "generatriz decimal periodico", "fraccion irreducible", "algoritmo de euclides"]
slug: "fraccion-generatriz"
---

La **fracción generatriz** es la representación fraccionaria exacta de un número decimal. En **Scalar**, nuestra herramienta no solo convierte el valor, sino que aplica algoritmos de simplificación matemática para entregar siempre la fracción en su forma irreducible.

Basta con ingresar el valor decimal en el campo correspondiente para obtener la conversión instantánea en tiempo real.

## ¿Qué es una Fracción Generatriz?

Todo número racional se puede expresar en forma de fracción $a/b$. Cuando el decimal es exacto (como $0{,}5$), la conversión es directa. Sin embargo, al trabajar con **decimales periódicos** (como $0{,}333...$), necesitamos encontrar la generatriz: la fracción que produce esa repetición infinita.

<details>
<summary>¿Cómo calcular la generatriz de un decimal periódico? (Ver Paso a Paso)</summary>

## Método Algorítmico para Decimales Periódicos

Para encontrar la fracción generatriz de un decimal periódico puro como $0{,}777...$, aplicamos el siguiente procedimiento algebraico:

1. **Igualamos a $x$:** $$x = 0{,}777...$$
2. **Multiplicamos por $10$** (para desplazar el período): $$10x = 7{,}777...$$
3. **Restamos las ecuaciones:**
   $$(10x - x) = (7{,}777... - 0{,}777...)$$
   $$9x = 7$$
4. **Despejamos:** $$x = \frac{7}{9}$$

### Para Decimales Periódicos Mixtos (ejemplo: $0{,}1222...$)

Restamos la parte no periódica seguida del período menos la parte no periódica, dividiendo entre tantos nueves como cifras tenga el período y tantos ceros como cifras tenga el anteperíodo:
$$x = \frac{12 - 1}{90} = \frac{11}{90}$$

### Algoritmo de Simplificación (MCD)

Para decimales exactos, tras escribir la fracción base (ej.: $0{,}75 = 75/100$), **Scalar** utiliza el **Algoritmo de Euclides** para determinar el Máximo Común Divisor entre el numerador y el denominador:

$$\text{MCD}(a, b) = \text{MCD}(b, a \bmod b)$$

| Decimal | Fracción Base | Simplificación (MCD) | Fracción Irreducible |
| :--- | :--- | :--- | :--- |
| **0,5** | $5/10$ | $\div 5$ | $1/2$ |
| **0,125** | $125/1000$ | $\div 125$ | $1/8$ |
| **0,75** | $75/100$ | $\div 25$ | $3/4$ |
| **0,333...** | $-$ | $-$ | $1/3$ |

</details>

## ¿Por qué utilizar Scalar?

Los cálculos manuales con decimales periódicos mixtos son complejos y propensos a errores de redondeo. **Scalar** procesa cada dígito con precisión de punto flotante de 64 bits, siendo una herramienta indispensable para estudiantes, ingenieros y profesionales de la ciencia de datos.
