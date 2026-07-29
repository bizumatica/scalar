---
title: "Calculatrice de Sous-réseau IPv4 (CIDR)"
description: "Calculez les sous-réseaux IPv4, masques, adresses de diffusion et IP utiles en temps réel. Planifiez votre infrastructure réseau avec précision."
date: 2026-05-26
icon: "network"
math: true
keywords: ["calculatrice cidr", "sous-reseau ipv4", "masque de reseau", "calculer ip", "infrastructure reseau", "adresse de diffusion"]
slug: "calculatrice-cidr"
---

La conception de topologies réseau et le découpage en sous-réseaux IP sont essentiels pour garantir la sécurité, l'isolement et l'efficacité du routage au sein des infrastructures locales et cloud (telles que les VPC AWS et les sous-réseaux Google Cloud). Sur **Scalar**, notre calculatrice effectue un traitement binaire instantané des préfixes CIDR (*Classless Inter-Domain Routing*), traduisant des masques complexes en plages d'adresses exactes.

Saisissez n'importe quelle adresse IPv4 accompagnée de son préfixe de routage pour obtenir la cartographie complète du sous-réseau, sans recours aux conversions manuelles en algèbre de Boole.

## Architecture des Masques et Routage Classless

La transition de l'ancien modèle par classes (Classe A, B et C) vers le système **CIDR** a permis de freiner l'épuisement de l'espace d'adressage IPv4. Le masque de sous-réseau définit la frontière exacte entre les bits dédiés à l'identification du réseau (*Network ID*) et ceux alloués aux hôtes (*Host ID*).

* **Préfixes Courts (/8 à /16) :** Généralement attribués aux cœurs de réseau des fournisseurs d'accès (FAI) ou aux grands réseaux d'entreprise.
* **Préfixes de Distribution (/22 à /24) :** Le standard pour les réseaux locaux (LAN), permettant de segmenter jusqu'à 254 hôtes par interface.
* **Préfixes à Haute Densité (/27 à /30) :** Utilisés pour isoler les zones DMZ, les grappes de bases de données ou les sous-réseaux d'administration.

<details>
<summary>Calculs Bitwise et Exceptions RFC : Comment fonctionne le moteur ? (Voir la théorie)</summary>

## La Mathématique Derrière le CIDR

Chaque adresse IPv4 est une séquence de 32 bits divisée en quatre octets. Lorsque vous sélectionnez un préfixe tel que `/24`, le moteur de **Scalar** génère un masque binaire en définissant les 24 premiers bits à `1` et les 8 bits restants à `0`.

$$\text{Masque } /24 = 11111111.11111111.11111111.00000000 \rightarrow 255.255.255.0$$

Les opérations logiques exécutées au niveau matériel et reproduites par notre outil utilisent les opérateurs bit à bit **AND** et **NOT** :

* **Adresse Réseau :** Obtenue par l'opération bitwise AND entre l'IP saisie et le masque : $\text{Réseau} = \text{IP} \text{ AND } \text{Masque}$.
* **Adresse de Diffusion (Broadcast) :** Identifiée en appliquant l'opération bitwise OR avec la négation du masque : $\text{Broadcast} = \text{Réseau} \text{ OR } (\text{NOT } \text{Masque})$.

### L'Exception Critique de la RFC 3021 (Liaisons /31) et RFC 1122 (/32)

Sur les liaisons point à point entre routeurs principaux, le gaspillage de deux adresses par sous-réseau (Réseau et Broadcast) était problématique. La spécification **RFC 3021** a adapté cette règle pour les préfixes `/31`, permettant d'attribuer directement les deux adresses générées aux interfaces. **Scalar** intègre cette validation automatiquement en supprimant la ligne de broadcast traditionnelle et en allouant les deux seules IP disponibles comme hôtes utilisables. De même, pour les préfixes `/32`, l'outil configure correctement l'adresse comme un hôte unique.

</details>

## Comment Calculer les Plages Manuellement ?

Pour effectuer des audits rapides de tables de routage sans outil sous la main, utilisez la méthode des puissances de 2 :

1. Soustrayez le préfixe CIDR de 32 (ex. : $32 - 26 = 6$ bits d'hôte).
2. Calculez la taille totale du bloc : $2^6 = 64$ adresses au total.
3. Soustrayez 2 pour obtenir les hôtes utiles ($64 - 2 = 62$).
4. Les limites du sous-réseau seront des multiples de la taille du bloc (0, 64, 128, 192...).

**Scalar** élimine tout risque d'erreur de calcul booléen lors des phases de validation d'infrastructure, en fournissant des cartes réseau claires, prêtes à être déployées sur vos pare-feu et routeurs.
