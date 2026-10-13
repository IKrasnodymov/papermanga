(() => {
  const select = document.getElementById('firmware-device');
  const status = document.getElementById('device-validation');
  const installer = document.getElementById('firmware-installer');
  const confirm = document.getElementById('confirm-model');
  const activate = document.getElementById('install-firmware');
  const download = document.getElementById('firmware-download');
  let devices = [];

  function choose() {
    const device = devices.find(item => item.id === select.value);
    confirm.checked = false;
    activate.disabled = true;
    confirm.disabled = true;
    installer.hidden = true;
    download.hidden = true;
    if (!device) return;
    status.replaceChildren();
    status.classList.toggle('tested', device.hardware_tested === true);
    const title = document.createElement('strong');
    title.textContent = device.hardware_tested ? 'Проверено на нашем X4 Classic с UC8279' : 'На устройстве не проверено';
    const detail = document.createElement('p');
    detail.textContent = device.hardware_tested
      ? `Проверена работа модели с PaperManga ${device.tested_version}. Здесь доступна сборка ${device.version}. ${device.notes}`
      : `Сборка ${device.version} прошла компиляцию. Физическая проверка экрана, ввода, сна и батареи не проводилась. ${device.notes}`;
    status.append(title, detail);
    document.getElementById('device-features').textContent = `${device.panel[1]}×${device.panel[0]} · ${device.lite ? 'ч/б XTC, подготовка на компьютере' : 'XTC и XTCH'} · ${device.usb ? 'Wi‑Fi и USB-диск' : 'Wi‑Fi и карта памяти'}`;
    installer.setAttribute('manifest', new URL(device.manifest, location.href).href);
    installer.hidden = false;
    confirm.disabled = false;
    download.href = device.download;
    download.hidden = false;
    const url = new URL(location.href);
    url.searchParams.set('device', device.id);
    history.replaceState(null, '', url);
  }
  select.addEventListener('change', choose);
  confirm.addEventListener('change', () => { activate.disabled = !confirm.checked; });
  fetch('firmware/devices.json', {cache: 'no-cache'})
    .then(response => { if (!response.ok) throw new Error('catalog'); return response.json(); })
    .then(data => {
      devices = data.devices.filter(device => device.built && device.manifest);
      if (!devices.length) throw new Error('empty catalog');
      select.replaceChildren();
      for (const device of devices) {
        const option = document.createElement('option');
        option.value = device.id;
        option.textContent = `${device.name} · ${device.version} · ${device.hardware_tested ? 'модель проверена' : 'не проверено на устройстве'}`;
        select.append(option);
      }
      const requested = new URL(location.href).searchParams.get('device');
      if (requested && !devices.some(device => device.id === requested)) throw new Error('unknown device');
      select.value = requested || 'x4c';
      select.disabled = false;
      choose();
    })
    .catch(() => {
      status.classList.remove('tested');
      status.textContent = 'Список прошивок или выбранная модель недоступны. Установка отключена; проверь адрес страницы и обнови её.';
      select.disabled = true;
      confirm.disabled = true;
      installer.hidden = true;
      download.hidden = true;
    });
})();
