# PaperManga 0.5.1: Kobo, PocketBook and Android

**All three applications are experimental and have not been tested on physical devices.** Builds, tests of the shared core and emulator runs do not prove that touch, E Ink, sleep and battery work on a given model. ESP32 firmware is installed separately from the [PaperManga website](https://ikrasnodymov.github.io/papermanga/).

[Release 0.5.1 files](https://github.com/IKrasnodymov/papermanga/releases/tag/v0.5.1) · [Checksums and statuses](https://github.com/IKrasnodymov/papermanga/releases/download/v0.5.1/apps.json)

| Application | First build targets | Software checks | Tested on a device |
|---|---|---|---|
| Kobo | Touch Kobo Linux, ARM32, a compatible NickelMenu install | ARM build, shared core in QEMU, FBInk CLI | **No** |
| PocketBook | PocketBook OS / InkView, ARM32 Linux | ARM build, core in QEMU, events and screen through a test InkView | **No** |
| Android | Android 7.0+; ARM64, ARM32 and x86_64 | Three ABIs, signed APK, launch and import through the system file picker in an emulator | **No** |

PocketBook devices running Android use the APK. ARM64 Linux readers, including the InkPad One, are not covered by this ARM32 package. Kobo needs a stock system compatible with NickelMenu; this package is not meant for Android or Tolino devices.

## Kobo

1. Install [NickelMenu following its authors' instructions](https://github.com/pgaskin/NickelMenu). NickelMenu is not included in the PaperManga package.
2. Unzip `papermanga-kobo-0.5.1.zip` **to the root of the Kobo USB drive**, including the hidden `.adds` folder. You get `.adds/papermanga/` and `.adds/nm/papermanga`.
3. Turn on Wi-Fi in the stock settings, eject USB safely and start **PaperManga (experimental)** from NickelMenu.
4. Put your own XTC / XTCH in `.adds/papermanga/data/Manga/`. For the Mac server, set `server=http://computer-address:8794` in `.adds/papermanga/app.conf`.

The screen is driven by the separate FBInk tool using the stock refresh modes. It also detects the screen size and touch coordinate corrections. If touches land in the wrong place, close the app and adjust `touch_device`, `swap_axes`, `mirror_x`, `mirror_y` in `app.conf`; the right values can only be found by testing the specific reader.

While you read, the launcher pauses Nickel and resumes it after exit, an error or a termination signal. **"Exit" at the top or the power button** closes the app. Settings and progress live in `.adds/papermanga/data/.papermanga/`, the diagnostic log in `.adds/papermanga/papermanga.log`. To uninstall, close the app and delete `.adds/nm/papermanga` and `.adds/papermanga/`; copy out any chapters and history you want to keep first.

## PocketBook

1. Unzip `papermanga-pocketbook-0.5.1.zip` **to the root of the PocketBook USB drive**. `PaperManga.app` and a `papermanga/` folder appear in `applications/`.
2. Put XTC / XTCH in the `papermanga/Manga/` folder at the root of the drive. You can use subfolders for series.
3. Eject USB safely. Open **PaperManga** in the stock **"Applications"** section.
4. Wi-Fi is turned on in the stock settings. Set the Mac server address with the **"Network"** button in the top bar, using the InkView keyboard; you can also put the address on one line in `applications/papermanga/server.txt`.

Screen output, touch and keys are handled by the stock InkView library. The package carries no copy of it and does not change system files. It needs ARM32 Linux and an available `libinkview.so` with the SDK 6.5 API; compatibility across hardware models is not confirmed yet. Physical Prev/Next turn pages, OK opens, Back goes back.

Progress and settings are in `papermanga/.papermanga/`, the log in `applications/papermanga/papermanga.log`. To uninstall, close the app and delete `applications/PaperManga.app` and `applications/papermanga/`. You can keep the separate `papermanga/` folder with your chapters and history.

## Android

1. Download `papermanga-android-0.5.1.apk` from the release or the website and open it on the device. Allow installs for the browser or file manager you open the APK with.
2. In **⋮ → "Import XTC / XTCH"**, pick a book with the system file manager. The book is copied into the app's own library; no access to the whole storage is needed.
3. Turn pages by tapping the edges, swiping or with the volume keys. The center of the page opens the reading menu. Your place is saved when the app is minimized or closed.
4. The Mac server address is under **⋮ → "Server and MangaLib"**. Updates install as a new APK over the app, with the same signature.

Works on regular Android devices and Android e-readers that allow APK installs. Special refresh modes on BOOX, Bigme and other E Ink devices are set by their system; there is no general promise of fast E Ink refresh here. Color manga is shown in four gray tones in this release.

## Catalog, chapters and controls

MangaDex works directly. MangaLib can be used through the PaperManga Mac app: set the server address and pick **"MangaLib via Mac"** in the Catalog's source row. Direct MangaLib needs your own session: Android lets you paste its JSON in the settings; the Linux apps read the file `<data folder>/.papermanga/mangalib` in the format the Mac app uses. The session is not part of the install package. MangaLib features depend on what your own account can access.

The shared core keeps the library, history, catalog and reading settings. Catalog chapters are built for the app's available screen area. Ready-made XTC / XTCH are shown with their proportions kept. The longest page side is 4096 pixels.

Top bar: **Home, Library, Catalog, History, Network, Exit**. Cards and rows are chosen by tapping; swipes move the selection. The bottom bar gives **Back, OK, ◀, ▶, Menu**. A long OK in the library opens a delete prompt; deleting needs a separate confirmation. Frontlight, Wi-Fi and system sleep are handled by the device.

## Dependencies and sources

`papermanga-apps-0.5.1-third-party.zip` holds the sources and licenses of the bundled third-party components, including the full FBInk with its nested dependencies and the build recipe. FBInk runs as a separate program. InkView comes from the stock system. The PaperManga app sources stay in a private repository; install packages, instructions and test statuses are published openly.

Main sources: [PocketBook SDK](https://github.com/pocketbook/SDK_6.3.0/tree/6.5), [FBInk](https://github.com/NiLuJe/FBInk), [KOReader toolchains](https://github.com/koreader/koxtoolchain), [Android: system document picker](https://developer.android.com/training/data-storage/shared/documents-files).
