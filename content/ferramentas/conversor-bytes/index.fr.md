---
title: "Convertisseur d'Unités de Mémoire (SI vs CEI) : Bits, Octets, Mo et Mio"
description: "Convertissez entre Bits, Octets, Ko, Mo, Go et les unités binaires KiO, MiO, GiO. Comprenez la différence entre base 10 et base 2."
date: 2026-05-26
icon: "database"
keywords: ["convertisseur octets", "difference Ko et KiO", "convertir megaoctets en mebioctets", "unites de stockage"]
slug: "convertisseur-octets"
---

En génie informatique et en architecture cloud, l'ambiguïté dans la mesure de la capacité des données peut entraîner des erreurs de calcul lors du dimensionnement du stockage et des débits réseau. Sur **Scalar**, notre outil effectue la conversion exacte entre les deux standards internationaux de mesure.

Saisissez simplement une valeur dans n'importe quel champ pour obtenir une conversion instantanée dans toutes las unités.

## Comprendre la Différence : SI vs CEI (IEC)

La confusion provient de l'existence de deux normes principales pour définir le préfixe "Kilo" dans l'environnement informatique :

* **Standard SI (Système International - Base 10) :** Norme utilisée par les fabricants de matériel (disques HDD, SSD, clés USB). Ici, **1 Kilooctet (Ko) = 1 000 Octets**.
* **Standard CEI (Commission Électrotechnique Internationale - Base 2) :** Norme employée par les systèmes d'exploitation (Linux, Windows) et la mémoire RAM. Ici, **1 Kibioctet (KiO) = 1 024 Octets**.

<details>
<summary>Pourquoi mon disque dur affiche-t-il moins d'espace qu'annoncé ? (Voir la théorie)</summary>

## Le "Dilemme du Fabricant"

Avez-vous déjà acheté un disque dur de **500 Go** qui, une fois connecté à votre ordinateur, n'affichait environ que **465 GiO** ? Il ne s'agit pas d'un défaut, mais d'une différence de convention d'unités :

1. Le fabricant vend le disque selon la norme **SI (Base 10)** : $500 000 000 000 \text{ Octets}$.
2. Le système d'exploitation lit ces mêmes octets selon la norme **CEI (Base 2)**.

$$\text{Capacité en GiO} = \frac{500 000 000 000}{1 073 741 824} \approx 465,66 \text{ GiO}$$

### Tableau Comparatif des Unités

| Suffixe (SI) | Base 10 | Suffixe (CEI) | Base 2 |
| :--- | :--- | :--- | :--- |
| **Ko** (Kilo) | $10^3$ | **KiO** (Kibi) | $2^{10}$ ($1 024$) |
| **Mo** (Méga) | $10^6$ | **MiO** (Mébi) | $2^{20}$ ($1 048 576$) |
| **Go** (Giga) | $10^9$ | **GiO** (Gibi) | $2^{30}$ ($1 073 741 824$) |
| **To** (Téra) | $10^{12}$ | **TiO** (Tébi) | $2^{40}$ ($1 099 511 627 776$) |

### Conversion Fondamentale entre Bits et Octets

Un **Octet (o / Byte)** équivaut exactement à **8 Bits (b)**. Alors que la capacité de stockage s'exprime en octets, la vitesse de transfert réseau (*débit*) s'exprime en bits par seconde (ex. : Mbit/s, Gbit/s).

</details>

## Comment calculer manuellement ?

Pour convertir une unité du système SI vers son équivalent CEI (ex. : Mo vers MiO) :

1. Convertissez la valeur initiale dans l'unité de base (**Octets**).
2. Divisez le total d'octets par le facteur binaire correspondant (ex. : par $1 048 576$ pour obtenir des MiO).

**Scalar** automatise ce processus au niveau du composant, garantissant l'absence d'erreurs d'arrondi lors du provisionnement d'infrastructure.
