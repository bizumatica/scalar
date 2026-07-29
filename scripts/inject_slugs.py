#!/usr/bin/env python3
import os

# Mapeamento semântico sênior para as URLs em Inglês (SEO Tier 1)
SLUG_MAP_EN = {
    "calculadora-cidr": "cidr-calculator",
    "calculadora-lei-senos-cossenos": "law-of-sines-cosines-calculator",
    "conversor-bases": "base-converter",
    "conversor-bytes": "bytes-converter",
    "conversor-comprimento": "length-converter",
    "conversor-temperatura": "temperature-converter",
    "fracao-geratriz": "generating-fraction",
    "mdc-mmc": "gcd-lcm",
    "planejador-subrede-vpc": "vpc-subnet-planner",
    "regra-de-tres": "rule-of-three"
}

def inject_slug_to_frontmatter(file_path, slug_value):
    if not os.path.exists(file_path):
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Guarda de segurança: não sobrescreve ou duplica se o slug já foi configurado
    if 'slug:' in content:
        print(f"[-] Pulado (Slug já existe): {file_path}")
        return

    # Divide o arquivo pelos delimitadores do Front Matter do Hugo (---)
    parts = content.split('---')
    
    if len(parts) >= 3:
        # Injeta a linha do slug logo antes do fechamento do segundo ---
        parts[1] = parts[1].rstrip() + f'\nslug: "{slug_value}"\n'
        new_content = '---'.join(parts)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"[+] Injetado com sucesso ({slug_value}): {file_path}")
    else:
        print(f"[!] Erro de sintaxe no Front Matter do arquivo: {file_path}")

def main():
    current_dir = "."
    
    for folder in os.listdir(current_dir):
        folder_path = os.path.join(current_dir, folder)
        
        # Garante que estamos processando apenas os diretórios mapeados
        if os.path.isdir(folder_path) and folder in SLUG_MAP_EN:
            # 1. Processa o arquivo em Português (O slug assume o próprio nome da pasta)
            pt_file = os.path.join(folder_path, "index.md")
            inject_slug_to_frontmatter(pt_file, folder)
            
            # 2. Processa o arquivo em Inglês (Busca a tradução correta no mapa)
            en_file = os.path.join(folder_path, "index.en.md")
            inject_slug_to_frontmatter(en_file, SLUG_MAP_EN[folder])

if __name__ == "__main__":
    main()