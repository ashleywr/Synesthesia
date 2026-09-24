// Every Compat copies the block registry ID into its generated item tag, but
// Extra Delight 2.6.6 registers the stripped wood item without the underscore.
// Generate last: Every Compat's dynamic pack loads after Moonlight global packs.
ServerEvents.generateData('last', event => {
  event.json('everycomp:tags/item/extradelight/cinnamon_log', {
    replace: true,
    values: [
      'extradelight:cinnamon_log',
      'extradelight:cinnamon_wood',
      'extradelight:stripped_cinnamon_log',
      'extradelight:strippedcinnamon_wood'
    ]
  });
});
