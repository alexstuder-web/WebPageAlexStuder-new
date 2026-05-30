// Runtime-Routing: leitet aus dem aktuellen Hostname ab, wo die anderen Apps
// laufen. Funktioniert auf localhost und auf jeder VPS-Domain (.cloud, .ch, ...).
//
// Lokal      → http://localhost:<port>
// VPS        → https://<subdomain>.<aktuelle-domain>

(function () {
  const APPS = {
    assistent: { port: 8081,  subdomain: 'aibrewgenius', exposeOnVps: true  },
    rapt:      { port: 8082,  subdomain: 'rapt',      exposeOnVps: true  },
    studio:    { port: 54323, subdomain: null,        exposeOnVps: false },
  };

  function isLocal() {
    const h = location.hostname;
    return h === 'localhost' || h === '127.0.0.1' || h === '0.0.0.0';
  }

  function baseDomain() {
    return location.hostname.replace(/^(www\.)?[^.]+\./, '');
  }

  // Liefert URL der gewünschten App, oder null falls in dieser Umgebung
  // nicht erreichbar (z.B. Studio in Prod).
  window.appUrl = function (app) {
    const cfg = APPS[app];
    if (!cfg) return null;
    if (isLocal()) return `http://localhost:${cfg.port}/`;
    if (!cfg.exposeOnVps) return null;
    return `https://${cfg.subdomain}.${baseDomain()}/`;
  };

  // Wendet die URLs automatisch auf alle <a data-app="..."> an.
  // Elemente deren App in der aktuellen Umgebung nicht verfügbar ist (z.B.
  // Studio in Prod) werden ausgeblendet via display:none.
  window.applyAppLinks = function () {
    document.querySelectorAll('[data-app]').forEach((el) => {
      const url = window.appUrl(el.dataset.app);
      if (url === null) {
        el.style.display = 'none';
        return;
      }
      if (el.tagName === 'A') el.href = url;
    });
  };

  // Auto-Apply sobald DOM bereit ist
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.applyAppLinks);
  } else {
    window.applyAppLinks();
  }
})();
