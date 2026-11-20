# FAQ

**Question:** The "MAN Typo Scale" group is missing from the format selection field. What should I do?

Answer: Studio only loads the extension when a custom block
is inserted or edited, and it forgets to load it when the browser tab is reloaded.
Enable it as described under “Step by Step → Enable Extension.”
If the group is still missing afterward, Studio has likely
changed—please report this to the team that maintains the widgets.

**Question:** Can I insert the extension as a building block on the page?

Answer: No. It has no visible content and therefore does not appear in
the “Select Block” list. It only takes effect in the format selection fields for Title and
Text and in the “Edit Container” dialog.

**Question:** I can see the step in the editor, but not on the published page.

Answer: In that case, the Custom CSS with the Typo extension is either missing from Studio or is
out of date. The Studio administration team will take care of this.

**Question:** A level is visible on the published page, but not in the editor.

Answer: The extension is not yet active in your browser tab. Enable
it and reopen the page.

**Question:** A title on the published page is only as large as “H1,” even though I wanted a display level.

Answer: The title does not yet have a level assigned to it. A title without a selected level
is always set to H1 (32 px)—this applies to every new title and to titles from
older versions that the editor still displayed as “Display L” or “Display S.” Place the cursor in the title, select the level under
**“MAN Typo Scale”** (it will then be highlighted in dark), and click
**Save**.

**Question:** After duplicating, the copy has lost its level.

Answer: This is a known behavior: The copy is assigned a new identifier without a level.
Reassign the level to the copy.

**Question:** After switching from a paragraph to an H2 heading, the heading is normal size even though “Body L” was previously set.

Answer: Intended behavior: Body levels apply only to paragraphs. The extension removes
the no-longer-appropriate level the next time you save.

**Question:** The “Vertical Alignment” section is missing from the “Edit Container” dialog.

Answer: The extension is not yet active in your browser tab. Enable
it as described under “Step by Step → Enable Extension”
and reopen the dialog. The section is only available in the
**Layout** tab.

**Question:** Why don’t I see the alignment on the published page?

Answer: First, check whether the columns have different amounts of content—
if they are the same length, there is nothing to align. On a smartphone,
the columns appear one below the other; the alignment is intentionally disabled there. If it’s
missing on the desktop as well, the Custom CSS in Studio is out of date. The
Studio administration team will fix this.

**Question:** What does “like container” mean for a column?

Answer: The column adopts the alignment selected above for the entire container
. If you select top, middle, or bottom, that
setting applies to this column.

**Question:** How do I disable the debugging extension in my browser?

Answer: Open the browser’s developer console in Studio and enter
`localStorage.setItem("sbt-typo-scale", "off")`, then reload the tab.
To re-enable it, use `localStorage.removeItem("sbt-typo-scale")`. This only affects
your browser.
