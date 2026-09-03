// Opening a Seed Bag yields 1-3 seeds drawn from #c:seeds, weighted by rarity.
//
// Reading the tag at use time means this tracks every seed in the pack automatically,
// including the five vanilla ones NeoForge never puts in c:seeds and which the
// Synesthesia datapack adds back. Adding or removing a seed mod needs no script change.
//
// Weighting exists because the bag comes from crushing dirt, which is effectively
// infinite. An unweighted roll made dimension-gated crops (Eternal Starlight, the End,
// magic mods) as common as wheat, which undercuts the Phase 6 decision that finding a
// crop should mean something.
const SEED_WEIGHTS = [
  // Dimension- or progression-gated. Rare, but not impossible - a lucky bag is a nice
  // moment, it just must not be a reliable source.
  [/^(eternal_starlight|kaleidoscope_end|deeperdarker|forbidden_arcanus|hexerei|malum):/, 1],
  // Specialty crops from smaller content mods.
  [/^(kaleidoscope_dim_wine|kaleidoscope_world_liquor|trailandtales_delight|mowziesmobs|autumnity|supplementaries):/, 3],
  // Everyday farm crops - vanilla and the core food mods.
  [/^(minecraft|farmersdelight|kaleidoscope_cookery|kaleidoscope_grilling|kaleidoscope_chinesefood|bountifulfares|rusticdelight|youkaishomecoming|adorablehamsterpets):/, 12]
];
const DEFAULT_WEIGHT = 6;

function weightFor(id) {
  for (const [pattern, weight] of SEED_WEIGHTS) {
    if (pattern.test(id)) return weight;
  }
  return DEFAULT_WEIGHT;
}

ItemEvents.rightClicked('kubejs:seed_bag', event => {
  const { level, player, item } = event;
  if (level.isClientSide()) return;

  let pool = [];
  try {
    pool = Ingredient.of('#c:seeds')
      .getItemIds()
      .filter(id => id !== 'kubejs:seed_bag');
  } catch (err) {
    console.warn('[SeedBag] could not resolve #c:seeds: ' + err);
  }

  if (!pool.length) {
    // Never silently give nothing - a bag that consumes itself for no reward reads as a bug.
    console.warn('[SeedBag] #c:seeds resolved empty, falling back to wheat seeds');
    pool = ['minecraft:wheat_seeds'];
  }

  // Build a cumulative weight table once, then sample from it.
  const cumulative = [];
  let total = 0;
  for (const id of pool) {
    total += weightFor(id);
    cumulative.push(total);
  }

  const count = 1 + Math.floor(Math.random() * 3); // 1-3 seeds
  for (let i = 0; i < count; i++) {
    const roll = Math.random() * total;
    let picked = pool[pool.length - 1];
    for (let j = 0; j < cumulative.length; j++) {
      if (roll < cumulative[j]) { picked = pool[j]; break; }
    }
    player.give(Item.of(picked));
  }

  // Consume exactly one bag even when a stack is held.
  item.count--;

  player.playSound('minecraft:entity.item.pickup', 0.6, 1.2);
});
