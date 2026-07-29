---
title: "Planificateur de Sous-Réseaux VPC : Découpage de Blocs CIDR pour le Cloud"
description: "Planifiez et découpez le bloc CIDR de votre VPC de manière binaire en sous-réseaux publics et privés. Calculez les IP utilisables pour AWS, GCP et Azure."
date: 2026-06-30
categories: ["infrastructure", "ingenierie"]
layout: "single"
icon: "subnet_stack"
math: "true"
slug: "planificateur-sous-reseaux-vpc"
---

Cet outil interactif permet aux architectes cloud et ingénieurs DevOps de concevoir la topologie réseau d'un **Virtual Private Cloud (VPC)**. Le moteur algorithmique traite un bloc CIDR principal et réalise le découpage binaire de l'espace d'adressage, calculant automatiquement les limites de broadcast, les masques de sous-réseau et le total d'adresses IP utilisables pour des fournisseurs comme AWS, Google Cloud et Azure.

<details>
<summary>Contenu Technique : Architecture Réseau et Sous-Réseautage dans le Cloud</summary>

## Introduction à l'Adressage IP en Environnement VPC

Dans l'architecture système moderne, un **VPC (Virtual Private Cloud)** fonctionne comme un réseau isolé de manière logique au sein du cloud public. La planification rigoureuse de l'espace d'adressage IP, en s'appuyant sur la notation **CIDR (Classless Inter-Domain Routing)**, est essentielle pour éviter l'épuisement des IP, prévenir le chevauchement de réseaux (*overlapping*) et garantir l'isolement sécuritaire entre les ressources.

La segmentation d'un bloc CIDR principal en partitions plus petites est appelée **sous-réseautage** (*subnetting*), un procédé purement mathématique fondé sur l'algèbre de Boole.

---

## 1. Le Concept de Masque CIDR et la Division Binaire

Une adresse IPv4 est constituée de 32 bits, divisés en quatre octets. Dans la notation CIDR (ex. : `/16`), le nombre situé après la barre représente les bits fixes de réseau (masque de réseau), tandis que les bits restants sont attribués aux hôtes du réseau.

Lorsqu'on découpe un bloc de façon binaire (ex. : diviser un bloc `/16` en deux blocs `/17`), on modifie le bit le plus significatif disponible du champ hôte vers le champ réseau :

* **Bloc Parent :** `10.0.0.0/16` (65 536 adresses)
* **Sous-réseau A (Bit 0) :** `10.0.0.0/17` (32 768 adresses)
* **Sous-réseau B (Bit 1) :** `10.0.128.0/17` (32 768 adresses)

---

## 2. Sous-Réseaux Publics vs. Privés et Tables de Routage

Dans une architecture multi-tiers (*Multi-Tier Architecture*), les sous-réseaux sont répartis selon leurs politiques de routage internes gérées par les tables de routage (*Route Tables*) :

### Sous-Réseaux Publics (Public Subnets)

Ils disposent d'une route directe vers une **Passerelle Internet (Internet Gateway / IGW)**. Les ressources allouées ici reçoivent des IP publiques et sont accessibles directement depuis Internet (ex. : équilibreurs de charge, serveurs bastions).

### Sous-Réseaux Privés (Private Subnets)

Ils ne possèdent aucune route directe depuis l'extérieur. Pour que les bases de données ou microservices puissent télécharger des mises à jour, le trafic sortant est redirigé via une **Passerelle NAT (NAT Gateway)** hébergée dans le sous-réseau public.

### Exemple Pratique de Matrice de Routage VPC

| Cible (Destination) | Cible de Sortie (Target) | Type de Sous-Réseau | Trafic Externe Autorisé ? |
| :--- | :--- | :--- | :--- |
| `10.0.0.0/16` | `local` | Public et Privé | Communication interne au VPC uniquement. |
| `0.0.0.0/0` | `igw-xxxxxxxx` | Public | Oui, entrée et sortie directes depuis Internet. |
| `0.0.0.0/0` | `nat-xxxxxxxx` | Privé | Sortie uniquement (ex. : mises à jour). |

---

## Règles de Déduction des IP par Fournisseur Cloud

Lors de la planification des sous-réseaux, l'ingénieur doit garder à l'esprit que le nombre d'hôtes utilisables dans le cloud **n'est pas égal** au calcul traditionnel des réseaux physiques ($2^{32-n} - 2$). Les grands fournisseurs réservent des adresses pour leurs services d'infrastructure internes :

| Fournisseur | IP Réservées par Sous-Réseau | Motif de la Réservation |
| :--- | :--- | :--- |
| **Standard RFC** | 2 IP | Adresse Réseau (`.0`) et Broadcast (`.255`). |
| **AWS** | **5 IP** | Réseau, Routeur VPC, DNS Interne, Usage Futur et Broadcast. |
| **Google Cloud** | **4 IP** | Réseau, Passerelle par défaut, Avant-dernière IP et Broadcast. |
| **Azure** | **5 IP** | Réseau, Passerelle Azure, DNS Azure, Usage Futur et Broadcast. |

---

## Expression Mathématique pour le Calcul d'Étendue des IP

Le nombre total d'adresses IP théoriques ($N$) contenues dans un suffixe CIDR ($s$) est déterminé par l'équation exponentielle :

$$N = 2^{32 - s}$$

Pour obtenir la quantité d'hôtes réels utilisables ($H$) sur AWS, par exemple, nous soustrayons les 5 IP réservées à l'infrastructure propriétaire :

$$H = 2^{32 - s} - 5$$

Si la règle mathématique renvoie une valeur inférieure ou égale à zéro, le bloc CIDR choisi est considéré comme invalide ou trop restreint pour supporter une topologie cloud stable.

---

## Foire Aux Questions sur les Sous-Réseaux VPC (FAQ Target)

### Que se passe-t-il en cas de chevauchement (overlapping) de blocs CIDR ?

Deux réseaux présentant des blocs CIDR en chevauchement ne peuvent pas établir de connexions de VPC Peering ni de tunnels VPN hybrides (Site-to-Site), car les routeurs ne peuvent pas déterminer la destination exacte des paquets.

### Pourquoi AWS réserve-t-il précisément 5 adresses IP ?

AWS réserve l'IP `.0` pour le réseau, `.1` pour le routeur interne, `.2` pour le serveur DNS du VPC, `.3` pour un usage futur du fournisseur, et la dernière IP du sous-réseau pour l'adresse de broadcast.

</details>
