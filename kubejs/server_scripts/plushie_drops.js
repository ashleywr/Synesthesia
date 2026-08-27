// Non-kill plushie_buddies drops.
//
// plushie_buddies is craft-only: no mob or loot table naturally gives you a plushie.
// Mobs with no non-killing interaction get a rare plushie drop on kill instead, via a
// NeoForge global loot modifier (data/synesthesia_plushies) - see AGENTS.md. This
// script covers every mob that DOES have a real interaction: a small chance at the
// matching plushie when a player interacts with it using its usual feed/tame/tool
// item (armadillo + brush, cow + wheat, wolf + bone, etc.).
//
// This is purely additive - it never cancels the event or consumes the item, so
// normal taming/breeding/bartering/brushing still happens exactly as vanilla intends.
//
// KubeJS 2101.7.2 exposes this as ItemEvents.entityInteracted. It carries the
// player, the target entity, and the actual item used, so normal interactions
// remain intact and this script only adds the independent plushie roll.

const INTERACT_CHANCE = 0.02; // chance per interaction with the correct item

const ITEM_MOBS = {
  'minecraft:allay': { plushie: 'allay', items: ['minecraft:amethyst_shard'] },
  'minecraft:armadillo': { plushie: 'armadillo', items: ['minecraft:brush'] },
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

function givePlushie(player, mob) {
  player.give('plushie_buddies:plushie_' + mob);
}

ItemEvents.entityInteracted(event => {
  const player = event.player || event.entity;
  if (!player) return;

  const level = event.level || event.world || player.level;
  if (!level || level.isClientSide()) return;

  const entity = event.target;
  if (!entity) return;

  const itemMob = ITEM_MOBS[entity.type];
  if (!itemMob) return;

  const heldItem = event.item;
  if (!heldItem || !itemMob.items.includes(heldItem.id)) return;

  if (Math.random() < INTERACT_CHANCE) givePlushie(player, itemMob.plushie);
});
