# ./deploy.sh
#!/bin/bash
# ==============================================================================
# CHECK LOCAL DE INTEGRIDADE - SCAL4R (2026)
# Provedor de compilação atômica para validação pré-push
# ==============================================================================

# Interrompe o script se houver qualquer falha
set -e

echo "🧹 [1/2] Limpando caches locais e builds antigos..."
rm -rf public
rm -rf resources
rm -rf .hugo_build_lock

echo "🔍 [2/2] Verificando integridade do build local com minificação nativa..."
# --gc limpa os hashes de imagens e assets antigos do banco de dados do Hugo
hugo --gc --minify

echo "========================================================================"
echo "✅ Build local gerado com sucesso em ./public."
echo "Revise os arquivos locais. Se tudo estiver OK, execute:"
echo "git add . && git commit -m 'feat: refactor architecture' && git push"
echo "========================================================================"