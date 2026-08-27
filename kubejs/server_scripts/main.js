// Add all seeds to compostable tag
ServerEvents.tags('item', event => {
  event.add('minecraft:compostable', [
    /.*seed.*/,  // Match anything with "seed" in the name
    /.*spore.*/  // Also add spores
  ]);
  console.info('[Seeds] Added seed and spore items to minecraft:compostable tag');
});
