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
      gIntroHead: '先理解两件事：',
      gIntro1: '1. 这个 App 的作用是把你的手机模拟成一台电脑，通过 OTG 或数据线去刷写另一台手机。所以「本机」是指操作端，「目标机」才是被刷写的设备。',
      gIntro2: '2. 本机必须已授予 Root 权限，否则刷写功能无法使用。首次启动的引导页会检测并提示授权。',

      g1h: '一、材料准备',
      g1li1: 'OTG 转接头，或双 C 线 / 数据线',
      g1li2: '稳定供电的环境（线刷耗时较长）',
      g1warn: '使用 OTG 转接头和双 C 线时要确保连接稳定。推荐 OTG——双 C 线会触发快充协议，容易在线刷中快速掉电。OTG 转接头也建议用品牌货，部分第三方转接头连接不稳定。',

      g2h: '二、设备连接',
      g2li1: '检查本机设置中是否有「OTG」选项，有就打开',
      g2li2: '把 OTG 转接头 / 双 C 线插入设备',
      g2p: '如果需要识别系统，还要在目标机上打开 USB 调试：',
      g2li3: '目标机设置中打开「USB 调试」（仅用于刷机等其他模式时不需要）',
      g2li4: '目标机弹出授权界面 → 勾选「一律允许使用这台计算机进行调试」→ 点「允许」',
      g2note: '如果用双 C 线，要确保目标机在充电状态才能正常识别。如果连不上，先看目标机有没有弹出 USB 通知——没有则说明连接不稳定或线材不支持数据传输，换根线或换个转接头再试。',

      g3h: '三、欧加线刷',
      g3p: '支持机型：OPPO / realme / 一加',
      g3li1: '在导航栏「工具」中打开「Payload.bin 解压」',
      g3li2: '选择解压出来的 payload.bin',
      g3li3: '按设备性能调整线程数，例如骁龙 845、天玑 1000+ 这类低性能设备建议设成 10 线程',
      g3li4: '点「开始下载 / 解压」',
      g3li5: '解压完返回首页，点「欧加真线刷」',
      g3li6: '点旁边的文件夹图标，选择解压好的镜像目录 /storage/emulated/0/ChenAxic/payload_bin/',
      g3note: '两种模式怎么选：设备丢失 fastboot 且进不去 → 用「纯 FastbootD」；能进 fastboot 但进不了 fastbootD → 用「常规线刷」；两者都正常 → 推荐「纯 FastbootD」，不用二次重启。',
      g3warn: '如果多次出现 my_ 开头的镜像，或 odm、system、system_dlkm、system_ext、vendor、vendor_dlkm、product、odm_dlkm 无法正常刷入，把设备重启到 fastboot → 用「分区 super 修复」→ 再重新线刷。',
      g3p2: '正常情况下刷完就能开机。',

      g4h: '四、小米线刷',
      g4p: '支持机型：小米 / 红米',
      g4warn: '确保线刷包中含 .sh 执行脚本，否则无法线刷。',
      g4li1: '把设备重启到 fastboot',
      g4li2: '首页进入「小米线刷」，选择已解压好的刷机包',
      g4li3: '选择 flash_all.sh（不回锁 BL + 清除数据）',
      g4note: '出现 Missmatching image and device → 检查线刷包是否匹配该机型。卡在「正在执行」→ 把设备重新进 fastboot 模式再刷一次。',

      g5h: '五、ADB Sideload 卡刷',
      g5p1: 'Sideload 的原理是把卡刷包当线刷包刷进去。',
      g5p2: '进入 Sideload 模式：',
      g5li1: 'TWRP：打开「高级」→「ADB Sideload」→ 下方滑块滑动开启',
      g5li2: '橙狐：点下方三条杠 →「ADB Sideload」→ 下方滑块滑动开启',
      g5li3: '类原生 Recovery：「Apply update」→「Apply from ADB」',
      g5p3: '执行刷入：',
      g5li4: '首页进入「ADB Sideload」',
      g5li5: '选择卡刷包',
      g5li6: '点「开始刷入」',

      g6h: '六、刷 Root',
      g6a: '方案 A：已修补好的镜像',
      g6ali1: '准备修补好的 boot.img / init_boot.img',
      g6ali2: '把设备重启到 fastboot 模式',
      g6ali3: '首页进入「刷写分区」',
      g6ali4: '点「选择镜像 (img)」',
      g6ali5: '按原镜像类型二选一：「一键刷入 init_boot (a+b)」或「刷入 boot」',
      g6ali6: '点击即可刷入',
      g6b: '方案 B：刷入 KernelSU（LKM）',
      g6bli1: '获取未修补的 boot.img / init_boot.img 原版镜像',
      g6bli2: '把设备重启到 fastboot 模式',
      g6bli3: '首页进入「刷入 KernelSU」',
      g6bli4: '选择内核版本',
      g6bli5: '点「选择 init_boot.img / boot.img」，选择未修补的镜像',
      g6bli6: '点「修补」',
      g6bli7: '修补完按原镜像名称刷入',

      g7h: '七、高通 QDL',
      g7p: '先选「机型 / 处理器」，App 会自动填入对应引导文件；引导不可用时可手动更换。',
      g7warn: '9008 EDL 端口不支持热拔插，全程要保持连接稳定。一旦断联，需要手动重启设备才能恢复正常读写授权。',
      g7edl: '如何进入 9008（EDL）',
      g7li1: '骁龙 888 及以上：关机状态下同时按住「音量下 + 音量上」，再插入数据线，可自动进入 9008 端口',
      g7li2: '通过 ADB：首页「重启设备」中点击「9008」，直接重启到 EDL',
      g7li3: '通过 fastboot：fastboot oem edl',
      g7note: 'fastboot oem edl 仅支持老旧设备，新设备不支持。',
      g71h: '1. 欧加 9008 线刷',
      g71li1: '需要先完成「欧加真 VIP 授权」才能刷写',
      g71li2: '把线刷包解压到手机存储',
      g71li3: '用「QFIL 线刷」点「浏览」，选择解压好的线刷包目录',
      g71li4: '点「欧加构建 super.img」',
      g71li5: '如需清除数据，把「userdata.img 会自动清除数据」关掉',
      g71li6: '构建完点「刷入」',
      g72h: '2. 欧加全量包线刷',
      g72li1: '需要先完成「欧加真 VIP 授权」才能刷写',
      g72li2: '把全量包用「Payload.bin 解压」处理',
      g72li3: '进入「欧加真全量包线刷」，点「选择镜像目录」',
      g72li4: '选择解压好的目录 /storage/emulated/0/ChenAxic/payload_bin',
      g72li5: '点「开始线刷」',
      g72note: '会自动构建 super.img，速度取决于设备性能。构建结果会被复用，下次不会重复构建。',
      g73h: '3. 联想 / 小米 / 红魔等品牌 9008 深刷',
      g73li1: '用「QFIL 线刷」点「浏览」，选择解压完的线刷包',
      g73li2: '如需清除数据，把「userdata.img 会自动清除数据」关掉',
      g73li3: '设置完成点「刷入」',

      g8h: '八、常见问题',
      g8li1: '设备重启到 fastboot 后识别不到 → 手动重启设备，重启期间拔掉数据线，完全进入 fastboot 后再插线，才能识别。',
      g8li2: '提示 <waiting for any device> → 意思是「等待任何设备」，即没连上目标机。',
      g8li3: '刷写卡住不动 → 把设备重新进入 fastboot 模式再刷一次。通常是前面多次刷镜像失败导致的。',
      g8li4: 'my_ 开头镜像刷不进去 → 重启到 fastboot，用「分区 super 修复」后再线刷。',
      g8li5: '刷完开不了机 → 确认刷入的分区完整（系统、boot、vbmeta 都应刷入），必要时重刷 super 分区。',
      gEnd: '教程到这里就结束了。如果内容有误或你有踩坑经验想补充，可以在项目页面提 Issue 告诉我们。',
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
      gIntroHead: 'Two things to understand first:',
      gIntro1: '1. This app turns your phone into a computer that flashes another phone over OTG or a data cable. So "this device" means the controlling phone, and "target device" means the one being flashed.',
      gIntro2: '2. This device must be granted root, otherwise flashing will not work. The onboarding screen on first launch checks for root and prompts you to grant it.',

      g1h: '1. What you need',
      g1li1: 'An OTG adapter, or a C-to-C / data cable',
      g1li2: 'A stable power supply (flashing takes a while)',
      g1warn: 'Make sure the connection is solid when using an OTG adapter or a C-to-C cable. OTG is recommended — C-to-C cables trigger fast-charging negotiation and the battery can drain quickly during a flash. Buy a branded OTG adapter too; some third-party ones have unreliable connections.',

      g2h: '2. Connecting the device',
      g2li1: 'Check whether this device has an "OTG" toggle in settings and turn it on',
      g2li2: 'Plug in the OTG adapter or C-to-C cable',
      g2p: 'If you need the system to recognize it, also enable USB debugging on the target device:',
      g2li3: 'Turn on "USB debugging" in the target device settings (not needed when only using flashing and similar modes)',
      g2li4: 'When the authorization dialog appears → tick "Always allow from this computer" → tap "Allow"',
      g2note: 'With a C-to-C cable the target device must be charging for it to be recognized reliably. If it does not connect, check whether a USB notification appeared on the target — if not, the connection is unstable or the cable does not support data. Try another cable or adapter.',

      g3h: '3. Oplus flashing',
      g3p: 'Supported devices: OPPO / realme / OnePlus',
      g3li1: 'Open "Payload.bin extractor" under "Tools" in the navigation bar',
      g3li2: 'Select the extracted payload.bin',
      g3li3: 'Adjust the thread count to suit the device; low-end chips such as Snapdragon 845 or Dimensity 1000+ should use 10 threads',
      g3li4: 'Tap "Start download / extract"',
      g3li5: 'Go back to the home screen and tap "Oplus Real Flash"',
      g3li6: 'Tap the folder icon next to it and pick the extracted image folder /storage/emulated/0/ChenAxic/payload_bin/',
      g3note: 'Which mode to choose: device lost fastboot and cannot enter it → use "Pure FastbootD"; can enter fastboot but not fastbootD → use "Regular flashing"; both work → "Pure FastbootD" is recommended, no second reboot needed.',
      g3warn: 'If images prefixed with my_ keep appearing, or odm, system, system_dlkm, system_ext, vendor, vendor_dlkm, product or odm_dlkm fail to flash, reboot the device into fastboot → run "Repair super partition" → then flash again.',
      g3p2: 'Normally the device boots right after flashing.',

      g4h: '4. Xiaomi flashing',
      g4p: 'Supported devices: Xiaomi / Redmi',
      g4warn: 'Make sure the flash package contains a .sh script, otherwise flashing cannot run.',
      g4li1: 'Reboot the device into fastboot',
      g4li2: 'Open "Xiaomi flashing" on the home screen and pick the extracted package',
      g4li3: 'Choose flash_all.sh (does not re-lock the bootloader + wipes data)',
      g4note: '"Missmatching image and device" → check that the package matches the model. Stuck on "executing" → put the device back into fastboot and flash again.',

      g5h: '5. ADB Sideload',
      g5p1: 'Sideload pushes a recovery (OTA) package through the same channel as a fastboot flash.',
      g5p2: 'Entering Sideload mode:',
      g5li1: 'TWRP: open "Advanced" → "ADB Sideload" → drag the slider at the bottom to start',
      g5li2: 'OrangeFox: tap the three-line button at the bottom → "ADB Sideload" → drag the slider to start',
      g5li3: 'AOSP-like recovery: "Apply update" → "Apply from ADB"',
      g5p3: 'Flashing:',
      g5li4: 'Open "ADB Sideload" on the home screen',
      g5li5: 'Select the recovery package',
      g5li6: 'Tap "Start flashing"',

      g6h: '6. Installing root',
      g6a: 'Option A: a pre-patched image',
      g6ali1: 'Prepare a patched boot.img / init_boot.img',
      g6ali2: 'Reboot the device into fastboot',
      g6ali3: 'Open "Flash partition" on the home screen',
      g6ali4: 'Tap "Select image (img)"',
      g6ali5: 'Pick one according to the original image type: "Flash init_boot (a+b) in one tap" or "Flash boot"',
      g6ali6: 'Tap to flash',
      g6b: 'Option B: install KernelSU (LKM)',
      g6bli1: 'Get the unpatched, stock boot.img / init_boot.img',
      g6bli2: 'Reboot the device into fastboot',
      g6bli3: 'Open "Install KernelSU" on the home screen',
      g6bli4: 'Select the kernel version',
      g6bli5: 'Tap "Select init_boot.img / boot.img" and choose the unpatched image',
      g6bli6: 'Tap "Patch"',
      g6bli7: 'After patching, flash it using the original image name',

      g7h: '7. Qualcomm QDL',
      g7p: 'Pick the device / chipset first and the app fills in the matching bootloader files; you can still swap them manually if a bootloader is unavailable.',
      g7warn: 'The 9008 EDL port does not support hot-plugging, so keep the connection stable throughout. Once it drops, you have to restart the device manually before read/write access is restored.',
      g7edl: 'How to enter 9008 (EDL)',
      g7li1: 'Snapdragon 888 and newer: with the device powered off, hold "Volume down + Volume up" and plug in the cable — it enters the 9008 port automatically',
      g7li2: 'Via ADB: tap "9008" under "Reboot device" on the home screen to reboot straight into EDL',
      g7li3: 'Via fastboot: fastboot oem edl',
      g7note: 'fastboot oem edl only works on older devices; newer ones do not support it.',
      g71h: '1. Oplus 9008 flashing',
      g71li1: 'You must complete "Oplus Real VIP authorization" before flashing',
      g71li2: 'Extract the flash package to phone storage',
      g71li3: 'In "QFIL flashing" tap "Browse" and select the extracted package folder',
      g71li4: 'Tap "Build Oplus super.img"',
      g71li5: 'To wipe data, turn off "userdata.img wipes data automatically"',
      g71li6: 'Tap "Flash" once the build finishes',
      g72h: '2. Oplus full-package flashing',
      g72li1: 'You must complete "Oplus Real VIP authorization" before flashing',
      g72li2: 'Process the full package with "Payload.bin extractor"',
      g72li3: 'Open "Oplus full-package flashing" and tap "Select image folder"',
      g72li4: 'Choose the extracted folder /storage/emulated/0/ChenAxic/payload_bin',
      g72li5: 'Tap "Start flashing"',
      g72note: 'super.img is built automatically; speed depends on device performance. The build result is reused, so it will not be rebuilt next time.',
      g73h: '3. Lenovo / Xiaomi / RedMagic and other brands (9008 deep flash)',
      g73li1: 'In "QFIL flashing" tap "Browse" and select the extracted package',
      g73li2: 'To wipe data, turn off "userdata.img wipes data automatically"',
      g73li3: 'Tap "Flash" when the settings are done',

      g8h: '8. FAQ',
      g8li1: 'Target not detected after rebooting into fastboot → restart the device manually, unplug the cable during the reboot, and plug it back in only once it is fully in fastboot.',
      g8li2: '<waiting for any device> → it is literally waiting for a device, i.e. the target is not connected.',
      g8li3: 'Flashing hangs → put the device back into fastboot and flash again. This is usually caused by several failed image flashes beforehand.',
      g8li4: 'Images prefixed with my_ will not flash → reboot into fastboot, run "Repair super partition", then flash again.',
      g8li5: 'The device will not boot afterwards → check that all partitions were flashed (system, boot and vbmeta should all be included) and re-flash the super partition if needed.',
      gEnd: 'That is the whole guide. If something here is wrong or you have tips worth adding, open an issue on the project page and let us know.',
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
