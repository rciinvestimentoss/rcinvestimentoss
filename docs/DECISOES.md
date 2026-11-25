# Decisões

## D1 – Um repositório só, com a bio em subpasta (25/11/2026)
- **Decisão:** landing na raiz e página da bio em `/bio`, no mesmo repositório (`rciinvestimentoss/rcinvestimentoss`).
- **Motivo:** `rcinvestimentoss.com.br/bio` é um caminho, não um subdomínio. Um repositório significa um deploy, um `CNAME` e uma configuração de DNS.
- **Alternativa descartada:** repositório separado com `bio.rcinvestimentoss.com.br`. Só compensa se a bio precisar ser publicada de forma independente.

## D2 – Hospedagem no GitHub Pages (25/11/2026)
- **Decisão:** GitHub Pages, ramo `main`, pasta raiz.
- **Motivo:** gratuito, HTTPS automático, adequado a site 100% estático. Exige repositório público no plano gratuito.
- **Consequência:** não há backend. Formulário/simulador enviam os leads para serviço externo (webhook do CRM ou WhatsApp).

## D3 – Nome do domínio (25/11/2026)
- `rcinvestimentoss.com.br` (com dois "s") confirmado pelo cliente como o nome correto.

## D4 – Origem dos arquivos (25/11/2026)
- A bio veio de `gusttavoteles/rafaelinstagram` (commit `611d43d`, "Add files via upload"), copiada para `bio/`.
- Os repositórios de origem não foram alterados.
