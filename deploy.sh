# deploy.sh revisado para Check Local
#!/bin/bash
echo "🔍 Verificando integridade do build local..."
rm -rf public
hugo --gc --minify --cleanDestinationDir
echo "✅ Build gerado em ./public. Se estiver OK, faça o git push."