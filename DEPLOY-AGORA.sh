#!/bin/bash

echo "🚀 DEPLOY AUTOMÁTICO - NOTIFICAÇÕES FENDA MUSIC"
echo "=============================================="
echo ""

# Configurar caminho do projeto
PROJECT_PATH="$1"

if [ -z "$PROJECT_PATH" ]; then
    echo "❌ ERRO: Especifique o caminho do projeto"
    echo "Uso: bash DEPLOY-AGORA.sh /caminho/do/projeto"
    exit 1
fi

if [ ! -d "$PROJECT_PATH" ]; then
    echo "❌ ERRO: Diretório não encontrado: $PROJECT_PATH"
    exit 1
fi

cd "$PROJECT_PATH" || exit 1

echo "✅ Diretório: $(pwd)"
echo ""

# Passo 1: Copiar player.html
echo "📋 PASSO 1: Copiando player.html..."
if [ -f "player.html" ]; then
    cp /mnt/user-data/outputs/player.html ./player.html
    SIZE=$(wc -c < ./player.html)
    LINES=$(wc -l < ./player.html)
    echo "✅ player.html copiado (${LINES} linhas, ${SIZE} bytes)"
else
    echo "⚠️ player.html não existe, criando cópia..."
    cp /mnt/user-data/outputs/player.html ./player.html
    echo "✅ player.html criado"
fi

# Passo 2: Copiar push-notifications-client-v6.js
echo ""
echo "📋 PASSO 2: Copiando push-notifications-client-v6.js..."
if [ -f "push-notifications-client-v6.js" ]; then
    rm push-notifications-client-v6.js
    echo "   (arquivo antigo removido)"
fi
cp /mnt/user-data/outputs/push-notifications-client-v6.js ./push-notifications-client-v6.js
SIZE=$(wc -c < ./push-notifications-client-v6.js)
LINES=$(wc -l < ./push-notifications-client-v6.js)
echo "✅ push-notifications-client-v6.js copiado (${LINES} linhas, ${SIZE} bytes)"

# Passo 3: Git commit e push
echo ""
echo "📋 PASSO 3: Fazendo commit e push no Git..."

# Verificar se git está inicializado
if [ ! -d ".git" ]; then
    echo "❌ ERRO: Repositório Git não encontrado"
    echo "   Execute: git init"
    exit 1
fi

# Adicionar arquivos
git add player.html push-notifications-client-v6.js
echo "✅ Arquivos adicionados ao staging"

# Fazer commit
git commit -m "fix: notificações v6 hybrid - força deploy"
if [ $? -ne 0 ]; then
    echo "⚠️ Nenhuma alteração para fazer commit (tudo está atualizado)"
else
    echo "✅ Commit realizado"
fi

# Push
echo ""
echo "Enviando para GitHub/Vercel..."
git push
if [ $? -eq 0 ]; then
    echo "✅ Push realizado com sucesso"
else
    echo "⚠️ Falha ao fazer push (verifique sua conexão)"
    exit 1
fi

# Passo 4: Resumo
echo ""
echo "=============================================="
echo "✅ DEPLOY CONCLUÍDO"
echo "=============================================="
echo ""
echo "Próximos passos:"
echo "1. Aguarde 30-60 segundos para Vercel fazer deploy"
echo "2. Abra: https://fendamusic.com.br/force-update.html"
echo "3. Abra: https://fendamusic.com.br/diagnostico-completo.html"
echo ""
echo "Se ainda não funcionar, abra uma issue no GitHub"
echo ""

