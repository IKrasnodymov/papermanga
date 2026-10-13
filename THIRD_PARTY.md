# Third-party software in PaperManga 0.5.0

The experimental firmware uses Arduino-ESP32 (LGPL-2.1-or-later), copyright Espressif Systems and the Arduino project contributors. Inkplate 6 additionally uses Inkplate (LGPL-3.0), copyright Soldered Electronics/e-radionica and contributors. Read Pico uses the manufacturer's fork of epdiy (LGPL-3.0-or-later), copyright Valentin Roland and contributors. Their use is covered by these licenses.

The accompanying `papermanga-0.5.0-relink.zip` supplies their source, build configuration, local patches, application object code and relinking instructions. Modification of these libraries, relinking and reverse engineering to debug such modifications are permitted. Copies of LGPL 2.1, LGPL 3 and GPL 3 are supplied with the installation packages. See https://github.com/IKrasnodymov/papermanga/releases/tag/v0.5.0.

Additional components include FreeInk SDK (MIT), SdFat (MIT), M5GFX/LovyanGFX (MIT/BSD), Read Pico BSP and waveform component (Apache-2.0), ESP-IDF 5.5.1 and its dependencies (Apache-2.0 and component-specific licenses), Noto fonts (SIL OFL), Material Symbols (Apache-2.0), stb_image (MIT/public domain), cJSON (MIT) and ESP Web Tools (Apache-2.0). Upstream copyright/license notices and pinned revisions are supplied in the relinking kit. Firmware source modifications are dated October 2026. The local Inkplate fixes are in `sources/ports/patches/inkplate-sequence.patch`.

The X4 Classic/CrossPoint build is separate; CrossPoint is MIT licensed. The public repository includes `LICENSE-crosspoint`.
