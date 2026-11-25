# Changelog

Mais recente primeiro. Cada entrada corresponde a um commit (hash entre parênteses; `git log` é a fonte definitiva).

## 25/11/2026 – Página da bio do Instagram em /bio
- Copiados de `gusttavoteles/rafaelinstagram` (commit `611d43d`) para `bio/`: `index.html`, `css/styles.css`, `js/main.js`, `assets/rafael.jpg`, `assets/rafael-correa.vcf`. Conteúdo sem alteração; os caminhos relativos funcionam na subpasta.
- README original da bio guardado em `docs/bio-readme-original.md` (a seção "Publicação" dele foi substituída pelas decisões D1/D2 e vale só como histórico).
- Resultado esperado: `rcinvestimentoss.com.br/bio/` quando o Pages e o DNS estiverem ativos.
- Pendente (ver `PENDENCIAS.md`): 6 imagens ainda hospedadas no Airgo; `landingUrl` vazio.

## 25/11/2026 – Base do site e documentação
- Adicionados `CNAME` (`rcinvestimentoss.com.br`) e `.nojekyll` (Pages serve os arquivos sem processar com Jekyll).
- README reescrito com o mapa de endereços (landing na raiz, bio em `/bio`).
- Criada a pasta `docs/` com README, CHANGELOG, DECISOES, DOMINIO-E-DNS e PENDENCIAS.
- Motivo: preparar o repositório para o domínio próprio e deixar o histórico de alterações documentado desde o início.
