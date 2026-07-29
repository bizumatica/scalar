---
title: "Convertisseur de Fraction Génératrice : Decimal en Fraction Pas à Pas"
description: "Transformez des nombres décimaux exacts et périodiques en fractions irréductibles. Apprenez la méthode algébrique avec des exemples pratiques."
date: 2026-05-26
icon: "fracao"
keywords: ["fraction generatrice", "convertir decimal en fraction", "generatrice decimal periodique", "fraction irreductible", "algorithme d euclide"]
slug: "fraction-generatrice"
---

La **fraction génératrice** est la représentation fractionnaire exacte d'un nombre décimal. Sur **Scalar**, notre outil ne se contente pas de convertir la valeur, il applique des algorithmes de simplification pour restituer systématiquement la fraction sous sa forme irréductible.

Saisissez simplement la valeur décimale dans le champ requis pour obtenir une conversion exacte en temps réel.

## Qu'est-ce qu'une Fraction Génératrice ?

Tout nombre rationnel peut s'écrire sous la forme d'une fraction $a/b$. Lorsque le décimal est exact (comme $0{,}5$), la conversion est directe. En revanche, face à un **développement décimal périodique** (comme $0{,}333...$), il convient de déterminer la fraction génératrice qui produit cette répétition infinie.

<details>
<summary>Comment calculer la fraction génératrice d'un décimal périodique ? (Voir le pas à pas)</summary>

## Méthode Algébrique pour Décimaux Périodiques

Pour déterminer la fraction génératrice d'un décimal périodique pur tel que $0{,}777...$, nous appliquons la méthode suivante :

1. **Poser l'équation :** $$x = 0{,}777...$$
2. **Multiplier par $10$** (afin de décaler la période) : $$10x = 7{,}777...$$
3. **Soustraire les équations :**
   $$(10x - x) = (7{,}777... - 0{,}777...)$$
   $$9x = 7$$
4. **Résoudre :** $$x = \frac{7}{9}$$

### Pour les Décimaux Périodiques Mixtes (exemple : $0{,}1222...$)

On soustrait la partie non périodique suivie de la période par la partie non périodique, puis on divise par autant de neuf que de chiffres dans la période, suivis d'autant de zéro que de chiffres dans l'ante-période :
$$x = \frac{12 - 1}{90} = \frac{11}{90}$$

### Algorithme de Simplification (PGCD)

Pour les décimaux exacts, après avoir posé la fraction initiale (ex. : $0{,}75 = 75/100$), **Scalar** utilise l'**Algorithme d'Euclide** pour calculer le Plus Grand Commun Diviseur entre le numérateur et le dénominateur :

$$\text{PGCD}(a, b) = \text{PGCD}(b, a \bmod b)$$

| Décimal | Fraction de Base | Simplification (PGCD) | Fraction Irréductible |
| :--- | :--- | :--- | :--- |
| **0,5** | $5/10$ | $\div 5$ | $1/2$ |
| **0,125** | $125/1000$ | $\div 125$ | $1/8$ |
| **0,75** | $75/100$ | $\div 25$ | $3/4$ |
| **0,333...** | $-$ | $-$ | $1/3$ |

</details>

## Pourquoi utiliser Scalar ?

Les calculs manuels sur les décimaux périodiques mixtes sont complexes et sujets aux erreurs d'arrondi. **Scalar** traite chaque chiffre avec une précision chirurgicale, offrant un outil indispensable aux étudiants, chercheurs et ingénieurs.
