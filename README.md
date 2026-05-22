# WebPageAlexStuder (Hauptseite)

Statische Landing-Page für **alexstuder.cloud** (Staging) bzw. **alexstuder.ch** (später).
Nginx serviert reines HTML/CSS/JS — keine Build-Pipeline, kein Framework.

## Status: Source-Repo

Dieses Repo ist **nur Source**. Auf `push main` baut GitHub Actions ein
Container-Image und pusht es zu Docker Hub:

```
${DOCKERHUB_USERNAME}/web_hauptseite:latest
```

**Production-Deployment läuft via** [`webPage_infra`](https://github.com/alexstuder-web/webPage_infra) — dort wird das
Image gezogen und hinter Cloudflare Tunnel ausgeliefert. Watchtower
aktualisiert den Container alle 5 Min automatisch.

Image-Definition: siehe [`Dockerfile`](Dockerfile) (Nginx + statische Files).

## Lokales Dev

Einfacher HTTP-Server reicht — kein Build nötig:

```bash
python3 -m http.server 8090
# http://localhost:8090 öffnen
```

Oder als Container:

```bash
docker build -t web_hauptseite:dev .
docker run --rm -p 8090:80 web_hauptseite:dev
```

## Struktur

```
/
├── index.html         Landing-Page
├── css/styles.css     Styles
├── js/app.js          Karussell + Navigation
├── img/               Bilder (eigene + Brew-Assets)
└── WebPages/          Sub-Seiten (bier, quiz, sudoku, todo)
```

## Verwandte Repos

- [`webPage_infra`](https://github.com/alexstuder-web/webPage_infra) — Production-Compose + Bootstrap
- [`brew_assistent-new`](https://github.com/alexstuder-web/brew_assistent-new) — AI-Bierrezepte (verlinkt in der Landing-Page)
- [`RAPT_Brewing_Dashboard-new`](https://github.com/alexstuder-web/RAPT_Brewing_Dashboard-new) — Fermentation-Dashboard (verlinkt in der Landing-Page)
