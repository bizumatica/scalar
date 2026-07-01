---
title: "IPv4-Subnetzrechner (CIDR)"
description: "Berechnen Sie IPv4-Subnetze, Subnetzmasken, Broadcast-Adressen und nutzbare IPs in Echtzeit. Planen Sie Ihre Infrastruktur mit Präzision und Performance."
date: 2026-05-26
icon: "network"
math: true
keywords: ["cidr rechner", "ipv4 subnetz", "subnetzmaske", "ip berechnen", "netzwerkinfrastruktur", "broadcast ip"]
slug: "calculadora-cidr"
---

Die Planung von Netzwerktopologien und die Segmentierung von IP-Adressen sind von grundlegender Bedeutung, um Sicherheit, Isolierung und Routing-Effizienz in lokalen sowie Cloud-Infrastrukturen (wie AWS VPCs und Google Cloud Subnets) zu gewährleisten. Bei **Scalar** führt unser Rechner ein sofortiges binäres Parsing von CIDR-Präfixen (*Classless Inter-Domain Routing*) durch und übersetzt komplexe Masken in exakte adressierbare Bereiche.

Geben Sie eine beliebige IPv4-Adresse zusammen mit dem entsprechenden Routenpräfix ein, um das vollständige Subnetz-Mapping zu erhalten – ganz ohne manuelle Umwandlungen in boolescher Algebra.

## Maskenarchitektur und klassenloses Routing (Classless Routing)

Der Übergang vom alten Modell, das auf starren Netzwerkklassen basierte (Klasse A, B und C), zum **CIDR**-System verringerte die vorzeitige Erschöpfung des IPv4-Adressraums. Die Subnetzmaske definiert die exakte Grenze zwischen den Bits, die für die Netzwerkidentifikation (*Network ID*) bestimmt sind, und den Bits, die den Hosts zugewiesen sind (*Host ID*).

* **Kurze Präfixe (/8 bis /16):** In der Regel den Backbones von Providern (ISPs) oder großen zentralen Unternehmensnetzwerken zugewiesen.
* **Verteilungspräfixe (/22 to /24):** Der gängige Standard für lokale Netzwerke (LANs), der bis zu 254 Hosts pro Schnittstelle segmentiert.
* **Hochdichte Präfixe (/27 bis /30):** Werden verwendet, um DMZ-Zonen, Datenbank-Cluster oder Management-Subnetze zu isolieren.

<details>
<summary>Bitweise Berechnungen und RFC-Ausnahmen: Wie funktioniert die Engine? (Theorie anzeigen)</summary>

## Die Mathematik hinter CIDR

Jede IPv4-Adresse ist eine Sequenz von 32 Bits, die in vier Oktette unterteilt ist. Wenn Sie ein Präfix wie `/24` auswählen, erstellt die **Scalar**-Engine eine binäre Maske, indem sie die ersten 24 Bits mit `1` und die verbleibenden 8 Bits mit `0` füllt.

$$\text{Maske } /24 = 11111111.11111111.11111111.00000000 \rightarrow 255.255.255.0$$

Die logischen Operationen, die auf Hardware-Ebene ausgeführt und in unserem Tool reproduziert werden, nutzen die Operatoren **AND** und **NOT**:

* **Netzwerkadresse:** Wird durch ein bitweises AND zwischen der angegebenen IP und der Maske ermittelt: $\text{Netzwerk} = \text{IP} \text{ AND } \text{Maske}$.
* **Broadcast-Adresse:** Wird durch Anwendung eines bitweisen OR mit der Negation der Maske identifiziert: $\text{Broadcast} = \text{Netzwerk} \text{ OR } (\text{NOT } \text{Maske})$.

### Die kritische Ausnahme von RFC 3021 (/31-Links)

Bei Point-to-Point-Verbindungen zwischen Core-Routern wurde die Verschwendung von zwei Adressen pro Subnetz (Netzwerk und Broadcast) untragbar. Die Spezifikation **RFC 3021** hat diese Regel für `/31`-Präfixe geändert, sodass beide generierten Adressen direkt den Schnittstellen zugewiesen werden können. **Scalar** implementiert diese Validierung automatisch, entfernt die traditionelle Broadcast-Zeile und ordnet die einzigen zwei verfügbaren IPs als nutzbar zu.

</details>

## Wie berechnet man Bereiche manuell?

Um schnelle Überprüfungen von Routing-Tabellen ohne Hilfsmittel durchzuführen, nutzen Sie die Zweierpotenz-Methode:

1. Subtrahieren Sie das CIDR-Präfix von 32 (z. B.: $32 - 26 = 6$ Host-Bits).
2. Berechnen Sie die Gesamtgröße des Blocks über $2^6 = 64$ Adressen insgesamt.
3. Subtrahieren Sie 2, um die nutzbaren Hosts zu erhalten ($64 - 2 = 62$).
4. Die Netzwerkgrenzen sind immer Vielfache der Blockgröße (0, 64, 128, 192...).

**Scalar** eliminiert das Risiko boolescher Rechenfehler bei der Infrastruktur-Homologation und liefert saubere Blueprints, die sofort für Firewalls und Router einsatzbereit sind.