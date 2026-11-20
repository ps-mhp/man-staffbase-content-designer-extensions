# Extensões do Content Designer

Esta extensão adiciona ao Content Designer do Studio, no campo de seleção de formato
dos elementos **Título** e **Texto**, a **Escala Tipográfica MAN** com 13 níveis —
desde «Display 2XL · 72» a «Body XS · 12». Desta forma, não insere nenhum bloco
na página: seleciona o nível diretamente no título ou no parágrafo de texto, tal como
até agora com «Título 2» ou «Parágrafo».

| Nível | Tamanho | Elemento |
| --- | --- | --- |
| Display 2XL | 72 px | Título |
| Display XL | 64 px | Título |
| Display L | 56 px | Título |
| Display M | 48 px | Título |
| Display S | 40 px | Título |
| H1 | 32 px | Título |
| H2 | 28 px | Texto |
| H3 | 24 px | Texto |
| H4 | 20 px | Texto |
| Corpo L | 18 px | Texto |
| Corpo M | 16 px | Texto |
| Corpo S | 14 px | Texto |
| Corpo XS | 12 px | Texto |

A estrutura da página permanece inalterada: um título é sempre o
título principal da página, H2 a H4 são subtítulos e os níveis do corpo
são parágrafos. Os níveis de exibição alteram apenas o tamanho.

## Alinhamento vertical em colunas de um contentor

Se num **contentor** existirem colunas de comprimentos diferentes lado a lado,
até agora o conteúdo de cada coluna começava na parte superior. Com esta extensão, pode definir
se o conteúdo fica **em cima**, no **meio** ou **em baixo** — para todo o contentor
e, se necessário, de forma diferente para colunas individuais. Encontrará esta configuração na
caixa de diálogo **Editar contentor**, no separador **Layout**.

Nos smartphones, as colunas estão dispostas uma abaixo da outra e têm apenas a altura do seu
conteúdo. Nesses dispositivos, não é necessário qualquer alinhamento e este não é visível.

## O que os leitores veem

O título ou parágrafo no tamanho selecionado e o conteúdo das colunas na
alinhamento selecionado. Para que isto funcione, é necessário que duas coisas
estejam configuradas no Studio, das quais a administração do Studio
se encarrega: o CSS personalizado com a extensão Typo (Content Designer → CSS Personalizado)
e a tipografia do tema (Look & Feel → Tipografia). Se faltar o CSS personalizado,
os leitores verão, nos níveis adicionais, o tamanho normal e o conteúdo das colunas
na parte superior — o conteúdo em si permanece correto.

## O que vê no editor do CMS

- No campo de seleção de formato da barra de ferramentas, aparece o grupo **«Escala tipográfica MAN»**
  com o tamanho e a altura da linha por nível, por exemplo, «Body L 18/27». As entradas anteriores
  são ocultadas, porque a escala as inclui na totalidade.
- O campo de seleção mostra o nível ativo, por exemplo, «Display 2XL · 72».
- Os blocos com um nível adicional apresentam, no canto superior direito, uma etiqueta escura com
  o respetivo nível, por exemplo, `display-2xl` — assim, é possível reconhecê-los à primeira vista.
- Na caixa de diálogo **Editar contentor → Layout**, por baixo dos
  botões de layout, encontra-se a secção **«Alinhamento vertical»**. As colunas
  no editor mostram imediatamente o alinhamento selecionado.

## Quando a extensão fica disponível

O Studio não carrega a extensão logo ao abrir uma página, mas apenas
quando insere ou
edita um **bloco personalizado** pela primeira vez. Depois disso, fica disponível em todas as páginas até que atualize o separador
do navegador. Para saber como ativá-la especificamente, consulte «Passo a passo».
