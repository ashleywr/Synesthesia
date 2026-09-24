// Kaleidoscope Cookery's original modifier only targets vanilla short grass. Keep its
// own loot table—the source of truth for its head-slot predicate, seed chances, and
// Fortune handling—and apply that table to Synesthesia's curated foliage tag instead.
// The table is only injected in the Overworld; dimension-specific flora keep native loot.
const SYNESTHESIA_STRAW_HAT_FOLIAGE = '#synesthesia:straw_hat_seed_foliage';
const SYNESTHESIA_STRAW_HAT_SEED_TABLE = 'kaleidoscope_cookery:straw_hat_seed_drop';

LootJS.modifiers(event => {
  // Replace the upstream short-grass-only modifier so short grass has one seed roll.
  event.removeGlobalModifiers('kaleidoscope_cookery:straw_hat_seed_drop');

  event
    .addBlockModifier(SYNESTHESIA_STRAW_HAT_FOLIAGE)
    .addLoot(
      LootEntry.reference(SYNESTHESIA_STRAW_HAT_SEED_TABLE)
        .when(conditions => conditions.matchDimension('minecraft:overworld'))
    );

  console.info('[Straw Hat] Extended Kaleidoscope Cookery seed table to synesthesia:straw_hat_seed_foliage in the Overworld');
});
