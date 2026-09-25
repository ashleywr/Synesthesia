// Quark and Rechanted both try to convert the vanilla enchanting table in place.
// Quark's automatic conversion is disabled in quark-common.toml so Rechanted can
// reliably claim that interaction; keep Matrix Enchanting available deliberately.
ServerEvents.recipes(event => {
  if (!Item.exists('quark:matrix_enchanter') || !Item.exists('rechanted:mysterious_book')) return;

  event.shaped('quark:matrix_enchanter', [
    'ALA',
    'LTL',
    'ALA'
  ], {
    A: 'minecraft:amethyst_shard',
    L: 'minecraft:lapis_lazuli',
    T: 'minecraft:enchanting_table'
  }).id('synesthesia:matrix_enchanter');
});
