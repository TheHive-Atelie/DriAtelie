# 🔧 Guia Rápido: Remover target/ e .class do Git

## O Problema
Você commitou as pastas `target/` e arquivos `.class` por engano. Isso causa:
- Repositório fica muito grande
- Seus colegas recebem arquivos compilados inúteis
- Build fica confuso e quebra facilmente
- Conflitos desnecessários no merge

## A Solução

### Passo 1: Atualizar seu `.gitignore` ✅ (Já feito)
O `.gitignore` foi atualizado para excluir:
- `target/` (build artifacts)
- `*.class` (compiled files)
- `.m2/` (Maven cache)
- `.idea/`, `.vscode/` (IDE folders)
- E mais...

### Passo 2: Limpar o Histórico do Git

#### Opção A: Script Automático (Recomendado)
```powershell
# Execute na raiz do projeto:
.\cleanup-git.ps1
```

O script irá:
- ✅ Remover `target/`, `.class`, `.m2/` do Git
- ✅ Manter os arquivos locais (não deleta nada)
- ✅ Criar um commit de limpeza
- ✅ Você verá: "chore: remove target/ and compiled files from git"

#### Opção B: Comandos Manuais
```powershell
# Remover target/
git rm -r --cached target/

# Remover .class files
git rm -r --cached '*.class'

# Remover .m2/
git rm -r --cached .m2/

# Remover IDE folders
git rm -r --cached .idea/
git rm -r --cached .vscode/

# Commit de limpeza
git add .gitignore
git commit -m "chore: remove target/ and compiled files from git (fix .gitignore)"
```

### Passo 3: Verificar Resultado
```powershell
# Ver o novo commit
git log --oneline -3

# Saída esperada:
# abc1234 chore: remove target/ and compiled files from git (fix .gitignore)
# def5678 Previous commit
# ghi9012 Another previous commit
```

### Passo 4: Compartilhar com Colegas
```powershell
# Push das mudanças
git push origin the-merge-wizard

# Seus colegas devem fazer:
git pull origin the-merge-wizard

# Depois reconstruir:
.\build-and-run.ps1 -Run
```

---

## ✅ Checklist Pós-Limpeza

- [ ] `.gitignore` foi atualizado
- [ ] `git rm -r --cached target/` executado
- [ ] `git rm -r --cached '*.class'` executado
- [ ] Commit de limpeza foi feito
- [ ] `git push` foi executado
- [ ] Colegas fizeram `git pull`
- [ ] Colegas rodaram `.\build-and-run.ps1 -Run` com sucesso

---

## 🎯 Resultado Final

Depois da limpeza:
- ✅ Git deixa de rastrear `target/` e `*.class`
- ✅ Cada máquina reconstrói `target/` quando rodar `mvnw clean package`
- ✅ Repositório fica limpo e mais rápido
- ✅ Build é reproducível em qualquer máquina
- ✅ Sem mais conflitos de arquivos compilados

---

## 📚 Referência: Arquivos que NUNCA devem ir para Git

```
target/              ← Maven build artifacts (reconstruído em cada build)
*.class              ← Compiled Java bytecode
.m2/                 ← Maven local cache
.idea/               ← IntelliJ IDE files
.vscode/             ← VS Code settings
.gradle/             ← Gradle build (se usar)
node_modules/        ← Node packages (se usar npm)
*.jar, *.war         ← Compiled archives
.env, .properties    ← Arquivos com senhas/credentials
```

Esses devem estar no `.gitignore`!

---

**Última atualização:** 7 de dezembro de 2025
