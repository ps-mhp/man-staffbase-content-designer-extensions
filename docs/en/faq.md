# FAQ

**Question:** In the format selection field, the group "MAN Typo Scale" is missing. What to do? 

Answer: Studio doesn't load the extension until a custom block
and forgets about it when the browser tab is reloaded. 
Turn it on as described in "Step-by-step turn on → extension" 
. If the group is still missing after that, Studio
changed — please report this to the team that maintains the widgets. 

**Question:** Can I add the extension as a building block on the page? 

Answer: No. It has no visible content and therefore does not appear in
in the Select Block list. It only works in the Format selection field of Title and
Text. 

**Question:** I see the level in the editor, but not on the published page. 

Answer: Then the custom CSS with the typo extension is missing in Studio or is
deprecated. This is what the studio administration sets up. 

**Question:** There is a step on the published page, but not in the editor. 

Answer: The extension is not yet active in your browser tab. Toggle
Enter it and open the page again. 

**Question:** "Display L" appears as large as "H1" or smaller than expected. 

Answer: The theme typography in Studio (look & feel → typography) is still
not set to the MAN scale. This is set up by the studio administration. 

**Question:** After duplicating, the copy has lost its stage. 

Answer: This is known: The copy gets a new identifier without a level. 
Reset the level on the copy. 

**Question:** After changing from paragraph to H2, the heading is normal size, although "Body L" was previously set. 

Answer: Intentional: Body levels only apply to paragraphs. Removed the extension
the level that no longer matches the next time you save. 

**Question:** How do I turn off the debugging extension in my browser? 

Answer: In Studio, open the browser's developer console and type
'localStorage.setItem("sbt-typo-scale", "off")', then reload the tab. 
Turn it on again with 'localStorage.removeItem("sbt-typo-scale")'. This works
only in your browser.