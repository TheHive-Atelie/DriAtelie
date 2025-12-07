#!/usr/bin/env pwsh
<#
  DriAtelie Build & Run Helper
  Uso: .\build-and-run.ps1 [opcao]
  
  Opções:
    -Clean       : Apenas limpa (mvn clean)
    -Build       : Limpa e constrói (mvn clean package -DskipTests)
    -Run         : Constrói e roda (mvn spring-boot:run)
    -Help        : Mostra esta mensagem
    
  Exemplo:
    .\build-and-run.ps1 -Clean
    .\build-and-run.ps1 -Build
    .\build-and-run.ps1 -Run
#>

param(
    [ValidateSet("Clean", "Build", "Run", "Help")]
    [string]$Action = "Run"
)

function Show-Help {
    Get-Content $PSCommandPath | Select-String "^  " | ForEach-Object { Write-Host $_.Line }
}

function Check-Prerequisites {
    Write-Host "`n🔍 Verificando pré-requisitos..." -ForegroundColor Cyan
    
    # Verificar Java
    try {
        $java = java -version 2>&1
        Write-Host "✅ Java instalado" -ForegroundColor Green
    } catch {
        Write-Host "❌ Java não encontrado. Instale Java 17+" -ForegroundColor Red
        exit 1
    }
    
    # Verificar MySQL (Windows)
    try {
        $mysqlService = Get-Service MySQL80 -ErrorAction SilentlyContinue
        if ($mysqlService -and $mysqlService.Status -eq "Running") {
            Write-Host "✅ MySQL está rodando" -ForegroundColor Green
        } else {
            Write-Host "⚠️  MySQL não está rodando. Iniciando..." -ForegroundColor Yellow
            Start-Service MySQL80 -ErrorAction SilentlyContinue
            Start-Sleep -Seconds 3
        }
    } catch {
        Write-Host "⚠️  Não foi possível verificar MySQL. Certifique-se de que está instalado e rodando." -ForegroundColor Yellow
    }
}

function Do-Clean {
    Write-Host "`n🧹 Limpando projeto..." -ForegroundColor Cyan
    .\mvnw clean
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Limpeza falhou!" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Projeto limpo com sucesso" -ForegroundColor Green
}

function Do-Build {
    Write-Host "`n🔨 Construindo projeto..." -ForegroundColor Cyan
    .\mvnw clean package -DskipTests
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Build falhou! Verifique os logs acima." -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Build completado com sucesso" -ForegroundColor Green
    
    # Verificar se JAR foi criado
    if (Test-Path "target\driah-0.0.1-SNAPSHOT.jar") {
        Write-Host "✅ JAR gerado: target\driah-0.0.1-SNAPSHOT.jar" -ForegroundColor Green
    } else {
        Write-Host "❌ JAR não foi encontrado!" -ForegroundColor Red
        exit 1
    }
}

function Do-Run {
    Do-Build
    Write-Host "`n🚀 Iniciando aplicação..." -ForegroundColor Cyan
    Write-Host "📍 Aplicação disponível em: http://localhost:8080/web" -ForegroundColor Green
    Write-Host "(Pressione Ctrl+C para parar)`n" -ForegroundColor Yellow
    .\mvnw spring-boot:run
}

# Main
Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║     DriAtelie Build & Run Helper      ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan

switch ($Action.ToLower()) {
    "help" {
        Show-Help
    }
    "clean" {
        Check-Prerequisites
        Do-Clean
    }
    "build" {
        Check-Prerequisites
        Do-Build
    }
    "run" {
        Check-Prerequisites
        Do-Run
    }
    default {
        Check-Prerequisites
        Do-Run
    }
}

Write-Host "`n✨ Concluído!" -ForegroundColor Green
