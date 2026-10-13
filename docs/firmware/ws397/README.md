# PaperManga 0.5.0 for Waveshare ESP32-S3-ePaper-3.97

Not tested on a device. The profile targets the AXP2101; the vendor docs also describe a TG28. Check which power controller your board has.

Install in your browser: https://ikrasnodymov.github.io/papermanga/?device=ws397#install

The app image on its own does not include the bootloader or the partition table. For a first install, use the website or flash every part listed in manifest.json at its address. Do not erase NVS: it holds the factory calibration.
