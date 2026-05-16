# WebPageAlexStuder

Die persönliche Hauptwebseite von Alex Studer – gebaut als statische Frontend-App (HTML/CSS/JS), ausgeliefert via Nginx-Container.

## Architektur
- Container: `web_hauptseite`
- Deployment: GitOps via Watchtower
- Tunnel: Cloudflare → `alexstuder.ch`

## Lokale Entwicklung
```bash
npm install
npm run dev
```

## Deployment
Push auf `main` → GitHub Actions → Docker Hub → Watchtower deployed automatisch.
