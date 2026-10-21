"""Genera public/fonts/archivo-startes.woff2 a partir de @fontsource-variable/archivo.

Recorta los ejes a lo que usa el sitio (peso 400–800, ancho 70–116) y los
caracteres a latín básico y Latin-1 (español y alemán) más la puntuación tipográfica.
Uso: python3 scripts/subset-font.py  (requiere fonttools y brotli)
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools import subset

root = Path(__file__).resolve().parent.parent
src = root / "node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2"
out = root / "public/fonts/archivo-startes.woff2"

font = TTFont(src)
font = instantiateVariableFont(font, {"wght": (400, 800), "wdth": (70, 116)})

opts = subset.Options()
opts.flavor = "woff2"
opts.layout_features = ["kern", "liga", "calt", "tnum", "lnum", "case"]
opts.name_IDs = ["*"]
s = subset.Subsetter(opts)
s.populate(unicodes=list(range(0x20, 0x7F)) + list(range(0xA0, 0x100)) + [0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D, 0x2026, 0x20AC, 0x2022])
s.subset(font)
font.flavor = "woff2"
font.save(out)
print(out, out.stat().st_size, "bytes")
