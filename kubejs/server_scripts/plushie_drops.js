// Non-hostile plushie_buddies drops.
//
// plushie_buddies is craft-only: no mob or loot table naturally gives you a plushie.
// Hostile mobs get a rare plushie drop on kill via a NeoForge global loot modifier
// instead (data/synesthesia_plushies) - see AGENTS.md. This script covers everything
// else: a small chance at the matching plushie when a player interacts with a mob
// using its usual feed/tame item, or (for mobs with no such item) just by right-
// clicking it empty-handed, i.e. petting it.
//
// This is purely additive - it never cancels the event or consumes the item, so
// normal taming/breeding/bartering still happens exactly as vanilla intends.
//
// NEEDS IN-GAME VERIFICATION: EntityEvents.rightClicked's exact property names
// weren't confirmed against this KubeJS version before writing this, since there
// was no way to check docs or test in-game. Test with /reload, then a few actual
// interactions, before assuming this works. The fallback chains below
// (event.item || event.itemStack, etc.) exist because of that uncertainty.

const INTERACT_CHANCE = 0.02; // chance per interaction with the correct item
const PET_CHANCE = 0.02;      // chance per empty-handed interaction (petting)

const ITEM_MOBS = {
  'minecraft:allay': { plushie: 'allay', items: ['minecraft:amethyst_shard'] },
  'minecraft:axolotl': { plushie: 'axolotl', items: ['minecraft:tropical_fish_bucket'] },
  'minecraft:bee': { plushie: 'bee', items: ['minecraft:poppy', 'minecraft:dandelion', 'minecraft:cornflower', 'minecraft:allium'] },
  'minecraft:camel': { plushie: 'camel', items: ['minecraft:cactus'] },
  'minecraft:cat': { plushie: 'cat', items: ['minecraft:cod', 'minecraft:salmon'] },
  'minecraft:chicken': { plushie: 'chicken', items: ['minecraft:wheat_seeds'] },
  'minecraft:cow': { plushie: 'cow', items: ['minecraft:wheat'] },
  'minecraft:dolphin': { plushie: 'dolphin', items: ['minecraft:cod', 'minecraft:salmon'] },
  'minecraft:donkey': { plushie: 'donkey', items: ['minecraft:golden_apple'] },
  'minecraft:fox': { plushie: 'fox', items: ['minecraft:sweet_berries'] },
  'minecraft:frog': { plushie: 'frog', items: ['minecraft:slime_ball'] },
  'minecraft:goat': { plushie: 'goat', items: ['minecraft:wheat'] },
  'minecraft:horse': { plushie: 'horse', items: ['minecraft:golden_carrot'] },
  'minecraft:iron_golem': { plushie: 'iron_golem', items: ['minecraft:poppy'] },
  'minecraft:llama': { plushie: 'llama', items: ['minecraft:hay_block'] },
  'minecraft:mooshroom': { plushie: 'mooshroom', items: ['minecraft:wheat'] },
  'minecraft:mule': { plushie: 'mule', items: ['minecraft:golden_carrot'] },
  'minecraft:panda': { plushie: 'panda', items: ['minecraft:bamboo'] },
  'minecraft:parrot': { plushie: 'parrot', items: ['minecraft:wheat_seeds'] },
  'minecraft:pig': { plushie: 'pig', items: ['minecraft:carrot'] },
  'minecraft:piglin': { plushie: 'piglin', items: ['minecraft:gold_ingot'] },
  'minecraft:rabbit': { plushie: 'rabbit', items: ['minecraft:carrot'] },
  'minecraft:sheep': { plushie: 'sheep', items: ['minecraft:wheat'] },
  'minecraft:sniffer': { plushie: 'sniffer', items: ['minecraft:torchflower_seeds'] },
  'minecraft:strider': { plushie: 'strider', items: ['minecraft:warped_fungus'] },
  'minecraft:trader_llama': { plushie: 'trader_lama', items: ['minecraft:hay_block'] },
  'minecraft:turtle': { plushie: 'turtle', items: ['minecraft:seagrass'] },
  'minecraft:villager': { plushie: 'villager', items: ['minecraft:bread'] },
  'minecraft:wolf': { plushie: 'wolf', items: ['minecraft:bone'] },
};

// No natural feed/tame item exists for these - petting (empty-handed interact) is
// the only non-killing hook available.
const PET_MOBS = {
  'minecraft:armadillo': 'armadillo',
  'minecraft:bat': 'bat',
  'minecraft:glow_squid': 'glow_squid',
  'minecraft:polar_bear': 'polar_bear',
  'minecraft:pufferfish': 'pufferfish',
  'minecraft:skeleton_horse': 'skeleton_horse',
  'minecraft:squid': 'squid',
  'minecraft:wandering_trader': 'wandering_trader',
};

function givePlushie(player, mob) {
  player.give('plushie_buddies:plushie_' + mob);
}

const rightClickedSource = typeof EntityEvents !== 'undefined' ? EntityEvents : PlayerEvents;

rightClickedSource.rightClicked(event => {
  const level = event.level || event.world;
  if (!level || level.isClientSide()) return;

  const player = event.player;
  if (!player) return;

  const entity = event.entity || event.target;
  if (!entity) return;

  const entityId = entity.type;
  const heldItem = event.item || event.itemStack;

  const itemMob = ITEM_MOBS[entityId];
  if (itemMob && heldItem && itemMob.items.includes(heldItem.id)) {
    if (Math.random() < INTERACT_CHANCE) givePlushie(player, itemMob.plushie);
    return;
  }

  const petMob = PET_MOBS[entityId];
  if (petMob && (!heldItem || heldItem.isEmpty())) {
    if (Math.random() < PET_CHANCE) givePlushie(player, petMob);
  }
});
