# Locally disabled mods

Packwiz has no per-mod “disabled” state: metadata in `mods/` means “install this.” Its install index therefore tracks only enabled mods. The packages below are intentionally kept as `*.jar.disabled` in the live Prism instance and are deliberately absent from `mods/`.

This is an inventory snapshot from 2026-09-24. To re-enable an indexed mod, restore its `.jar` suffix, copy its Prism `.index` metadata back into `mods/`, remove it from this list, then run `packwiz refresh`.

## Prism-indexed packages

- `chat-heads.pw.toml` — `chat_heads-0.15.7-neoforge-1.21.jar.disabled`
- `immersive-portals-sodium-iris-dh-compat-fork.pw.toml` — `immersive-portals-neoforge-compat-fork-6.0.7.jar.disabled`
- `jade-addons-forge.pw.toml` — `JadeAddons-1.21.1-NeoForge-6.1.1.jar.disabled`
- `mixintrace-resmithed.pw.toml` — `mixintracereforged-neoforge-1.0.0-1.21.1.jar.disabled`

## Local-only packages

These are manually managed and are not Packwiz downloads:
- `ami-neoforge-1.21.1-1.8.7.jar.disabled`
- `kaleidoscope_ImmersiveEating-neoforge1.21.1-1.4.4.jar.disabled`
