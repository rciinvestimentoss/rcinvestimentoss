# Link da bio – Rafael Corrêa | Consultor autorizado Ademicon

Página de links estática (HTML, CSS e JS puros) para o Instagram. Substitui o Airgo.

## Estrutura
- `index.html` (raiz)
- `css/styles.css`
- `js/main.js` (bloco `CONFIG` no topo)
- `assets/rafael.jpg` (foto do perfil) e `assets/rafael-correa.vcf` (botão "Salvar na agenda")

## Configuração (`js/main.js`)
- `landingUrl`: link da landing de simulação (card vermelho). Vazio = abre o WhatsApp.
- `pixKey`: chave PIX copiada pelo botão (confirme se é o telefone).

## Imagens das seções
As 6 fotos das seções (Sobre Mim, Planejamento Financeiro, Benedita Gastrobar) ainda carregam do Airgo.
Baixe-as, salve em `assets/` e troque os endereços `https://meuairgo.com.br/...` no `index.html`.
Se o plano do Airgo for cancelado, essas imagens saem do ar.

## Publicação
GitHub Pages: Settings > Pages > Deploy from a branch > `main` / `(root)`. Domínio: subdomínio (ex.: `links.seudominio.com.br`) com CNAME para `<usuario>.github.io`.
