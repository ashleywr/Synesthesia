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

// Every Compat also clones Farmer's Delight's generic log-stripping recipes.
// Those duplicates can win recipe selection over Extra Delight's own recipes,
// replacing cinnamon bark with ordinary tree bark on the cutting board.
ServerEvents.recipes(event => {
  [
    'everycomp:fd/extradelight/cutting/cinnamon_log',
    'everycomp:fd/extradelight/cutting/cinnamon_wood',
    'everycomp:fd/extradelight/cutting/cinnamon_log_using_deployer',
    'everycomp:fd/extradelight/cutting/cinnamon_wood_using_deployer',
    'create:cutting/runtime_generated/compat/extradelight/cinnamon_log_to_stripped_cinnamon_log',
    'create:cutting/runtime_generated/compat/create/tag_runtime_generated/compat/extradelight/cinnamon_to_cinnamon_planks',
    'sawmill:extradelight/cinnamon_log_0',
    'sawmill:extradelight/cinnamon_log_1',
    'sawmill:extradelight/cinnamon_log_4',
    'sawmill:extradelight/cinnamon_log_5'
  ].forEach(id => event.remove({ id }));

  const createCutting = (id, ingredient, results) => event.custom({
    type: 'create:cutting',
    ingredients: [{ item: ingredient }],
    processing_time: 50,
    results
  }).id(id);

  createCutting(
    'synesthesia:compat/create/cutting/extradelight_cinnamon_log_stripping',
    'extradelight:cinnamon_log',
    [
      { id: 'extradelight:stripped_cinnamon_log' },
      { id: 'extradelight:cinnamon_bark' }
    ]
  );
  createCutting(
    'synesthesia:compat/create/cutting/extradelight_cinnamon_wood_stripping',
    'extradelight:cinnamon_wood',
    [
      { id: 'extradelight:strippedcinnamon_wood' },
      { id: 'extradelight:cinnamon_bark' }
    ]
  );
  createCutting(
    'synesthesia:compat/create/cutting/extradelight_cinnamon_log_planks',
    'extradelight:cinnamon_log',
    [
      { id: 'extradelight:cinnamon_planks', count: 6 },
      { id: 'extradelight:cinnamon_bark' }
    ]
  );
  createCutting(
    'synesthesia:compat/create/cutting/extradelight_cinnamon_wood_planks',
    'extradelight:cinnamon_wood',
    [
      { id: 'extradelight:cinnamon_planks', count: 6 },
      { id: 'extradelight:cinnamon_bark' }
    ]
  );
});
