---
title: "Calculatrice Loi des Sinus et Cosinus (Théorème d'Al-Kashi)"
description: "Résolvez n'importe quel triangle en saisissant côtés ou angles. Obtenez angles, côtés manquants, aire, périmètre et étapes de calcul."
date: 2026-05-30
categories: ["mathematiques", "ingenierie"]
layout: "single"
icon: "compass"
slug: "calculatrice-loi-des-sinus-cosinus"
---

Cet outil interactif analyse les propriétés géométriques de triangles quelconques (acutangles ou obtusangles) à partir de trois composants connus. Le moteur mathématique valide l'existence du triangle via l'inégalité triangulaire et applique dynamiquement les théorèmes trigonométriques appropriés pour déterminer les côtés et angles inconnus.

<details>
<summary>Contenu Académique : Résolution Avancée des Triangles Quelconques</summary>

## Introduction à la Trigonométrie des Triangles Quelconques

Contrairement aux triangles rectangles, où las relations de sinus, cosinus et tangente dépendent directement d'un angle droit (90°), les triangles quelconques nécessitent des méthodes généralisées. La détermination de toutes les dimensions d'un triangle à partir de données partielles est un problème classique en ingénierie civile, topographie, informatique graphique et navigation autonome.

Pour résoudre ces systèmes géométriques, nous utilisons deux théorèmes fondamentaux : la **Loi des Sinus** et la **Loi des Cosinus** (également appelée **Théorème d'Al-Kashi**).

---

## 1. Loi des Cosinus (Théorème d'Al-Kashi)

La Loi des Cosinus relie les trois côtés d'un triangle au cosinus de l'un de ses angles internes. Elle fonctionne comme une extension directe du Théorème de Pythagore, en appliquant un facteur de correction pour les triangles ne possédant pas d'angle droit.

### Les Formules Mathématiques

Pour un triangle avec les côtés $a$, $b$, $c$ et les angles opposés $A$, $B$, $C$ respectivement :

* $a^2 = b^2 + c^2 - 2bc \cdot \cos(A)$
* $b^2 = a^2 + c^2 - 2ac \cdot \cos(B)$
* $c^2 = a^2 + b^2 - 2ab \cdot \cos(C)$

### Quand appliquer la Loi des Cosinus (Al-Kashi) ?

Sélectionnez cette méthode dans les cas d'entrée suivants :

1. **Cas CCC (Côté, Côté, Côté) :** Lorsque les longueurs des trois côtés sont connues et que l'on souhaite déterminer les angles internes.
2. **Cas CAC (Côté, Angle, Côté) :** Lorsque l'on connaît deux côtés et l'angle exact formé entre eux.

---

## 2. Loi des Sinus

La Loi des Sinus établit que, dans tout triangle, les ratios entre les longueurs des côtés et les sinus de leurs angles opposés respectifs sont constants et égaux au diamètre du cercle circonscrit au polygon.

### La Formule Mathématique

$$\frac{a}{\sin(A)} = \frac{b}{\sin(B)} = \frac{c}{\sin(C)}$$

### Quand appliquer la Loi des Sinus ?

Ce théorème est idéal pour les scénarios suivants :

1. **Cas ACA (Angle, Côté, Angle) :** Lorsque deux angles connus encadrent un côté déterminé.
2. **Cas AAC (Angle, Angle, Côté) :** Lorsque l'on connaît deux angles et un côté opposé à l'un d'eux.
3. **Cas CCA / SSA (Le Cas Ambigu) :** Lorsque l'on connaît deux côtés et un angle opposé à l'un d'eux. Dans ce cas, il peut exister 0, 1 ou 2 triangles valides.

---

## Matrice de Décision Algorithmique (SEO Target)

Le tableau ci-dessous résume comment le moteur de calcul choisit l'approche logique à adopter lors du clic :

| Cas Structurel | Données Initiales de l'Utilisateur | Théorème Initial Appliqué | Objectif de la Première Étape |
| :--- | :--- | :--- | :--- |
| **CCC** | Côté $a$, Côté $b$, Côté $c$ | Loi des Cosinus (Al-Kashi) | Isoler et calculer le premier angle ($A$) |
| **CAC** | Côtés $b$ et $c$ + Angle $A$ | Loi des Cosinus (Al-Kashi) | Calculer la longueur du côté opposé ($a$) |
| **ACA** | Angles $A$ et $B$ + Côté $c$ | Somme des Angles (180°) | Déterminer le troisième angle ($C$) |
| **AAC** | Angles $A$ et $B$ + Côté $a$ | Loi des Sinus | Isoler le deuxième côté opposé ($b$) |

---

## Validation Géométrique et Inégalité Triangulaire

Aucun algorithme trigonométrique ne peut exécuter de calculs sans passer au préalable par le filtre de l'**Inégalité Triangulaire**. Théoriquement, pour qu'un triangle existe, la somme des longueurs de deux côtés quelconques doit être strictement supérieure à la longueur du troisième côté.

* Expression mathématique : $(a + b > c) \land (a + c > b) \land (b + c > a)$

Si ces conditions sont violées par les valeurs saisies, l'outil génère une exception mathématique, empêchant que des données incohérentes ne corrompent vos calculs d'ingénierie.

---

## Calcul des Attributs Secondaires : Aire et Périmètre

Une fois l'ensemble des côtés et angles déterminés, le système calcule les propriétés dérivées suivantes :

### Périmètre

Le périmètre ($P$) est la longueur totale du contour du triangle :
$$P = a + b + c$$

### Aire via la Formule de Héron

Lorsqu'aucune hauteur directe n'est disponible, le logiciel applique l'Équation de Héron basée sur le demi-périmètre ($s = \frac{P}{2}$) :
$$\text{Aire} = \sqrt{s \cdot (s - a) \cdot (s - b) \cdot (s - c)}$$

</details>
