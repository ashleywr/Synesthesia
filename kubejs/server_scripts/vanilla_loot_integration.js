// Add small, themed chances for modded commodities without turning every chest into a sampler crate.
// Each entry rolls independently; groups are kept near 0.1-0.3 expected modded stacks per chest.
const SYNESTHESIA_VANILLA_LOOT_INTEGRATIONS = [
  {
    tables: ['minecraft:chests/village/village_armorer'],
    entries: [
      ['caverns_and_chasms:silver_nugget', 0.16, 1, 3],
      ['caverns_and_chasms:silver_ingot', 0.06, 1, 1]
    ]
  },
  {
    tables: ['minecraft:chests/village/village_butcher'],
    entries: [
      ['alexsmobs:kangaroo_meat', 0.06, 1, 2],
      ['alexsmobs:moose_ribs', 0.06, 1, 2],
      ['mynethersdelight:hoglin_loin', 0.06, 1, 2],
      ['youkaishomecoming:raw_venison', 0.06, 1, 2],
      ['kaleidoscope_grilling:sichuan_pepper', 0.06, 1, 2]
    ]
  },
  {
    tables: [
      'minecraft:chests/village/village_plains_house',
      'minecraft:chests/village/village_savanna_house',
      'minecraft:chests/village/village_taiga_house'
    ],
    entries: [['kaleidoscope_grilling:pepper_sapling', 0.04, 1, 1]]
  },
  {
    tables: ['minecraft:chests/village/village_cartographer'],
    entries: [['waystones:blank_scroll', 0.10, 1, 1]]
  },
  {
    tables: ['minecraft:chests/village/village_fisher'],
    entries: [
      ['caverns_and_chasms:cavefish', 0.08, 1, 2],
      ['aquamirae:spinefish', 0.06, 1, 2],
      ['alexsmobs:raw_catfish', 0.06, 1, 2]
    ]
  },
  {
    tables: ['minecraft:chests/village/village_fletcher'],
    entries: [
      ['caverns_and_chasms:blunt_arrow', 0.10, 2, 6],
      ['caverns_and_chasms:ricochet_arrow', 0.07, 1, 4],
      ['caverns_and_chasms:large_arrow', 0.07, 1, 3]
    ]
  },
  {
    tables: ['minecraft:chests/village/village_shepherd'],
    entries: [
      ['supplementaries:flax', 0.08, 1, 3],
      ['farmersdelight:canvas', 0.06, 1, 2],
      ['estrogen:moth_wool', 0.04, 1, 1],
      ['cluttered:fabric_bolts', 0.05, 1, 2]
    ]
  },
  {
    tables: ['minecraft:chests/village/village_tannery'],
    entries: [
      ['alexsmobs:kangaroo_hide', 0.08, 1, 2],
      ['alexsmobs:bear_fur', 0.06, 1, 2],
      ['kaleidoscope_nether:hoglin_hide', 0.05, 1, 2],
      ['quark:ravager_hide', 0.03, 1, 1]
    ]
  },
  {
    tables: ['minecraft:chests/village/village_temple'],
    entries: [
      ['forbidden_arcanus:arcane_crystal_dust', 0.06, 1, 2],
      ['hexerei:mandrake_root', 0.06, 1, 2],
      ['hexerei:seed_mixture', 0.04, 1, 1]
    ]
  },
  {
    tables: ['minecraft:chests/village/village_toolsmith'],
    entries: [
      ['caverns_and_chasms:silver_nugget', 0.12, 1, 3],
      ['caverns_and_chasms:tin_ingot', 0.08, 1, 2]
    ]
  },
  {
    tables: ['minecraft:chests/village/village_weaponsmith'],
    entries: [
      ['caverns_and_chasms:silver_nugget', 0.10, 1, 3],
      ['caverns_and_chasms:copper_sword', 0.03, 1, 1]
    ]
  },
  {
    tables: ['minecraft:chests/abandoned_mineshaft'],
    entries: [
      ['create:andesite_alloy', 0.06, 1, 2],
      ['create:shaft', 0.08, 2, 6],
      ['create:track', 0.06, 2, 5]
    ]
  },
  {
    tables: ['minecraft:chests/shipwreck_supply'],
    entries: [
      ['supplementaries:rope', 0.10, 1, 3],
      ['farmersdelight:canvas', 0.06, 1, 2],
      ['aquamirae:spinefish', 0.05, 1, 2]
    ]
  },
  {
    tables: ['minecraft:chests/stronghold_library'],
    entries: [
      ['waystones:blank_scroll', 0.07, 1, 1],
      ['create_enchantment_industry:blazes_enchanting_handbook', 0.03, 1, 1],
      ['companions:book_magic_ray', 0.04, 1, 1]
    ]
  },
  {
    tables: ['minecraft:chests/woodland_mansion'],
    entries: [
      ['forbidden_arcanus:arcane_crystal_dust', 0.05, 1, 2],
      ['hexerei:mandrake_root', 0.05, 1, 2],
      ['hexerei:infused_fabric', 0.03, 1, 1],
      ['companions:book_magic_ray', 0.03, 1, 1]
    ]
  },
  {
    tables: ['minecraft:chests/simple_dungeon'],
    entries: [
      ['supplementaries:rope', 0.07, 1, 2],
      ['farmersdelight:canvas', 0.05, 1, 2],
      ['caverns_and_chasms:blunt_arrow', 0.08, 2, 5],
      ['companions:copper_coin', 0.08, 1, 2]
    ]
  },
  {
    tables: ['minecraft:chests/pillager_outpost'],
    entries: [['companions:copper_coin', 0.10, 1, 2]]
  },
  {
    tables: [
      'minecraft:chests/nether_bridge',
      'minecraft:chests/bastion_other',
      'minecraft:chests/bastion_bridge',
      'minecraft:chests/bastion_hoglin_stable'
    ],
    entries: [['companions:nether_coin', 0.12, 1, 1]]
  },
  {
    tables: ['minecraft:chests/end_city_treasure'],
    entries: [
      ['companions:end_coin', 0.20, 1, 1],
      ['companions:book_black_hole', 0.04, 1, 1]
    ]
  },
  {
    tables: ['minecraft:chests/ancient_city'],
    entries: [['companions:book_black_hole', 0.03, 1, 1]]
  }
]

LootJS.modifiers(event => {
  SYNESTHESIA_VANILLA_LOOT_INTEGRATIONS.forEach(group => {
    const modifier = event.addTableModifier(group.tables)

    group.entries.forEach(([item, chance, minimum, maximum]) => {
      if (!Item.exists(item)) return
      modifier.addLoot(LootEntry.of(item).randomChance(chance).setCount([minimum, maximum]))
    })
  })
})
