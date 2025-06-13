# Migrations

## Ouvrir terminal dans le docker

```bash
docker exec -it 'nom-du-container' sh
```

## Génère une migration

```bash
npm run typeorm migration:generate ./src/migrations/NomMigration
```

## Exécute la migration

```bash
npm run typeorm migration:run
```

## Revenir en arrière

```bash
npm run typeorm migration:revert
```

# Swagger

```bash
http://localhost:3000/api
```
