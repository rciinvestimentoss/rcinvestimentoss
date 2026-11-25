# Changelog

Mais recente primeiro. Cada entrada corresponde a um commit (hash entre parênteses; `git log` é a fonte definitiva).

## 25/11/2026 – Configurações externas (GitHub Pages e Registro.br)
Alterações feitas fora do código, pelo navegador, a pedido do cliente:
- **GitHub Pages:** verificado em Settings → Pages. Já estava ativo (*Deploy from a branch*, `main` / `(root)`) com o domínio `rcinvestimentoss.com.br` salvo. O GitHub mostrava "DNS check in progress" e *Enforce HTTPS* indisponível, por falta dos registros DNS. Nada foi alterado nessa tela.
- **Registro.br:** o domínio usa os servidores DNS do próprio Registro.br. Ativado o **Modo Avançado** do DNS (necessário para criar os 4 registros A do GitHub; só volta ao modo básico após 2 horas). Em seguida o domínio ficou "em transição", e o editor de zona não aceitou registros ainda.
- Registros DNS **ainda não criados** (ver `DOMINIO-E-DNS.md` e `PENDENCIAS.md`).

## 25/11/2026 – Landing page na raiz
- Adicionados na raiz, a partir do pacote `rafaelademicon.zip` enviado pelo cliente: `index.html`, `css/styles.css`, `js/main.js`, `assets/rafael.jpg`. Conteúdo sem alteração; todos os caminhos são relativos e funcionam na raiz.
- README original da landing guardado em `docs/landing-readme-original.md` (histórico).
- Preenchidos neste commit os hashes dos dois commits anteriores nesta lista.
- Estado do `CONFIG` em `js/main.js`: WhatsApp preenchido; `cnpj`, `webhookUrl` e `testimonials` vazios (ver `PENDENCIAS.md`).
- Resultado esperado: `rcinvestimentoss.com.br/` quando o Pages e o DNS estiverem ativos.

## 25/11/2026 – Página da bio do Instagram em /bio (`aef8997`)
- Copiados de `gusttavoteles/rafaelinstagram` (commit `611d43d`) para `bio/`: `index.html`, `css/styles.css`, `js/main.js`, `assets/rafael.jpg`, `assets/rafael-correa.vcf`. Conteúdo sem alteração; os caminhos relativos funcionam na subpasta.
- README original da bio guardado em `docs/bio-readme-original.md` (a seção "Publicação" dele foi substituída pelas decisões D1/D2 e vale só como histórico).
- Resultado esperado: `rcinvestimentoss.com.br/bio/` quando o Pages e o DNS estiverem ativos.
- Pendente (ver `PENDENCIAS.md`): 6 imagens ainda hospedadas no Airgo; `landingUrl` vazio.

## 25/11/2026 – Base do site e documentação (`ed88b7b`)
- Adicionados `CNAME` (`rcinvestimentoss.com.br`) e `.nojekyll` (Pages serve os arquivos sem processar com Jekyll).
- README reescrito com o mapa de endereços (landing na raiz, bio em `/bio`).
- Criada a pasta `docs/` com README, CHANGELOG, DECISOES, DOMINIO-E-DNS e PENDENCIAS.
- Motivo: preparar o repositório para o domínio próprio e deixar o histórico de alterações documentado desde o início.
