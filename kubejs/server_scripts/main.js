// Add all seeds and spores to the shared compostable item tag.
ServerEvents.tags('item', event => {
  event.add('minecraft:compostable', [
    /.*seed.*/,
    /.*spore.*/
  ]);
  console.info('[Seeds] Added seed and spore items to minecraft:compostable tag');
});

// Acorns are small, tannic tree seeds. They are valuable enough to keep, but compost
// at the same 30% tier as ordinary seeds and leaves rather than as fruit or bread.
ServerEvents.compostableRecipes(event => {
  event.addReplace('crittersandcompanions:acorn', 0.30);
  console.info('[Acorns] Set Critters and Companions acorns to 30% compost chance');
});
