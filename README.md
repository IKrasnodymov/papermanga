# PaperManga

Firmware for **ESP32, ESP32-S3 and ESP32-C3** e-readers and apps for **Kobo, PocketBook and Android**: a manga catalog, a library and XTC/XTCH reading. Versions with PSRAM prepare chapters right on the reader; the older X4 and X3 get black-and-white XTC prepared on a computer.

**Install:** https://ikrasnodymov.github.io/papermanga/ (Chrome or Edge on a computer, reader connected over USB).

**Choose your exact model and hardware revision.** PaperManga is tested on our own X4 Classic with UC8279; all new ports are experimental and **not tested on devices**. A successful build does not prove that the screen, touch, sleep, charging or battery work.

## Choosing your firmware and test status

PaperManga is tested on our own X4 Classic with UC8279. 0.5.1 for this model was installed on that reader and checked on its screen. All other ports are experimental: they passed the build and software checks but have not been tested on a real device.

| Device and install | Version | Testing | Limitations |
| --- | --- | --- | --- |
| [Xteink X4 Classic](https://ikrasnodymov.github.io/papermanga/?device=x4c#install) | 0.5.1 | Model tested: UC8279, PaperManga 0.2.4 | Tested on our X4 Classic with UC8279. Other panels and hardware revisions are not tested. |
| [Xteink X4 Classic · experimental](https://ikrasnodymov.github.io/papermanga/?device=x4c_all#install) | 0.5.1 | **Not tested on a device**; builds successfully | Not tested on a device. Picks SSD1677/UC8179/UC8279 automatically. Standalone firmware without CrossPoint alongside; the tested Classic version is available separately. |
| [Xteink X4 Pro Developer Edition](https://ikrasnodymov.github.io/papermanga/?device=x4pro#install) | 0.5.1 | **Not tested on a device**; builds successfully | Not tested on a device. SSD1677, UC8179 and UC8279 are chosen by the hardware profile. Requires the Developer Edition. |
| [M5Stack PaperS3](https://ikrasnodymov.github.io/papermanga/?device=papers3#install) | 0.5.1 | **Not tested on a device**; builds successfully | Not tested on a device. Touch navigation, ED047TC1 panel. Features depend on the board revision. |
| [Seeed reTerminal Sticky](https://ikrasnodymov.github.io/papermanga/?device=sticky#install) | 0.5.1 | **Not tested on a device**; builds successfully | Not tested on a device. Chapters are sent over Wi-Fi or on the memory card. USB is used for flashing; USB drive mode is not available. |
| [M5Stack Paper Mono](https://ikrasnodymov.github.io/papermanga/?device=papermono#install) | 0.5.1 | **Not tested on a device**; builds successfully | Not tested on a device. FT6336G touch, front light and power via M5PM1. Grey tone quality still needs checking. |
| [LilyGO T5 E-Paper S3 Pro](https://ikrasnodymov.github.io/papermanga/?device=lilygo_t5s3#install) | 0.5.1 | **Not tested on a device**; builds successfully | Not tested on a device. Only the T5 S3 Pro with ED047TC1, TPS65185 and PCA9535; other T5 boards are not compatible. |
| [Waveshare ESP32-S3-ePaper-3.97](https://ikrasnodymov.github.io/papermanga/?device=ws397#install) | 0.5.1 | **Not tested on a device**; builds successfully | Not tested on a device. The profile targets the AXP2101; the vendor docs also describe a TG28. Check which power controller your board has. |
| [Read Pico](https://ikrasnodymov.github.io/papermanga/?device=read_pico#install) | 0.5.1 | **Not tested on a device**; builds successfully | Not tested on a device. Uses the vendor BSP and the VCOM stored in the PMU. Only the Read Pico with the 1216×684 screen. |
| [Metalio E-Ink 4](https://ikrasnodymov.github.io/papermanga/?device=metalio_eink4#install) | 0.5.1 | **Not tested on a device**; builds successfully | Not tested on a device. Only the E-Ink 4 3.97″; the E-Ink 4 Plus is not compatible. The vendor's sources disagree on some pin assignments. |
| [BOOX Picco](https://ikrasnodymov.github.io/papermanga/?device=picco#install) | 0.5.1 | **Not tested on a device**; builds successfully | Not tested on a device. Experimental hardware profile; touch is not supported yet. Whether it can be flashed depends on the bootloader. |
| [M5Paper v1.1](https://ikrasnodymov.github.io/papermanga/?device=m5paper#install) | 0.5.1 | **Not tested on a device**; builds successfully | Not tested on a device. Classic ESP32 with IT8951. This is not the PaperS3. Chapters are sent over Wi-Fi or on the memory card. |
| [Inkplate 6](https://ikrasnodymov.github.io/papermanga/?device=inkplate6#install) | 0.5.1 | **Not tested on a device**; builds successfully | Not tested on a device. Only the Inkplate 6 800×600 on ESP32-WROVER; the 6 Plus and 6 Motion are not compatible. |
| [Xteink X4 ESP32-C3](https://ikrasnodymov.github.io/papermanga/?device=x4#install) | 0.5.1 | **Not tested on a device**; builds successfully | Not tested on a device. Lite black-and-white version: a computer prepares the chapters. This is the older X4, not the X4 Classic. |
| [Xteink X3](https://ikrasnodymov.github.io/papermanga/?device=x3#install) | 0.5.1 | **Not tested on a device**; builds successfully | Not tested on a device. Lite black-and-white version: a computer prepares the chapters. The UC8253/UC8279d panels still need testing. |

On the website, choose your exact model: every board has its own install manifest. The X3 and the older X4 use black-and-white XTC prepared on a computer. The ports are standalone; CrossPoint stays alongside only in the tested X4 Classic version. Inkplate 6 with 4 MB flash is updated over USB through the website. Touch: swipes move the selection, a tap picks it, and the bottom bar provides the buttons. BOOX Picco uses the physical buttons for now: short press for ▲/▼, hold for ◀/▶, short OK picks, hold OK goes back.


## Kobo, PocketBook and Android apps — 0.5.1

**None of the three has been tested on a real device.** The builds and software tests passed; Android was run in an emulator. Screen, touch, sleep and battery on specific readers are not confirmed yet.

| App | File | First build compatibility |
|---|---|---|
| Kobo | [ZIP](https://github.com/IKrasnodymov/papermanga/releases/download/v0.5.1/papermanga-kobo-0.5.1.zip) | Touchscreen Kobo Linux ARM32 + NickelMenu |
| PocketBook | [ZIP](https://github.com/IKrasnodymov/papermanga/releases/download/v0.5.1/papermanga-pocketbook-0.5.1.zip) | PocketBook OS / InkView ARM32 Linux |
| Android | [APK](https://github.com/IKrasnodymov/papermanga/releases/download/v0.5.1/papermanga-android-0.5.1.apk) | Android 7.0+; ARM64 / ARM32 / x86_64 |

[Install instructions and model limitations](docs/APPLICATIONS.md). The apps read XTC/XTCH, keep your history and prepare catalog chapters for the available screen area. PocketBook models running Android use the APK; Linux ARM64, including the InkPad One, is not covered by the ARM32 package.

[apps.json: SHA-256 and status](https://github.com/IKrasnodymov/papermanga/releases/download/v0.5.1/apps.json) · [Licenses and library sources](https://github.com/IKrasnodymov/papermanga/releases/download/v0.5.1/papermanga-apps-0.5.1-third-party.zip).




## Kobo, PocketBook and Android apps — 0.5.1

**None of the three has been tested on a real device.** The builds and software tests passed; Android was run in an emulator. Screen, touch, sleep and battery on specific readers are not confirmed yet.

| App | File | First build compatibility |
|---|---|---|
| Kobo | [ZIP](https://github.com/IKrasnodymov/papermanga/releases/download/v0.5.1/papermanga-kobo-0.5.1.zip) | Touchscreen Kobo Linux ARM32 + NickelMenu |
| PocketBook | [ZIP](https://github.com/IKrasnodymov/papermanga/releases/download/v0.5.1/papermanga-pocketbook-0.5.1.zip) | PocketBook OS / InkView ARM32 Linux |
| Android | [APK](https://github.com/IKrasnodymov/papermanga/releases/download/v0.5.1/papermanga-android-0.5.1.apk) | Android 7.0+; ARM64 / ARM32 / x86_64 |

[Install instructions and model limitations](docs/APPLICATIONS.md). The apps read XTC/XTCH, keep your history and prepare catalog chapters for the available screen area. PocketBook models running Android use the APK; Linux ARM64, including the InkPad One, is not covered by the ARM32 package.

[apps.json: SHA-256 and status](https://github.com/IKrasnodymov/papermanga/releases/download/v0.5.1/apps.json) · [Licenses and library sources](https://github.com/IKrasnodymov/papermanga/releases/download/v0.5.1/papermanga-apps-0.5.1-third-party.zip).


## What it looks like

Screenshots exactly as the reader shows them (480×800, four shades of grey). The chapters in the screenshots are demo content.

| Home screen | Library | Catalog |
|:---:|:---:|:---:|
| <img src="docs/shots/home.png" width="240"> | <img src="docs/shots/library.png" width="240"> | <img src="docs/shots/catalog.png" width="240"> |
| **Reading** | **Reading menu** | **End of chapter** |
| <img src="docs/shots/page.png" width="240"> | <img src="docs/shots/menu.png" width="240"> | <img src="docs/shots/end.png" width="240"> |
| **Chapters** | **Chapter preparation** | **Deleting** |
| <img src="docs/shots/chapters.png" width="240"> | <img src="docs/shots/build.png" width="240"> | <img src="docs/shots/delete.png" width="240"> |
| **Wi‑Fi** | **Info** | |
| <img src="docs/shots/wifi.png" width="240"> | <img src="docs/shots/about.png" width="240"> | |

## X4 Classic: two firmwares side by side

- The reader has two app slots: CrossPoint (our fork) in the first, PaperManga in the second.
- Updates over Wi‑Fi: in PaperManga, open Info and choose Check. The two firmwares update each other, because neither can overwrite the slot it is running from. PaperManga installs the new CrossPoint and puts its own new version on the card, and CrossPoint installs it on the next restart. "Check for updates" in CrossPoint installs the latest PaperManga.
- Every release contains `papermanga.bin`, `crosspoint-manga-x4c.bin` and `release.json` with their sizes and SHA‑256. The reader checks the hash before installing.
- The installer does not erase the flash: the bootloader, the partition table and the screen's factory calibration (NVS) stay untouched.

## Manga sources

The reader doesn't host or share anything: chapters are downloaded from sources you connect yourself (MangaDex, and MangaLib with your own account). The rights to the manga belong to its authors and publishers.

## Licenses

CrossPoint is © its authors, MIT license (see `LICENSE-crosspoint`). Our fork adds a PaperManga menu item and safe updates.

The new ports use Arduino-ESP32 (LGPL-2.1-or-later), Inkplate (LGPL-3.0) or epdiy (LGPL-3.0-or-later), plus components under MIT/Apache/BSD. Notices, licenses, library sources and object files for relinking are in `THIRD_PARTY.md` and `papermanga-0.5.1-relink.zip` in the [release](https://github.com/IKrasnodymov/papermanga/releases/tag/v0.5.1).
