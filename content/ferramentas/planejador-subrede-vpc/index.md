---
title: "Planejador de Sub-rede VPC: Divisão de Blocos CIDR para Nuvem"
description: "Planeje e divida o bloco CIDR da sua VPC de forma binária em sub-redes públicas e privadas. Calcule IPs utilizáveis e ranges de rede para AWS, GCP e Azure."
date: 2026-06-30
categories: ["infraestrutura", "engenharia"]
layout: "single"
icon: "subnet_stack"
slug: "planejador-subrede-vpc"
---

Esta ferramenta interativa permite a arquitetos de nuvem e engenheiros DevOps planejar a topologia de rede de uma Virtual Private Cloud (VPC). O motor algorítmico recebe um bloco CIDR principal e realiza a divisão binária do espaço de endereçamento, calculando automaticamente os limites de broadcast, máscaras de sub-rede e o total de endereços IP utilizáveis para provedores como AWS, Google Cloud e Azure.

<details>
<summary>Conteúdo Técnico: Arquitetura de Redes e Sub-netting em Nuvem Corporativa</summary>

## Introdução ao Endereçamento IP em Ambientes VPC

Na arquitetura de sistemas moderna, uma **VPC (Virtual Private Cloud)** funciona como uma rede logicamente isolada dentro da nuvem pública. O planejamento correto do espaço de endereçamento IP, utilizando a notação **CIDR (Classless Inter-Domain Routing)**, é crucial para evitar o esgotamento de IPs, prevenir sobreposição de redes (*overlapping*) e garantir o isolamento de segurança adequado entre os recursos.

A segmentação de um bloco CIDR principal em partições menores é chamada de **sub-netting**, um processo puramente matemático baseado em álgebra booleana.

---

## 1. O Conceito de Máscara CIDR e Divisão Binária

Um endereço IPv4 é composto por 32 bits, divididos em quatro octetos. Na notação CIDR (ex: `/16`), o número após a barra representa os bits fixos da rede (máscara de rede), enquanto os bits restantes são destinados aos hosts daquela rede.

Quando dividimos um bloco binariamente (ex: quebrar um bloco `/16` em dois blocos `/17`), estamos alterando o bit mais significativo disponível do escopo de host para o escopo de rede:

* **Bloco Pai:** `10.0.0.0/16` (65.536 endereços)
* **Sub-rede A (Bit 0):** `10.0.0.0/17` (32.768 endereços)
* **Sub-rede B (Bit 1):** `10.0.128.0/17` (32.768 endereços)

---

## 2. Sub-redes Públicas vs. Privadas e Tabelas de Roteamento

Em uma arquitetura de múltiplas camadas (*Multi-Tier Architecture*), as sub-redes são divididas de acordo com suas políticas de roteamento internas gerenciadas pelas tabelas de rotas:

### Sub-redes Públicas (Public Subnets)
Possuem uma rota direta para um **Internet Gateway (IGW)**. Recursos alocados aqui recebem IPs públicos e são acessíveis diretamente pela internet (ex: Load Balancers, Bastion Hosts).

### Sub-redes Privadas (Private Subnets)
Não possuem rota direta para a internet. Para que instâncias de banco de dados ou microsserviços baixem atualizações, o tráfego de saída deve ser direcionado através de um **NAT Gateway** hospedado na sub-rede pública.

### Exemplo Prático de Matriz de Roteamento VPC

| Alvo (Destination) | Alvo de Saída (Target) | Tipo de Sub-rede | Permite Tráfego Externo? |
| :--- | :--- | :--- | :--- |
| `10.0.0.0/16` | `local` | Pública e Privada | Apenas comunicação interna VPC. |
| `0.0.0.0/0` | `igw-xxxxxxxx` | Pública | Sim, saída e entrada diretas da Internet. |
| `0.0.0.0/0` | `nat-xxxxxxxx` | Privada | Apenas saída (ex: updates de servidores). |

---

## Regras de Desconto de IPs por Provedor Cloud (SEO Target)

Ao planejar sub-redes, o engenheiro precisa lembrar que o número de hosts utilizáveis na nuvem **não é igual** ao cálculo tradicional de redes físicas ($2^{32-n} - 2$). Os grandes provedores reservam endereços para serviços de infraestrutura interna:

| Provedor | IPs Reservados por Sub-rede | Motivo da Reserva |
| :--- | :--- | :--- |
| **Padrão RFC** | 2 IPs | Endereço de Rede (`.0`) e Broadcast (`.255`). |
| **AWS** | **5 IPs** | Rede, Router da VPC, DNS Interno, Uso Futuro e Broadcast. |
| **Google Cloud**| **4 IPs** | Rede, Gateway padrão, Penúltimo IP (Reserva) e Broadcast. |
| **Azure** | **5 IPs** | Rede, Gateway da Azure, DNS da Azure, Uso Futuro e Broadcast. |

---

## Expressão Matemática para Cálculo de Escopo de IPs

O número total de endereços IP teóricos ($N$) contidos em um sufixo CIDR ($s$) é determinado pela equação exponencial:

$$N = 2^{32 - s}$$

Para descobrir a quantidade de hosts reais utilizáveis ($H$) dentro da AWS, por exemplo, subtraímos os 5 IPs reservados da infraestrutura proprietária:

$$H = 2^{32 - s} - 5$$

Se a regra matemática retornar um valor menor ou igual a zero, o bloco CIDR escolhido é considerado inválido ou pequeno demais para suportar uma topologia de nuvem estável.

---

## Perguntas Frequentes sobre Sub-redes VPC (FAQ Target)

### O que acontece se houver sobreposição (overlapping) de blocos CIDR?
Duas redes com blocos CIDR sobrepostos não conseguem estabelecer conexões de VPC Peering ou conexões VPN híbridas locais (Site-to-Site), pois os roteadores não conseguem determinar o destino correto dos pacotes.

### Por que a AWS reserva justamente 5 endereços IP?
A AWS reserva o IP `.0` para a rede, `.1` para o roteador interno, `.2` para o servidor DNS da VPC, `.3` para uso futuro da empresa e o último IP da sub-rede para o endereço de broadcast.

</details>