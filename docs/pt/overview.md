# Extensões para Designer de Conteúdo

Essa extensão complementa a caixa de seleção de formatos no Content Designer do Studio
dos elementos **Título** e **Texto** ao redor da **Escala de Erros de Digitação HOMEM** com 13 níveis — 
de "Display 2XL · 72" para "Body XS · 12“. Você não está adicionando um bloco de construção
da página: Você pode selecionar o nível diretamente do título ou do parágrafo do texto, assim como
anteriormente "Cabeçalho 2" ou "Parágrafo". 

| Nível | Tamanho | Elemento |
| --- | --- | --- |
| Display 2XL | 72 px | Título |
| Display XL | 64 px | Título |
| Exibição L | 56 px | Título |
| Exibição M | 48 px | Título |
| Exibição S | 40 px | Título |
| H1 | 32 px | Título |
| H2 | 28 px | Texto |
| H3 | 24 px | Texto |
| H4 | 20 px | Texto |
| Corpo L | 18 px | Texto |
| Corpo M | 16 px | Texto |
| Corpo S | 14 px | Texto |
| Corpo XS | 12 px | Texto |

A estrutura da página permanece inalterada: um título é sempre o
O título principal da página, H2 a H4, são subtítulos, níveis do corpo
são saltos altos. Os níveis de exibição só mudam o tamanho. 

## Alinhamento vertical em colunas de contêiner

Se houver colunas de comprimentos diferentes lado a lado em um **container**, 
O conteúdo de cada coluna começa no topo. Com a extensão, você especifica 
seja **acima**, no **meio** ou **abaixo** — para todo o recipiente
e, se necessário, de forma diferente para colunas individuais. A configuração pode ser encontrada na
Diálogo **Editar Container** na aba **Layout**. 

Nos smartphones, as colunas ficam abaixo uma da outra e só chegam até a altura de você
Conteúdo. Não é necessário alinhamento ali e nenhum pode ser visto. 

## O que os leitores veem

O título ou parágrafo no tamanho selecionado e o conteúdo da coluna no
orientação escolhida. Para que isso funcione, duas coisas precisam ser feitas no Studio.
em torno do qual a administração do estúdio
o CSS Personalizado com a extensão Typo (Content Designer → Custom CSS)
e a tipografia do tema (aparência e sensação → tipografia). Se o CSS personalizado estiver faltando, 
Leitores veem o tamanho normal e o conteúdo das colunas para os níveis adicionais
Top — O conteúdo em si permanece correto. 

## O que você vê no editor CMS

- No campo de seleção de formato da barra de ferramentas, o grupo **"MAN Typo-Scale"** aparece 
  com tamanho e altura de linha por degrau, por exemplo, "Corpo L 18/27". O anterior
  As entradas são ocultas porque a escala as contém completamente. 
- A caixa de seleção mostra o nível ativo, por exemplo, "Display 2XL · 72“. 
- Blocos com um passo adicional possuem um rótulo escuro no canto superior direito
  Nivele, por exemplo, 'display-2XL' — assim você pode reconhecê-los num instante. 
- No diálogo, **Editar o layout → contêiner** está listado sob o
  Botões de layout da seção "Alinhamento Vertical". As Colunas
  No editor, mostre imediatamente a orientação selecionada. 

## Quando a expansão estiver pronta

O Studio não carrega a extensão quando você abre uma página, mas apenas quando você 
a primeira vez que você insere um **Bloco Personalizado**, ou
. Depois disso, estará disponível em todas as páginas até você abrir a aba Navegador
recarregue. Como ligar especificamente pode ser encontrado em "Passo a passo".