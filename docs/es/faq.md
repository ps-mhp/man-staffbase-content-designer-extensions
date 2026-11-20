# Preguntas frecuentes

**Pregunta:** En el campo de selección de formatos falta el grupo «Escala tipográfica MAN». ¿Qué puedo hacer?

Respuesta: Studio no carga la extensión hasta que se inserta o se edita un bloque personalizado,
y la olvida al recargar la pestaña del navegador.
Actívala tal y como se describe en «Paso a paso → Activar la extensión».
Si el grupo sigue sin aparecer después de eso, es probable que Studio
haya cambiado; por favor, informa de ello al equipo encargado de los widgets.

**Pregunta:** ¿Puedo insertar la extensión como un bloque en la página?

Respuesta: No. No tiene contenido visible y, por lo tanto, no aparece en
la lista «Seleccionar bloque». Solo surte efecto en el campo de selección de formato del título y
del texto, y en el cuadro de diálogo «Editar contenedor».

**Pregunta:** En el editor veo el nivel, pero no en la página publicada.

Respuesta: En ese caso, en Studio falta el CSS personalizado con la extensión de tipografía o está
desactualizado. La administración de Studio se encargará de solucionarlo.

**Pregunta:** En la página publicada se ve un nivel, pero no en el editor.

Respuesta: La extensión aún no está activa en la pestaña de su navegador. Actívela
y vuelva a abrir la página.

**Pregunta:** En la página publicada, un título solo tiene el tamaño de «H1», aunque yo quería un nivel de visualización.

Respuesta: El título aún no tiene asignado ningún nivel. Un título sin nivel seleccionado
siempre se muestra en H1 (32 px); esto se aplica a todos los títulos nuevos y a los títulos de
versiones anteriores que el editor aún mostraba como «Display L» o «Display S»
. Coloque el cursor en el título, seleccione el nivel en
**«Escala tipográfica MAN»** (aparecerá una etiqueta oscura) y haga clic
en **Guardar**.

**Pregunta:** Tras duplicar el título, la copia ha perdido su nivel.

Respuesta: Es un comportamiento conocido: la copia recibe una nueva identificación sin nivel.
Vuelva a aplicar el nivel a la copia.

**Pregunta:** Tras cambiar de párrafo a H2, el título tiene un tamaño normal, aunque antes estaba configurado como «Body L».

Respuesta: Es intencionado: los niveles «Body» solo se aplican a los párrafos. La extensión elimina
el nivel que ya no es adecuado la próxima vez que se guarde.

**Pregunta:** En el cuadro de diálogo «Editar contenedor» falta la sección «Alineación vertical».

Respuesta: La extensión aún no está activa en la pestaña de su navegador. Actívela
tal y como se describe en «Paso a paso → Activar la extensión»
y vuelva a abrir el cuadro de diálogo. La sección solo aparece en la pestaña
**Diseño**.

**Pregunta:** ¿Por qué no veo la alineación en la página publicada?

Respuesta: Comprueba primero si las columnas tienen diferente cantidad de contenido;
si tienen la misma longitud, no hay nada que alinear. En el smartphone,
las columnas aparecen una debajo de otra; allí, la alineación no se aplica deliberadamente. Si tampoco aparece
en el ordenador, significa que el CSS personalizado en Studio está desactualizado. De ello se encarga la
administración de Studio.

**Pregunta:** ¿Qué significa «como contenedor» en una columna?

Respuesta: La columna adopta la alineación seleccionada anteriormente para todo el contenedor
. Si seleccionas «arriba», «centro» o «abajo», se aplicará a esa columna la
propia configuración.

**Pregunta:** ¿Cómo desactivo la extensión de depuración en mi navegador?

Respuesta: Abre la consola de desarrollador del navegador en Studio e introduce
`localStorage.setItem("sbt-typo-scale", "off")` y, a continuación, actualice la pestaña.
Para volver a activarla, utilice `localStorage.removeItem("sbt-typo-scale")`. Esto solo tiene efecto
en su navegador.
