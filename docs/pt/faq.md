# FAQ

**Pergunta:** No campo de seleção de formato, o grupo "MAN Typer Scale" está faltando. O que fazer? 

Resposta: O Studio não carrega a extensão até um bloco personalizado
E esquece quando a aba do navegador é recarregada. 
Ligue-a conforme descrito em "Passo a passo para → extensão" 
. Se o grupo ainda estiver desaparecido depois disso, Studio
Alterado — Por favor, informe isso à equipe que mantém os widgets. 

**Pergunta:** Posso adicionar a extensão como um bloco de construção na página? 

Resposta: Não. Não tem conteúdo visível e, portanto, não aparece em
na lista de Selecionar Blocos. Funciona apenas no campo de seleção de Formato de Título e
Mensagem. 

**Pergunta:** Vejo o nível no editor, mas não na página publicada. 

Resposta: Então o CSS personalizado com a extensão de erro de digitação está ausente no Studio ou está
Descontinuado. É isso que a administração do estúdio configura. 

**Pergunta:** Há um passo na página publicada, mas não no editor. 

Resposta: A extensão ainda não está ativa na aba do seu navegador. Alternar
Insira-a e abra a página novamente. 

**Pergunta:** "Display L" aparece tão grande quanto "H1" ou menor do que o esperado. 

Resposta: A tipografia de tema no Studio (aparência e sensação → tipografia) ainda é
não ajustado para a escala MAN. Isso é organizado pela administração do estúdio. 

**Pergunta:** Após a duplicação, a cópia perdeu seu estágio. 

Resposta: Isso é conhecido: A cópia recebe um novo identificador sem um nível. 
Resetar o nível da cópia. 

**Pergunta:** Após mudar de parágrafo para H2, o cabeçalho é tamanho normal, embora "Corpo L" tenha sido definido anteriormente. 

Resposta: Intencional: Níveis corporais se aplicam apenas aos parágrafos. Removido a extensão
O nível que não combina mais com a próxima vez que você salvar. 

**Pergunta:** Como faço para desligar a extensão de depuração no meu navegador? 

Resposta: No Studio, abra o console de desenvolvedor do navegador e digite
'localStorage.setItem("sbt-typo-scale", "off")', então recarregue a aba. 
Ligue novamente com 'localStorage.removeItem("sbt-typo-scale")'. Isso funciona
Só no seu navegador.