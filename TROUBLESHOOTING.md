# 🔧 Guia de Troubleshooting - DriAtelie

## Problemas Comuns e Soluções

### ❌ Erro: "Não foi possível localizar nem carregar a classe principal com.driatelie.DriahApplication"

**Causa:** JAR foi construído incorretamente ou classe principal não foi registrada no MANIFEST.

**Solução:**

#### Passo 1: Limpeza Completa
```powershell
# No diretório raiz do projeto (C:\Users\Pichau\Desktop\escola\DriAtelie)
.\mvnw clean
```

#### Passo 2: Rebuild Completo
```powershell
.\mvnw clean package -DskipTests
```

#### Passo 3: Verificar se o JAR foi criado com sucesso
```powershell
# Verificar se existe target\driah-0.0.1-SNAPSHOT.jar
dir target\*.jar
```

#### Passo 4: Rodar a aplicação
```powershell
.\mvnw spring-boot:run
```

---

### ❌ Erro: "Build falhou" ou "Consegui rodar uma vez, mas não tinha nada na página, derrubei e rodei dnv, e n buildou"

**Causa:** Cache corrompido, dependências não sincronizadas, ou target sujo.

**Solução:**

#### Opção 1: Limpeza Agressiva (Recomendado)
```powershell
# Remove target e .m2 local cache
.\mvnw clean
Remove-Item -Path .m2 -Recurse -Force -ErrorAction SilentlyContinue
.\mvnw clean install -DskipTests
```

#### Opção 2: Forçar atualização de dependências
```powershell
.\mvnw clean dependency:resolve dependency:resolve-plugins
.\mvnw clean package -U -DskipTests
```

#### Opção 3: Usando IDE (VS Code / IntelliJ)
- Abrir Command Palette (Ctrl+Shift+P)
- Procurar por "Maven: Update project" ou "Maven: Reload projects"
- Esperar sincronização completa
- Limpar cache: Ctrl+Shift+Delete (VS Code) ou File > Invalidate Caches (IntelliJ)

---

### ❌ Erro: "Página vazia ao rodar" ou "Não consegue conectar ao banco"

**Causa:** 
- MySQL não está rodando
- Credentials errados em `application.properties`
- Banco/tabelas não existem

**Solução:**

#### Passo 1: Verificar MySQL
```powershell
# Verificar se MySQL está rodando
Get-Service MySQL80  # ou mysql-main, dependendo da instalação

# Se não está, iniciar:
Start-Service MySQL80
```

#### Passo 2: Verificar banco de dados
```bash
# Abrir MySQL CLI
mysql -u root -p

# Dentro do MySQL, verificar:
SHOW DATABASES;
USE driah;
SHOW TABLES;
```

#### Passo 3: Verificar credentials em `application.properties`
```properties
# Abrir: src\main\resources\application.properties
# Certificar que estão corretos:
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.url=jdbc:mysql://localhost:3306/driah?useSSL=false&serverTimezone=UTC
```

#### Passo 4: Se o banco não existe, criar:
```sql
CREATE DATABASE driah CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE driah;

-- Importar script SQL (se tiver)
-- SOURCE path/to/script.sql;
```

---

### ✅ Checklist Pré-Build

Antes de rodar, verifique:

- [ ] Java 17+ instalado: `java -version`
- [ ] Maven em PATH: `mvnw -v`
- [ ] MySQL rodando: `Get-Service MySQL80` (Windows)
- [ ] Banco `driah` criado no MySQL
- [ ] Arquivo `application.properties` com credenciais corretas
- [ ] Nenhum processo usando porta 8080: `netstat -ano | findstr :8080`
- [ ] `.gitignore` exclui `target/` e `.m2/` (não commitar esses diretórios)

---

### 🚀 Fluxo Recomendado para Rodar

```powershell
# 1. Limpar
.\mvnw clean

# 2. Construir (sem testes por enquanto)
.\mvnw package -DskipTests

# 3. Rodar
.\mvnw spring-boot:run

# OU rodar direto do JAR (depois de package)
java -jar target\driah-0.0.1-SNAPSHOT.jar
```

Aplicação estará em: **http://localhost:8080/web**

---

### 📝 Logs Úteis

Se algo der errado, verifique:

1. **Console do Maven** — procure por `BUILD SUCCESS` ou `BUILD FAILURE`
2. **Logs do Spring Boot** — procure por erros de datasource ou bean
3. **Logs do MySQL** — verifique conexão e credenciais

Para ativar debug:
```properties
# Adicionar em application.properties
logging.level.root=INFO
logging.level.org.springframework=DEBUG
logging.level.org.hibernate=DEBUG
```

---

## 💡 Dicas Extras

- Se usar **IDE**, prefira usar "Run" ou "Debug" da IDE em vez do terminal (melhor controle de classpath).
- Não commitar `target/` no Git — está em `.gitignore`.
- Se rodar em máquina diferente, clonar repo e seguir o "Fluxo Recomendado" acima.
- Caso persista erro, compartilhar output completo do `mvnw clean package -X` para debug.

---

**Última atualização:** 7 de dezembro de 2025
