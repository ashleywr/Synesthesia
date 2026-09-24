# Invalid loot-table quarantine

This datapack supplies valid empty block loot tables for resources that the active
server log proved reference nonexistent item ids. Their source mods publish the table
unconditionally even though the corresponding block was not registered.

They are generated from the current profiling log with
`scripts/Generate-InvalidLootTableOverrides.ps1`. Regenerate and review this set after
updating the affected Create ecosystem mods; remove entries whose blocks become valid,
otherwise their legitimate drops would remain suppressed.

Two valid-content tables are overridden separately: Hexerei's willow vines and Scorched
Guns' blunderer use legacy Forge loot-condition/function ids. Their overrides retain
the original drops while using their NeoForge 1.21.1 replacements.
