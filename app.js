/* ChenAxic 官网脚本 — 无外部依赖
 * 1) 读取 version.txt 渲染版本号 / 更新日志 / 下载链接
 * 2) 基于 data-i18n 的中英文切换
 */
(function () {
  'use strict';

  /* ========== 一、翻译文案 ==========
   * data-i18n="key"            -> 写入元素 textContent
   * data-i18n-attr="attr:key"  -> 写入元素 attribute
   */
  var I18N = {
    zh: {
      pageTitle: 'ChenAxic — 安卓刷机与设备工具集',
      metaDesc: 'ChenAxic：在手机上完成线刷、9008 深刷、BL 解锁、AVB 签名、Root 刷写的安卓工具集。',

      navFeatures: '功能',
      navDownload: '下载',
      navGuide: '教程',

      pillNoVer: '官方站点',
      pillLatest: '最新版本 v{ver}',
      title: '把电脑装进手机',
      lead: '线刷、9008 深刷、BL 解锁、AVB 签名、Root 刷写，全部在一台手机上完成。一根 OTG 线，连接另一台设备即可。',
      btnDownload: '立即下载',
      btnGuide: '查看教程',
      meta: 'Android 10+ · 约 76 MB · 中文 / 繁體 / English',

      psTitle: '欧加真线刷',
      ps1: '一、确保设备进入 FastbootD…',
      ps2: '二、清理 COW 分区…',
      ps3: '三、刷写镜像 (36/36)…',
      ps4: '四、处理 modem.img…',
      ps5: '刷入 misc 分区',
      ps6: '所有刷写操作已完成',

      featTitle: '核心功能',
      featSub: '六个模块，覆盖从解包到开机的完整流程。',

      c1t: '欧加真线刷',
      c1d: '支持 OPPO / Realme / OnePlus。自动清理 COW 分区，可修复 super 分区（lpmake 重建），支持常规线刷与纯 FastbootD 两种模式。',
      c2t: '高通 9008 深刷',
      c2d: '内置 qdl 程序对接 EDL 端口。支持 QFIL 刷写、构建欧加 super.img、全量包直刷，以及联想 / 小米 / 红魔等品牌深刷。',
      c3t: 'BL 解锁',
      c3d: '官方 Bootloader 解锁流程。在 App 内登录小米账号并发起解锁申请，不需要另开网页。',
      c4t: 'AVB 签名',
      c4d: '自研 AVB 重建，不依赖 avbtool 二进制。三种模式：普通、链式、AOSP 链式，密钥可选 2048 / 4096 位。',
      c5t: 'Payload 解包',
      c5d: '直接解压 payload.bin，线程数最高 64，低性能设备可调小。解完的目录可直接喂给线刷。',
      c6t: 'ADB 工具与投屏',
      c6d: '识别设备信息、安装 APK、应用管理器、设备文件管理、无线调试配对；外加 scrcpy 投屏并操控另一台手机。',

      dlTitle: '下载',
      dlVerLoading: '正在读取版本…',
      dlVer: '版本 {name}（{code}）',
      dlVerFail: '版本信息读取失败',
      dlBtn: '前往 Releases',
      dlBtnAlt: '前往 Releases',
      notesHead: '更新日志',

      foot: '©2026 ChenAxic 保留所有权利',
      footGuide: '教程',

      /* ===== guide.html 教程页 ===== */
      gPageTitle: '使用教程 — ChenAxic',
      gMetaDesc: 'ChenAxic 完整使用教程：材料准备、设备连接、欧加线刷、小米线刷、Sideload、Root、高通 QDL。',
      gBack: '← 返回首页',
      gTitle: '使用教程',
      gSub: '从材料准备到开机，按顺序走一遍。遇到问题先看第八节的常见问题。',
      gIntroHead: '注意：',
      gIntro1: '软件的作用是模拟电脑 PC 给另外一台 Android 手机进行线刷或调试。',

      g1h: '一、材料准备',
      g1li1: '需要 OTG 转接头 / 双 C 线 / 数据线',
      g1warn: '使用 OTG 转接头和双 C 线时要确保连接稳定。推荐 OTG——双 C 线会触发快充协议，容易在线刷中快速掉电。OTG 转接头也建议用品牌货，部分第三方转接头连接不稳定。',

      g2h: '二、设备连接',
      g2li1: '检查本机设置中是否有「OTG」选项，有就打开',
      g2li2: '把 OTG 转接头 / 双 C 线插入设备',
      g2p: '如果需要识别系统：',
      g2li3: '另外一台手机在设置中打开「USB 调试」（用于其他模式则不用开启）',
      g2li4: '另一台手机会弹出界面 → 勾选「一律允许使用这台计算机进行调试」→ 点「允许」',
      g2note: '如果使用双 C 线，确保另外一台手机充上电才能正常识别。如果无法正常连接，请判断是否弹出 USB 通知——如果没有，代表连接不稳定或数据线不支持数据传输，请尝试更换数据线 / OTG 转接头后重试。',

      g3h: '三、欧加线刷',
      g3p: '支持机型：OPPO / realme / 一加',
      g3li1: '在导航栏的工具中打开「Payload.bin 解压」',
      g3li2: '选择解压出来的 payload.bin',
      g3li3: '可以根据设备性能调整线程，例如骁龙 845、天玑 1000+ 等低性能设备建议设置为 10 线程',
      g3li4: '点击「开始下载 / 解压」',
      g3li5: '解压完后返回首页，点击「欧加真线刷」选项',
      g3li6: '点击旁边的文件夹图标，选择已经解压完的镜像 /storage/emulated/0/ChenAxic/payload_bin/',
      g3note: '如果设备丢失 fastboot 且无法进入，请使用「纯 FastbootD」；设备能正常进入 fastboot 但无法进入 fastbootD，请使用「常规线刷」；如果两者都没什么问题，推荐使用「纯 FastbootD」，无需二次重启',
      g3warn: '注意：如果多次出现 my_ 开头的镜像或 odm、system、system_dlkm、system_ext、vendor、vendor_dlkm、product、odm_dlkm 无法正常刷入，将设备重启到 fastboot → 使用「分区 super 修复」，再进行线刷',
      g3p2: '基本上没问题的话刷完就能开机。',

      g4h: '四、小米线刷',
      g4p: '支持机型：小米 / 红米',
      g4warn: '注意：确保线刷包中含 .sh 执行脚本才能进行线刷',
      g4li1: '将设备重启到 fastboot',
      g4li2: '在首页中进入「小米线刷」，选择已经解压好的刷机包',
      g4li3: '选择「flash_all.sh 不回锁 BL + 清除数据」',
      g4li4: '如果出现「Missmatching image and device」，请查看线刷包是否匹配',
      g4li5: '如果卡在正在执行，请将设备重新进 fastboot 模式再进行线刷',

      g5h: '五、ADB Sideload 卡刷',
      g5p1: 'Sideload 的原理是将卡刷包变成线刷包。',
      g5p2: '如何进入 Sideload 模式：',
      g5li1: 'TWRP：打开高级 → ADB Sideload → 下方滑动开启',
      g5li2: '橙狐：点击下方三条杠 → ADB Sideload → 下方滑动开启',
      g5li3: '类原生 Recovery：Apply update → Apply from ADB',
      g5p3: 'Recovery 操作步骤',
      g5p4: '执行线刷：',
      g5li4: '首页进入「ADB Sideload」',
      g5li5: '选择卡刷包',
      g5li6: '点击开始刷入',

      g6h: '六、刷 Root',
      g6a: '方案 A：已经修补好的镜像',
      g6ali1: '准备修补好的 boot.img / init_boot.img 镜像',
      g6ali2: '将设备重启到 fastboot 模式',
      g6ali3: '首页进入「刷写分区」选项',
      g6ali4: '点击「选择镜像 (img)」',
      g6ali5: '根据原来的镜像名刷入（二选一）：',
      g6ali6: '「一键刷入 init_boot (a+b)」',
      g6ali7: '「刷入 boot」',
      g6ali8: '点击即可刷入',
      g6b: '方案 B：刷入 KernelSU（LKM）',
      g6bli1: '获取 boot.img / init_boot.img 未修补的原版镜像',
      g6bli2: '将设备重启到 fastboot 模式',
      g6bli3: '在首页进入「刷入 KernelSU」',
      g6bli4: '选择内核版本',
      g6bli5: '点击「选择 init_boot.img / boot.img」，选择未修补的镜像',
      g6bli6: '点击修补',
      g6bli7: '修补完后根据原版镜像的名称刷入即可',

      g7h: '七、高通 QDL',
      g7p: '先选择「机型 / 处理器」，App 会自动填入对应引导文件；如果引导无法使用，可手动更换。',
      g7warn: '注意：9008 EDL 端口不支持热拔插，全程操作需要保持连接稳定。如果出现断联的情况，需要手动重启设备才能正常授权写读操作',
      g7edl: '如何进入 9008（EDL）',
      g7li1: '骁龙 888 处理器以上：在关机状态下，同时按住「音量下 + 音量上」再插入数据线，可自动进入 9008 端口',
      g7li2: '通过 ADB 重启到 EDL：在首页的「重启设备」中点击「9008」，可直接重启至 EDL',
      g7li3: '或通过 fastboot 命令重启至 EDL：fastboot oem edl',
      g7note: '注意：「fastboot oem edl」该命令仅支持老旧设备，不支持新设备。',
      g71h: '1. 欧加 9008 线刷',
      g71li1: '需要先完成「欧加真 VIP 授权」才能进行刷写',
      g71li2: '将获取到的线刷包解压到手机存储',
      g71li3: '使用「QFIL 线刷」点击浏览，选择解压好的线刷包目录',
      g71li4: '点击「欧加构建 super.img」',
      g71li5: '如需清除数据，请把「userdata.img 会自动清除数据」关闭掉',
      g71li6: '构建完后可点击刷入',
      g72h: '2. 欧加全量包线刷',
      g72li1: '需要先完成「欧加真 VIP 授权」才能进行刷写',
      g72li2: '将获取到的全量包使用「payload.bin 解压」',
      g72li3: '解压完成后使用「欧加真全量包线刷」选项，点击「选择镜像目录」',
      g72li4: '选择解压完成的全量包 /storage/emulated/0/ChenAxic/payload_bin',
      g72li5: '选择完后点击「开始线刷」即可开始刷入',
      g72note: '注意：会自动构建 super.img，构建速度取决于设备性能，下次构建会重复使用，不会再自动构建',
      g73h: '3. 联想、小米、红魔等品牌 9008 深刷',
      g73li1: '使用「QFIL 线刷」点击浏览，选择到解压完的线刷包',
      g73li2: '如需清除数据，请把「userdata.img 会自动清除数据」关闭',
      g73li3: '设置完成后，点击刷入',

      g8h: '八、常规问题',
      g8li1: '部分的设备重启到 fastboot 有概率无法识别，请手动重启，重启期间需拔掉数据线，完全进入 fastboot 后再插上数据线，才能识别',
      g8li2: '执行 fastboot 命令时，如果提示 <waiting for any device>，翻译过来的意思是「等待任何设备」，说明没连上设备',
      g8li3: '在线刷或刷写镜像时，出现卡住的情况，请将设备重新进入 fastboot 模式重新刷写即可（原因是前面多次刷镜像失败导致的问题）',
      gHome: '首页'
    },

    en: {
      pageTitle: 'ChenAxic — Android Flashing & Device Toolkit',
      metaDesc: 'ChenAxic: a full Android toolkit on your phone — fastboot flashing, Qualcomm 9008 deep flash, bootloader unlock, AVB signing and rooted flashing.',

      navFeatures: 'Features',
      navDownload: 'Download',
      navGuide: 'Guide',

      pillNoVer: 'Official site',
      pillLatest: 'Latest v{ver}',
      title: 'A PC in your phone',
      lead: 'Fastboot flashing, Qualcomm 9008 deep flash, bootloader unlock, AVB signing and rooted flashing — all done on a single phone. One OTG cable to the target device is all it takes.',
      btnDownload: 'Download now',
      btnGuide: 'Read the guide',
      meta: 'Android 10+ · ~76 MB · Chinese / Traditional Chinese / English',

      psTitle: 'Oplus Real Flash',
      ps1: '1. Make sure the device is in FastbootD…',
      ps2: '2. Cleaning COW partitions…',
      ps3: '3. Flashing images (36/36)…',
      ps4: '4. Handling modem.img…',
      ps5: 'Flashing misc partition',
      ps6: 'All flash operations completed',

      featTitle: 'Core features',
      featSub: 'Six modules covering the whole flow, from unpacking to booting.',

      c1t: 'Oplus Real Flash',
      c1d: 'For OPPO / Realme / OnePlus. Cleans COW partitions automatically, repairs the super partition (rebuilt with lpmake), and supports both regular flashing and pure FastbootD mode.',
      c2t: 'Qualcomm 9008 Deep Flash',
      c2d: 'Bundled qdl binary talks to the EDL port. Supports QFIL flashing, building an Oplus super.img, flashing full packages directly, and deep flash for Lenovo / Xiaomi / RedMagic and more.',
      c3t: 'Bootloader Unlock',
      c3d: 'The official bootloader unlock flow. Sign in to your Xiaomi account and submit the unlock request inside the app — no need to open a browser.',
      c4t: 'AVB Signing',
      c4d: 'AVB is rebuilt natively, no avbtool binary required. Three modes: regular, chained and AOSP chained, with 2048 / 4096-bit keys.',
      c5t: 'Payload Unpacking',
      c5d: 'Extracts payload.bin directly, up to 64 threads, adjustable on low-end devices. The output folder can be fed straight into flashing.',
      c6t: 'ADB Tools & Screen Mirroring',
      c6d: 'Device info, APK install, app manager, on-device file manager, wireless debugging pairing — plus scrcpy mirroring and control of another phone.',

      dlTitle: 'Download',
      dlVerLoading: 'Reading version…',
      dlVer: 'Version {name} ({code})',
      dlVerFail: 'Failed to read version info',
      dlBtn: 'Go to Releases',
      dlBtnAlt: 'Go to Releases',
      notesHead: "What's new",

      foot: '©2026 ChenAxic. All rights reserved.',
      footGuide: 'Guide',

      /* ===== guide.html ===== */
      gPageTitle: 'Guide — ChenAxic',
      gMetaDesc: 'The complete ChenAxic guide: prerequisites, connecting devices, Oplus flashing, Xiaomi flashing, Sideload, root and Qualcomm QDL.',
      gBack: '← Back to home',
      gTitle: 'Guide',
      gSub: 'Go through it in order, from gathering your gear to booting up. If something breaks, check the FAQ in section 8 first.',
      gIntroHead: 'Note:',
      gIntro1: 'The app turns your phone into a PC so it can flash or debug another Android phone.',

      g1h: '1. What you need',
      g1li1: 'An OTG adapter / C-to-C cable / data cable',
      g1warn: 'Make sure the connection is solid when using an OTG adapter or a C-to-C cable. OTG is recommended — C-to-C cables trigger fast-charging negotiation and the battery can drain quickly during a flash. Buy a branded OTG adapter too; some third-party ones have unreliable connections.',

      g2h: '2. Connecting the device',
      g2li1: 'Check whether this device has an "OTG" toggle in settings and turn it on',
      g2li2: 'Plug in the OTG adapter or C-to-C cable',
      g2p: 'If you need the system to be recognized:',
      g2li3: 'Turn on "USB debugging" in the settings of the other phone (not needed for other modes)',
      g2li4: 'The other phone will show a dialog → tick "Always allow from this computer" → tap "Allow"',
      g2note: 'With a C-to-C cable, the other phone must be charging for it to be recognized properly. If it will not connect, check whether a USB notification appeared — if not, the connection is unstable or the cable does not support data transfer. Try another cable or OTG adapter.',

      g3h: '3. Oplus flashing',
      g3p: 'Supported devices: OPPO / realme / OnePlus',
      g3li1: 'Open "Payload.bin unpack" from Tools in the navigation bar',
      g3li2: 'Select the extracted payload.bin',
      g3li3: 'You can tune the thread count to the device; low-end devices such as Snapdragon 845 or Dimensity 1000+ are better set to 10 threads',
      g3li4: 'Tap "Start download / unpack"',
      g3li5: 'When it finishes, go back to the home screen and tap "Oplus Real Flash"',
      g3li6: 'Tap the folder icon next to it and choose the unpacked image directory /storage/emulated/0/ChenAxic/payload_bin/',
      g3note: 'If the device has lost fastboot and cannot enter it, use "Pure FastbootD"; if it enters fastboot normally but not fastbootD, use "Regular flashing"; if both work fine, "Pure FastbootD" is recommended as no second reboot is needed',
      g3warn: 'Note: if images prefixed with my_, or odm, system, system_dlkm, system_ext, vendor, vendor_dlkm, product or odm_dlkm repeatedly fail to flash, reboot the device into fastboot → run "Repair super partition", then flash again',
      g3p2: 'If nothing goes wrong it should boot right after flashing.',

      g4h: '4. Xiaomi flashing',
      g4p: 'Supported devices: Xiaomi / Redmi',
      g4warn: 'Note: the package must contain a .sh script before it can be flashed',
      g4li1: 'Reboot the device into fastboot',
      g4li2: 'Open "Xiaomi flashing" on the home screen and pick the extracted package',
      g4li3: 'Choose "flash_all.sh — does not re-lock the bootloader + wipes data"',
      g4li4: 'If "Missmatching image and device" appears, check whether the package matches the device',
      g4li5: 'If it hangs on executing, put the device back into fastboot and flash again',

      g5h: '5. ADB Sideload',
      g5p1: 'Sideload works by turning a recovery package into a fastboot-style flash.',
      g5p2: 'How to enter Sideload mode:',
      g5li1: 'TWRP: open Advanced → ADB Sideload → swipe at the bottom to start',
      g5li2: 'OrangeFox: tap the three-line button at the bottom → ADB Sideload → swipe at the bottom to start',
      g5li3: 'AOSP-like recovery: Apply update → Apply from ADB',
      g5p3: 'Recovery steps',
      g5p4: 'Run the flash:',
      g5li4: 'Open "ADB Sideload" on the home screen',
      g5li5: 'Select the recovery package',
      g5li6: 'Tap Start flashing',

      g6h: '6. Installing root',
      g6a: 'Option A: an already patched image',
      g6ali1: 'Prepare a patched boot.img / init_boot.img',
      g6ali2: 'Reboot the device into fastboot',
      g6ali3: 'Open "Flash partition" on the home screen',
      g6ali4: 'Tap "Select image (img)"',
      g6ali5: 'Flash by the original image name (choose one):',
      g6ali6: '"One-tap flash init_boot (a+b)"',
      g6ali7: '"Flash boot"',
      g6ali8: 'Tap to flash',
      g6b: 'Option B: flash KernelSU (LKM)',
      g6bli1: 'Get the unpatched stock boot.img / init_boot.img',
      g6bli2: 'Reboot the device into fastboot',
      g6bli3: 'Open "Flash KernelSU" on the home screen',
      g6bli4: 'Choose the kernel version',
      g6bli5: 'Tap "Select init_boot.img / boot.img" and pick the unpatched image',
      g6bli6: 'Tap Patch',
      g6bli7: 'When done, flash it under the original image name',

      g7h: '7. Qualcomm QDL',
      g7p: 'Choose the device / chipset first and the app fills in the matching bootloader files; if they do not work you can swap them manually.',
      g7warn: 'Note: the 9008 EDL port does not support hot-plugging, so keep the connection stable the whole time. If it disconnects, you must reboot the device manually before read/write authorization is restored',
      g7edl: 'How to enter 9008 (EDL)',
      g7li1: 'Snapdragon 888 and above: with the device off, hold Volume Down + Volume Up and plug in the cable to enter 9008 automatically',
      g7li2: 'Via ADB: tap "9008" under "Reboot device" on the home screen to reboot straight into EDL',
      g7li3: 'Or via fastboot: fastboot oem edl',
      g7note: 'Note: "fastboot oem edl" only works on older devices and is not supported on newer ones.',
      g71h: '1. Oplus 9008 flashing',
      g71li1: 'You must complete "Oplus Real VIP authorization" before flashing',
      g71li2: 'Extract the flashing package to the phone storage',
      g71li3: 'In "QFIL flashing" tap Browse and select the extracted package directory',
      g71li4: 'Tap "Build Oplus super.img"',
      g71li5: 'If you want to keep data, turn off "userdata.img will wipe data automatically"',
      g71li6: 'When the build finishes, tap Flash',
      g72h: '2. Oplus full-package flashing',
      g72li1: 'You must complete "Oplus Real VIP authorization" before flashing',
      g72li2: 'Unpack the full package with "payload.bin unpack"',
      g72li3: 'Open "Oplus Real full-package flashing" and tap "Select image directory"',
      g72li4: 'Select the unpacked package at /storage/emulated/0/ChenAxic/payload_bin',
      g72li5: 'Tap "Start flashing" to begin',
      g72note: 'Note: super.img is built automatically and the speed depends on the device. The result is reused, so it is not rebuilt next time',
      g73h: '3. Lenovo / Xiaomi / RedMagic and other brands — 9008 deep flash',
      g73li1: 'In "QFIL flashing" tap Browse and select the extracted package',
      g73li2: 'If you want to keep data, turn off "userdata.img will wipe data automatically"',
      g73li3: 'When configured, tap Flash',

      g8h: '8. Common issues',
      g8li1: 'Some devices sometimes fail to be recognized after rebooting into fastboot. Restart the device manually, unplug the cable during the restart, and plug it back in only once it is fully in fastboot',
      g8li2: 'When running fastboot commands, <waiting for any device> means, literally, waiting for a device — the device is not connected',
      g8li3: 'If flashing or a fastboot operation hangs, put the device back into fastboot and flash again (caused by several earlier failed image flashes)',
      gHome: 'Home'
    }
  };

  /* ========== 二、语言状态 ========== */
  var STORE_KEY = 'chenaxic-lang';
  var lang = 'zh';
  var latestVer = '';   /* 网络读取到的最新版本号，用于 pill 文案 */

  function t(key, vars) {
    var dict = I18N[lang] || I18N.zh;
    var s = dict[key];
    if (s === undefined) s = I18N.zh[key];
    if (s === undefined) return null;
    if (vars) {
      s = s.replace(/\{(\w+)\}/g, function (m, k) {
        return vars[k] !== undefined ? vars[k] : m;
      });
    }
    return s;
  }

  function $(id) { return document.getElementById(id); }

  /* 写入所有 data-i18n 节点 */
  function applyI18n() {
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var key = el.getAttribute('data-i18n');
      /* 带占位符且需要动态值的键，交给各自渲染函数处理 */
      if (key === 'pillLatest' && !latestVer) continue;
      var s = t(key);
      if (s !== null) el.textContent = s;
    }

    var attrNodes = document.querySelectorAll('[data-i18n-attr]');
    for (var j = 0; j < attrNodes.length; j++) {
      var node = attrNodes[j];
      var spec = node.getAttribute('data-i18n-attr').split(',');
      for (var k = 0; k < spec.length; k++) {
        var pair = spec[k].split(':');
        if (pair.length !== 2) continue;
        var attr = pair[0].trim();
        var akey = pair[1].trim();
        var val = t(akey);
        if (val !== null) node.setAttribute(attr, val);
      }
    }

    document.documentElement.lang = (lang === 'zh') ? 'zh-CN' : 'en';
    updateLangBtn();
    renderVersionTexts();
  }

  function updateLangBtn() {
    var btn = $('langBtn');
    if (!btn) return;
    /* 当前中文时按钮显示可切换到的英文 */
    btn.textContent = (lang === 'zh') ? 'EN' : '中文';
    btn.setAttribute('aria-label', (lang === 'zh') ? 'Switch to English' : '切换到中文');
  }

  function setLang(next) {
    lang = (next === 'en') ? 'en' : 'zh';
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
    applyI18n();
  }

  /* ========== 三、版本信息 ========== */
  var REPO = 'https://github.com/TGRAsa7/ChenAxic';
  var VER_PATH = 'TGRAsa7/ChenAxic/main/version.txt';
  var SOURCES = [
    'https://raw.githubusercontent.com/' + VER_PATH,
    'https://ghfast.top/https://raw.githubusercontent.com/' + VER_PATH,
    'https://gh-proxy.com/https://raw.githubusercontent.com/' + VER_PATH
  ];

  var versionData = null;   /* 解析成功后的版本对象 */
  var versionDone = false;  /* 是否已有结果（成功或失败） */

  /* 解析 version.txt，支持纯版本号与 key=value 两种格式 */
  function parseVersion(text) {
    if (!text) return null;
    var out = { name: '', code: 0, url: '', notes: '' };
    var lines = String(text).replace(/\r/g, '').split('\n');
    var lastKey = '';
    for (var i = 0; i < lines.length; i++) {
      var raw = lines[i];
      var line = raw.trim();
      if (lastKey === 'notes') { out.notes += (out.notes ? '\n' : '') + raw; continue; }
      if (!line) continue;
      var eq = line.indexOf('=');
      if (eq > 0) {
        var k = line.slice(0, eq).trim().toLowerCase();
        var v = line.slice(eq + 1).trim();
        lastKey = k;
        if (k === 'versionname' || k === 'name' || k === 'version') out.name = v;
        else if (k === 'versioncode' || k === 'code') out.code = parseInt(v, 10) || 0;
        else if (k === 'url' || k === 'download') out.url = v;
        else if (k === 'notes' || k === 'changelog') out.notes = v;
      } else {
        lastKey = '';
        /* 纯版本号形态：2.7.11 或 v2.7.11 */
        if (/^v?\d+(\.\d+)*$/.test(line)) out.name = line.replace(/^v/, '');
      }
    }
    if (!out.name && !out.code) return null;
    if (!out.code) out.code = codeFromName(out.name);
    /* 下载地址固定指向仓库首页，不依赖 version.txt 里的 url 字段，
     * 避免每次发版都要改链接、忘了改就 404 */
    out.url = REPO;
    out.notes = out.notes.trim();
    return out;
  }

  /* 把 2.7.11 折算成可比较的数字，仅在缺 versionCode 时兜底 */
  function codeFromName(name) {
    var m = String(name || '').match(/(\d+)\.(\d+)(?:\.(\d+))?/);
    if (!m) return 0;
    return (parseInt(m[1], 10) || 0) * 10000 +
           (parseInt(m[2], 10) || 0) * 100 +
           (parseInt(m[3] || '0', 10) || 0);
  }

  /* 从所有源取 versionCode 最高的结果 */
  function fetchVersion() {
    var best = null;
    var pending = SOURCES.length;
    var settled = false;

    function done(v) {
      if (v && (!best || v.code > best.code)) best = v;
      pending--;
      if (pending > 0 || settled) return;
      settled = true;
      versionDone = true;
      versionData = best;
      renderVersionTexts();
      var btn = $('dlBtn');
      if (btn && best) {
        btn.href = best.url;
        var notesBox = $('dlNotes');
        var notesBody = $('notesBody');
        if (notesBox && notesBody && best.notes) {
          notesBody.textContent = best.notes;
          notesBox.hidden = false;
        }
      }
    }

    for (var i = 0; i < SOURCES.length; i++) {
      (function (url) {
        /* 加时间戳绕过中间层缓存，避免读到旧版本 */
        var sep = url.indexOf('?') >= 0 ? '&' : '?';
        fetch(url + sep + 't=' + Date.now(), { cache: 'no-store' })
          .then(function (r) { return r.ok ? r.text() : ''; })
          .then(function (txt) { done(parseVersion(txt)); })
          .catch(function () { done(null); });
      })(SOURCES[i]);
    }
  }

  /* 统一渲染所有与版本相关的文本 */
  function renderVersionTexts() {
    var pill = $('heroPill');
    var dlVer = $('dlVer');
    var btn = $('dlBtn');

    if (!versionDone) {
      if (pill) pill.textContent = t('pillNoVer');
      if (dlVer) dlVer.textContent = t('dlVerLoading');
      return;
    }

    if (!versionData) {
      if (pill) pill.textContent = t('pillNoVer');
      if (dlVer) dlVer.textContent = t('dlVerFail');
      if (btn) {
        btn.textContent = t('dlBtnAlt');
        btn.href = REPO;
      }
      return;
    }

    latestVer = versionData.name || String(versionData.code);
    if (pill) pill.textContent = t('pillLatest', { ver: latestVer });
    if (dlVer) {
      dlVer.textContent = t('dlVer', {
        name: versionData.name || '—',
        code: versionData.code || '—'
      });
    }
    if (btn) {
      btn.textContent = t('dlBtn');
      btn.href = versionData.url || REPO;
    }
  }

  /* ========== 四、启动 ========== */
  function init() {
    /* 语言优先级：localStorage > 浏览器语言 > 中文 */
    var saved = null;
    try { saved = localStorage.getItem(STORE_KEY); } catch (e) {}
    if (saved === 'zh' || saved === 'en') {
      lang = saved;
    } else {
      var nav = (navigator.language || 'zh').toLowerCase();
      lang = nav.indexOf('zh') === 0 ? 'zh' : 'en';
    }

    applyI18n();

    var btn = $('langBtn');
    if (btn) {
      btn.addEventListener('click', function () {
        setLang(lang === 'zh' ? 'en' : 'zh');
      });
    }

    fetchVersion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* 便于调试 */
  window.ChenAxic = {
    setLang: setLang,
    getLang: function () { return lang; },
    i18n: I18N
  };
})();
