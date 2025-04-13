#!/bin/bash

npx google-closure-compiler \
--language_in ECMASCRIPT5_STRICT \
--language_out ECMASCRIPT5_STRICT \
--warning_level DEFAULT \
--compilation_level WHITESPACE_ONLY \
--isolation_mode IIFE \
--js "./../../lib/rune.js" \
--js "./../../src/scope/Manifest.js" \
--js "./../../src/data/resource/Requests.js" \
--js "./../../src/particle/spell/Spell.js" \
--js "./../../src/entity/Entity.js" \
--js "./../../src/entity/players/Player.js" \
--js "./../../src/entity/players/Wizard.js" \
--js "./../../src/entity/enemy/Enemy.js" \
--js "./../../src/entity/enemy/Knight.js" \
--js "./../../src/scene/menu/Menu.js" \
--js "./../../src/scene/game/Game.js" \
--js "./../../src/system/Main.js" \
--js "./../../src/scope/Alias.js" \
--js_output_file "./../../dist/howlkraul.js";