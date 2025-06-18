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

user : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsaWNlQGV4YW1wbGUuY29tIiwic3ViIjoxLCJyb2xlIjpbIlVTRVIiXSwiaWF0IjoxNzUwMjM5NTg3LCJleHAiOjE3NTAyNDMxODd9.Hx4u9tU6AmJzX-aif9LoFPwcDVWbVZ-uHxnkR2TyOcQ

gestionaire : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGcuY29tIiwic3ViIjoyMywicm9sZSI6WyJHRVNUSU9OTkFJUkUiXSwiaWF0IjoxNzUwMjM5NjgwLCJleHAiOjE3NTAyNDMyODB9._d0octOhitcHY93HJGkcYDl_NGCS3D0Kq1XgJXP_wdM

admin ianord : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGkuY29tIiwic3ViIjoyNCwicm9sZSI6WyJBRE1JTl9JQU5PUkQiXSwiaWF0IjoxNzUwMjM5NzAxLCJleHAiOjE3NTAyNDMzMDF9.ta4GaxNRipgu53jz8A1K4oorO3LFe4KTdBmLPiGEGIc
