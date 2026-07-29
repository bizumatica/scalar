---
title: "Calculadora de MCD y MCM: Máximo Común Divisor y Mínimo Común Múltiplo"
description: "Calcule el MCD y el MCM entre números al instante. Entienda la descomposición en factores primos y el Algoritmo de Euclides con ejemplos."
date: 2026-05-26
icon: "calculator"
keywords: ["MCD", "MCM", "maximo comun divisor", "minimo comun multiplo", "calculo de fracciones", "factores primos", "algoritmo de euclides"]
slug: "mcd-mcm"
---

El cálculo del **MCD** (Máximo Común Divisor) y del **MCM** (Mínimo Común Múltiplo) es un requisito fundamental en aritmética, indispensable para la simplificación de fracciones, resolución de problemas de lógica, criptografía y sincronización de eventos periódicos.

En **Scalar**, utilizamos algoritmos optimizados para entregar el resultado exacto de forma instantánea. Basta con ingresar los valores en el campo superior para procesar el cálculo en tiempo real.

## Definiciones Fundamentales

* **MCD (Máximo Común Divisor):** Representa el mayor número entero que divide dos o más números simultáneamente sin dejar residuo. Es la base para la simplificación de razones y proporciones.
* **MCM (Mínimo Común Múltiplo):** Es el menor número entero positivo que es múltiplo común de dos o más números. Es indispensable para la suma y resta de fracciones con diferente denominador.

<details>
<summary>¿Cómo calcular manualmente? (MCD, MCM y Factores Primos)</summary>

## El Método de Descomposición en Factores Primos

La forma más didáctica de encontrar estos valores es mediante la factorización simultánea. Utilizaremos los números **12 y 18** como ejemplo:

| Valores a Factorizar | Factor Primo | ¿Divisor Común? (MCD) |
| :--- | :--- | :--- |
| **12, 18** | **2** | Sí (divide a 12 y 18) |
| **6, 9** | **3** | Sí (divide a 6 y 9) |
| **2, 3** | **2** | No (divide solo a 2) |
| **1, 3** | **3** | No (divide solo a 3) |
| **1, 1** | $-$ | Fin del proceso |

### Cálculo del MCM

Multiplicamos **todos** los factores primos obtenidos en la descomposición:
$$\text{MCM}(12, 18) = 2 \times 3 \times 2 \times 3 = 36$$

### Cálculo del MCD

Multiplicamos únicamente los factores primos que dividieron a **todos** los números simultáneamente:
$$\text{MCD}(12, 18) = 2 \times 3 = 6$$

## El Algoritmo de Euclides

Para números de gran magnitud, la factorización resulta ineficiente. **Scalar** utiliza el **Algoritmo de Euclides** basado en divisiones sucesivas por el residuo:

$$\text{MCD}(a, b) = \text{MCD}(b, a \bmod b)$$

Una vez obtenido el MCD, el MCM se calcula directamente mediante la relación fundamental:

$$\text{MCM}(a, b) = \frac{|a \times b|}{\text{MCD}(a, b)}$$

</details>

## ¿Cuándo utilizar cada uno?

* **Utilice el MCD** cuando el problema requiera "dividir en partes iguales", "el mayor tamaño posible" o "máximo de elementos por grupo".
* **Utilice el MCM** cuando el problema involucre "tiempo de ciclos", "coincidencia de eventos", "cuándo volverán a ocurrir juntos" o "menor intervalo común".

**Scalar** automatiza esta lógica con complejidad matemática $O(\log(\min(a, b)))$, permitiéndole enfocarse en el análisis del problema mientras garantizamos precisión aritmética absoluta.
