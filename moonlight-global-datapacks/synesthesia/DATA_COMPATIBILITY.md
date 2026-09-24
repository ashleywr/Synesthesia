# Recipe and tag compatibility

The September 2026 repairs preserve the installed mods' recipes and tag members:

- Extra Delight 2.6.6's dark chocolate and nut butter milkshake Create recipes
  use NeoForge's `neoforge:single` fluid ingredient type.
- Fruits Delight 1.2.14's kiwi filling and emptying recipes use direct item
  result IDs. Filling also uses the current fluid ingredient type.
- Buddycards 5.1.1's Luminis panels use the `building` crafting-book category.
- Donkey soup stays retired under the pack's existing cooking policy. The
  `pack.mcmeta` filter replaces the false-condition recipe override, avoiding
  the warning emitted when the condition produces a non-object recipe body.

`Generate-RecipeCompatibilityOverrides.ps1` regenerates these recipe repairs.

Every Compat's cinnamon item tag incorrectly uses the block ID
`stripped_cinnamon_wood`; the item is registered as `strippedcinnamon_wood`.
`kubejs/server_scripts/cinnamon_tag_repair.js` supplies the four item IDs in
KubeJS's `last` generated-data stage, after Every Compat's dynamic pack. A
Moonlight file override has insufficient priority. No block tag is introduced.

Carry On's replacement blacklist merges all 326 entries from the six installed
contributors: Kaleidoscope Cookery 1.5.1, Kaleidoscope Tavern 1.2.0,
Kaleidoscope Chinese Food 1.1.12, Refurbished Furniture 1.0.22,
Sophisticated Backpacks 3.26.3.2158, and TFMG 1.3.1-community. Only
`kaleidoscope_chinesefood:couplet_block` changes to the registered block ID
`kaleidoscope_chinesefood:couplet`. Regenerate with
`scripts/Generate-CarryOnBlacklistOverride.ps1` when changing contributors;
the replacement must retain every installed mod's restrictions. Additional
datapack contributions also need review when regenerating this snapshot.

Nether Expansion's `soul_has_feature/ecto_soul_sand` biome tag aliases the
mod's existing `has_feature/ecto_soul_sand` tag. IDAS's misspelled
`bygredwood_biomes` aliases its existing `byg_redwood_biomes` tag, retaining
Synesthesia's current empty membership for the absent biome provider.

The remaining missing hooks have explicit empty, additive definitions:

- IDAS's BOP/BYG mahogany biome tags: those biome providers are absent.
- Forbidden Arcanus's Soulbound-incompatible enchantments: no installed
  restrictions are supplied, matching its empty item-incompatibility hook.
- Cataclysm's black-steel/monstrosity and Legendary Monsters' dinosaur-bone
  tier tags: these legacy `needs_*` names are used as **incorrect-for-drops**
  sets in their current SimpleTier constructors. Populating them as positive
  mining requirements would invert their meaning. Empty sets preserve behavior.
- Sinew's shears-speed extension tag: its mixin appends a speed rule for this
  tag, but the mod supplies no members. Vanilla shears rules remain intact.
- The five common fuel tags: no installed data providers supply biodiesel,
  ethanol, high-cetane diesel, high-octane gasoline, or hydrogen fuel.

These definitions use `replace: false`, so later integrations can add members.
