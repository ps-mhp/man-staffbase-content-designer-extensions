# Content Designer Extensions

This extension complements the format selection box in Studio's Content Designer
of the elements **Title** and **Text** around the **MAN Typo Scale** with 13 levels — 
from "Display 2XL · 72" to "Body XS · 12“. You are not adding a building block
of the page: You can select the level directly from the title or text paragraph, as well as
previously "Heading 2" or "Paragraph". 

| Level | Size | Element |
| --- | --- | --- |
| Display 2XL | 72 px | Title |
| Display XL | 64 px | Title |
| Display L | 56 px | Title |
| Display M | 48 px | Title |
| Display S | 40 px | Title |
| H1 | 32 px | Title |
| H2 | 28 px | Text |
| H3 | 24 px | Text |
| H4 | 20 px | Text |
| Body L | 18 px | Text |
| Body M | 16 px | Text |
| Body S | 14 px | Text |
| Body XS | 12 px | Text |

The structure of the page remains unchanged: a title is always the
Main heading of the page, H2 to H4 are subheadings, body levels
are heels. The display levels only change the size. 

## Vertical alignment in container columns

If there are columns of different lengths next to each other in a **container**, 
the content of each column starts at the top. With the extension, you specify 
whether it is **above**, in the **middle** or **below** — for the whole container
and, if necessary, differently for individual columns. The setting can be found in the
Dialog **Edit Container** in the **Layout** tab. 

On smartphones, the columns are below each other and are only as high as you
Content. No alignment is necessary there and none can be seen. 

## What readers see

The title or paragraph in the selected size and the column contents in the
chosen orientation. In order for this to work, two things have to be done in Studio.
set up around which the Studio administration
the Custom CSS with the Typo extension (Content Designer → Custom CSS)
and the theme typography (look & feel → typography). If the custom CSS is missing, 
Readers see the normal size and column contents for the additional levels
top — the content itself remains correct. 

## What you see in the CMS editor

- In the format selection field of the toolbar, the group **"MAN Typo-Scale"** appears 
  with size and line height per step, e.g. "Body L 18/27". The previous
  Entries are hidden because the scale contains them completely. 
- The selection box shows the active level, e.g. "Display 2XL · 72“. 
- Blocks with an additional step have a dark label in the upper right corner
  level, e.g. 'display-2xl' — so you can recognize them at a glance. 
- In the dialog **Edit container → layout** is listed under the
  Layout buttons of the "Vertical Alignment" section. The Columns
  in the editor show the selected orientation immediately. 

## When the expansion is ready

Studio doesn't load the extension when you open a page, but only when you 
the first time you insert a **Custom Block**, or
. After that, it will be available on all pages until you open the Browser tab
reload. How to turn it on specifically can be found under "Step by step".