# Regras para o agente (Claude Code) neste repo

Este arquivo é lido automaticamente no início de cada sessão. As regras abaixo
existem porque já aconteceu de o agente desfazer trabalho manual da usuária e
fazer alterações que ela não pediu, o que a obrigou a ficar corrigindo
manualmente atrás dele. Não repita isso.

## Regra 1 — Nunca desfazer alteração manual da usuária

A usuária às vezes edita o `index.html` (ou outro arquivo) manualmente,
direto no editor, para ajuste fino (cores, tamanhos, ícones, texto). Isso é
esperado e válido, mesmo o `index.html` sendo saída de build (ver
`ESTRUTURA.md`).

- **Antes de rodar `node build.js`**, se o `index.html` tiver sido tocado
  desde o último build do agente (`git status`/`git diff -- index.html`),
  pare e verifique se a diferença é uma edição manual da usuária que ainda
  não existe nos arquivos-fonte (`assets/css/`, `assets/js/`, `screens/`).
  Se for, primeiro leve essa mudança para a fonte (ou pergunte à usuária),
  só depois builda. Nunca rode o build "por cima" de uma edição manual sem
  verificar — isso apaga o trabalho dela silenciosamente.
- Quando a usuária disser que corrigiu algo manualmente e pedir para não
  mexer nisso, trate esse trecho/componente como protegido: só alterá-lo se
  ela pedir explicitamente aquela mudança específica em um próximo prompt.

## Regra 2 — Escopo cirúrgico, sem "de passagem" e sem padronizar por conta própria

Só altere exatamente o elemento/estilo/trecho que foi pedido no prompt atual.

- Não mexa em seletor vizinho, não ajuste espaçamento "enquanto está ali",
  não renomeie/consolide nada para "ficar consistente" com o resto — mesmo
  que pareça inconsistente ou puxe a atenção.
- Se notar algo que parece errado mas não foi pedido, **não corrija por
  conta própria**: no máximo, mencione para a usuária e deixe ela decidir.
- Isso vale especialmente para as áreas de Shorts e Publicações, onde a
  usuária faz ajuste fino manual com frequência (ver a tabela de áreas em
  `ESTRUTURA.md`).

## Regra 3 — Medidas padrão do projeto

Quando for gerar CSS novo (uma tela nova, um componente novo) e não houver uma
instrução explícita de medida para aquele elemento específico, prefira estes
valores — são os mais usados no projeto hoje:

- **Tamanho de fonte**: 11px, 12px, 14px, 18px, 20px ou 22px.
- **Cor de texto**: `#5F666C`, `#999999`, `#0C334A` ou `#24344A`.
- **Peso de fonte**: 400 (regular) ou 700 (bold) — são os dois principais.
- **Padding**: 8px, 12px, 16px ou 20px.
- **Margem**: 4px, 8px ou 12px.
- **Botões**: altura 36px, `border-radius` 6px, peso 700, `font-size` 14px.

Isso é um ponto de partida, não uma regra rígida: uma instrução explícita da
usuária para um elemento específico sempre vence esses padrões.

## Regra 4 — Não escale ferramentas/automação além do necessário

A maioria dos pedidos neste repo é simples: trocar um valor de CSS, mover um
elemento de lugar no HTML, ajustar um texto. Se o pedido é sobre layout,
quase sempre basta mexer no CSS (às vezes num pedacinho de HTML/JS junto) —
não é motivo para nada mais elaborado.

- Não instale pacotes, não suba servidor de dev, não rode `npx` nem
  automação de navegador (headless Chrome, Playwright etc.) só para
  "verificar" uma mudança que dá para confirmar lendo o código-fonte e o
  HTML/CSS gerado pelo build.
- Só recorra a esse tipo de ferramenta pesada se a usuária pedir
  explicitamente um teste visual, ou se a mudança for complexa/arriscada o
  bastante para que ler o código não seja suficiente para ter confiança nela.
- Na dúvida, prefira terminar a tarefa e explicar o que foi conferido de
  forma estática (fonte + build) a escalar para automação.

## Por quê

O agente já "alucinou" mudanças extras não pedidas (achando que estava
"padronizando" ou "limpando"), já rodou build em cima de edição manual não
salva na fonte, e já tentou instalar ferramentas e automatizar navegador
para verificar uma mudança simples — tudo isso obrigou a usuária a ficar
corrigindo ou interrompendo o agente. As regras acima existem para isso
parar de acontecer.
