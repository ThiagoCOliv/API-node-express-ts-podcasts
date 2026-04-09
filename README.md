# API Node Express TypeScript - Podcasts Manager

Uma API REST para gerenciar podcasts e episódios, desenvolvida com **Node.js**, **Express.js** e **TypeScript**.

## 📋 Descrição

Esta API permite:
- ✅ Listar todos os podcasts com seus episódios
- ✅ Filtrar podcasts por **categoria**
- ✅ Filtrar episódios por **tag**
- ✅ Filtrar por **nome do podcast** (com variações)
- ✅ Filtrar episódios por **intervalo de datas**
- ✅ Combinar múltiplos filtros

## 📊 Estrutura de Dados

### Podcast
```typescript
{
  id: string;
  name: string;
  nameVariations: string[];
  category: string;
  link: string;
  logo: string;
  episodes: Episode[];
}
```

### Episode
```typescript
{
  id: string;
  name: string;
  thumb: string;
  link: string;
  releaseDate: string;
  tags: string[];
}
```

## 🏗️ Arquitetura em Camadas

```
src/
├── models/                 # Tipos e Interfaces TypeScript
│   ├── Podcast.ts          # Interface Podcast + Episodes
│   ├── Episode.ts          # Interface Episode
│   └── FilterOptions.ts    # Tipos para filtros
│   └── ValidationResult.ts # Interface para resposta dos métodos de válidação
├── controllers/            # Camada de entrada (HTTP)
│   └── PodcastController.ts
├── services/               # Lógica de negócio
│   └── PodcastService.ts
├── repositories/           # Acesso a dados
│   └── PodcastRepository.ts
│   └── podcasts.json
├── middleware/             # Handlers customizados
│   └── errorHandler.ts
├── utils/                  # Utilitários e validações
│   ├── validation.ts       # Validações de query params
│   └── statusCode.ts       # Códigos HTTP padronizados
├── routes/                 # Definição de rotas
│   └── podcasts.ts
├── app.ts                  # Configuração Express
└── server.ts               # Ponto de entrada
```

### Fluxo de Dados
```
HTTP Request
    ↓
Router (routes/podcasts.ts)
    ↓
Controller (PodcastController)
    ↓
Service (PodcastService) - Lógica de negócio
    ↓
Repository (PodcastRepository) - Acesso a dados JSON
    ↓
HTTP Response
```

## 🚀 Como Usar

### 1. Instalação

```bash
cd API-node-express-ts-podcasts
npm install
```

### 2. Configuração

Criar arquivo `.env` (já incluído no projeto):
```env
PORT=3000
NODE_ENV=development
```

### 3. Desenvolvimento

```bash
# Executar em modo desenvolvimento (com hot reload)
npm run dev

# Compilar TypeScript
npm run build

# Executar em produção
npm start
```

## 📡 Endpoints

### Health Check
```
GET /health
```

Response (200):
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Listar Podcasts com Episódios
```
GET /podcasts
```

Response (200):
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "@KatonPodcast",
      "name": "KATON Podcast",
      "nameVariations": ["KATON", "Katon"],
      "category": "Cultura Nerd",
      "link": "https://www.youtube.com/@KatonPodcast",
      "logo": "https://yt3.googleusercontent.com/...",
      "episodes": [
        {
          "id": "bK-8DXxaf7k",
          "name": "SEGREDO DOS TATUADORES DE ANIMES!...",
          "thumb": "https://i.ytimg.com/...",
          "link": "https://www.youtube.com/watch?v=bK-8DXxaf7k",
          "releaseDate": "2025-11-27",
          "tags": ["ANIMES", "TATUAGENS", "CULTURA NERD"]
        }
      ]
    }
  ]
}
```

## 🔍 Filtros Disponíveis

### Por Categoria
```bash
GET /podcasts?category=Cultura%20Nerd
```

### Por Tag (nos episódios)
```bash
GET /podcasts?tag=ANIMES
```

### Por Nome do Podcast
```bash
GET /podcasts?podcastName=KATON
```
*Nota: Também funciona com variações do nome (KATON, Katon)*

### Por Intervalo de Datas
```bash
GET /podcasts?startDate=2025-01-01&endDate=2025-12-31
```

### Múltiplos Filtros (Combinados)
```bash
GET /podcasts?category=Cultura%20Nerd&tag=ANIMES&startDate=2025-01-01
```

## ✅ Validações

- **Datas**: Devem estar no formato `YYYY-MM-DD`
- **Intervalo de datas**: `startDate` não pode ser maior que `endDate`
- **Query params**: Valores vazios são ignorados

## 📝 Exemplos de Requisições

### 1. Todos os podcasts
```bash
curl http://localhost:3000/podcasts
```

### 2. Podcasts de cultura nerd
```bash
curl "http://localhost:3000/podcasts?category=Cultura%20Nerd"
```

### 3. Podcasts com episódios sobre animes
```bash
curl "http://localhost:3000/podcasts?tag=ANIMES"
```

### 4. Buscar podcast específico
```bash
curl "http://localhost:3000/podcasts?podcastName=KATON"
```

### 5. Episódios de 2025
```bash
curl "http://localhost:3000/podcasts?startDate=2025-01-01&endDate=2025-12-31"
```

### 6. Filtros combinados
```bash
curl "http://localhost:3000/podcasts?category=Cultura%20Nerd&tag=ANIMES&startDate=2025-01-01"
```

## 🔧 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Linguagem tipada
- **CORS** - Compartilhamento de recursos
- **File System** - Leitura de dados JSON mockados

## 📦 Dependências

```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "typescript": "^5.3.3",
  "ts-node": "^10.9.2",
  "@types/express": "^4.17.21",
  "@types/node": "^20.10.6",
  "@types/cors": "^2.8.17"
}
```

## 📊 Dados de Exemplo

O projeto inclui dados mockados de podcasts reais brasileiros:

- **KATON Podcast** - Cultura Nerd (3 episódios)
- **Flow Podcast** - Variedades (3 episódios)
- **Charla Podcast** - Esportes (3 episódios)
- **Os Sócios Podcast** - Economia e Negócios (3 episódios)
- **Inteligência Ltda** - Variedades (3 episódios)

Dados armazenados em `src/repositories/podcasts.json`

## 🔄 Fluxo de Implementação

1. **Configuração** ✅
   - package.json
   - tsconfig.json
   - .env

2. **Estrutura** ✅
   - Pasta (src/)
   - Models (Podcast.ts, Episode.ts, FilterOptions.ts, ValidationResult.ts)

3. **Camadas** ✅
   - Repository (PodcastRepository.ts)
   - Service (PodcastService.ts)
   - Controller (PodcastController.ts)

4. **Infraestrutura** ✅
   - Middleware (errorHandler.ts)
   - Rotas (podcasts.ts)
   - App (app.ts, server.ts)

## 👨‍💻 Autor

[Thiago_Correa]