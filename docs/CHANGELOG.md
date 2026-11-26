# Changelog

Mais recente primeiro. Cada entrada corresponde a um commit (hash entre parênteses; `git log` é a fonte definitiva).

## 26/11/2026 (00h) – Site no ar com HTTPS: testes aprovados
- **DNS:** a transição do Registro.br terminou. `rcinvestimentoss.com.br` resolve para os 4 IPs do GitHub Pages (conferido em dns.google).
- **GitHub Pages:** "DNS check successful"; **Enforce HTTPS marcado** (confirmado após recarregar a página). Nenhuma outra configuração alterada; `CNAME` do repositório intacto (`rcinvestimentoss.com.br`).
- **Testes (navegador na nuvem e no app):**
  - `https://rcinvestimentoss.com.br/` abre a landing ("Consórcio imobiliário em Goiânia | Rafael Correa, Autorizado Ademicon") com certificado válido.
  - `https://rcinvestimentoss.com.br/bio/` abre a bio ("Rafael Corrêa | Consultor autorizado Ademicon · Goiânia").
  - `http://` e `www.` redirecionam para `https://rcinvestimentoss.com.br`.
  - Arquivos: `css/styles.css`, `js/main.js`, `assets/rafael.jpg`, `bio/css/styles.css`, `bio/js/main.js`, `bio/assets/rafael.jpg`, `bio/assets/rafael-correa.vcf` respondem 200.
  - Links da bio conferidos: WhatsApp (`wa.me/5562991412416`), Instagram (@turcovet), LinkedIn, e-mail, telefone, Ademicon Goiânia.
  - Único 404 observado: `/favicon.ico` automático do navegador (as páginas usam `assets/rafael.jpg` como ícone). Sem impacto.
- Ciclo de testes de 20 em 20 minutos encerrado.

## 25/11/2026 (22h) – Diagnóstico: DNS ainda em transição (sem alteração no site)
- Testes automáticos (rodadas 21:37 e 21:59): GitHub Pages segue em "DNS Check in Progress"; *Enforce HTTPS* indisponível; `rcinvestimentoss.com.br` não abre no navegador.
- Consulta ao DNS público (dns.google): o domínio ainda está delegado aos servidores `a.auto.dns.br` / `b.auto.dns.br` (modo básico do Registro.br), que **não têm** os registros novos (resposta A vazia; `www` inexistente).
- Causa: os registros foram salvos na zona do Modo Avançado, que só passa a valer quando a transição de servidores termina (aviso do Registro.br: ~2h a partir de 20:55; previsão ≈ 23:00 no horário de Brasília).
- Ação: nenhuma correção necessária; manter o ciclo de testes de 20 em 20 minutos. Se após a transição o GitHub continuar em "in progress", remover e salvar de novo o domínio em Settings → Pages.

## 25/11/2026 (noite) – Registros DNS criados no Registro.br
- Com o domínio fora da "transição", o editor de zona (Modo Avançado) aceitou registros. Criados e salvos em `rcinvestimentoss.com.br`:
  - 4 × **A** na raiz: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
  - 1 × **CNAME** `www` → `rciinvestimentoss.github.io`.
- Conferido recarregando o painel: os 5 registros permaneceram gravados.
- Próximos passos: aguardar a propagação do DNS, clicar em "Verifique novamente" em GitHub Settings → Pages e ativar *Enforce HTTPS*.
- Observação: o Modo Avançado só pode voltar ao básico após ~2 horas do momento em que foi ativado (ver entrada anterior). Não é necessário voltar.

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
