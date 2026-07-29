---
title: "Calculateur de PGCD et PPCM : Plus Grand Commun Diviseur et Plus Petit Commun Multiple"
description: "Calculez le PGCD et le PPCM entre plusieurs nombres instantanément. Apprenez la décomposition en facteurs premiers et l'Algorithme d'Euclide."
date: 2026-05-26
icon: "calculator"
keywords: ["PGCD", "PPCM", "plus grand commun diviseur", "plus petit commun multiple", "calcul de fractions", "facteurs premiers", "algorithme euclide"]
slug: "pgcd-ppcm"
---

Le calcul du **PGCD** (Plus Grand Commun Diviseur) et du **PPCM** (Plus Petit Commun Multiple) est une exigence fondamentale en arithmétique, indispensable pour la simplification des fractions, la résolution de problèmes logiques, la cryptographie et la synchronisation d'événements périodiques.

Sur **Scalar**, nous utilisons des algorithmes optimisés pour délivrer le résultat exact instantanément. Saisissez simplement les valeurs dans le champ ci-dessus pour exécuter le calcul en temps réel.

## Définitions Fondamentales

* **PGCD (Plus Grand Commun Diviseur) :** Représente le plus grand entier qui divise deux ou plusieurs nombres simultanément sans laisser de reste. C'est la base de la simplification des fractions.
* **PPCM (Plus Petit Commun Multiple) :** Est le plus petit entier strictement positif qui est un multiple commun à deux ou plusieurs nombres. Il est indispensable pour additionner des fractions de dénominateurs différents.

<details>
<summary>Comment calculer manuellement ? (PGCD, PPCM et Facteurs Premiers)</summary>

## La Méthode de Décomposition en Facteurs Premiers

La méthode la plus pédagogique pour déterminer ces valeurs repose sur la factorisation simultanée. Prenons les nombres **12 et 18** en exemple :

| Valeurs à Factoriser | Facteur Premier | Diviseur Commun ? (PGCD) |
| :--- | :--- | :--- |
| **12, 18** | **2** | Oui (divise 12 et 18) |
| **6, 9** | **3** | Oui (divise 6 et 9) |
| **2, 3** | **2** | Non (divise uniquement 2) |
| **1, 3** | **3** | Non (divise uniquement 3) |
| **1, 1** | $-$ | Fin du procédé |

### Calcul du PPCM

Nous multiplions **tous** les facteurs premiers obtenus lors de la décomposition :
$$\text{PPCM}(12, 18) = 2 \times 3 \times 2 \times 3 = 36$$

### Calcul du PGCD

Nous multiplions uniquement les facteurs premiers qui ont divisé **l'ensemble** des nombres simultanément :
$$\text{PGCD}(12, 18) = 2 \times 3 = 6$$

## L'Algorithme d'Euclide

Pour les grands nombres, la factorisation s'avère inefficace. **Scalar** exploite l'**Algorithme d'Euclide** basé sur les divisions successives du reste :

$$\text{PGCD}(a, b) = \text{PGCD}(b, a \bmod b)$$

Une fois le PGCD obtenu, le PPCM se calcule directement grâce à la propriété fondamentale :

$$\text{PPCM}(a, b) = \frac{|a \times b|}{\text{PGCD}(a, b)}$$

</details>

## Quand utiliser chaque notion ?

* **Utilisez le PGCD** lorsque le problème demande de « diviser en parts égales », de trouver « la plus grande taille possible » ou le « nombre maximum d'éléments par groupe ».
* **Utilisez le PPCM** lorsque le problème implique le « temps de cycle », la « coïncidence d'événements », le moment où « deux phénomènes se reproduiront ensemble » ou le « plus petit intervalle commun ».

**Scalar** automatise cette logique avec une complexité logarithmique $O(\log(\min(a, b)))$, vous permettant de vous concentrer sur l'analyse pendant que nous garantissons l'exactitude arithmétique.
