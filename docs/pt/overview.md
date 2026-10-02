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

## O que os leitores veem

O título ou parágrafo no tamanho selecionado. Para que isso funcione, você precisa
As coisas do Studio Two precisam ser configuradas para que o administrador do Studio possa cuidar.
o CSS Personalizado com a extensão Typo (Content Designer → Custom CSS)
e a tipografia do tema (aparência e sensação → tipografia). Se o CSS personalizado estiver faltando, 
Os leitores veem o tamanho normal dos níveis adicionais — o próprio conteúdo
permanece correto. 

## O que você vê no editor CMS

- No campo de seleção de formato da barra de ferramentas, o grupo **"MAN Typo-Scale"** aparece 
  com tamanho e altura de linha por degrau, por exemplo, "Corpo L 18/27". O anterior
  As entradas são ocultas porque a escala as contém completamente. 
- A caixa de seleção mostra o nível ativo, por exemplo, "Display 2XL · 72“. 
- Blocos com um passo adicional possuem um rótulo escuro no canto superior direito
  Nivele, por exemplo, 'display-2XL' — assim você pode reconhecê-los num instante. 

## Quando a expansão estiver pronta

O Studio não carrega a extensão quando você abre uma página, mas apenas quando você 
a primeira vez que você insere um **Bloco Personalizado**, ou
. Depois disso, estará disponível em todas as páginas até você abrir a aba Navegador
recarregue. Como ligar especificamente pode ser encontrado em "Passo a passo".