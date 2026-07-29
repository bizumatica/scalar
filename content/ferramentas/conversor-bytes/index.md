---
title: "Conversor de Unidades de Memória (SI vs IEC): Bits, Bytes, MB e MiB"
description: "Converta entre Bits, Bytes, KB, MB, GB e as unidades de precisão binária KiB, MiB, GiB. Entenda a diferença entre a base 10 e a base 2."
date: 2024-05-25
icon: "database"
keywords: ["conversor de bytes", "diferença KB e KiB", "converter megabytes para mebibytes", "unidades de armazenamento"]
slug: "conversor-bytes"
---

Na engenharia de computação, a ambiguidade na medição de dados pode causar erros de cálculo e confusão em especificações técnicas. No **Scalar**, nossa ferramenta realiza a conversão precisa entre os dois padrões globais de medição.

Basta inserir o valor em qualquer campo para obter a conversão instantânea em todas as unidades.

## Entendendo a Diferença: SI vs IEC

A confusão ocorre porque existem dois padrões principais para definir o que é um "Kilo" no mundo digital:

* **Padrão SI (Sistema Internacional - Base 10):** É o padrão utilizado por fabricantes de hardware (HDs, SSDs, Pendrives). Aqui, **1 Kilobyte (KB) = 1.000 Bytes**.
* **Padrão IEC (International Electrotechnical Commission - Base 2):** É o padrão utilizado por sistemas operacionais (Windows, Linux) e arquiteturas de memória RAM. Aqui, **1 Kibibyte (KiB) = 1.024 Bytes**.

<details>
<summary>Por que meu HD parece ter menos espaço do que o anunciado? (Ver Teoria)</summary>

## O "Dilema do Fabricante"

Você já comprou um HD de **500 GB** e, ao plugar no computador, o Windows mostrou apenas cerca de **465 GiB**? Isso não é um defeito, é apenas uma diferença de unidades:

1. O fabricante vende o disco usando o padrão **SI (Base 10)**: 500.000.000.000 Bytes.
2. O sistema operacional lê esses mesmos Bytes usando o padrão **IEC (Base 2)**.

### Tabela Comparativa de Unidades

| Sufixo (SI) | Base 10 | Sufixo (IEC) | Base 2 |
| :--- | :--- | :--- | :--- |
| **KB** (Kilo) | 10³ | **KiB** (Kibi) | 2¹⁰ (1.024) |
| **MB** (Mega) | 10⁶ | **MiB** (Mebi) | 2²⁰ (1.048.576) |
| **GB** (Giga) | 10⁹ | **GiB** (Gibi) | 2³⁰ (1.073.741.824) |
| **TB** (Tera) | 10¹² | **TiB** (Tebi) | 2⁴⁰ (1.099.511.627.776) |

</details>

## Como calcular manualmente?

Para converter de uma unidade SI para uma unidade IEC correspondente (ex: MB para MiB):

1. Transforme o valor total para a unidade base (**Bytes**).
2. Divida o total de Bytes pelo fator da base 2 (ex: por 1.048.576 para obter MiB).

O **Scalar** automatiza esse processo, garantindo que você não cometa erros de arredondamento em cálculos de largura de banda ou dimensionamento de servidores.
