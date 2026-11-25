# Domínio e DNS

Domínio: **rcinvestimentoss.com.br** (registrado no Registro.br).

## Registros a criar no Registro.br (DNS)
| Tipo | Nome | Valor |
|---|---|---|
| A | @ (raiz) | 185.199.108.153 |
| A | @ (raiz) | 185.199.109.153 |
| A | @ (raiz) | 185.199.110.153 |
| A | @ (raiz) | 185.199.111.153 |
| CNAME | www | rciinvestimentoss.github.io |

Valores de referência da documentação do GitHub Pages; conferir antes de aplicar.

## GitHub Pages
Repositório → Settings → Pages → *Deploy from a branch* → `main` / `(root)` → Custom domain `rcinvestimentoss.com.br` → ativar *Enforce HTTPS* quando o certificado estiver emitido (pode levar algumas horas após o DNS propagar).

O arquivo `CNAME` na raiz do repositório mantém o domínio configurado.

## Como verificar
- `dig rcinvestimentoss.com.br +short` deve listar os quatro IPs acima.
- `https://rcinvestimentoss.com.br/bio/` deve abrir a página da bio.

## Verificação para anúncios
Meta e Google pedem verificação do domínio por registro TXT ou meta tag. Registrar aqui quando for feito.
