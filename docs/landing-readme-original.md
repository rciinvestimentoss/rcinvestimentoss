# Landing page – Rafael Correa | Consultor autorizado Ademicon (Goiânia)

Landing page estática (HTML, CSS e JS puros), sem build.

## Estrutura
- `index.html` – página (fica na raiz para o GitHub Pages)
- `css/styles.css` – estilos
- `js/main.js` – formulário em etapas, simulador, rastreamento e configurações
- `assets/rafael.jpg` – foto

## Configuração (topo de `js/main.js`, objeto `CONFIG`)
- `whatsapp` – número com DDI/DDD
- `webhookUrl` – URL (CRM, planilha, Make, Zapier) que recebe cada lead em JSON
- `cnpj` – aparece no rodapé quando preenchido
- `testimonials` – somente depoimentos reais e autorizados

## Rastreamento
Cole o Meta Pixel / tag do Google no marcador do `<head>` em `index.html`.
Eventos: `StartSimulation`, `Lead`, `Contact`, `Clique_CTA`.

## Publicação
GitHub Pages: Settings > Pages > Deploy from a branch > `main` / `(root)`.
