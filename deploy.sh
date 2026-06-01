#!/usr/bin/env bash
# ==============================================================================
# CHECK LOCAL DE INTEGRIDADE - SCAL4R (2026)
# Provedor de compilação atômica para validação pré-push
# ==============================================================================

set -e

# Cores para feedback no terminal Linux/Mac
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

echo -e "${CYAN}🧹 [1/3] Limpando caches locais, resíduos de locks e assets mortos...${NC}"

# Remove as pastas de build e os geradores de hash internos
rm -rf public
rm -rf resources
rm -rf .hugo_build_lock

# Purga preventiva do cache de desenvolvimento do Hugo na máquina local
if [ -d "$HOME/.cache/hugo_cache" ]; then
    rm -rf "$HOME/.cache/hugo_cache"
    echo -e "${GREEN}✔ Cache interno de assets (~/.cache/hugo_cache) purgado.${NC}"
fi

echo -e "${CYAN}🔍 [2/3] Verificando integridade do build local com minificação ativa...${NC}"
hugo --gc --minify

echo -e "${CYAN}🧪 [3/3] Validando árvore de renderização pós-compilação...${NC}"
# Garante que os scripts críticos foram realmente injetados na pasta final
if [ -d "public/ferramentas" ]; then
    echo -e "${GREEN}✔ Direto de ferramentas gerado corretamente.${NC}"
else
    echo -e "${YELLOW}⚠ Aviso: Pasta de ferramentas não encontrada em ./public. Verifique o build.${NC}"
fi

echo "========================================================================"
echo -e "${GREEN}✅ Build local gerado com sucesso em ./public.${NC}"
echo "Revise os arquivos locais. Se tudo estiver OK, execute:"
echo -e "${YELLOW}git add . && git commit -m 'feat: pipeline asset optimization' && git push${NC}"
echo "========================================================================"