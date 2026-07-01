---
title: "VPC-Subnetz-Planer: Binäre CIDR-Block-Aufteilung für die Cloud"
description: "Planen und unterteilen Sie den CIDR-Block Ihrer VPC binär in öffentliche und private Subnetze. Berechnen Sie nutzbare IPs und Netzwerkbereiche für AWS, GCP und Azure."
date: 2026-06-30
categories: ["infrastruktur", "ingenieurwesen"]
layout: "single"
icon: "subnet_stack"
math: "true"
slug: "cidr-subnetz-rechner"
---

Dieses interaktive Tool ermöglicht es Cloud-Architekten und DevOps-Ingenieuren, die Netzwerktopologie einer Virtual Private Cloud (VPC) präzise zu planen. Die zugrunde liegende algorithmische Engine übernimmt einen primären CIDR-Block und führt eine binäre Adressraumaufteilung durch. Dabei werden Broadcast-Grenzen, Subnetzmasken und die Gesamtzahl der nutzbaren IP-Adressen automatisch für Provider wie AWS, Google Cloud und Azure berechnet.

<details>
<summary>Technischer Inhalt: Netzwerkarchitektur und Subnetting in Enterprise-Cloud-Umgebungen</summary>

## Einführung in die IP-Adressierung in VPC-Umgebungen

In der modernen Systemarchitektur fungiert eine **VPC (Virtual Private Cloud)** als ein logisch isoliertes virtuelles Netzwerk innerhalb der öffentlichen Cloud. Die korrekte Planung des IP-Adressraums unter Verwendung der **CIDR-Notation (Classless Inter-Domain Routing)** ist von entscheidender Bedeutung, um eine IP-Erschöpfung zu vermeiden, Netzwerküberlappungen (*Overlapping*) zu verhindern und eine angemessene Sicherheitsisolierung zwischen den Infrastrukturschichten zu gewährleisten.

Die Segmentierung eines primären CIDR-Blocks in kleinere Partitionen wird als **Subnetting** bezeichnet – ein rein mathematischer Prozess, der auf der Booleschen Algebra basiert.

---

## 1. Das Konzept der CIDR-Masken und die binäre Aufteilung

Eine IPv4-Adresse besteht aus 32 Bits, die in vier Oktette unterteilt sind. In der CIDR-Notation (z. B. `/16`) repräsentiert die Zahl nach dem Schrägstrich die festen Netzwerkbits (Netzwerkmaske), während die verbleibenden Bits für die Hosts innerhalb dieses Netzwerks reserviert sind.

Wenn wir einen Block binär aufteilen (z. B. das Aufteilen eines `/16`-Elternblocks in zwei `/17`-Subnetze), ändern wir das signifikanteste verfügbare Host-Bit in den Netzwerkbereich:

* **Eltern-Block:** `10.0.0.0/16` (65.536 Adressen)
* **Subnetz A (Bit 0):** `10.0.0.0/17` (32.768 Adressen)
* **Subnetz B (Bit 1):** `10.0.128.0/17` (32.768 Adressen)

---

## 2. Öffentliche vs. private Subnetze und Routing-Tabellen

In einer mehrschichtigen Architektur (*Multi-Tier Architecture*) werden Subnetze basierend auf ihren internen Routing-Richtlinien isoliert, die über Routing-Tabellen gesteuert werden:

### Öffentliche Subnetze (Public Subnets)
Diese verfügen über eine direkte Route, die auf ein **Internet Gateway (IGW)** zeigt. Ressourcen, die hier bereitgestellt werden, erhalten öffentliche IPs und sind direkt aus dem Internet erreichbar (z. B. Application Load Balancer, Bastion Hosts).

### Private Subnetze (Private Subnets)
Diese haben keinen direkten Pfad zum offenen Internet. Damit Datenbankinstanzen oder interne Microservices Systemupdates herunterladen können, muss der ausgehende Datenverkehr über ein **NAT Gateway** geleitet werden, das sich im öffentlichen Subnetz befindet.

### Praktisches Beispiel einer VPC-Routing-Matrix

| Ziel (Destination) | Ziel-Gateway (Target) | Subnetz-Typ | Externer eingehender Datenverkehr? |
| :--- | :--- | :--- | :--- |
| `10.0.0.0/16` | `local` | Öffentlich & Privat | Nur interne VPC-Kommunikation. |
| `0.0.0.0/0` | `igw-xxxxxxxx` | Öffentlich | Ja, direkter ein- und ausgehender Verkehr. |
| `0.0.0.0/0` | `nat-xxxxxxxx` | Privat | Nur ausgehend (z. B. Server-Updates). |

---

## Regeln für IP-Reservierungen nach Cloud-Anbieter (SEO Target)

Bei der Planung von Cloud-Topologien müssen Ingenieure berücksichtigen, dass die Anzahl der nutzbaren Hosts in einem Cloud-Subnetz **nicht** der traditionellen Netzwerkberechnung für physische Server entspricht ($2^{32-n} - 2$). Die großen Cloud-Hyperscaler reservieren spezifische Adressen für interne Infrastourdienste:

| Anbieter | Reservierte IPs pro Subnetz | Grund für die Reservierung |
| :--- | :--- | :--- |
| **RFC-Standard** | 2 IPs | Netzwerkadresse (`.0`) und Broadcast-Adresse (`.255`). |
| **AWS** | **5 IPs** | Netzwerk, VPC-Router, interner DNS, zukünftige Verwendung und Broadcast. |
| **Google Cloud**| **4 IPs** | Netzwerk, Standard-Gateway, vorletzte IP (Reserviert) und Broadcast. |
| **Azure** | **5 IPs** | Netzwerk, Azure-Gateway, Azure-DNS, zukünftige Verwendung und Broadcast. |

---

## Mathematischer Ausdruck zur Berechnung des IP-Umfangs

Die Gesamtzahl der theoretischen IP-Adressen ($N$), die in einem CIDR-Präfix ($s$) enthalten sind, wird durch die Exponentialgleichung bestimmt:

$$N = 2^{32 - s}$$

Um beispielsweise die tatsächliche Anzahl der nutzbaren Hosts ($H$) innerhalb von AWS zu ermitteln, subtrahieren wir die 5 proprietären, für die Infrastruktur reservierten IPs:

$$H = 2^{32 - s} - 5$$

Wenn die mathematische Regel einen Wert kleiner oder gleich Null zurückgibt, gilt der gewählte CIDR-Block als ungültig oder zu stark eingeschränkt, um eine stabile Cloud-Umgebung aufzubauen.

---

## Häufig gestellte Fragen zu VPC-Subnetzen (FAQ Target)

### Was passiert, wenn sich CIDR-Blöcke überlappen (Overlapping)?
Zwei Netzwerke mit überlappenden CIDR-Blöcken können keine VPC-Peering-Verbindungen oder hybride Site-to-Site-VPN-Tunnel zum lokalen Rechenzentrum aufbauen, da die zugrunde liegenden Router die Paketziele nicht deterministisch zuordnen können.

### Warum genau reserviert AWS 5 IP-Adressen?
AWS isoliert `.0` für die Netzwerkblock-Identität, `.1` für das interne VPC-Router-Gateway, `.2` für den vom AWS bereitgestellten DNS-Server (Route 53 Resolver), `.3` für die interne zukünftige Verwendung und die letzte IP-Adresse des Bereichs für die Netzwerk-Broadcast-Grenze.

</details>