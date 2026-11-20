# Content Designer Extensions

This extension adds the **MAN Typo Scale**—with 13 levels—to the format selection field
for the **Title** and **Text** elements in Studio’s Content Designer—
ranging from “Display 2XL · 72” to “Body XS · 12.” This does not insert a module onto
the page: You select the size directly on the title or text paragraph, just as
you previously selected “Heading 2” or “Paragraph.”

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

The page structure remains unchanged: A title is always the
main heading of the page, H2 through H4 are subheadings, and body levels
are paragraphs. The display levels only change the size.

## Vertical Alignment in Container Columns

If columns of different lengths are placed side by side in a **container**,
the content of each column previously started at the top. With this extension, you can specify
whether the content is aligned **top**, **center**, or **bottom**—for the entire container
and, if necessary, differently for individual columns. You’ll find this setting in the
**Edit Container** dialog under the **Layout** tab.

On smartphones, the columns appear one below the other and are only as tall as their
content. No alignment is needed there, and none is visible.

## What Readers See

The title or paragraph in the selected size and the column content in the
selected alignment. For this to work, two things must be
configured in Studio, which the Studio administration
handles: the Custom CSS with the Typo extension (Content Designer → Custom CSS)
and the theme typography (Look & Feel → Typography). If the Custom CSS is missing,
readers will see the normal size for the additional levels and the column content
at the top—the content itself remains correct.

## What You See in the CMS Editor

- The **“MAN Typo Scale”** group appears in the format selection field of the toolbar
  with size and line height for each level, e.g., “Body L 18/27.” The previous
  entries are hidden because the scale fully encompasses them.
- The drop-down menu shows the active level, e.g., “Display 2XL · 72.”
- Blocks with an additional level have a dark label in the upper-right corner indicating
  their level, e.g., `display-2xl`—so you can recognize them at a glance.
- In the **Edit Container → Layout** dialog, below the
  layout buttons, you’ll find the **“Vertical Alignment”** section. The columns
  in the editor immediately reflect the selected alignment.

## When the extension is available

Studio does not load the extension when you open a page, but only
when you insert or
edit a **Custom Block** for the first time. After that, it’s available on all pages until you
reload the browser tab. See “Step by Step” for instructions on how to enable it manually.
