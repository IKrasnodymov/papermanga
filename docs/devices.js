(() => {
  const select = document.getElementById('firmware-device');
  const picker = document.getElementById('device-picker');
  const toggle = document.getElementById('device-toggle');
  const panel = document.getElementById('device-picker-panel');
  const search = document.getElementById('device-search');
  const options = document.getElementById('device-options');
  const results = document.getElementById('device-results');
  const currentName = document.getElementById('device-current-name');
  const currentMeta = document.getElementById('device-current-meta');
  const status = document.getElementById('device-validation');
  const installer = document.getElementById('firmware-installer');
  const confirm = document.getElementById('confirm-model');
  const activate = document.getElementById('install-firmware');
  const download = document.getElementById('firmware-download');
  let devices = [];

  function manufacturer(device) {
    if (device.name.startsWith('Xteink')) return 'Xteink';
    if (/^M5(Stack|Paper)/.test(device.name)) return 'M5Stack';
    return 'Other makers';
  }

  function displayName(device) {
    return device.name;
  }

  function metadata(device) {
    const version = document.createElement('span');
    version.className = 'device-version';
    version.textContent = `${device.version} · ${device.panel[1]}×${device.panel[0]}`;
    const badge = document.createElement('span');
    const tested = device.hardware_tested === true;
    badge.className = 'device-badge' + (tested ? ' tested' : '');
    badge.textContent = tested ? 'Model tested' : 'Not tested on a device';
    return [version, badge];
  }

  function closePicker(focus = false) {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    if (focus) toggle.focus();
  }

  function renderOptions() {
    const terms = search.value.trim().toLocaleLowerCase('en').split(/\s+/).filter(Boolean);
    const matches = devices.filter(device => {
      const text = `${device.name} ${device.id} ${manufacturer(device)} ${device.chipFamily} ${device.version}`.toLocaleLowerCase('en');
      return terms.every(term => text.includes(term));
    });
    options.replaceChildren();
    results.textContent = matches.length ? `Models in the list: ${matches.length}` : 'Nothing found. Try another name.';
    const groups = new Map();
    for (const device of matches) {
      const name = manufacturer(device);
      if (!groups.has(name)) groups.set(name, []);
      groups.get(name).push(device);
    }
    for (const [name, group] of groups) {
      const section = document.createElement('div');
      section.className = 'device-group';
      section.setAttribute('role', 'group');
      section.setAttribute('aria-label', name);
      const title = document.createElement('p');
      title.className = 'device-group-title';
      title.textContent = name;
      title.setAttribute('aria-hidden', 'true');
      section.append(title);
      for (const device of group) {
        const option = document.createElement('button');
        option.type = 'button';
        option.className = 'device-option';
        option.dataset.device = device.id;
        option.setAttribute('role', 'option');
        option.setAttribute('aria-selected', String(device.id === select.value));
        const label = document.createElement('span');
        label.className = 'device-name';
        label.textContent = displayName(device);
        const meta = document.createElement('span');
        meta.className = 'device-meta';
        meta.append(...metadata(device));
        option.append(label, meta);
        option.addEventListener('click', () => {
          select.value = device.id;
          choose();
          closePicker(true);
        });
        section.append(option);
      }
      options.append(section);
    }
  }

  function choose() {
    const device = devices.find(item => item.id === select.value);
    confirm.checked = false;
    activate.disabled = true;
    confirm.disabled = true;
    installer.hidden = true;
    download.hidden = true;
    if (!device) { unavailable(); return; }
    currentName.textContent = displayName(device);
    currentMeta.replaceChildren(...metadata(device));
    status.replaceChildren();
    const tested = device.hardware_tested === true;
    status.classList.toggle('tested', tested);
    const title = document.createElement('strong');
    title.textContent = tested ? 'Tested on our X4 Classic with UC8279' : 'Not tested on a device';
    const detail = document.createElement('p');
    detail.textContent = tested
      ? `This model was tested with PaperManga ${device.tested_version}. The build available here is ${device.version}. ${device.notes}`
      : `Build ${device.version} compiles. The screen, input, sleep and battery have not been tested on real hardware. ${device.notes.replace(/^Not tested on a device\.\s*/, '')}`;
    status.append(title, detail);
    document.getElementById('device-features').textContent = `${device.panel[1]}×${device.panel[0]} · ${device.lite ? 'black-and-white XTC, prepared on a computer' : 'XTC and XTCH'} · ${device.usb ? 'Wi‑Fi and USB drive' : 'Wi‑Fi and memory card'}`;
    installer.setAttribute('manifest', new URL(device.manifest, location.href).href);
    installer.hidden = false;
    confirm.disabled = false;
    download.href = device.download;
    download.hidden = false;
    const url = new URL(location.href);
    url.searchParams.set('device', device.id);
    history.replaceState(null, '', url);
    renderOptions();
  }

  function unavailable() {
    closePicker();
    toggle.disabled = true;
    select.disabled = true;
    confirm.checked = false;
    confirm.disabled = true;
    activate.disabled = true;
    installer.hidden = true;
    download.hidden = true;
    currentName.textContent = 'Model selection unavailable';
    currentMeta.replaceChildren();
    status.classList.remove('tested');
    status.textContent = 'The firmware list or the selected model is unavailable. Install is turned off; check the page address and reload the page.';
  }

  toggle.addEventListener('click', () => {
    if (!panel.hidden) { closePicker(); return; }
    search.value = '';
    renderOptions();
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    options.scrollTop = 0;
    search.focus();
  });
  search.addEventListener('input', renderOptions);
  select.addEventListener('change', choose);
  confirm.addEventListener('change', () => { activate.disabled = confirm.disabled || !confirm.checked; });
  picker.addEventListener('keydown', event => {
    if (panel.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); closePicker(true); return; }
    const items = [...options.querySelectorAll('[role="option"]')];
    if (!items.length) return;
    const index = items.indexOf(document.activeElement);
    let next;
    if (event.key === 'ArrowDown') next = (index + 1) % items.length;
    else if (event.key === 'ArrowUp') next = index <= 0 ? items.length - 1 : index - 1;
    else if (index >= 0 && event.key === 'Home') next = 0;
    else if (index >= 0 && event.key === 'End') next = items.length - 1;
    else return;
    event.preventDefault();
    items[next].focus();
  });
  picker.addEventListener('focusout', event => {
    if (event.relatedTarget && !picker.contains(event.relatedTarget)) closePicker();
  });
  document.addEventListener('pointerdown', event => {
    if (!picker.contains(event.target)) closePicker();
  });

  fetch('firmware/devices.json', {cache: 'no-cache'})
    .then(response => { if (!response.ok) throw new Error('catalog'); return response.json(); })
    .then(data => {
      devices = data.devices.filter(device => device.built && device.manifest);
      if (!devices.length) throw new Error('empty catalog');
      select.replaceChildren();
      for (const device of devices) {
        const option = document.createElement('option');
        option.value = device.id;
        option.textContent = device.name;
        select.append(option);
      }
      const requested = new URL(location.href).searchParams.get('device');
      if (requested && !devices.some(device => device.id === requested)) throw new Error('unknown device');
      select.value = requested || 'x4c';
      select.disabled = false;
      toggle.disabled = false;
      choose();
    })
    .catch(unavailable);
})();
