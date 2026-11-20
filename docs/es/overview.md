# Extensiones del Diseñador de contenidos

Esta extensión añade al campo de selección de formato del Diseñador de contenidos de Studio,
para los elementos **Título** y **Texto**, la **escala tipográfica MAN** con 13 niveles —
desde «Display 2XL · 72» hasta «Body XS · 12». De este modo, no se inserta ningún bloque
en la página: el nivel se selecciona directamente en el título o en el párrafo, igual que
hasta ahora con «Título 2» o «Párrafo».

| Nivel | Tamaño | Elemento |
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
| Cuerpo L | 18 px | Texto |
| Cuerpo M | 16 px | Texto |
| Cuerpo S | 14 px | Texto |
| Cuerpo XS | 12 px | Texto |

La estructura de la página permanece inalterada: un título es siempre el
encabezado principal de la página, los niveles H2 a H4 son subtítulos y los niveles de cuerpo
son párrafos. Los niveles de visualización solo modifican el tamaño.

## Alineación vertical en columnas de contenedor

Si en un **contenedor** hay columnas de diferente longitud una al lado de la otra,
hasta ahora el contenido de cada columna comenzaba en la parte superior. Con esta extensión, puede especificar
si el contenido se sitúa **arriba**, en el **centro** o **abajo**, tanto para todo el contenedor
como, si es necesario, de forma diferente para cada columna. Encontrará esta configuración en el
cuadro de diálogo **Editar contenedor**, en la pestaña **Diseño**.

En los smartphones, las columnas se muestran una debajo de otra y su altura se limita al
contenido que albergan. En este caso, no es necesaria ninguna alineación y no se muestra ninguna.

## Lo que ven los lectores

El título o párrafo en el tamaño seleccionado y el contenido de las columnas en la
alineación elegida. Para que esto funcione, hay que configurar dos cosas en Studio,
de las que se encarga la administración de Studio:
el CSS personalizado con la extensión tipográfica (Diseñador de contenido → CSS personalizado)
y la tipografía del tema (Aspecto → Tipografía). Si falta el CSS personalizado,
los lectores verán el tamaño normal en los niveles adicionales y el contenido de las columnas
en la parte superior; el contenido en sí se mantiene correcto.

## Lo que ves en el editor del CMS

- En el campo de selección de formato de la barra de herramientas aparece el grupo **«Escala tipográfica MAN»**
  con el tamaño y la altura de línea de cada nivel, p. ej., «Body L 18/27». Las entradas anteriores
  se ocultan, ya que la escala las incluye en su totalidad.
- El campo de selección muestra el nivel activo, p. ej., «Display 2XL · 72».
- Los bloques con un nivel adicional llevan en la esquina superior derecha una etiqueta oscura con
  su nivel, p. ej., `display-2xl`; así podrá reconocerlos de un vistazo.
- En el cuadro de diálogo **Editar contenedor → Diseño**, debajo de los
  botones de diseño, se encuentra la sección **«Alineación vertical»**. Las columnas
  del editor muestran inmediatamente la alineación seleccionada.

## Cuándo está disponible la extensión

Studio no carga la extensión al abrir una página, sino solo
cuando inserta o
edita por primera vez un **bloque personalizado**. A partir de entonces, estará disponible en todas las páginas hasta que actualices la pestaña
del navegador. En «Paso a paso» se explica cómo activarla de forma específica.
