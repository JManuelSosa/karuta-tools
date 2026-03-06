# Karuta Bot

Bot de Discord desarrollado en **TypeScript** para utilidades relacionadas con el bot de cartas **Karuta**. Actualmente incluye gestión de colección de cartas y un solver automático para el minijuego de citas.

---

## Módulos

### 🃏 Karuta Query Collection
Gestión y consulta rápida de cartas de la colección personal.

**Comandos planeados:**
- `Q!p <nombre>` — Búsqueda rápida por nombre del personaje
- `Q!sync` — Carga masiva de colección mediante archivo CSV
- `Q!visit <nombre>` — Obtén el comando rápido para visitar un personaje de tu colección por nombre

### 🚗 Date Minigame Solver
Solver automático para el minijuego de citas de Karuta. Detecta el mapa activo, calcula la ruta óptima para maximizar las acciones realizadas sin perder ninguna estadística, y ejecuta los movimientos automáticamente.

**Comportamiento:**
- Detecta automáticamente cuando se inicia un minijuego de citas via `kvi`
- Identifica el mapa por su hash y consulta rutas previamente calculadas
- Si el mapa es nuevo, solicita descripción manual para construirlo
- Calcula la ruta óptima usando Beam Search
- Ejecuta los movimientos y acciones automáticamente

---

## Arquitectura

- **Lenguaje** — TypeScript (Node.js)
- **Librería Discord** — discord.js v14
- **Base de datos** — Supabase (PostgreSQL)
- **Hosting** — Render (Free Tier)
- **Arquitectura de código** — Domain-Driven Design + Clean Architecture

### Estructura del proyecto

```
src/
├── domain/
│   ├── constants/
│   ├── entities/
│   ├── interfaces/
│   ├── services/
│   ├── types/
│   └── value-objects/
├── application/
│   └── use-cases/
├── infrastructure/
│   ├── discord/
│   └── storage/
└── index.ts
```

---

## Seguridad

- Las credenciales se manejan por variables de entorno (`.env`)
- Acceso de datos filtrado por **usuario** para separar colecciones
- El archivo `.env` está excluido del repositorio via `.gitignore`

---

## Variables de entorno

```
DISCORD_TOKEN=tu_token_de_discord
SUPABASE_URL=tu_url_de_supabase
SUPABASE_KEY=tu_api_key_de_supabase
```

---

## Scripts

```bash
pnpm dev      # Desarrollo con recarga automática
pnpm build    # Compilar a JavaScript
pnpm start    # Ejecutar versión compilada
pnpm test     # Ejecutar tests unitarios
```

---

## Estado del proyecto

| Módulo | Estado |
|---|---|
| Domain layer (Date Solver) | ✅ Completo |
| Unit tests | 🔄 En progreso |
| Map Builder CLI | 🔄 Pendiente |
| Karuta Query Collection | 🔄 Pendiente |
| Infrastructure / Discord | 🔄 Pendiente |
| Route Calculator (Solver) | 🔄 Pendiente |