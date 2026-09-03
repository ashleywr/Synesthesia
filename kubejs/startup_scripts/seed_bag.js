// Seed Bag - a small pouch obtained by crushing dirt, opened for a few random seeds.
//
// Registered through KubeJS rather than Synesthesia Core so this needs no mod build.
// It exists because Create cannot express "a random seed from a tag": decompiling
// Create 1.21.1 shows CrushingRecipe.getMaxOutputCount() == 7 and
// MillingRecipe.getMaxOutputCount() == 4, while #c:seeds holds 55 items. The bag moves
// the randomisation out of the recipe and into an item the player opens.
//
// Startup scripts only reload on a full game restart, not /reload.
StartupEvents.registry('item', event => {
  event.create('seed_bag')
    .displayName('Seed Bag')
    // Reuse the vanilla bundle texture so the pack ships no new art.
    .texture('minecraft:item/bundle')
    .maxStackSize(16);
});
