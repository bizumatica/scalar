---
title: "Calculadora de Sub-rede IPv4 (CIDR)"
description: "Calcule sub-redes IPv4, máscaras de rede, endereços de broadcast e IPs úteis em tempo real. Planeje sua infraestrutura com precisão e performance."
date: 2026-05-26
layout: "single"
tool_partial: "calculadora-cidr"
icon: "network"
categories: ["Computação"]
math: true
keywords: ["calculadora cidr", "sub-rede ipv4", "máscara de rede", "calcular ip", "infraestrutura de rede", "broadcast ip"]
---

O planejamento de topologias de rede e a segmentação de endereços IP são fundamentais para garantir a segurança, o isolamento e a eficiência do roteamento em infraestruturas locais e em nuvem (como AWS VPCs e Google Cloud Subnets). No **Scalar**, nossa calculadora realiza o parsing binário instantâneo de prefixos CIDR (*Classless Inter-Domain Routing*), traduzindo máscaras complexas em intervalos endereçáveis exatos.

Insira qualquer endereço IPv4 junto ao seu prefixo de rota correspondente para obter o mapeamento completo da sub-rede sem a necessidade de conversões manuais em álgebra booleana.

## Arquitetura de Máscaras e Roteamento Classless

A transição do modelo antigo baseado em classes rígidas (Classe A, B e C) para o sistema **CIDR** mitigou o esgotamento precoce do espaço de endereçamento IPv4. A máscara de sub-rede define a fronteira exata entre os bits destinados à identificação da rede (*Network ID*) e os bits alocados para os hosts (*Host ID*).

* **Prefixos Curtos (/8 a /16):** Geralmente atribuídos a backbones de provedores (ISPs) ou grandes redes corporativas centrais.
* **Prefixos de Distribuição (/22 a /24):** O padrão comum para redes locais (LANs), segmentando até 254 hosts por interface.
* **Prefixos de Alta Densidade (/27 a /30):** Utilizados para isolar zonas de DMZ, clusters de banco de dados ou sub-redes de gerência.

<details>
<summary>Cálculos Bitwise e Exceções RFC: Como o motor funciona? (Ver Teoria)</summary>

## A Matemática por Trás do CIDR

Cada endereço IPv4 é uma sequência de 32 bits dividida em quatro octetos. Quando você seleciona um prefixo como o `/24`, o motor do **Scalar** cria uma máscara binária preenchendo os primeiros 24 bits com `1` e os 8 bits restantes com `0`.

$$\text{Máscara } /24 = 11111111.11111111.11111111.00000000 \rightarrow 255.255.255.0$$

As operações lógicas executadas a nível de hardware e reproduzidas na nossa ferramenta utilizam os operadores **AND** e **NOT**:

* **Endereço de Rede:** Obtido através do bitwise AND entre o IP informado e a máscara: $\text{Rede} = \text{IP} \text{ AND } \text{Máscara}$.
* **Endereço de Broadcast:** Identificado ao aplicar o bitwise OR com a negação da máscara: $\text{Broadcast} = \text{Rede} \text{ OR } (\text{NOT } \text{Máscara})$.

### A Exceção Crítica da RFC 3021 (Links /31)

Em links ponto-a-ponto entre roteadores principais, o desperdício de dois endereços por sub-rede (Rede e Broadcast) tornava-se insustentável. A especificação **RFC 3021** alterou essa regra para prefixos `/31`, permitindo que ambos os endereços gerados sejam atribuídos diretamente às interfaces. O **Scalar** implementa essa validação automaticamente, removendo a linha de broadcast tradicional e alocando os dois únicos IPs disponíveis como utilizáveis.

</details>

## Como Calcular Intervalos Manualmente?

Para realizar auditorias rápidas em tabelas de roteamento sem uma ferramenta em mãos, utilize o método das potências de base 2:

1. Subtraia o prefixo CIDR de 32 (ex: $32 - 26 = 6$ bits de host).
2. Calcule o tamanho total do bloco calculando $2^6 = 64$ endereços totais.
3. Subtraia 2 para obter os hosts úteis ($64 - 2 = 62$).
4. Os limites das redes serão múltiplos do tamanho do bloco (0, 64, 128, 192...).

O **Scalar** elimina o risco de erros de cálculo booleano em homologações de infraestrutura, gerando mapas limpos e prontos para aplicação em firewalls e roteadores.