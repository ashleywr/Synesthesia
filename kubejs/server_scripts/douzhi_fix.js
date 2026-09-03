// Narrow Fermented Bean Juice (douzhi) from "any seeds" to soybeans.
//
// Why KubeJS and not a datapack override: kaleidoscope_chinesefood registers its
// fuzzy_cooking_recipes datapack with Pack.Position.TOP (see ModBuiltInResourcePacks),
// which outranks moonlight-global-datapacks, so a same-path override of the flex recipe
// is silently ignored. KubeJS recipe events run after all datapacks have merged and win
// regardless of pack order. Both variants are handled here so there is one source of
// truth rather than a datapack file for one and a script for the other.
//
// The bug: douzhi's recipes were every-slot-#c:seeds with no other anchor. Completing
// c:seeds (adding vanilla seeds plus canola) pulled Rustic Delight's cooking-oil
// ingredients into the tag, so the 1-slot flex recipe matched any oil attempt in the
// stockpot and won. Douzhi is fermented *bean* juice, so beans are also the correct read.
const DOUZHI = 'kaleidoscope_chinesefood:douzhi';
const BEAN = { tag: 'c:crops/soybean' };

ServerEvents.recipes(event => {
  if (!Item.exists(DOUZHI)) return;

  event.remove({ id: 'kaleidoscope_chinesefood:stockpot/douzhi' });
  event.remove({ id: 'kaleidoscope_chinesefood:flex_stockpot/douzhi' });

  const shared = {
    carrier: { item: 'minecraft:bowl' },
    cooking_bubble_color: 16772291,
    cooking_texture: 'kaleidoscope_cookery:stockpot/default_cooking',
    finished_bubble_color: 16034443,
    finished_texture: 'kaleidoscope_cookery:stockpot/default_finished',
    soup_base: 'minecraft:water',
    time: 300,
    result: { count: 1, id: DOUZHI }
  };

  // strict pot keeps the original three-slot cost; the fuzzy variant keeps its single slot
  event.custom(Object.assign({ type: 'kaleidoscope_cookery:stockpot',
    ingredients: [BEAN, BEAN, BEAN] }, shared)).id('synesthesia:stockpot/douzhi');
  event.custom(Object.assign({ type: 'kaleidoscope_cookery:flex_stockpot',
    ingredients: [BEAN] }, shared)).id('synesthesia:flex_stockpot/douzhi');

  console.info('[Douzhi] Rebound Fermented Bean Juice to soybeans (was any #c:seeds)');
});
