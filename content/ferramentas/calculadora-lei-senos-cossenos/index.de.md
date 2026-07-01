---
title: "Sinussatz und Kosinussatz Rechner (Dreiecksberechnung)"
description: "Berechnen Sie jedes beliebige Dreieck durch Eingabe von Seiten oder Winkeln. Ermitteln Sie Restmaße, Fläche, Umfang e den Lösungsweg Schritt für Schritt."
date: 2026-05-30
categories: ["mathematik", "ingenieurwesen"]
layout: "single"
icon: "compass"
slug: "sinussatz-kosinussatz-rechner"
---

Dieses interaktive Werkzeug analysiert die geometrischen Eigenschaften beliebiger Dreiecke (spitzwinklig oder stumpfwinklig) basierend auf drei bekannten Komponenten. Die mathematische Engine validiert die Existenz des Dreiecks mittels der Dreiecksungleichung und bestimmt dynamisch die Anwendung der geeigneten trigonometrischen Sätze, um die unbekannten Seiten und Winkel zu berechnen.

<details>
<summary>Akademischer Inhalt: Erweiterte Berechnung schiefwinkliger Dreiecke</summary>

## Einführung in die Trigonometrie beliebiger Dreiecke

Im Gegensatz zu rechtwinkligen Dreiecken, bei denen die Beziehungen von Sinus, Kosinus und Tangens direkt von einem rechten Winkel (90°) abhängen, erfordern schiefwinklige Dreiecke verallgemeinerte Methoden zur Berechnung. Die Bestimmung aller Maße eines Dreiecks aus unvollständigen Daten ist ein klassisches Problem im Bauwesen, in der Vermessungstechnik, der Computergrafik und der autonomen Navigation.

Zur Lösung dieser geometrischen Systeme nutzen wir zwei grundlegende Sätze: den **Sinussatz** und den **Kosinussatz**.

---

## 1. Der Kosinussatz (Verallgemeinerter Satz des Pythagoras)

Der Kosinussatz setzt die drei Seiten eines Dreiecks mit dem Kosinus eines seiner Innenwinkel in Beziehung. Er fungiert als direkte Erweiterung des Satzes des Pythagoras, indem er einen Korrekturfaktor für Dreiecke anwendet, die keinen rechten Winkel aufweisen.

### Die mathematischen Formeln
Für um ein Dreieck mit den Seiten $a$, $b$, $c$ und den jeweils gegenüberliegenden Winkeln $A$, $B$, $C$:

* $$a^2 = b^2 + c^2 - 2bc \cdot \cos(A)$$
* $$b^2 = a^2 + c^2 - 2ac \cdot \cos(B)$$
* $$c^2 = a^2 + b^2 - 2ab \cdot \cos(C)$$

### Wann wird der Kosinussatz angewendet?
Dieses Verfahren ist bei folgenden Eingabeszenarien zu wählen:
1. **Kongruenzsatz SSS (Seite, Seite, Seite):** Wenn die Maße aller drei Seiten bekannt sind und die Innenwinkel berechnet werden sollen.
2. **Kongruenzsatz SWS (Seite, Winkel, Seite):** Wenn zwei Seiten und der genau von ihnen eingeschlossene Winkel bekannt sind.

---

## 2. Der Sinussatz

Der Sinussatz besagt, dass in jedem Dreieck das Verhältnis der Seitenlängen zum Sinus ihres jeweils gegenüberliegenden Winkels konstant ist. Dieses Verhältnis entspricht dem Durchmesser des Umkreises des Polygons.

### Die mathematische Formel
* $$\frac{a}{\sin(A)} = \frac{b}{\sin(B)} = \frac{c}{\sin(C)}$$

### Wann wird der Sinussatz angewendet?
Dieser Satz ist ideal für folgende Szenarien:
1. **Kongruenzsatz WSW (Winkel, Seite, Winkel):** Wenn zwei bekannte Winkel eine bestimmte Seite flankieren.
2. **Kongruenzsatz SSW oder WWS (Winkel, Winkel, Seite):** Wenn zwei Winkel und uma dem einen Winkel gegenüberliegende Seite bekannt sind.

---

## Algorithmische Entscheidungamatrix (SEO Target)

Die folgende Tabelle fasst zusammen, wie die Rechen-Engine unseres Tools beim Klicken entscheidet, welcher logische Ansatz gewählt wird:

| Struktureller Fall | Anfängliche Benutzerdaten | Angewendeter Start-Satz | Ziel des ersten Schritts |
| :--- | :--- | :--- | :--- |
| **SSS** | Seite a, Seite b, Seite c | Kosinussatz | Den ersten Winkel (A) isolieren und berechnen |
| **SWS** | Seiten b und c + Winkel A | Kosinussatz | Die Länge der gegenüberliegenden Seite (a) berechnen |
| **WSW** | Winkel A und B + Seite c | Innenwinkelsumme (180°) | Den dritten fehlenden Winkel (C) bestimmen |
| **WWS** | Winkel A und B + Seite a | Sinussatz | Die zweite gegenüberliegende Seite (b) isolieren |

---

## Geometrische Validierung und die Dreiecksungleichung

Kein trigonometrischer Algorithmus kann Berechnungen durchführen, ohne vorher den Filter der **Dreiecksungleichung** zu durchlaufen. Theoretisch muss für die Existenz eines Dreiecks die Summe der Längen zweier beliebiger Seiten strikt größer sein als die Länge der dritten Seite.

* Mathematischer Ausdruck: $$(a + b > c) \land (a + c > b) \land (b + c > a)$$

Falls diese Regel durch die eingegebenen Werte verletzt wird, gibt das Tool eine mathematische Ausnahme (Exception) aus. Dies verhindert, dass inkonsistente Daten strukturelle Berechnungen oder ingenieurtechnische Planungen verfälschen.

---

## Berechnung sekundärer Attribute: Umfang und Fläche

Nach der vollständigen Berechnung aller Seiten ermittelt das System die folgenden abgeleiteten Eigenschaften:

### Umfang
Der Umfang ($P$) ist die gesamte lineare Magnitude der Dreieckskontur:
* $$P = a + b + c$$

### Fläche über die Heronsche Formel
Wenn die direkte Höhe des Dreiecks nicht zur Verfügung steht, nutzt die Software die Heronsche Formel, basierend auf dem halben Umfang ($s = \frac{P}{2}$):
* $$\text{Fläche} = \sqrt{s \cdot (s - a) \cdot (s - b) \cdot (s - c)}$$

</details>