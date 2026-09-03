// Complete c:tools/knife so every knife in the pack works on any cutting board.
//
// This lives in KubeJS rather than the datapack for a specific reason: Kaleidoscope
// Compat registers its packs with Pack.Position.TOP (see its DatapackLoader), which puts
// them above moonlight-global-datapacks. It also ships its own c:tools/knife, so our
// datapack copy of that tag was silently losing and these five knives were never added.
// KubeJS tag events run after all datapacks have merged, so they always win.
//
// Prefer this file over a datapack tag whenever the tag path is one Kaleidoscope Compat
// also ships.
ServerEvents.tags('item', event => {
  const extra = [
    'kaleidoscope_end:dragon_tooth_knife',
    'trailandtales_delight:cherry_iron_knife',
    'trailandtales_delight:crimson_crystal_knife',
    'trailandtales_delight:cyan_crystal_knife',
    'trailandtales_delight:sniffer_eggshell_knife'
  ].filter(id => Item.exists(id));

  if (extra.length) {
    event.add('c:tools/knife', extra);
    console.info('[Knives] Added ' + extra.length + ' knives to c:tools/knife');
  }
});
