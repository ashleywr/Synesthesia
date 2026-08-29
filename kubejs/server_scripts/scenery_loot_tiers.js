// Surface scenery should reward a detour with supplies, not a progression skip.
// Named combat and progression destinations keep their own loot tables.
const SYNESTHESIA_SCENERY_TABLES = [
  /^mvs:.*/,
  /^explorify:chest\/.*/
]

const SYNESTHESIA_SCENERY_VALUABLES = [
  'minecraft:amethyst_shard',
  'minecraft:diamond',
  'minecraft:emerald',
  'minecraft:gold_ingot',
  'minecraft:gold_nugget',
  'minecraft:golden_apple',
  'minecraft:iron_ingot',
  'minecraft:iron_nugget',
  'minecraft:lapis_lazuli',
  'minecraft:name_tag',
  'minecraft:raw_gold',
  'minecraft:redstone',
  'minecraft:redstone_block'
]

LootJS.modifiers(event => {
  const scenery = event.addTableModifier(SYNESTHESIA_SCENERY_TABLES)

  SYNESTHESIA_SCENERY_VALUABLES.forEach(item => scenery.removeLoot(item))
  scenery.removeLoot(ItemFilter.ENCHANTED)
  scenery.removeLoot('#minecraft:music_discs')
})
