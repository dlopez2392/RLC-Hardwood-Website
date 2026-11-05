#!/usr/bin/env bash
# Subset variable fonts to Basic Latin + Latin-1 (covers Spanish: áéíóúüñ¿¡) + typographic punctuation.
set -euo pipefail
cd "$(dirname "$0")/.."
U="U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2013-2014,U+2018-201A,U+201C-201E,U+2022,U+2026,U+2032-2033,U+20AC,U+2122,U+2190-2193,U+2212,U+2605,U+00B0"
F=node_modules/@fontsource-variable
sub() { pyftsubset "$1" --unicodes="$U" --layout-features='kern,liga,calt,ss01,ss02,tnum,lnum,onum,case' --flavor=woff2 --output-file="$2" --no-hinting --desubroutinize; }
sub $F/fraunces/files/fraunces-latin-full-normal.woff2 public/fonts/fraunces.woff2
sub $F/fraunces/files/fraunces-latin-full-italic.woff2 public/fonts/fraunces-italic.woff2
sub $F/instrument-sans/files/instrument-sans-latin-wdth-normal.woff2 public/fonts/instrument-sans.woff2
ls -la public/fonts
# Instance variable axes down to what the design uses (big byte savings).
python3 - <<'PY'
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
def inst(path, limits):
    f = TTFont(path); f = instancer.instantiateVariableFont(f, limits); f.flavor = 'woff2'; f.save(path)
inst('public/fonts/fraunces.woff2', {'opsz': 96, 'SOFT': 100, 'WONK': 0, 'wght': (300, 600)})
inst('public/fonts/fraunces-italic.woff2', {'opsz': 96, 'SOFT': 100, 'WONK': 1, 'wght': (300, 600)})
inst('public/fonts/instrument-sans.woff2', {'wdth': 100, 'wght': (400, 700)})
PY
ls -la public/fonts
