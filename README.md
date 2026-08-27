# Synesthesia

NeoForge 1.21.1 modpack, managed with [packwiz](https://packwiz.infra.link/).

## Versions

- Minecraft 1.21.1
- NeoForge 21.1.248

## Install

Use packwiz-installer or packwiz-installer-bootstrap with:

    https://raw.githubusercontent.com/ashleywr/Synesthesia/main/pack.toml

## Contents

- `mods/` - packwiz mod metadata
- `kubejs/` - startup, server, and client scripts
- `defaultconfigs/` - config applied to config/ on first launch, if not already present
- `moonlight-global-datapacks/` - datapacks applied to every world automatically

## Updating

Add a mod:

    packwiz modrinth add <slug>
    packwiz curseforge add <slug>

After any manual edit under this repo, rebuild the index:

    packwiz refresh
