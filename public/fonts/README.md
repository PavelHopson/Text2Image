# Vendored fonts

Text2Image serves these fonts locally so opening the product does not disclose the visitor IP, referrer
or user agent to Google Fonts. Runtime requests to `fonts.googleapis.com` and `fonts.gstatic.com` are forbidden.

All binaries are unmodified WOFF2 subsets distributed by the official Google Fonts service under the
SIL Open Font License 1.1. Canonical source and license directories:

- Inter: https://github.com/google/fonts/tree/main/ofl/inter
- Outfit: https://github.com/google/fonts/tree/main/ofl/outfit
- JetBrains Mono: https://github.com/google/fonts/tree/main/ofl/jetbrainsmono

The CSS contract keeps `font-display: swap` and the existing fallback stacks. Only the subsets required
by the current Russian/Latin product are vendored.

| File | SHA-256 |
| --- | --- |
| `inter-cyrillic.woff2` | `71d5ee93cc1e9f1d520a3a8b66456de18c7879d8df09d57fcd2eaff75fef0075` |
| `inter-latin.woff2` | `3100e775e8616cd2611beecfa23a4263d7037586789b43f035236a2e6fbd4c62` |
| `outfit-latin-ext.woff2` | `0f53d1c03b3918d744a843b5039001ee31695ca1e255e3914188df81beb461e9` |
| `outfit-latin.woff2` | `6c18d579fd87c3776be068b762cbc83fde3acb543d49eabd3ade842eb987e887` |
| `jetbrains-mono-cyrillic.woff2` | `e17cfd15fb96909d64095015f958207063a0c07191da3512df7d560a781aebdf` |
| `jetbrains-mono-latin.woff2` | `83c005d49d8a6a50474c73a5a36ac0468076e9c4a29da7bdb14995d80560a5be` |

Redistributions must keep the matching `*-OFL.txt` notice beside the font files.
