---
title: "Calculadora de Ley de Senos y Cosenos (Resolución de Triángulos)"
description: "Resuelva cualquier triángulo ingresando lados o ángulos. Obtenga lados restantes, ángulos, área, perímetro y procedimiento paso a paso."
date: 2026-05-30
categories: ["matematicas", "ingenieria"]
layout: "single"
icon: "compass"
slug: "calculadora-ley-senos-cosenos"
---

Esta herramienta interactiva analiza las propiedades geométricas de triángulos oblicuángulos (Acutángulos u Obtusángulos) a partir de tres componentes conocidos. El motor matemático valida la existencia del triángulo mediante la desigualdad triangular y aplica dinámicamente los teoremas trigonométricos adecuados para determinar los lados y ángulos desconocidos.

<details>
<summary>Contenido Académico: Resolución Avanzada de Triángulos Oblicuángulos</summary>

## Introducción a la Trigonometría de Triángulos Cualesquiera

A diferencia de los triángulos rectángulos, donde las relaciones de seno, coseno y tangente dependen directamente de un ángulo recto (90°), los triángulos oblicuángulos requieren métodos generalizados para su resolución. La determinación de todas las dimensiones de un triángulo a partir de datos parciales es un problema clásico en ingeniería civil, topografía, computación gráfica y navegación autónoma.

Para resolver estos sistemas geométricos, utilizamos dos teoremas fundamentales: la **Ley de los Senos** y la **Ley de los Cosenos**.

---

## 1. Ley de los Cosenos (Teorema de Pitágoras Generalizado)

La Ley de los Cosenos relaciona los tres lados de un triángulo con el coseno de uno de sus ángulos internos. Funciona como una extensión directa del Teorema de Pitágoras, aplicando un factor de corrección para triángulos que no poseen ángulos rectos.

### Las Fórmulas Matemáticas

Para un triángulo con lados $a$, $b$, $c$ y ángulos opuestos $A$, $B$, $C$ respectivamente:

* $a^2 = b^2 + c^2 - 2bc \cdot \cos(A)$
* $b^2 = a^2 + c^2 - 2ac \cdot \cos(B)$
* $c^2 = a^2 + b^2 - 2ab \cdot \cos(C)$

### ¿Cuándo aplicar la Ley de los Cosenos?

Seleccione este método en los siguientes escenarios de entrada:

1. **Caso LLL (Lado, Lado, Lado):** Cuando se conoce la medida de los tres lados y se desean calcular los ángulos internos.
2. **Caso LAL (Lado, Ángulo, Lado):** Cuando conocemos dos lados y el ángulo exacto comprendido entre ellos.

---

## 2. Ley de los Senos

La Ley de los Senos establece que, en cualquier triángulo, las proporciones entre las longitudes de los lados y los senos de sus respectivos ángulos opuestos son constantes e iguales al diámetro de la circunferencia circunscrita al polígono.

### La Fórmula Matemática

$$\frac{a}{\sin(A)} = \frac{b}{\sin(B)} = \frac{c}{\sin(C)}$$

### ¿Cuándo aplicar la Ley de los Senos?

Este teorema es ideal para los siguientes escenarios:

1. **Caso ALA (Ángulo, Lado, Ángulo):** Cuando dos ángulos conocidos flanquean un lado determinado.
2. **Caso AAL (Ángulo, Ángulo, Lado):** Cuando conocemos dos ángulos y un lado opuesto a uno de ellos.
3. **Caso LLA / SSA (El Caso Ambiguo):** Cuando conocemos dos lados y el ángulo opuesto a uno de ellos. En este escenario, pueden existir 0, 1 o 2 triángulos válidos.

---

## Matriz de Decisión Algorítmica (SEO Target)

La siguiente tabla resume cómo el motor computacional de nuestra herramienta decide qué enfoque lógico adoptar al ejecutar el cálculo:

| Caso Estructural | Datos Iniciales del Usuario | Teorema Inicial Aplicado | Objetivo del Primer Paso |
| :--- | :--- | :--- | :--- |
| **LLL** | Lado $a$, Lado $b$, Lado $c$ | Ley de los Cosenos | Aislar y calcular el primer ángulo ($A$) |
| **LAL** | Lados $b$ y $c$ + Ángulo $A$ | Ley de los Cosenos | Calcular la longitud del lado opuesto ($a$) |
| **ALA** | Ángulos $A$ y $B$ + Lado $c$ | Suma de Ángulos (180°) | Determinar el tercer ángulo faltante ($C$) |
| **AAL** | Ángulos $A$ y $B$ + Lado $a$ | Ley de los Senos | Aislar el segundo lado opuesto ($b$) |

---

## Validación Geométrica y la Desigualdad Triangular

Ningún algoritmo trigonométrico puede ejecutar cálculos sin pasar previamente por el filtro de la **Desigualdad Triangular**. Teóricamente, para que un triángulo exista, la suma de las longitudes de dos lados cualesquiera debe ser estrictamente mayor que la longitud del tercer lado.

* Expresión matemática: $(a + b > c) \land (a + c > b) \land (b + c > a)$

Si los valores ingresados violan esta regla, la herramienta emitirá una excepción matemática, evitando que datos inconsistentes corrompan cálculos estructurales o proyectos de ingeniería.

---

## Cálculo de Atributos Secundarios: Área y Perímetro

Una vez resueltos todos los lados y ángulos, el sistema calcula las siguientes propiedades derivadas:

### Perímetro

El perímetro ($P$) es la magnitud lineal total del contorno del triángulo:
$$P = a + b + c$$

### Área mediante la Fórmula de Herón

Cuando no se dispone de la altura directa del triángulo, el motor aplica la Ecuación de Herón basada en el semiperímetro ($s = \frac{P}{2}$):
$$\text{Área} = \sqrt{s \cdot (s - a) \cdot (s - b) \cdot (s - c)}$$

</details>
