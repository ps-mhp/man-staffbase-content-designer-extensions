# Perguntas Frequentes

**Pergunta:** No campo de seleção de formatos, falta o grupo «MAN Typo-Skala». O que fazer?

Resposta: O Studio só carrega a extensão quando um bloco personalizado
é inserido ou editado, e esquece-a ao recarregar o separador do navegador.
Ative-a conforme descrito em «Passo a passo → Ativar extensão».
Se, mesmo assim, o grupo continuar a faltar, é provável que o Studio
tenha sofrido alterações — por favor, comunique isso à equipa responsável pelos widgets.

**Pergunta:** Posso inserir a extensão como um bloco na página?

Resposta: Não. Não tem conteúdo visível e, por isso, não aparece na
lista «Selecionar bloco». Apenas tem efeito no campo de seleção de formato do título e
do texto e na caixa de diálogo «Editar contentor».

**Pergunta:** No editor vejo o degrau, mas não o vejo na página publicada.

Resposta: Nesse caso, falta no Studio o CSS personalizado com a extensão Typo ou este está
desatualizado. A administração do Studio irá resolver isso.

**Pergunta:** Na página publicada vê-se um nível, mas no editor não.

Resposta: A extensão ainda não está ativa no separador do seu navegador. Ative-a
e volte a abrir a página.

**Pergunta:** Um título na página publicada tem apenas o tamanho de «H1», apesar de eu querer um nível de exibição.

Resposta: O título ainda não tem o nível definido. Um título sem nível selecionado
aparece sempre como H1 (32 px) — isto aplica-se a todos os títulos novos e aos títulos de
versões anteriores, que o editor ainda apresentava como «Display L» ou «Display S»
. Coloque o cursor no título, selecione o nível em
**«Escala tipográfica MAN»** (que ficará com uma etiqueta escura) e clique
em **Guardar**.

**Pergunta:** Após a duplicação, a cópia perdeu o seu nível.

Resposta: Isso é conhecido: a cópia recebe uma nova identificação sem nível.
Defina novamente o nível na cópia.

**Pergunta:** Após uma mudança de parágrafo para H2, o título tem um tamanho normal, apesar de anteriormente ter sido definido «Body L».

Resposta: É intencional: os níveis «Body» aplicam-se apenas a parágrafos. A extensão remove
o nível que já não é adequado na próxima vez que guardar.

**Pergunta:** Na caixa de diálogo «Editar contentor», falta a secção «Alinhamento vertical».

Resposta: A extensão ainda não está ativa no separador do seu navegador. Ative-a
conforme descrito em «Passo a passo → Ativar extensão»
e volte a abrir a caixa de diálogo. A secção só está disponível no separador
**Layout**.

**Pergunta:** Por que razão não vejo o alinhamento na página publicada?

Resposta: Verifique primeiro se as colunas têm quantidades diferentes de conteúdo —
se tiverem o mesmo comprimento, não há nada para alinhar. No smartphone,
as colunas aparecem uma abaixo da outra; nesse caso, o alinhamento não funciona propositadamente. Se também
não aparecer no computador, significa que o CSS personalizado no Studio está desatualizado. Isso é
configurado pela administração do Studio.

**Pergunta:** O que significa «como o contentor» numa coluna?

Resposta: A coluna adota o alinhamento selecionado acima para todo o contentor
. Se selecionar «em cima», «ao centro» ou «em baixo», essa coluna passa a ter a
sua própria configuração.

**Pergunta:** Como desativo a extensão de depuração no meu navegador?

Resposta: Abra a consola de programadores do navegador no Studio e introduza
`localStorage.setItem("sbt-typo-scale", "off")` e, em seguida, atualize o separador.
Para reativar, utilize `localStorage.removeItem("sbt-typo-scale")`. Isto aplica-se
apenas no seu navegador.
