#!/usr/bin/env pwsh
<#
  DriAtelie Git Cleanup Script
  Remove arquivos compilados do Git sem deletar os arquivos locais
  
  Uso: .\cleanup-git.ps1
#>

Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║     DriAtelie Git Cleanup Helper      ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan

Write-Host "`n⚠️  Este script removerá do Git:" -ForegroundColor Yellow
Write-Host "  - Pasta target/" -ForegroundColor Yellow
Write-Host "  - Arquivos .class" -ForegroundColor Yellow
Write-Host "  - Pasta .m2/" -ForegroundColor Yellow
Write-Host "  - Cache do IDE (.idea, .vscode, etc.)" -ForegroundColor Yellow

Write-Host "`n💡 Os arquivos locais NÃO serão deletados, apenas removidos do Git" -ForegroundColor Green

$confirm = Read-Host "`nDeseja continuar? (s/n)"
if ($confirm -ne 's') {
    Write-Host "Cancelado." -ForegroundColor Yellow
    exit 0
}

Write-Host "`n🔄 Removendo arquivos do Git..." -ForegroundColor Cyan

# Remover target/ do Git
Write-Host "  - Removendo target/..." -ForegroundColor Gray
git rm -r --cached target/ 2>$null

# Remover .class files do Git
Write-Host "  - Removendo *.class..." -ForegroundColor Gray
git rm -r --cached '*.class' 2>$null

# Remover .m2/ do Git
Write-Host "  - Removendo .m2/..." -ForegroundColor Gray
git rm -r --cached .m2/ 2>$null

# Remover IDE folders
Write-Host "  - Removendo .idea/..." -ForegroundColor Gray
git rm -r --cached .idea/ 2>$null

Write-Host "  - Removendo .vscode/..." -ForegroundColor Gray
git rm -r --cached .vscode/ 2>$null

Write-Host "`n📝 Adicionando commit para remover arquivos..." -ForegroundColor Cyan
git add .gitignore
git commit -m "chore: remove target/ and compiled files from git (fix .gitignore)"

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Limpeza concluída com sucesso!" -ForegroundColor Green
    Write-Host "`n📌 Próximas ações:" -ForegroundColor Green
    Write-Host "  1. Execute: git log --oneline -3 (para ver o novo commit)" -ForegroundColor Green
    Write-Host "  2. Execute: .\build-and-run.ps1 -Run (para reconstruir o projeto)" -ForegroundColor Green
    Write-Host "  3. Compartilhe as mudanças com seus colegas: git pull / git push" -ForegroundColor Green
} else {
    Write-Host "`n⚠️  Nada foi modificado (arquivos já estavam fora do Git ou não existem)." -ForegroundColor Yellow
}

Write-Host "`n✨ Done!" -ForegroundColor Green
