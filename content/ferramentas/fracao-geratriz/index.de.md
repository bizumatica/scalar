---
title: "Periodische Dezimalbrüche umrechnen: Dezimalzahl in Bruch Schritt für Schritt"
description: "Wandeln Sie Dezimalzahlen und periodische Dezimalbrüche in unkürzbare Brüche um. Verstehen Sie die Methode zur Bestimmung des erzeugenden Bruchs mit praktischen Beispielen."
date: 2024-05-20
icon: "fracao"
keywords: ["periodischer dezimalbruch in bruch", "dezimalzahl in bruch umrechnen", "erzeugender bruch", "unkürzbarer bruch", "euklidischer algorithmus"]
slug: "periodische-dezimalbrueche-umrechnen"
---

Der **erzeugende Bruch** (auch *Fração Geratriz*) ist die exakte rationale Darstellung einer Dezimalzahl. Bei **Scalar** konvertiert unser Tool nicht nur den Wert, sondern wendet auch automatische Kürzungungsalgorithmen an, um Ihnen den Bruch immer in seiner einfachsten, unkürzbaren Form zu liefern.

Geben Sie einfach die Dezimalzahl in das Feld unten ein und klicken Sie auf **Umrechnen**, um das sofortige Ergebnis zu erhalten.

## Was ist ein erzeugender Bruch?

Jede rationale Zahl kann in Form eines Bruchs $a/b$ geschrieben werden. Bei endlichen Dezimalzahlen (wie 0,5) ist die Umrechnung direkt und unkompliziert. Wenn wir es jedoch mit **periodischen Dezimalbrüchen** (wie 0,333...) zu tun haben, müssen wir den erzeugenden Bruch finden – also den Bruch, der diese unendliche Wiederholung „generiert“.

<details>
<summary>Wie berechnet man den erzeugenden Bruch einer Periode? (Schritt-für-Schritt-Anleitung anzeigen)</summary>

## Praktische Methode für rein periodische Dezimalbrüche

Um den erzeugenden Bruch einer einfachen periodischen Dezimalzahl wie $0,777...$ zu finden, folgen wir diesen logischen Schritten:

1.  **Gleichung aufstellen:** $x = 0,777...$
2.  **Mit 10 multiplizieren:** (um die Periode um eine Stelle nach links zu verschieben) $10x = 7,777...$
3.  **Gleichungen voneinander subtrahieren:** * $10x - x = 7,777... - 0,777...$
    * $9x = 7$
4.  **Ergebnis:** $x = 7/9$

### Kürzung und der Euklidische Algorithmus (ggT)

Bei endlichen Dezimalzahlen nutzt Scalar nach dem Aufstellen des Basisbruchs (z. B. $0,75 = 75/100$) den **Euklidischen Algorithmus**, um den größten gemeinsamen Teiler (ggT) zwischen Zähler und Nenner zu ermitteln. Dadurch wird garantiert, dass der Bruch maximal gekürzt wird.



| Dezimalzahl | Basisbruch | Kürzung (ggT) | Unkürzbarer Bruch |
| :--- | :--- | :--- | :--- |
| **0,5** | 5/10 | ÷ 5 | 1/2 |
| **0,125** | 125/1000 | ÷ 125 | 1/8 |
| **0,75** | 75/100 | ÷ 25 | 3/4 |
| **0,333...** | - | - | 1/3 |

</details>

## Warum Scalar nutzen?

Manuelle Berechnungen mit gemischt-periodischen Dezimalbrüchen (z. B. $0,1222...$) sind komplex und anfällig für Rundungsfehler. **Scalar** verarbeitet jede Ziffer mit absoluter Präzision und ist ein unverzichtbares Werkzeug für Schüler, Studenten, Ingenieure und Mathematikbegeisterte, die exakte Ergebnisse benötigen.