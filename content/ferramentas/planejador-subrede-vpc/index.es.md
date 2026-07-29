---
title: "Planificador de Subredes VPC: División de Bloques CIDR para la Nube"
description: "Planifique y divida el bloque CIDR de su VPC de forma binaria en subredes públicas y privadas. Calcule IPs utilizables para AWS, GCP y Azure."
date: 2026-06-30
categories: ["infraestructura", "ingenieria"]
layout: "single"
icon: "subnet_stack"
math: "true"
slug: "planificador-subredes-vpc"
---

Esta herramienta interactiva permite a arquitectos de nube y ingenieros DevOps planificar la topología de red de una **Virtual Private Cloud (VPC)**. El motor algorítmico recibe un bloque CIDR principal y realiza la división binaria del espacio de direccionamiento, calculando automáticamente los límites de broadcast, máscaras de subred y el total de direcciones IP utilizables para proveedores como AWS, Google Cloud y Azure.

<details>
<summary>Contenido Técnico: Arquitectura de Redes y Subnetting en Nube Corporativa</summary>

## Introducción al Direccionamiento IP en Entornos VPC

En la arquitectura de sistemas moderna, una **VPC (Virtual Private Cloud)** funciona como una red lógicamente aislada dentro de la nube pública. El diseño correcto del espacio de direccionamiento IP, utilizando la notación **CIDR (Classless Inter-Domain Routing)**, es crucial para evitar el agotamiento de IPs, prevenir la superposición de redes (*overlapping*) y garantizar el aislamiento de seguridad adecuado entre los recursos.

La segmentación de un bloque CIDR principal en particiones menores se denomina **subnetting**, un proceso puramente matemático basado en álgebra booleana.

---

## 1. El Concepto de Máscara CIDR y División Binaria

Una dirección IPv4 está compuesta por 32 bits, divididos en cuatro octetos. En la notación CIDR (ej.: `/16`), el número tras la barra representa los bits fijos de red (máscara de red), mientras que los bits restantes se destinan a los hosts de dicha red.

Cuando dividimos un bloque binariamente (ej.: dividir un bloque `/16` en dos bloques `/17`), estamos alterando el bit más significativo disponible del ámbito de host al ámbito de red:

* **Bloque Padre:** `10.0.0.0/16` (65.536 direcciones)
* **Subred A (Bit 0):** `10.0.0.0/17` (32.768 direcciones)
* **Subred B (Bit 1):** `10.0.128.0/17` (32.768 direcciones)

---

## 2. Subredes Públicas vs. Privadas y Tablas de Enrutamiento

En una arquitectura multicapa (*Multi-Tier Architecture*), las subredes se dividen según sus políticas de enrutamiento internas gestionadas mediante las tablas de rutas (*Route Tables*):

### Subredes Públicas (Public Subnets)

Poseen una ruta directa hacia un **Internet Gateway (IGW)**. Los recursos asignados aquí reciben IPs públicas y son accesibles directamente desde Internet (ej.: Load Balancers, Bastion Hosts).

### Subredes Privadas (Private Subnets)

No poseen ruta directa desde el exterior. Para que instancias de bases de datos o microservicios descarguen actualizaciones, el tráfico de salida se canaliza a través de un **NAT Gateway** alojado en la subred pública.

### Ejemplo Práctico de Matriz de Enrutamiento VPC

| Destino (Destination) | Objetivo de Salida (Target) | Tipo de Subred | ¿Permite Tráfico Externo? |
| :--- | :--- | :--- | :--- |
| `10.0.0.0/16` | `local` | Pública y Privada | Solo comunicación interna de la VPC. |
| `0.0.0.0/0` | `igw-xxxxxxxx` | Pública | Sí, entrada y salida directa a Internet. |
| `0.0.0.0/0` | `nat-xxxxxxxx` | Privada | Solo salida (ej.: actualizaciones de servidores). |

---

## Reglas de Descuento de IPs por Proveedor Cloud

Al diseñar subredes, el ingeniero debe considerar que el número de hosts utilizables en la nube **no es equivalente** al cálculo tradicional de redes físicas ($2^{32-n} - 2$). Los grandes proveedores reservan direcciones para servicios de infraestructura interna:

| Proveedor | IPs Reservadas por Subred | Motivo de la Reserva |
| :--- | :--- | :--- |
| **Estándar RFC** | 2 IPs | Dirección de Red (`.0`) y Broadcast (`.255`). |
| **AWS** | **5 IPs** | Red, Router VPC, DNS Interno, Uso Futuro y Broadcast. |
| **Google Cloud** | **4 IPs** | Red, Gateway predeterminado, Penúltima IP (Reserva) y Broadcast. |
| **Azure** | **5 IPs** | Red, Gateway Azure, DNS Azure, Uso Futuro y Broadcast. |

---

## Expresión Matemática para el Cálculo de Alcance de IPs

El número total de direcciones IP teóricas ($N$) contenidas en un sufijo CIDR ($s$) se determina mediante la ecuación exponencial:

$$N = 2^{32 - s}$$

Para calcular la cantidad de hosts reales utilizables ($H$) dentro de AWS, por ejemplo, restamos las 5 IPs reservadas de la infraestructura propietaria:

$$H = 2^{32 - s} - 5$$

Si la regla matemática devuelve un valor menor o igual a cero, el bloque CIDR seleccionado se considera inválido o demasiado pequeño para soportar una topología de nube estable.

---

## Preguntas Frecuentes sobre Subredes VPC (FAQ Target)

### ¿Qué sucede si existe superposición (overlapping) de bloques CIDR?

Dos redes con bloques CIDR superpuestos no pueden establecer conexiones de VPC Peering ni túneles VPN híbridos (Site-to-Site), dado que los enrutadores no pueden determinar el destino correcto de los paquetes.

### ¿Por qué AWS reserva exactamente 5 direcciones IP?

AWS reserva la IP `.0` para la red, `.1` para el enrutador interno, `.2` para el servidor DNS de la VPC, `.3` para uso futuro del proveedor y la última IP de la subred para la dirección de broadcast.

</details>
