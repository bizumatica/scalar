---
title: "Speichereinheiten-Umrechner (SI vs. IEC): Bits, Bytes, MB und MiB"
description: "Konvertieren Sie zwischen Bits, Bytes, KB, MB, GB und den binären Einheiten KiB, MiB, GiB. Verstehen Sie den Unterschied zwischen Basis 10 und Basis 2."
date: 2024-05-25
icon: "database"
keywords: ["bytes umrechnen", "unterschied KB und KiB", "megabyte in mebibyte", "speichereinheiten"]
slug: "speichereinheiten-umrechner"
---

In der Computertechnik kann die Mehrdeutigkeit bei der Messung von Datenmengen zu Berechnungsfehlern und Verwirrung in technischen Spezifikationen führen. Bei **Scalar** bietet unser Tool eine präzise Konvertierung zwischen den beiden globalen Messstandards.

Geben Sie einfach einen Wert in ein beliebiges Feld ein, um die sofortige Umrechnung in alle Einheiten zu erhalten.

## Den Unterschied verstehen: SI vs. IEC

Die Verwirrung entsteht, weil es in der digitalen Welt zwei Hauptstandards gibt, um Vorsätze wie „Kilo“ zu definieren:

* **SI-Standard (Internationales Einheitensystem – Basis 10):** Dies ist der Standard, der von Hardware-Herstellern (Festplatten, SSDs, USB-Sticks) verwendet wird. Hier gilt: **1 Kilobyte (KB) = 1.000 Bytes**.
* **IEC-Standard (International Electrotechnical Commission – Basis 2):** Dies ist der Standard, der von Betriebssystemen (Windows, Linux) und RAM-Speicherarchitekturen genutzt wird. Hier gilt: **1 Kibibyte (KiB) = 1.024 Bytes**.

<details>
<summary>Warum hat meine Festplatte scheinbar weniger Speicherplatz als angegeben? (Theorie anzeigen)</summary>

## Das „Hersteller-Dilemma“

Haben Sie schon einmal eine **500 GB** Festplatte gekauft, und nach dem Anschließen an den Computer hat Windows nur etwa **465 GiB** angezeigt? Dies ist kein Defekt, sondern lediglich ein Unterschied in den verwendeten Einheiten:

1. Der Hersteller verkauft das Laufwerk nach dem **SI-Standard (Basis 10)**: 500.000.000.000 Bytes.
2. Das Betriebssystem liest genau dieselbe Anzahl an Bytes jedoch nach dem **IEC-Standard (Basis 2)**.

### Vergleichstabelle der Einheiten

| Suffix (SI) | Basis 10 | Suffix (IEC) | Basis 2 |
| :--- | :--- | :--- | :--- |
| **KB** (Kilo) | 10³ | **KiB** (Kibi) | 2¹⁰ (1.024) |
| **MB** (Mega) | 10⁶ | **MiB** (Mebi) | 2²⁰ (1.048.576) |
| **GB** (Giga) | 10⁹ | **GiB** (Gibi) | 2³⁰ (1.073.741.824) |
| **TB** (Tera) | 10¹² | **TiB** (Tebi) | 2⁴⁰ (1.099.511.627.776) |

</details>

## Wie rechnet man manuell um?

Um von einer SI-Einheit in die entsprechende IEC-Einheit umzurechnen (z. B. von MB in MiB):

1. Rechnen Sie den Gesamtwert in die Basiseinheit (**Bytes**) um.
2. Teilen Sie die Gesamtzahl der Bytes durch den Faktor der Basis 2 (z. B. durch 1.048.576, um MiB zu erhalten).

**Scalar** automatisiert diesen Prozess und stellt sicher, dass Ihnen keine Rundungsfehler bei Bandbreitenberechnungen oder der Serverdimensionierung unterlaufen.