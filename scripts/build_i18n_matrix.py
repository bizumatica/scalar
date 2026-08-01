#!/usr/bin/env python3
"""
Build i18n Matrix Generator - Project Scalar
Gerador/Atualizador Automático de Idiomas do Project Scalar.

Uso: python3 scripts/build_i18n_matrix.py
"""

import os
import re
import time
from deep_translator import GoogleTranslator

TARGET_LANGS = {
    "pt-br": "pt",
    "de": "de",
    "en": "en",
    "es": "es",
    "fr": "fr",
    "ja": "ja"
}

OUTPUT_DIR = "i18n"

# =============================================================================
# MATRIZ CENTRAL DE FERRAMENTAS (FONTE ÚNICA DA VERDADE - APENAS PT-BR)
# =============================================================================
BASE_DATA_PT = {
    # -------------------------------------------------------------------------
    # Ferramenta 01: Calculadora CIDR
    # -------------------------------------------------------------------------
    "calculadora-cidr": {
        "label_ip": "Endereço IP Base",
        "label_prefix": "Máscara / Prefixo (CIDR)",
        "btn_calc": "Calcular Sub-rede",
        "res_mask": "Máscara de Sub-rede",
        "res_net": "ID de Rede",
        "res_broad": "Endereço de Broadcast",
        "res_range": "Faixa de IPs Utilizáveis",
        "res_hosts": "Hosts Válidos",
        "single_host": "N/A (Host único)",
        "rfc_3021": "2 (RFC 3021)"
    },

    # -------------------------------------------------------------------------
    # Ferramenta 02: Lei dos Senos e Cossenos
    # -------------------------------------------------------------------------
    "calculadora-lei-senos-cossenos": {
        "badge_engine": "ENGINE INTERATIVA",
        "instruction": "Insira exatamente 3 valores conhecidos para calcular os demais componentes.",
        "label_a": "Lado a",
        "label_b": "Lado b",
        "label_c": "Lado c",
        "label_ang_a": "Ângulo A (°)",
        "label_ang_b": "Ângulo B (°)",
        "label_ang_c": "Ângulo C (°)",
        "btn_calc": "Calcular",
        "btn_clear": "Limpar",
        "res_perimeter": "Perímetro",
        "res_area": "Área",
        "res_steps": "Detalhamento e Passos",
        "err_3_vals": "Erro: Insira exatamente 3 valores conhecidos.",
        "err_need_side": "Erro: Pelo menos um dos valores inseridos deve ser um Lado.",
        "err_sum_angles": "Erro: A soma dos ângulos fornecidos deve ser estritamente menor que 180°.",
        "err_triangle_ineq": "Erro Geométrico: A soma de dois lados deve ser maior que o terceiro (Desigualdade Triangular).",
        "err_impossible": "Erro Geométrico: Impossível construir um triângulo válido com estes dados.",
        "case_lll": "✔ Caso Detectado: LLL (Três Lados Conhecidos).",
        "case_lal": "✔ Caso Detectado: LAL (Dois Lados e Ângulo Compreendido).",
        "case_ala": "✔ Caso Detectado: ALA / AAL (Dois Ângulos e Um Lado).",
        "case_lla": "✔ Caso Detectado: LLA (Dois Lados e Ângulo Oposto via Lei dos Senos)."
    },

    # -------------------------------------------------------------------------
    # Ferramenta 03: Conversor de Bases Numéricas
    # -------------------------------------------------------------------------
    "conversor-bases": {
        "instruction": "Digite um número em qualquer um dos campos abaixo. A conversão em tempo real atualizará todas as outras bases instantaneamente.",
        "label_dec": "Decimal (Base 10)",
        "label_bin": "Binário (Base 2)",
        "label_hex": "Hexadecimal (Base 16)",
        "label_oct": "Octal (Base 8)",
        "label_custom": "Base Personalizada (2-36)",
        "label_select_base": "Escolha a Base:",
        "placeholder_custom": "Valor na base selecionada...",
        "btn_clear": "Limpar Todos os Campos"
    },

    # -------------------------------------------------------------------------
    # Ferramenta 04: Conversor de Bytes / Memória
    # -------------------------------------------------------------------------
    "conversor-bytes": {
        "instruction": "Digite um valor em qualquer unidade de armazenamento abaixo. A conversão em tempo real atualizará todas as outras unidades instantaneamente.",
        "unit_bit": "Bit (b)",
        "unit_byte": "Byte (B)",
        "unit_kb": "Kilobyte (KB)",
        "unit_mb": "Megabyte (MB)",
        "unit_gb": "Gigabyte (GB)",
        "unit_tb": "Terabyte (TB)",
        "unit_pb": "Petabyte (PB)",
        "unit_kib": "Kibibyte (KiB)",
        "unit_mib": "Mebibyte (MiB)",
        "unit_gib": "Gibibyte (GiB)",
        "btn_clear": "Limpar Todos os Campos"
    },

    # -------------------------------------------------------------------------
    # Ferramenta 05: Conversor de Comprimento
    # -------------------------------------------------------------------------
    "conversor-comprimento": {
        "instruction": "Digite um valor em qualquer unidade de comprimento abaixo. A conversão em tempo real atualizará todas as outras unidades instantaneamente.",
        "unit_km": "Quilômetro (km)",
        "unit_m": "Metro (m)",
        "unit_cm": "Centímetro (cm)",
        "unit_mm": "Milímetro (mm)",
        "unit_um": "Micrômetro (µm)",
        "unit_nm": "Nanômetro (nm)",
        "unit_mi": "Milha (mi)",
        "unit_nmi": "Milha Náutica (nmi)",
        "unit_yd": "Jarda (yd)",
        "unit_ft": "Pé (ft)",
        "unit_in": "Polegada (in)",
        "btn_clear": "Limpar Todos os Campos"
    },

    # -------------------------------------------------------------------------
    # Ferramenta 06: Conversor de Temperatura
    # -------------------------------------------------------------------------
    "conversor-temperatura": {
        "instruction": "Digite um valor de temperatura em qualquer uma das unidades abaixo para converter em tempo real.",
        "unit_celsius": "Celsius (°C)",
        "unit_fahrenheit": "Fahrenheit (°F)",
        "unit_kelvin": "Kelvin (K)",
        "unit_rankine": "Rankine (°R)",
        "unit_reaumur": "Réaumur (°Ré)",
        "btn_clear": "Limpar Todos os Campos"
    },

    # -------------------------------------------------------------------------
    # Ferramenta 07: Fração Geratriz
    # -------------------------------------------------------------------------
    "fracao-geratriz": {
        "instruction": "Insira um decimal exato ou dízima periódica para encontrar sua fração geratriz irredutível.",
        "label_decimal_value": "Valor Decimal (Ex: 0.75, 0.333... ou 0.1(6))",
        "btn_calculate_fraction": "Calcular Fração",
        "btn_clear": "Limpar",
        "label_irreducible_fraction": "Fração Irredutível",
        "label_step_by_step_logic": "Lógica Passo a Passo",
        "msg_waiting_input_math": "Digite um número acima para ver a explicação matemática...",
        "err_invalid_decimal": "Formato decimal inválido. Use formatos como 0.75, 0.333... ou 0.1(6).",
        "type_exact": "Decimal Exato (Finito)",
        "type_simple": "Dízima Periódica Simples",
        "type_compound": "Dízima Periódica Composta",
        "type_integer": "Número Inteiro",
        "step_classification": "1. Classificação:",
        "step_base_assembly": "2. Montagem da Fração Geratriz:",
        "step_simplification": "3. Simplificação pelo Algoritmo de Euclides:",
        "label_gcd": "Máximo Divisor Comum (MDC):",
        "step_final_result": "4. Fração Irredutível Resultante:"
    },

    # -------------------------------------------------------------------------
    # Ferramenta 08: MDC e MMC
    # -------------------------------------------------------------------------
    "mdc-mmc": {
        "instruction": "Insira inteiros positivos nos campos abaixo para obter o Máximo Divisor Comum (MDC) e o Mínimo Múltiplo Comum (MMC).",
        "label_number_a": "Número A",
        "label_number_b": "Número B",
        "ph_number_a": "Ex: 24",
        "ph_number_b": "Ex: 36",
        "btn_calculate": "Calcular MDC & MMC",
        "btn_clear": "Limpar",
        "label_mdc_title": "MDC (Máximo Divisor Comum)",
        "label_mmc_title": "MMC (Mínimo Múltiplo Comum)",
        "label_step_by_step": "Decomposição e Algoritmo de Euclides",
        "msg_waiting_input": "Insira dois números maiores que zero para visualizar o cálculo detalhado...",
        "err_invalid_positive": "Erro: Digite apenas números inteiros estritamente maiores que zero (> 0)."
    },

    # -------------------------------------------------------------------------
    # Ferramenta 09: Planejador de Sub-rede VPC
    # -------------------------------------------------------------------------
    "planejador-subrede-vpc": {
        "instruction": "Planeje a divisão binária de blocos CIDR em duas sub-redes equivalentes considerando regras e reservas de IPs de provedores de nuvem.",
        "label_ip": "Endereço IP Base:",
        "label_mask": "Máscara CIDR Pai:",
        "label_provider": "Provedor de Nuvem:",
        "prov_standard": "Padrão RFC (2 IPs Reservados)",
        "prov_aws": "Amazon Web Services (AWS - 5 IPs Reservados)",
        "prov_gcp": "Google Cloud Platform (GCP - 4 IPs Reservados)",
        "prov_azure": "Microsoft Azure (5 IPs Reservados)",
        "btn_reset": "Restaurar Padrão",
        "subnet_a": "Sub-rede A (Pública / Metade Inferior)",
        "subnet_b": "Sub-rede B (Privada / Metade Superior)",
        "res_net": "Endereço de Rede:",
        "res_mask": "Máscara de Sub-rede:",
        "res_first": "Primeiro IP Útil:",
        "res_last": "Último IP Útil:",
        "res_bcast": "Endereço de Broadcast:",
        "res_hosts": "Hosts Úteis:",
        "err_format": "Formato de endereço IP inválido (Use X.X.X.X).",
        "err_range": "Cada octeto do IP deve estar entre 0 e 255.",
        "err_small": "O prefixo pai deve ser /30 ou menor para permitir divisão binária em sub-redes."
    },

    # -------------------------------------------------------------------------
    # Ferramenta 10: Regra de Três Simples e Composta
    # -------------------------------------------------------------------------
    "regra-de-tres": {
        "tab_simple": "Simples (2 Grandezas)",
        "tab_compound": "Composta (3 Grandezas)",
        "label_val_a1": "Grandeza A (1)",
        "label_val_a2": "Está para... (2)",
        "label_rel_a": "Relação A -> X",
        "label_val_b1": "Grandeza B (1)",
        "label_res_x": "Resultado Incógnita (X)",
        "label_val_c1": "Grandeza C (1)",
        "label_val_c2": "Está para... (2)",
        "label_rel_c": "Relação C -> X",
        "opt_direct": "DIRETA",
        "opt_inverse": "INVERSA",
        "btn_clear": "Limpar",
        "err_div_zero": "Erro: Divisão por Zero"
    }
}

def translate_text(text: str, target_lang_code: str) -> str:
    if target_lang_code == "pt":
        return text
    try:
        translated = GoogleTranslator(source='pt', target=target_lang_code).translate(text)
        return translated if translated else text
    except Exception as e:
        print(f"  ⚠️ Falha ao traduzir '{text}' para [{target_lang_code}]: {e}")
        return text

def sanitize_toml_value(text: str) -> str:
    return text.replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ')

def remove_existing_solvers_blocks(file_content: str) -> str:
    pattern = r'\[solvers\..*?\](?:\n.*?)*(?=\n\[|\Z)'
    cleaned = re.sub(pattern, '', file_content, flags=re.DOTALL)
    return cleaned.strip()

def merge_and_save_toml():
    print(f"🚀 Processando {len(BASE_DATA_PT)} ferramenta(s) na matriz i18n...")
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for lang_hugo, lang_code in TARGET_LANGS.items():
        toml_path = os.path.join(OUTPUT_DIR, f"{lang_hugo}.toml")
        
        existing_content = ""
        if os.path.exists(toml_path):
            with open(toml_path, "r", encoding="utf-8") as f:
                existing_content = f.read()

        base_content = remove_existing_solvers_blocks(existing_content)

        new_solvers_lines = [
            "\n# ==========================================================================",
            "# SEÇÃO AUTOMÁTICA DE SOLVERS - PROJECT SCALAR",
            "# ==========================================================================\n"
        ]

        for slug, keys_dict in BASE_DATA_PT.items():
            print(f"  └─ [{lang_hugo.upper()}] Compilando solver: {slug}...")
            new_solvers_lines.append(f"[solvers.{slug}]")
            
            for key, original_text in keys_dict.items():
                if lang_hugo == "pt-br":
                    translated_val = original_text
                else:
                    translated_val = translate_text(original_text, lang_code)
                    time.sleep(0.04)
                
                clean_val = sanitize_toml_value(translated_val)
                new_solvers_lines.append(f'{key} = "{clean_val}"')
            
            new_solvers_lines.append("")

        final_content = base_content + "\n" + "\n".join(new_solvers_lines)

        with open(toml_path, "w", encoding="utf-8") as f:
            f.write(final_content.strip() + "\n")
            
        print(f"  ✔ {toml_path} atualizado!")

    print("\n✨ Sucesso! Todas as 10 ferramentas foram sincronizadas.")

if __name__ == "__main__":
    merge_and_save_toml()