// Hide items that are superseded by a consolidated station rather than by item
// unification, so Generate-UnificationHideList.py does not know about them.
//
// KubeJS rather than a datapack tag because the generated
// c:hidden_from_recipe_viewers.json is rewritten wholesale by that script; a KubeJS tag
// event merges on top of whatever it produces instead of fighting it.
ServerEvents.tags('item', event => {
  const superseded = [
    // Barbeque's Delight grill: the Kaleidoscope Grilling grill now cooks its skewers,
    // so the second grill is redundant. Its recipe is disabled in the datapack; this
    // stops the orphaned block showing up in JEI/EMI and AMI.
    'barbequesdelight:grill'
    // Poor God Soup is NOT hidden: it moved from the Farmer's Delight cooking pot to the
    // Kaleidoscope stockpot rather than being removed, so it stays obtainable.
  ].filter(id => Item.exists(id));

  if (superseded.length) {
    event.add('c:hidden_from_recipe_viewers', superseded);
    console.info('[Hide] Hid ' + superseded.length + ' superseded station(s)');
  }
});
