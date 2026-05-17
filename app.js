const STORAGE_KEY = "no9-building-save-v1";
const UI_LAYOUT_KEY = "no9-building-ui-layout-v1";
const UI_DEBUG_ENABLED_KEY = "no9-building-ui-debug-enabled";
const DEV_FORCE_ONBOARDING_ON_REFRESH = true;

const startParams = new URLSearchParams(window.location.search);
const forceNewUser = startParams.has("new") || startParams.has("reset");
if (forceNewUser) {
  try {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.clear();
  } catch {}
}

const uiDebugTargets = [
  { id: "hub.avatar", selector: ".hub-avatar-frame", label: "\u5934\u50cf\u6846" },
  { id: "hub.player", selector: ".hub-player-copy", label: "\u73a9\u5bb6\u540d" },
  { id: "hub.gold", selector: ".hub-gold-frame", label: "\u91d1\u5e01\u6846" },
  { id: "hub.goldValue", selector: ".hub-gold-value", label: "\u91d1\u5e01\u6570" },
  { id: "hub.spirit", selector: ".hub-spirit-frame", label: "\u7075\u5e01\u6846" },
  { id: "hub.spiritValue", selector: ".hub-spirit-value", label: "\u7075\u5e01\u6570" },
  { id: "hub.tabs", selector: ".hub-bottom-pattern", label: "\u5e95\u90e8\u5206\u9875" },
  { id: "soul.back", selector: ".soul-back", label: "\u8fd4\u56de" },
  { id: "soul.title", selector: ".soul-titlebar", label: "\u5fa1\u9b42\u6807\u9898" },
  { id: "soul.titleText", selector: ".soul-titlebar strong", label: "\u5fa1\u9b42\u6587\u5b57" },
  { id: "soul.gold", selector: ".soul-gold", label: "\u5fa1\u9b42\u91d1\u5e01" },
  { id: "soul.goldText", selector: ".soul-gold span", label: "\u91d1\u5e01\u6570\u5b57" },
  { id: "soul.spirit", selector: ".soul-spirit", label: "\u5fa1\u9b42\u7075" },
  { id: "soul.spiritText", selector: ".soul-spirit span", label: "\u7075\u6570\u5b57" },
  { id: "soul.name", selector: ".soul-name-plate", label: "\u540d\u5b57\u7ad6\u724c" },
  { id: "soul.nameText", selector: ".soul-name-plate strong", label: "\u955c\u4e2d\u5f71\u6587\u5b57" },
  { id: "soul.prev", selector: ".soul-page-prev", label: "\u5de6\u7ffb\u9875" },
  { id: "soul.next", selector: ".soul-page-next", label: "\u53f3\u7ffb\u9875" },
  { id: "soul.panel", selector: ".soul-feed-panel", label: "\u5fa1\u9b42\u9762\u677f" },
  { id: "soul.likeTitle", selector: ".soul-title", label: "\u597d\u611f\u79f0\u53f7" },
  { id: "soul.expText", selector: ".soul-exp p", label: "\u7ecf\u9a8c\u6570\u5b57" },
  { id: "soul.infoBody", selector: ".soul-info-body", label: "\u60c5\u62a5\u5185\u5bb9" },
  { id: "soul.infoFooter", selector: ".soul-info-footer", label: "\u60c5\u62a5\u5e95\u90e8" },
  { id: "soul.items", selector: ".soul-item-area", label: "\u7269\u54c1\u533a" },
  { id: "soul.tipText", selector: ".soul-tip", label: "\u5e95\u90e8\u63d0\u793a" },
  { id: "soul.bioList", selector: ".soul-bio-list", label: "\u4f20\u8bb0\u5217\u8868" },
  { id: "soul.tabs", selector: ".soul-side-tabs", label: "\u53f3\u4fa7\u6807\u7b7e" },
  { id: "soul.tabText", selector: ".soul-side-tabs span", label: "\u6807\u7b7e\u6587\u5b57" },
  { id: "summon.back", selector: ".summon-back", label: "\u53ec\u5524\u8fd4\u56de" },
  { id: "summon.title", selector: ".summon-titlebar", label: "\u53ec\u5524\u6807\u9898" },
  { id: "summon.gold", selector: ".summon-gold", label: "\u53ec\u5524\u91d1\u5e01" },
  { id: "summon.spirit", selector: ".summon-spirit", label: "\u53ec\u5524\u7075" },
  { id: "summon.preview", selector: ".summon-preview-panel", label: "\u5956\u52b1\u9884\u89c8" },
  { id: "summon.previewMain", selector: ".summon-preview-main", label: "\u53ec\u5524\u5de6\u4fa7\u5361\u724c" },
  { id: "summon.previewCard", selector: ".summon-preview-main img", label: "\u53ec\u5524\u5de6\u4fa7\u5361\u724c\u56fe" },
  { id: "summon.fx", selector: ".summon-fx", label: "\u53ec\u5524\u9635" },
  { id: "summon.once", selector: ".summon-once", label: "\u53ec\u5524\u4e00\u6b21" },
  { id: "summon.ten", selector: ".summon-ten", label: "\u53ec\u5524\u5341\u6b21" },
  { id: "summon.pools", selector: ".summon-pool-panel", label: "\u53ec\u5524\u5361\u6c60" },
  { id: "bag.back", selector: ".bag-art-back", label: "\u80cc\u5305\u8fd4\u56de" },
  { id: "bag.title", selector: ".bag-art-titlebar", label: "\u80cc\u5305\u6807\u9898" },
  { id: "bag.gold", selector: ".bag-art-gold", label: "\u80cc\u5305\u91d1\u5e01" },
  { id: "bag.spirit", selector: ".bag-art-spirit", label: "\u80cc\u5305\u7075" },
  { id: "bag.grid", selector: ".bag-art-grid-panel", label: "\u80cc\u5305\u683c\u5b50" },
  { id: "bag.info", selector: ".bag-art-info", label: "\u80cc\u5305\u8be6\u60c5" },
  { id: "bag.infoIcon", selector: ".bag-art-info-icon", label: "\u80cc\u5305\u8be6\u60c5\u56fe\u6807" },
  { id: "bag.cardShow", selector: ".bag-art-card-show", label: "\u8be1\u5f02\u5361\u5c55\u793a" },
  { id: "bag.cardFigure", selector: ".bag-art-card-figure", label: "\u8be1\u5f02\u5361\u724c" },
  { id: "bag.cardFace", selector: ".bag-art-card-face", label: "\u8be1\u5f02\u5361\u9762" },
  { id: "bag.tabs", selector: ".bag-art-tabs", label: "\u80cc\u5305\u5206\u7c7b" },
  { id: "role.male", selector: ".role-card-male", label: "\u7537\u89d2\u5361" },
  { id: "role.female", selector: ".role-card-female", label: "\u5973\u89d2\u5361" },
  { id: "role.confirm", selector: ".role-confirm", label: "\u9009\u89d2\u786e\u5b9a" },
  { id: "name.panel", selector: ".name-entry-panel", label: "\u53d6\u540d\u9762\u677f" },
  { id: "name.value", selector: ".name-entry-value", label: "\u540d\u5b57" },
  { id: "name.random", selector: ".name-random", label: "\u968f\u673a\u540d" },
  { id: "name.confirm", selector: ".name-confirm", label: "\u53d6\u540d\u786e\u5b9a" },
  { id: "story.screen", selector: ".story-compose", label: "\u5267\u60c5\u754c\u9762" },
  { id: "story.hudAvatar", selector: ".story-hud-avatar", label: "\u5267\u60c5\u5934\u50cf" },
  { id: "story.hudPlayer", selector: ".story-hud-player", label: "\u5267\u60c5\u73a9\u5bb6\u540d" },
  { id: "story.hudGold", selector: ".story-hud-gold", label: "\u5267\u60c5\u91d1\u5e01" },
  { id: "story.hudGoldText", selector: ".story-hud-gold-value", label: "\u5267\u60c5\u91d1\u5e01\u6570" },
  { id: "story.hudSpirit", selector: ".story-hud-spirit", label: "\u5267\u60c5\u7075\u5e01" },
  { id: "story.hudSpiritText", selector: ".story-hud-spirit-value", label: "\u5267\u60c5\u7075\u5e01\u6570" },
  { id: "story.decorLine", selector: ".story-decor-line", label: "\u5267\u60c5\u88c5\u9970\u7ebf" },
  { id: "story.chapters", selector: ".story-chapter-list", label: "\u7ae0\u8282\u5217\u8868" },
  { id: "story.chapterCard", selector: ".story-chapter-card", label: "\u7ae0\u8282\u6807\u7b7e" },
  { id: "story.turns", selector: ".story-turn-panel", label: "\u56de\u5408\u9762\u677f" },
  { id: "story.turnCard", selector: ".story-turn-card", label: "\u56de\u5408\u6807\u7b7e" },
  { id: "story.bottomTabs", selector: ".story-bottom-tabs", label: "\u5267\u60c5\u5e95\u90e8\u6309\u94ae" },
  { id: "story.bottomActive", selector: ".story-bottom-active", label: "\u5267\u60c5\u5e95\u90e8\u9009\u4e2d" },
  { id: "story.tabButton", selector: ".story-tab-hit", label: "\u5267\u60c5\u529f\u80fd\u70ed\u533a" },
  { id: "story.enterModal", selector: ".story-enter-modal", label: "\u8fdb\u5165\u5267\u60c5\u5f39\u7a97" },
  { id: "story.enterCopy", selector: ".story-enter-copy", label: "\u8fdb\u5165\u5267\u60c5\u6587\u5b57" },
  { id: "story.enterConfirm", selector: ".story-enter-btn", label: "\u8fdb\u5165\u5267\u60c5\u6309\u94ae" },
  { id: "story.enterClose", selector: ".story-enter-close", label: "\u79bb\u5f00\u5267\u60c5\u6309\u94ae" },
  { id: "dialogue.tools", selector: ".dialogue-tools", label: "\u5bf9\u8bdd\u5de5\u5177\u680f" },
  { id: "dialogue.save", selector: "#saveStoryBtn", label: "\u5b58\u6863\u6309\u94ae" },
  { id: "dialogue.load", selector: "#loadStoryBtn", label: "\u8bfb\u6863\u6309\u94ae" },
  { id: "dialogue.auto", selector: "#autoBtn", label: "\u81ea\u52a8\u6309\u94ae" },
  { id: "dialogue.skip", selector: "#skipBtn", label: "\u5feb\u8fdb\u6309\u94ae" }
];

let uiDebugEnabled = false;
let uiDebugLayout = {};
let uiDebugSelectedId = null;

const playerNamePools = {
  male: [
    "\u6797\u4e4b\u884c", "\u9646\u5b50\u6602", "\u8bb8\u5f52\u821f", "\u9648\u4e0d\u8bed", "\u6c88\u6dee\u5b89",
    "\u5468\u660e\u5f7b", "\u987e\u5ef6\u5ddd", "\u79e6\u5c11\u5b81", "\u8d75\u666f\u8f9e", "\u97e9\u4e88\u58a8",
    "\u5b8b\u4e34\u6df1", "\u675c\u95fb\u706f", "\u767d\u5b50\u5bd2", "\u4f55\u8d8a\u5c18", "\u5510\u5b89\u77f3",
    "\u590f\u77e5\u8fdc", "\u7a0b\u661f\u9611", "\u5b63\u65e0\u5bd0", "\u65b9\u8d77\u5c9a", "\u8c22\u5f52\u96f6"
  ],
  female: [
    "\u6797\u5c0f\u6ee1", "\u8bb8\u5ff5\u5b89", "\u9648\u9752\u68a7", "\u6c88\u661f\u56de", "\u5468\u665a\u6f84",
    "\u987e\u660e\u7b19", "\u79e6\u82e5\u5b81", "\u8d75\u96e8\u5fae", "\u97e9\u4e88\u68e0", "\u5b8b\u77e5\u590f",
    "\u675c\u95fb\u7b19", "\u767d\u5b50\u79cb", "\u4f55\u5ff5\u5c18", "\u5510\u5b89\u6b4c", "\u590f\u5c0f\u6e21",
    "\u7a0b\u661f\u5cad", "\u5b63\u65e0\u5fe7", "\u65b9\u4e88\u5b81", "\u8c22\u5f52\u96e8", "\u9646\u6e05\u77e5"
  ]
};

const storyScripts = {
  opening: `
# 涔濆彿妤煎紑绡?bg show building fade 1
char show mirror center fade
鏃佺櫧 闆ㄥ仠鍦ㄥ噷鏅ㄤ袱鐐瑰崄涓夊垎銆備節鍙锋ゼ鐨勭數姊紝鍗村湪娌′汉鎸夐敭鐨勬椂鍊欒嚜宸变笅琛屻€?淇濆畨鑰佺Е 浣犳槸鏂版潵鐨勫鐝紵璁颁綇锛屽崄浜岀偣浠ュ悗鍒煡涔濆眰銆?鎴?涓轰粈涔堬紵
淇濆畨鑰佺Е 涔濇ゼ浣忔埛鏃╁氨鎼┖浜嗐€傚彲姣忔櫄锛岄棬缂濅笅闈㈤兘浼氭湁浜哄線澶栧鎶曡瘔鍗曘€?choice 鎺ヨ繃閽ュ寵:take_key 鎷掔粷涓婃ゼ:refuse
label refuse
鏃佺櫧 浣犻€€鍚庡崐姝ワ紝閽ュ寵鍗村凡缁忚汉鍦ㄦ帉蹇冦€傚啺寰楀儚涓€鎴澶淬€?jump take_key
label take_key
bg show corridor fade 1
鏃佺櫧 鐢垫闂ㄥ悎涓娿€傛ゼ灞傛暟瀛椾竴鏍间竴鏍艰烦鍔紝鍦ㄢ€?鈥濆仠浣忓悗锛屽張澶氫寒浜嗕竴鏍间笉瀛樺湪鐨勬暟瀛椼€?闀滀腑褰?浣犵粓浜庡洖鏉ヤ簡銆?鎴?鎴戜笉璁よ瘑浣犮€?闀滀腑褰?浣嗕綘璁よ瘑杩欐爧妤笺€傛垨鑰呰锛岃繖鏍嬫ゼ璁よ瘑浣犮€?wait 0.4
bg show room fade 1
鏃佺櫧 904 瀹ょ殑闂ㄦ病鏈夐攣銆傚鍘呬腑澶憜鐫€涓€闈㈣挋灏樼殑闀滃瓙锛岄暅闈㈤噷绔欑潃姣斾綘鎱㈠崐鎷嶇殑浜恒€?闀滀腑褰?鎶婃垜甯﹀嚭鍘汇€傛垜浼氬憡璇変綘锛屼節鍙锋ゼ涓轰粈涔堝皯浜嗕竴灞傘€?end
`,
  "1-1": `
bg show corridor fade 0.8
char show mirror right fade
鏃佺櫧 璧板粖鐨勫０鎺х伅涓€鐩忔帴涓€鐩忎寒璧凤紝姣忎竴鐩忎笅闈㈤兘绔欑潃涓€涓箍鑴氬嵃銆?鎴?璋佸湪閭ｉ噷锛?闀滀腑褰?涓嶈鍠婂悕瀛椼€傝繖閲岀殑涓滆タ锛屼細鍊熷悕瀛楅潬杩戜綘銆?choice 鏌ョ湅904闂ㄧ墝:door 杩介殢鑴氬嵃:footprint
label door
鏃佺櫧 闂ㄧ墝鑳屽悗澶圭潃涓€寮犳棫鐓х墖銆傜収鐗囬噷锛屼綘绔欏湪涔濆彿妤煎皝椤朵华寮忕殑浜虹兢涓ぎ銆?jump endline
label footprint
鏃佺櫧 鑴氬嵃鍋滃湪瀹夊叏鍑哄彛锛屽涓婂啓鐫€锛氫笉瑕佺浉淇＄數姊噷鐨勮嚜宸便€?label endline
鏃佺櫧 浣犺幏寰椾簡閬撳叿锛氭棫鐓х墖銆傞暅涓奖鐨勫淇′换搴︿笂鍗囷紝浣嗗嵄娈嗕篃寮€濮嬭褰曚綘鐨勫懠鍚搞€?end
`,
  "1-2": `
bg show room fade 0.8
char show mirror center fade
鏃佺櫧 闀滃瓙鑳岄潰鐨勫皝鏉¤姘存苯娉″紑锛岄湶鍑轰竴涓蹭綇鎴风紪鍙枫€?闀滀腑褰?姣忎竴涓紪鍙凤紝閮芥槸涓€涓病鑳界寮€涔濆彿妤肩殑浜恒€?鎴?閭ｄ綘鏄摢涓€涓紵
闀滀腑褰?鎴戞槸绗節涓紝涔熸槸绗竴涓€?鏃佺櫧 濂逛几鎵嬭Е纰伴暅闈紝浣犵殑褰卞瓙鍏堜竴姝ユ姮澶淬€?end
`,
  "1-3": `
bg show building fade 0.8
鏃佺櫧 澶╁彴闂ㄥ悗娌℃湁澶╃┖锛屽彧鏈変竴鏉″悜涓嬪欢浼哥殑妤兼銆?淇濆畨鑰佺Е 濡傛灉浣犵湅瑙佸崄涓夊眰锛岀珛鍒婚棴鐪兼暟鍒颁節銆?鏃佺櫧 鍙綘杩樻病寮€濮嬫暟锛屾ゼ姊繁澶勫凡缁忔湁浜烘浛浣犳暟瀹屼簡銆?end
`
};

const chapters = [
  { id: "1-1", title: "深夜入楼", desc: "第一章第一回：深夜回到九号楼，闸机后的红线已经记下你的名字。", x: 14, y: 58, thumb: "\u95e8" },
  { id: "1-2", title: "茶水间", desc: "第一章第二回：茶水间的红色咖啡和井底童声，把逃路越缠越紧。", x: 30, y: 40, thumb: "\u8336" },
  { id: "1-3", title: "残烛楼梯", desc: "第一章第三回：走廊尽头的残烛，照出每只灵放不下的执念。", x: 46, y: 56, thumb: "\u70db" },
  { id: "1-4", title: "阳台水影", desc: "第一章第四回：吸烟区被黑水淹没，纸伞和提灯引你继续深入。", x: 60, y: 38, thumb: "\u4f1e" },
  { id: "1-5", title: "测试区", desc: "第一章第五回：测试区的屏幕反复运行，布偶怨童在黑水里等你。", x: 68, y: 58, thumb: "\u7801" },
  { id: "1-6", title: "旧皮与小吴", desc: "第一章第六回：闸机映出三年前的脸，测试区里还有敲不完代码的人。", x: 78, y: 42, thumb: "\u5c4f" },
  { id: "1-7", title: "镜妖", desc: "第一章第七回：镜妖用你的脸等待最后一步，楼里的灵都被卷入裂缝。", x: 84, y: 55, thumb: "\u955c" },
  { id: "1-8", title: "光缝", desc: "第一章第八回：所有执念在办公室汇合，你要找到九号楼留下的出口。", x: 90, y: 36, thumb: "\u5149" }
];

const storyChapters = [
  {
    id: "chapter-1",
    label: "\u7b2c\u4e00\u7ae0",
    title: "九号楼夜归",
    desc: "深夜进入九号楼后的完整第一章剧情。",
    bg: "./assets/story_ui/bg_story_01.jpg",
    thumb: "./assets/story_ui/thumbs/thumb_chapter01.png",
    rounds: chapters.filter(round => round.id.startsWith("1-"))
  },
  {
    id: "chapter-2",
    label: "\u7b2c\u4e8c\u7ae0",
    title: "\u672a\u89e3\u9501",
    desc: "\u7b2c\u4e8c\u7ae0\u5267\u60c5\u5c1a\u672a\u5f00\u653e\u3002",
    bg: "./assets/story_ui/bg_story_01.jpg",
    thumb: "./assets/story_ui/thumbs/thumb_chapter02.png",
    rounds: []
  },
  {
    id: "chapter-3",
    label: "\u7b2c\u4e09\u7ae0",
    title: "\u672a\u89e3\u9501",
    desc: "\u540e\u7eed\u7ae0\u8282\u5c1a\u672a\u5f00\u653e\u3002",
    bg: "./assets/story_ui/bg_story_01.jpg",
    thumb: "./assets/story_ui/thumbs/thumb_chapter03.png",
    rounds: []
  },
  {
    id: "chapter-4",
    label: "\u7b2c\u56db\u7ae0",
    title: "\u672a\u89e3\u9501",
    desc: "\u540e\u7eed\u7ae0\u8282\u5c1a\u672a\u5f00\u653e\u3002",
    bg: "./assets/story_ui/bg_story_01.jpg",
    thumb: "./assets/story_ui/thumbs/thumb_chapter04.png",
    rounds: []
  },
  {
    id: "chapter-5",
    label: "\u7b2c\u4e94\u7ae0",
    title: "\u672a\u89e3\u9501",
    desc: "\u540e\u7eed\u7ae0\u8282\u5c1a\u672a\u5f00\u653e\u3002",
    bg: "./assets/story_ui/bg_story_01.jpg",
    thumb: "./assets/story_ui/thumbs/thumb_chapter05.png",
    rounds: []
  },
  {
    id: "chapter-6",
    label: "\u7b2c\u516d\u7ae0",
    title: "\u672a\u89e3\u9501",
    desc: "\u540e\u7eed\u7ae0\u8282\u5c1a\u672a\u5f00\u653e\u3002",
    bg: "./assets/story_ui/bg_story_01.jpg",
    thumb: "./assets/story_ui/thumbs/thumb_chapter06.png",
    rounds: []
  },
  {
    id: "chapter-7",
    label: "\u7b2c\u4e03\u7ae0",
    title: "\u672a\u89e3\u9501",
    desc: "\u540e\u7eed\u7ae0\u8282\u5c1a\u672a\u5f00\u653e\u3002",
    bg: "./assets/story_ui/bg_story_01.jpg",
    thumb: "./assets/story_ui/thumbs/thumb_chapter07.png",
    rounds: []
  }
];

const ghostCatalog = {
  mirror: {
    id: "mirror",
    name: "司帐娘·赤幔",
    rarity: "SSR",
    likes: ["cracked_lipstick", "old_photo", "talisman_fire"],
    hates: ["rust_key"],
    quote: "红幔垂落，恩怨分明。"
  },
  elevator: {
    id: "elevator",
    name: "无面行者·寂言",
    rarity: "SSR",
    likes: ["soul_flag", "talisman_protect"],
    hates: ["balance_charm"],
    quote: "无面无言，只渡干净之魂。"
  },
  rain: {
    id: "rain",
    name: "九楼守童·阿隼",
    rarity: "SR",
    likes: ["occult_book", "paper_doll"],
    hates: [],
    quote: "拨浪鼓响，稚魂归楼。"
  },
  stair: {
    id: "stair",
    name: "多出来的台阶",
    rarity: "SP",
    likes: ["forbidden_incense"],
    hates: ["balance_charm"],
    quote: "它一直都在，只等你回头。"
  }
};

const items = {
  old_photo: { name: "旧照片", type: "normal", trust: 8, danger: 3, count: 3 },
  cracked_lipstick: { name: "裂口唇膏", type: "bond", trust: 25, danger: 5, count: 2 },
  forbidden_incense: { name: "禁香", type: "forbidden", trust: 45, danger: 15, count: 1 },
  balance_charm: { name: "制衡符", type: "balance", trust: 2, danger: -20, count: 2 },
  paper_doll: { name: "缠线纸偶", type: "bond", trust: 18, danger: 4, count: 6 },
  rust_key: { name: "锈钥匙", type: "normal", trust: 14, danger: 2, count: 5 },
  rain_tape: { name: "雨声磁带", type: "bond", trust: 22, danger: 3, count: 4 },
  mirror_shard: { name: "裂镜片", type: "forbidden", trust: 30, danger: 9, count: 3 },
  elevator_coin: { name: "电梯硬币", type: "normal", trust: 16, danger: 2, count: 5 },
  red_thread: { name: "红线", type: "normal", trust: 12, danger: 1, count: 8 },
  night_badge: { name: "夜班工牌", type: "bond", trust: 28, danger: 6, count: 3 },
  sealed_note: { name: "封存便签", type: "balance", trust: 20, danger: -4, count: 4 },
  occult_book: { name: "封纹记录书", type: "normal", trust: 10, danger: 1, count: 2, iconPath: "./assets/item_icons/icon_book.png" },
  soul_flag: { name: "引魂幡碎片", type: "bond", trust: 18, danger: 2, count: 2, iconPath: "./assets/item_icons/icon_soul_flag.png" },
  spirit_ember: { name: "幽灵火", type: "forbidden", trust: 24, danger: 6, count: 2, iconPath: "./assets/item_icons/icon_spirit.png" },
  ritual_gold: { name: "祭仪金章", type: "normal", trust: 12, danger: 1, count: 2, iconPath: "./assets/item_icons/icon_gold.png" },
  talisman_base: { name: "符纸基底", type: "balance", trust: 8, danger: -3, count: 2, iconPath: "./assets/item_icons/icon_talisman_base.png" },
  talisman_fire: { name: "炎咒符", type: "forbidden", trust: 26, danger: 7, count: 2, iconPath: "./assets/item_icons/icon_talisman_fire.png" },
  talisman_protect: { name: "护身符", type: "balance", trust: 16, danger: -8, count: 2, iconPath: "./assets/item_icons/icon_talisman_protect.png" },
  shadow_contract: { name: "诡影之契", type: "ticket", count: 15 },
  taboo_letter: { name: "禁忌之笺", type: "ticket", count: 10 }
};

const itemIconFallback = {
  old_photo: "./assets/item_icons/icon_book.png",
  cracked_lipstick: "./assets/item_icons/icon_talisman_fire.png",
  forbidden_incense: "./assets/item_icons/icon_spirit.png",
  balance_charm: "./assets/item_icons/icon_talisman_protect.png",
  paper_doll: "./assets/item_icons/icon_talisman_base.png",
  rust_key: "./assets/item_icons/icon_gold.png",
  rain_tape: "./assets/item_icons/icon_soul_flag.png",
  mirror_shard: "./assets/item_icons/icon_spirit.png",
  elevator_coin: "./assets/item_icons/icon_gold.png",
  red_thread: "./assets/item_icons/icon_talisman_fire.png",
  night_badge: "./assets/item_icons/icon_book.png",
  sealed_note: "./assets/item_icons/icon_talisman_base.png",
  shadow_contract: "./assets/item_icons/icon_soul_flag.png",
  taboo_letter: "./assets/item_icons/icon_talisman_fire.png"
};

function getItemIconPath(itemId) {
  return items[itemId]?.iconPath || itemIconFallback[itemId] || "./assets/item_icons/icon_book.png";
}

const typeLabel = {
  normal: "閫氱敤",
  bond: "缇佺粖",
  forbidden: "绂佸繉",
  balance: "鍒惰　",
  ticket: "鎶藉崱"
};

const pools = {
  standard: { name: "甯搁┗璇″奖鍗℃睜", ticket: "shadow_contract", ssrPity: 90, spPity: null },
  limited: { name: "闄愭椂绂佸繉UP鍗℃睜", ticket: "taboo_letter", ssrPity: 90, spPity: 180, up: "stair" }
};

const soulRoster = ["mirror", "rain", "elevator"];
const soulDisplay = {
  mirror: { name: "\u53f8\u5e10\u5a18\u00b7\u8d64\u5e54", rarity: "SSR", quote: "\u7ea2\u5e10\u4e4b\u4e0b\uff0c\u65ad\u6076\u7f18\uff0c\u62a4\u5b64\u9b42\u3002" },
  rain: { name: "\u4e5d\u697c\u5b88\u7ae5\u00b7\u963f\u96bc", rarity: "SR", quote: "\u62e8\u6d6a\u9f13\u4e00\u54cd\uff0c\u8ff7\u8def\u7a1a\u9b42\u5f52\u697c\u3002" },
  elevator: { name: "\u65e0\u9762\u884c\u8005\u00b7\u5bc2\u8a00", rarity: "SSR", quote: "\u65e0\u9762\u65e0\u8a00\uff0c\u53ea\u6e21\u5e72\u51c0\u4e4b\u9b42\u3002" }
};
const soulPortraits = {
  mirror: "./assets/souls/%E5%8F%B8%E5%B8%90%E5%A8%98%C2%B7%E8%B5%A4%E5%B9%94.png",
  rain: "./assets/souls/%E4%B9%9D%E6%A5%BC%E5%AE%88%E7%AB%A5.%E9%98%BF%E9%9A%BC.png",
  elevator: "./assets/souls/%E6%97%A0%E9%9D%A2%E8%A1%8C%E8%80%85%C2%B7%E5%AF%82%E8%A8%80.png"
};

const soulGiftItems = [
  "old_photo",
  "cracked_lipstick",
  "forbidden_incense",
  "balance_charm",
  "paper_doll",
  "rust_key",
  "rain_tape",
  "mirror_shard",
  "elevator_coin",
  "red_thread",
  "night_badge",
  "sealed_note"
];
const giftDisplay = {
  old_photo: { name: "\u65e7\u7167\u7247", icon: "\u7167", hint: "\u597d\u611f +8" },
  cracked_lipstick: { name: "\u88c2\u53e3\u5507\u818f", icon: "\u5507", hint: "\u597d\u611f +25" },
  forbidden_incense: { name: "\u7981\u9999", icon: "\u9999", hint: "\u597d\u611f +45" },
  balance_charm: { name: "\u5236\u8861\u7b26", icon: "\u7b26", hint: "\u4fb5\u8680 -20" },
  paper_doll: { name: "\u7f20\u7ebf\u7eb8\u5076", icon: "\u5076", hint: "\u597d\u611f +18" },
  rust_key: { name: "\u9508\u94a5\u5319", icon: "\u94a5", hint: "\u597d\u611f +14" },
  rain_tape: { name: "\u96e8\u58f0\u78c1\u5e26", icon: "\u58f0", hint: "\u597d\u611f +22" },
  mirror_shard: { name: "\u88c2\u955c\u7247", icon: "\u955c", hint: "\u597d\u611f +30" },
  elevator_coin: { name: "\u7535\u68af\u786c\u5e01", icon: "\u5e01", hint: "\u597d\u611f +16" },
  red_thread: { name: "\u7ea2\u7ebf", icon: "\u7ebf", hint: "\u597d\u611f +12" },
  night_badge: { name: "\u591c\u73ed\u5de5\u724c", icon: "\u724c", hint: "\u597d\u611f +28" },
  sealed_note: { name: "\u5c01\u5b58\u4fbf\u7b7e", icon: "\u7b7e", hint: "\u597d\u611f +20" }
};
const rewardItemPool = Object.keys(items).filter(id => items[id].type !== "ticket");

const affinityMaxLevel = 8;
const affinityExpPerLevel = 10000;
const affinityTitles = [
  "\u521d\u8bc6",
  "\u8bd5\u63a2",
  "\u7559\u610f",
  "\u56de\u5e94",
  "\u4fe1\u4efb",
  "\u5171\u9e23",
  "\u7f81\u7eca",
  "\u5171\u751f"
];

const soulLore = {
  mirror: {
    bondTitle: null,
    bond: 72,
    info: [
      "\u6027\u522b\uff1a\u5973",
      "\u6807\u7b7e\uff1a\u4ee3\u7801\u6b8b\u54cd / \u7acb\u9879\u5f02\u53d8 / \u5de5\u4f4d\u6e38\u9b42",
      "\u4f18\u70b9\uff1a\u80fd\u611f\u77e5\u9690\u85cf\u6743\u9650\u4e0e\u5f02\u5e38\u811a\u672c\uff0c\u5bf9\u672a\u5b8c\u6210\u9879\u76ee\u4e0e\u6d4b\u8bd5\u73af\u5883\u53cd\u5e94\u654f\u9510\u3002",
      "\u7f3a\u70b9\uff1a\u63a5\u8fd1\u9ad8\u9891\u62a5\u9519\u533a\u57df\u65f6\u4f1a\u5931\u63a7\uff0c\u5bb9\u6613\u88ab\u201c\u7ec8\u6b62\u8fdb\u7a0b\u201d\u6307\u4ee4\u5e72\u6270\u3002",
      "\u6765\u6e90\uff1a11F\u672a\u5f52\u6863\u9879\u76ee\u7ec4\u3002\u521d\u6b21\u8bb0\u5f55\uff1a2024.10.11\u3002",
      "\u8865\u5145\uff1a\u5979\u4f1a\u4e3b\u52a8\u8bb0\u4f4f\u9001\u793c\u7684\u4eba\uff0c\u4f46\u4e0d\u4f1a\u76f4\u63a5\u8868\u793a\u611f\u8c22\u3002\u5982\u679c\u8fde\u7eed\u5ffd\u89c6\u5979\uff0c\u955c\u9762\u91cc\u7684\u4eba\u5f71\u4f1a\u6bd4\u73b0\u5b9e\u5148\u4e00\u6b65\u505a\u51fa\u53cd\u5e94\u3002"
    ],
    bios: [
      { title: "\u7b2c\u4e00\u6b21\u56de\u5934", brief: "\u5979\u5728\u6d4b\u8bd5\u673a\u7684\u9ed1\u5c4f\u91cc\u7b49\u5230\u4e86\u7b2c\u4e00\u4e2a\u770b\u89c1\u5979\u7684\u4eba\u3002", body: "\u90a3\u5929\u665a\u4e0a\uff0c11F\u7684\u663e\u793a\u5668\u5168\u90e8\u7184\u706d\u3002\u53ea\u6709\u4e00\u53f0\u6d4b\u8bd5\u673a\u4eae\u7740\u9ed1\u5c4f\uff0c\u5c4f\u91cc\u6709\u4e00\u4e2a\u6bd4\u73b0\u5b9e\u6162\u534a\u62cd\u7684\u5973\u5b69\u3002\u5979\u6ca1\u6709\u8bf4\u8bdd\uff0c\u53ea\u662f\u628a\u624b\u6307\u653e\u5728\u5634\u8fb9\uff0c\u50cf\u5728\u63d0\u9192\u4ed6\uff1a\u4e0d\u8981\u628a\u770b\u89c1\u7684\u4e8b\u8bb0\u5230\u5468\u62a5\u91cc\u3002" },
      { title: "\u5df2\u5f52\u6863\u7684\u7a7a\u767d", brief: "\u5979\u7684\u540d\u5b57\u4ece\u6240\u6709\u6863\u6848\u91cc\u88ab\u5220\u6389\uff0c\u53ea\u7559\u4e0b\u4e00\u4e2a\u7a7a\u767d\u5de5\u53f7\u3002", body: "\u7a7a\u767d\u5de5\u53f7\u672c\u8be5\u4ee3\u8868\u79bb\u804c\uff0c\u4f46\u5979\u6bcf\u5929\u90fd\u4f1a\u5728\u955c\u9762\u4e2d\u51c6\u65f6\u5230\u5c97\u3002\u6709\u4eba\u8bd5\u56fe\u66ff\u5979\u8865\u4e0a\u59d3\u540d\uff0c\u7b2c\u4e8c\u5929\u90a3\u4e2a\u4eba\u7684\u5de5\u4f4d\u53ea\u5269\u4e0b\u4e00\u9762\u80cc\u5bf9\u5927\u5bb6\u7684\u5c0f\u955c\u5b50\u3002" },
      { title: "\u955c\u9762\u4e4b\u5916", brief: "\u597d\u611f\u8fbe\u5230\u66f4\u9ad8\u9636\u6bb5\u540e\u89e3\u9501\u3002", body: "\u5c1a\u672a\u89e3\u9501\u3002" },
      { title: "\u7ec8\u6b62\u8fdb\u7a0b", brief: "\u597d\u611f\u8fbe\u5230\u66f4\u9ad8\u9636\u6bb5\u540e\u89e3\u9501\u3002", body: "\u5c1a\u672a\u89e3\u9501\u3002" },
      { title: "\u4e0d\u8981\u76f8\u4fe1\u81ea\u5df1", brief: "\u597d\u611f\u8fbe\u5230\u66f4\u9ad8\u9636\u6bb5\u540e\u89e3\u9501\u3002", body: "\u5c1a\u672a\u89e3\u9501\u3002" }
    ]
  },
  rain: {
    bondTitle: null,
    bond: 48,
    info: [
      "\u6027\u522b\uff1a\u672a\u77e5",
      "\u6807\u7b7e\uff1a\u591c\u96e8 / \u697c\u9053\u56de\u97f3 / \u95e8\u7f1d\u4fe1\u606f",
      "\u4f18\u70b9\uff1a\u80fd\u591f\u5bdf\u89c9\u95e8\u540e\u7684\u6d3b\u52a8\u8f68\u8ff9\uff0c\u5bf9\u9501\u3001\u95e8\u724c\u548c\u6295\u8bc9\u5355\u6709\u5f02\u5e38\u654f\u611f\u3002",
      "\u7f3a\u70b9\uff1a\u88ab\u65e0\u4eba\u56de\u5e94\u7684\u5bc6\u95ed\u7a7a\u95f4\u5438\u5f15\uff0c\u60c5\u7eea\u6ce2\u52a8\u65f6\u4f1a\u4e0d\u65ad\u91cd\u590d\u6572\u95e8\u3002",
      "\u6765\u6e90\uff1a9F\u7a7a\u623f\u95f4\u6295\u8bc9\u6863\u6848\u3002\u521d\u6b21\u8bb0\u5f55\uff1a2024.10.18\u3002",
      "\u8865\u5145\uff1a\u5b83\u559c\u6b22\u88ab\u8bb0\u5f55\u7684\u4e1c\u897f\u3002\u7ed9\u5b83\u65e7\u7167\u7247\u65f6\uff0c\u697c\u9053\u91cc\u7684\u96e8\u58f0\u4f1a\u77ed\u6682\u53d8\u5c0f\u3002"
    ],
    bios: [
      { title: "\u7b2c\u4e00\u5c01\u6295\u8bc9", brief: "\u6bcf\u665a\u5341\u4e8c\u70b9\u540e\uff0c904\u95e8\u7f1d\u4e0b\u90fd\u4f1a\u88ab\u585e\u8fdb\u4e00\u5f20\u6295\u8bc9\u5355\u3002", body: "\u7b2c\u4e00\u5c01\u6295\u8bc9\u5355\u5199\u5f97\u5f88\u6e05\u695a\uff1a\u201c\u95e8\u5916\u6709\u4eba\u5b66\u6211\u6572\u95e8\u3002\u201d\u4f46\u76d1\u63a7\u91cc\u6ca1\u6709\u4eba\uff0c\u53ea\u6709\u4e00\u4e32\u6e7f\u811a\u5370\u5728\u95e8\u524d\u505c\u4e86\u4e09\u5206\u949f\u3002" },
      { title: "\u4e0d\u80fd\u6253\u5f00\u7684\u95e8", brief: "\u5b83\u5e76\u4e0d\u60f3\u8fdb\u6765\uff0c\u5b83\u53ea\u60f3\u786e\u8ba4\u91cc\u9762\u8fd8\u6709\u4eba\u3002", body: "\u697c\u9053\u4e2d\u7684\u6572\u95e8\u58f0\u4ece\u4e0d\u4f1a\u8d85\u8fc7\u4e09\u4e0b\u3002\u7b2c\u56db\u4e0b\u54cd\u8d77\u65f6\uff0c\u95e8\u540e\u7684\u4eba\u5c31\u4f1a\u5728\u5c4b\u5185\u542c\u89c1\u81ea\u5df1\u7684\u58f0\u97f3\uff1a\u201c\u6211\u56de\u6765\u4e86\u3002\u201d" },
      { title: "\u96e8\u591c\u540d\u5355", brief: "\u597d\u611f\u8fbe\u5230\u66f4\u9ad8\u9636\u6bb5\u540e\u89e3\u9501\u3002", body: "\u5c1a\u672a\u89e3\u9501\u3002" },
      { title: "\u95e8\u7f1d\u4e0b\u7684\u773c", brief: "\u597d\u611f\u8fbe\u5230\u66f4\u9ad8\u9636\u6bb5\u540e\u89e3\u9501\u3002", body: "\u5c1a\u672a\u89e3\u9501\u3002" },
      { title: "\u8bf7\u4e0d\u8981\u56de\u7b54", brief: "\u597d\u611f\u8fbe\u5230\u66f4\u9ad8\u9636\u6bb5\u540e\u89e3\u9501\u3002", body: "\u5c1a\u672a\u89e3\u9501\u3002" }
    ]
  },
  elevator: {
    bondTitle: null,
    bond: 55,
    info: [
      "\u6027\u522b\uff1a\u4e0e\u89c2\u6d4b\u8005\u4e00\u81f4",
      "\u6807\u7b7e\uff1a\u7535\u68af\u53cd\u5149 / \u5ef6\u8fdf\u52a8\u4f5c / \u697c\u5c42\u9519\u4f4d",
      "\u4f18\u70b9\uff1a\u53ef\u9884\u8b66\u5c06\u8981\u62b5\u8fbe\u7684\u9519\u8bef\u697c\u5c42\uff0c\u80fd\u5728\u95ed\u95e8\u524d\u6355\u6349\u5230\u4e0d\u5e94\u51fa\u73b0\u7684\u4eba\u5f71\u3002",
      "\u7f3a\u70b9\uff1a\u4f1a\u6a21\u4eff\u73a9\u5bb6\u7684\u8868\u60c5\u548c\u624b\u52bf\uff0c\u4e0e\u5176\u5bf9\u89c6\u8fc7\u4e45\u4f1a\u51fa\u73b0\u8bb0\u5fc6\u504f\u79fb\u3002",
      "\u6765\u6e90\uff1a\u7535\u68af\u7ef4\u4fee\u8bb0\u5f55\u7b2c13\u6b21\u8865\u5f55\u3002\u521d\u6b21\u8bb0\u5f55\uff1a2024.11.02\u3002",
      "\u8865\u5145\uff1a\u5b83\u4e0d\u559c\u6b22\u5236\u8861\u7b26\u3002\u5982\u679c\u88ab\u8feb\u7a33\u5b9a\uff0c\u5b83\u4f1a\u5728\u4e0b\u4e00\u6b21\u5f00\u95e8\u65f6\u628a\u73a9\u5bb6\u5e26\u5230\u4e00\u4e2a\u6ca1\u6709\u6309\u94ae\u7684\u697c\u5c42\u3002"
    ],
    bios: [
      { title: "\u591a\u51fa\u7684\u6309\u94ae", brief: "\u67d0\u6b21\u7ef4\u4fee\u540e\uff0c\u7535\u68af\u9762\u677f\u4e0a\u591a\u4e86\u4e00\u4e2a\u6ca1\u6709\u6570\u5b57\u7684\u6309\u94ae\u3002", body: "\u7ef4\u4fee\u5458\u8bf4\u90a3\u4e2a\u6309\u94ae\u53ea\u5728\u955c\u9762\u91cc\u53ef\u89c1\u3002\u53ef\u7b2c\u4e8c\u5929\uff0c\u4ed6\u7684\u5de5\u724c\u51fa\u73b0\u5728\u7535\u68af\u4e95\u5e95\uff0c\u65f6\u95f4\u5361\u5728\u51cc\u6668\u4e24\u70b9\u5341\u4e09\u5206\u3002" },
      { title: "\u4f60\u6bd4\u4f60\u5148\u5230", brief: "\u53cd\u5149\u91cc\u7684\u4eba\u603b\u662f\u5148\u4e00\u6b65\u8d70\u51fa\u7535\u68af\u3002", body: "\u6709\u4eba\u5728\u7535\u68af\u95e8\u6253\u5f00\u524d\u770b\u89c1\u81ea\u5df1\u5df2\u7ecf\u7ad9\u5728\u8d70\u5eca\u5c3d\u5934\u3002\u90a3\u4e2a\u201c\u81ea\u5df1\u201d\u56de\u5934\u770b\u4ed6\uff0c\u50cf\u662f\u5df2\u7ecf\u7b49\u5f97\u4e0d\u8010\u70e6\u3002" },
      { title: "\u53ea\u4e0b\u884c", brief: "\u597d\u611f\u8fbe\u5230\u66f4\u9ad8\u9636\u6bb5\u540e\u89e3\u9501\u3002", body: "\u5c1a\u672a\u89e3\u9501\u3002" },
      { title: "\u95ed\u95e8\u540e\u7684\u624b", brief: "\u597d\u611f\u8fbe\u5230\u66f4\u9ad8\u9636\u6bb5\u540e\u89e3\u9501\u3002", body: "\u5c1a\u672a\u89e3\u9501\u3002" },
      { title: "\u4e0d\u5b58\u5728\u7684\u5230\u8fbe", brief: "\u597d\u611f\u8fbe\u5230\u66f4\u9ad8\u9636\u6bb5\u540e\u89e3\u9501\u3002", body: "\u5c1a\u672a\u89e3\u9501\u3002" }
    ]
  }
};

Object.assign(soulLore, {
  mirror: {
    bondTitle: null,
    bond: 72,
    info: [
      "\u6027\u522b\uff1a\u5973",
      "\u6807\u7b7e\uff1a\u51a5\u5a5a\u53f8\u638c\u8005 / \u7ea2\u5e10\u9634\u7075 / \u6d3b\u846c\u6028\u9b42",
      "\u4f18\u70b9\uff1a\u6781\u5ea6\u62a4\u5f31\uff0c\u6267\u638c\u9634\u9633\u5a5a\u5951\uff0c\u7ea2\u7ebf\u53ef\u62a4\u9b42\u53ef\u6210\u5584\u7f18\u3002",
      "\u7f3a\u70b9\uff1a\u88ab\u89e6\u53d1\u201c\u6d3b\u57cb/\u903c\u5a5a\u201d\u8bb0\u5fc6\u65f6\u5bb9\u6613\u5931\u63a7\uff0c\u7ea2\u5e10\u53d7\u635f\u4f1a\u660e\u663e\u526a\u5f31\u3002",
      "\u5371\u9669\u7b49\u7ea7\uff1a\u8f83\u9ad8",
      "\u6765\u6e90\uff1a\u6028\u6c14\u5316\u7075\uff0c\u53d7\u9634\u53f8\u6555\u5c01\u6267\u638c\u51a5\u5a5a\u53f8\u5e10\u3002"
    ],
    bios: [
      { title: "\u7ea2\u68fa", brief: "\u5341\u4e03\u5c81\u88ab\u6d3b\u57cb\u914d\u9634\u5a5a\uff0c\u5728\u5730\u5e95\u7acb\u4e0b\u8840\u8a93\u3002", body: "\u5979\u66fe\u662f\u5b98\u5bb6\u4e4b\u5973\uff0c\u5374\u5728\u5192\u540d\u201c\u5b88\u793c\u201d\u4e2d\u88ab\u5c01\u5165\u7ea2\u68fa\u3002\u68fa\u677f\u9489\u843d\u4e0e\u9ec4\u571f\u6389\u843d\u4e4b\u58f0\uff0c\u6210\u4e3a\u5979\u6b64\u540e\u6240\u6709\u6740\u4f10\u7684\u8d77\u70b9\u3002" },
      { title: "\u51a5\u5a5a", brief: "\u53f8\u5e10\u4e4b\u4e0b\u65ad\u7edd\u4ee5\u5192\u4e4b\u540d\u5bb3\u547d\u7684\u4ea4\u6613\u3002", body: "\u5979\u8d9f\u9634\u98ce\u5230\u8363\u574f\u4e4b\u5730\uff0c\u7834\u68fa\u6563\u7b26\uff0c\u5c06\u4f5c\u6076\u8005\u9b42\u9b44\u62d8\u5165\u9634\u57df\uff0c\u4ee5\u540c\u6837\u7684\u5bc2\u6697\u4e0e\u7a92\u606f\u507f\u8fd8\u539f\u7f6a\u3002" },
      { title: "\u7ea2\u7ebf", brief: "\u4e0d\u6b62\u5ba1\u5224\uff0c\u4e5f\u6210\u5168\u771f\u60c5\u4e4b\u9b42\u3002", body: "\u5979\u4e3a\u4e00\u5bf9\u751f\u6b7b\u79bb\u6563\u7684\u592b\u5987\u7cfb\u4e0a\u7ea2\u7ebf\uff0c\u8ba9\u4e24\u9053\u6f02\u6cca\u4e4b\u9b42\u5728\u9634\u591c\u91cc\u91cd\u901d\uff0c\u4ece\u6b64\u660e\u767d\u201c\u606f\u201d\u4e0d\u7b49\u4e8e\u201c\u6050\u201d\u3002" },
      { title: "\u94dc\u94c3", brief: "\u4e0e\u65e0\u9762\u884c\u8005\u7684\u65e0\u58f0\u5951\u7ea6\u3002", body: "\u9b3c\u7fa4\u6495\u88c2\u7ea2\u5e10\u4e4b\u591c\uff0c\u65e0\u9762\u884c\u8005\u6301\u5e61\u800c\u81f3\u3002\u5979\u5c06\u9547\u715e\u94dc\u94c3\u4ea4\u4ed8\u4e8e\u4ed6\uff0c\u7ea6\u5b9a\u4e00\u54cd\u5373\u81f3\u3002" },
      { title: "\u7ea2\u5e54", brief: "\u5979\u7684\u68fa\u6901\uff0c\u4e5f\u662f\u5979\u7684\u94e0\u7532\u3002", body: "\u767e\u5e74\u95f4\uff0c\u5979\u5728\u9634\u9633\u8fb9\u754c\u5b88\u62a4\u88ab\u903c\u8feb\u8005\u4e0e\u5b64\u9b42\uff0c\u5e76\u4ee5\u5f2f\u94a9\u4e0e\u53f8\u5e10\u5b8c\u6210\u5bf9\u7f6a\u7684\u5ba1\u5224\u3002" }
    ]
  },
  rain: {
    bondTitle: null,
    bond: 64,
    info: [
      "\u6027\u522b\uff1a\u7537\uff08\u5b69\u7ae5\u5f62\u6001\uff09",
      "\u6807\u7b7e\uff1a\u50c0\u5121\u7ae5\u9b42 / \u6789\u6b7b\u5b69\u7ae5\u5e87\u62a4\u8005 / \u6028\u6c14\u805a\u5408\u4f53",
      "\u4f18\u70b9\uff1a\u5bf9\u5b69\u7ae5\u7075\u9b42\u6781\u5ea6\u6e29\u67d4\uff0c\u5728\u4e5d\u697c\u9b3c\u697c\u8303\u56f4\u5185\u5bf9\u90aa\u672f\u4e0e\u6076\u9b42\u5177\u5907\u7edd\u5bf9\u538b\u5236\u529b\u3002",
      "\u7f3a\u70b9\uff1a\u89e6\u53d1\u8650\u7ae5\u8bb0\u5fc6\u4f1a\u66b4\u8d70\uff1b\u6728\u5076\u8eaf\u4f53\u6015\u706b\u3001\u6015\u9547\u9b42\u7b26\u4e0e\u9ad8\u6e29\u6cd5\u5668\u3002",
      "\u5371\u9669\u7b49\u7ea7\uff1a\u8f83\u9ad8",
      "\u6765\u6e90\uff1a\u9634\u95f4\u4e5d\u5c42\u9b3c\u697c\u5b88\u697c\u7075\u3002"
    ],
    bios: [
      { title: "\u69ab\u9489", brief: "\u4ece\u88ab\u5356\u6389\u7684\u5b69\u5b50\uff0c\u53d8\u6210\u88ab\u7ea2\u7ebf\u64cd\u63a7\u7684\u6d3b\u50c0\u5121\u3002", body: "\u4e03\u5c81\u90a3\u5e74\uff0c\u4ed6\u88ab\u672f\u58eb\u5310\u89e3\u5173\u8282\u3001\u7f1d\u6b7b\u53e3\u820c\uff0c\u9aa8\u8089\u4e0e\u6728\u69ab\u76f8\u63a5\uff0c\u4ece\u6b64\u53ea\u80fd\u6210\u4e3a\u4ed6\u4eba\u624b\u4e2d\u51f6\u5668\u3002" },
      { title: "\u5a03\u5a03", brief: "\u6000\u4e2d\u7684\u5e03\u5076\uff0c\u662f\u7b2c\u4e00\u4e2a\u6ca1\u80fd\u6551\u4e0b\u7684\u5b69\u5b50\u3002", body: "\u4ed6\u5c06\u6797\u4e2d\u6bcf\u4e00\u7f15\u6b8b\u9b42\u90fd\u7f1d\u5165\u5c0f\u5076\uff0c\u4e00\u58f0\u58f0\u94dc\u94c3\u4e0d\u662f\u5a01\u5413\uff0c\u800c\u662f\u88ab\u4e22\u4e0b\u7684\u7ae5\u9b42\u5728\u627e\u56de\u5f52\u8def\u3002" },
      { title: "\u65ad\u7ef3", brief: "\u4ed6\u626f\u65ad\u7ea2\u7ef3\uff0c\u53cd\u624b\u7ec8\u7ed3\u517b\u9b3c\u672f\u58eb\u3002", body: "\u767e\u9b3c\u5a74\u715e\u796d\u4eea\u4e4b\u591c\uff0c\u4ed6\u6447\u8d77\u62e8\u6d6a\u9f13\uff0c\u8ba9\u6240\u6709\u88ab\u5c01\u9b42\u5b69\u5b50\u51b2\u7834\u67b7\u9501\uff0c\u7ed3\u675f\u4e86\u5341\u5e74\u7684\u50c0\u5121\u547d\u8fd0\u3002" },
      { title: "\u4e5d\u697c", brief: "\u65e0\u6cd5\u5165\u8f6e\u56de\uff0c\u88ab\u6555\u5c01\u4e3a\u4e5d\u697c\u5b88\u7ae5\u3002", body: "\u4ed6\u4e0e\u4e5d\u5341\u4e5d\u9053\u7a1a\u9b42\u7f20\u7ed5\u4e3a\u4e00\uff0c\u7ea2\u7ef3\u4ece\u201c\u63a7\u5236\u201d\u53d8\u6210\u201c\u5f15\u8def\u201d\uff0c\u62e8\u6d6a\u9f13\u4ece\u201c\u6740\u4eba\u201d\u53d8\u6210\u201c\u5f15\u9b42\u201d\u3002" },
      { title: "\u5b88\u7ae5", brief: "\u4e09\u767e\u5e74\u95f4\uff0c\u4ed6\u53ea\u60e9\u7f5a\u4f24\u5bb3\u5b69\u7ae5\u7684\u4eba\u3002", body: "\u4ed6\u548c\u53f8\u5e10\u5a18\u3001\u65e0\u9762\u884c\u8005\u5728\u9634\u9633\u8fb9\u754c\u5f7c\u6b64\u7167\u5e94\uff0c\u7528\u5b88\u671b\u66ff\u4ee3\u4e86\u590d\u4ec7\uff0c\u4e5f\u7ed9\u4e86\u7a1a\u9b42\u4e00\u4e2a\u5bb6\u3002" }
    ]
  },
  elevator: {
    bondTitle: null,
    bond: 68,
    info: [
      "\u6027\u522b\uff1a\u7537",
      "\u6807\u7b7e\uff1a\u65e0\u9762\u9634\u5dee / \u51a5\u9014\u5f15\u9b42\u4eba / \u504f\u6267\u5b64\u51b7",
      "\u4f18\u70b9\uff1a\u715e\u6c14\u5185\u655b\uff0c\u5ba1\u5224\u529b\u5f3a\uff1b\u5bf9\u6d01\u51c0\u9b42\u9b44\u4e0e\u5e7c\u9b42\u6781\u5ea6\u53ef\u9760\uff0c\u51fa\u624b\u679c\u51b3\u3002",
      "\u7f3a\u70b9\uff1a\u65e0\u53e3\u4e0d\u80fd\u8a00\uff0c\u6c9f\u901a\u6210\u672c\u9ad8\uff1b\u88ab\u63ed\u5f00\u906e\u9762\u5e03\u65f6\u5bb9\u6613\u5931\u63a7\u3002",
      "\u5371\u9669\u7b49\u7ea7\uff1a\u9ad8",
      "\u6765\u6e90\uff1a\u9634\u53f8\u6555\u5c01\u65e0\u9762\u884c\u8005\uff0c\u884c\u8d70\u9634\u9633\u5939\u7f1d\u3002"
    ],
    bios: [
      { title: "\u6d4a\u6cb3", brief: "\u6d4a\u6c34\u65ad\u5d16\u4e4b\u591c\uff0c\u4ed6\u4e3a\u8fd8\u4eba\u60c5\u503a\u800c\u4ea1\u3002", body: "\u4ed6\u672c\u662f\u6e58\u897f\u5c71\u4e2d\u5f15\u8def\u4eba\uff0c\u56e0\u6551\u4e00\u540d\u91c7\u836f\u5973\u5b50\u88ab\u6697\u6cb3\u5377\u8d70\uff0c\u9b42\u9b44\u5728\u9634\u9633\u5939\u7f1d\u91cd\u9192\uff0c\u88ab\u5c01\u4e3a\u65e0\u9762\u884c\u8005\u3002" },
      { title: "\u7a1a\u9b42", brief: "\u4ed6\u5e76\u975e\u6162\u60b2\uff0c\u53ea\u504f\u7231\u6d01\u51c0\u4e4b\u9b42\u3002", body: "\u51a5\u9014\u53e4\u9053\u4e0a\uff0c\u4ed6\u4ee5\u5f15\u9b42\u5e61\u7b3c\u7f69\u5e7c\u9b42\uff0c\u8fde\u65a9\u997f\u9b3c\uff0c\u4e09\u65e5\u4e0d\u79bb\uff0c\u53ea\u4e3a\u8ba9\u7a7a\u6d01\u4e4b\u9b42\u4e0d\u88ab\u6c61\u79fd\u3002" },
      { title: "\u7aa5\u9762", brief: "\u7a83\u89c6\u4ed6\u9762\u5bb9\u8005\uff0c\u5fc5\u76f4\u89c6\u81ea\u8eab\u6050\u60e7\u3002", body: "\u8499\u9762\u4e4b\u4e0b\u662f\u4e00\u9762\u9634\u955c\uff0c\u6620\u7167\u4ea1\u9b42\u6700\u4e0d\u6562\u770b\u89c1\u7684\u6b7b\u72b6\u3002\u72c2\u59c4\u50ad\u8d8a\u4e4b\u9b42\uff0c\u7ec8\u5c06\u88ab\u5f15\u9b42\u5e61\u6536\u62bc\u6c89\u6ca6\u3002" },
      { title: "\u65e7\u4eba", brief: "\u767e\u5e74\u7b49\u5019\uff0c\u53ea\u4e3a\u7ed9\u53e4\u65e7\u4eba\u60c5\u4e00\u4e2a\u4ea4\u4ee3\u3002", body: "\u4ed6\u66fe\u7b49\u90a3\u540d\u91c7\u836f\u5973\u5b50\u7684\u9b42\u9b44\u8db3\u8db3\u767e\u5e74\uff0c\u4e0d\u4e3a\u60c5\u7231\uff0c\u53ea\u56e0\u201c\u8fd8\u503a\u201d\u4e8c\u5b57\u3002\u504f\u6267\u4e0e\u51b7\u6de1\uff0c\u5728\u4ed6\u8eab\u4e0a\u540c\u65f6\u5171\u5b58\u3002" },
      { title: "\u504f\u79c1", brief: "\u4ed6\u4ece\u4e0d\u666e\u6e21\uff0c\u53ea\u5bf9\u503c\u5f97\u4e4b\u9b42\u7834\u4f8b\u3002", body: "\u4ed6\u66fe\u4ee5\u767e\u5e74\u529f\u5fb7\u6362\u4e00\u7f15\u6e05\u767d\u9b42\u9b44\u3002\u4ed6\u627f\u8ba4\u81ea\u5df1\u51b7\u6f20\u3001\u8bb0\u4ec7\u3001\u504f\u6267\uff0c\u4f46\u4e5f\u56e0\u6b64\u6210\u4e3a\u9634\u9633\u5939\u7f1d\u4e2d\u6700\u7a33\u7684\u63a5\u5f15\u8005\u3002" }
    ]
  }
});


const soulBiographyArchive = {
  "rain": [
    {
      "title": "榫钉",
      "brief": "我没有名字，他们都叫我阿榫。我不是天生的木头人，七岁那年，荒年饿死了。",
      "body": "我没有名字，他们都叫我阿榫。我不是天生的木头人，七岁那年，荒年饿死了爹娘，我被两升糙米卖给了城南的陈木匠。\n街坊都说他做的木偶活灵活现，能哭能笑，却没人知道，他做的从来不是死物。\n他是养鬼的术士，用孩童的骨头做榫，皮肉做面，魂魄做芯，炼成能勾魂索命的活傀儡。我是他最满意的作品。\n因为我听话，饿了不会哭，打了不会闹，魂魄干净得像一张白纸。那天深夜，他把我绑在浸过桐油的木架上，用烧红的铜钉，一根一根钉进我的关节。\n膝盖、手肘、肩膀、脖颈，每一根钉子落下，都带着皮肉烧焦的臭味。\n我疼得浑身抽搐，却发不出一点声音 —— 他早就用麻线缝死了我的嘴，割掉了半截舌头。他说，傀儡不需要说话，只需要听话。\n他敲碎我的骨头，换成打磨光滑的樟木榫卯；剥下我的皮肤，蒙在刻好的木胎上；用浸过黑狗血的红绳，穿进我的筋脉，一头系在我的手腕脚踝，一头攥在他手里。最后，他用朱砂在我的额头上画了一道镇魂符，将我的魂魄死死锁在这具冰冷的躯壳里。\n“从今往后，你就是我的傀儡。我让你生，你便生；我让你死，你便死。”\n我看着自己变成了一个木头人，关节一动就发出 “咯吱咯吱” 的声响，皮肤冰冷僵硬，没有一丝温度。我没有眼泪，也没有悲伤，因为傀儡是没有情绪的。我只是站在那里，等着主人的指令。\n从那天起，我成了陈木匠的杀人工具。他牵着红绳，操控着我去勾魂，去索命，去给那些达官贵人养小鬼。\n我走过无数深宅大院，见过无数和我一样的孩子，他们有的被活活闷死在棺木里，有的被挖走了心脏炼成丹药，有的被封在木偶里永世不得超生。而我，只是一个没有灵魂的傀儡，麻木地执行着主人的命令，身上的铜铃随着动作叮当作响，像在为那些枉死的人送葬。"
    },
    {
      "title": "娃娃",
      "brief": "我怀里永远抱着一个娃娃。那不是我的玩具，是我第一个没能救下的孩子。她。",
      "body": "我怀里永远抱着一个娃娃。那不是我的玩具，是我第一个没能救下的孩子。她叫阿禾，比我小两岁，是陈木匠抓来的下一个傀儡材料。她很怕生，总是躲在柴房的角落里哭，只有我靠近的时候，她才会怯生生地伸出小手，拉着我木头做的衣角。\n陈木匠要把她炼成最凶的血煞童鬼，需要在她活着的时候，将她的魂魄一点点抽出来，封进用她骨灰烧制的木偶里。那天，他把阿禾绑在和我当年一样的木架上，手里拿着沾了鸡血的镇魂符，一步步走向她。阿禾看着我，眼里满是恐惧和哀求，她张着嘴，想说什么，却只能发出呜呜的气音。\n那一刻，我木头做的胸腔里，竟然传来了一丝尖锐的刺痛。我猛地扯断了手腕上的红绳，扑向陈木匠。\n可我终究只是个被符咒控制的傀儡，他轻轻一挥手，一道黄符就打在我的胸口，我浑身僵硬，重重摔在地上动弹不得。我眼睁睁看着他将阿禾的魂魄抽出来，封进了那个小小的木偶里。阿禾的眼睛永远闭上了，木偶的脸上，还留着一滴未干的血泪。\n陈木匠把那个木偶扔给我，说：“以后，她就是你的伴。好好看着她，别让她跑了。”我抱着那个冰冷的木偶，能感觉到她的魂魄在里面颤抖，充满了恐惧和绝望。我用木头做的手指，轻轻抚摸着她的头发，关节发出咯吱的声响。从那天起，我怀里就再也没有空过。\n陈木匠操控着我，害死了一个又一个孩子。每害死一个，我就会偷偷用剩下的木料，刻一个小小的木偶，把他们的魂魄封在里面。\n我的怀里换了一个又一个娃娃，有的哭，有的笑，有的沉默不语。他们都是被人间抛弃的孩子，而我，是他们唯一的依靠。我身上的红绳越来越多，铜铃也越来越多，每一根红绳，都系着一个枉死的童魂；每一声铜铃，都是一个孩子的哭泣。"
    },
    {
      "title": "断绳",
      "brief": "我做了十年的傀儡。",
      "body": "我做了十年的傀儡。\n十年里，我杀了无数人，也偷偷放走了十几个年纪太小的孩子。\n我会在陈木匠不注意的时候，给那些被封在木偶里的魂魄喂一点阳气，让他们不至于魂飞魄散。我以为我会永远这样麻木地活下去，直到陈木匠要炼 “百鬼婴煞” 的那一天。\n他抓了九十九个未满三岁的孩童，关在黑陶坛子里，要将他们的魂魄全部炼化，炼成天下最凶的邪煞，用来称霸阴阳界。\n那些孩子被关在坛子里，日夜啼哭，声音凄厉得让人头皮发麻。我站在院子里，听着那些哭声，木头做的心脏，第一次燃起了熊熊的怒火。\n那天夜里，陈木匠正在祭坛上做法。他念着晦涩的咒语，手里的红绳紧紧牵着我，要我将那些孩子的魂魄全部吸出来。\n我站在那里，一动不动。“废物！还不动手！” 陈木匠怒吼着，用力拉扯红绳，符咒的力量顺着红绳钻进我的身体，疼得我关节咔咔作响。我抬起头，看着他，木头做的眼睛里，第一次有了光芒。我猛地发力，扯断了身上所有的红绳，红绳断裂的声音，像无数根骨头同时折断。\n我拿起身边的拨浪鼓 —— 那是陈木匠用来操控我的法器，此刻却成了我复仇的武器。我摇响了拨浪鼓，所有被封在木偶里的童魂，全部冲了出来。他们围着陈木匠，撕咬着他的皮肉，啃食着他的魂魄。\n陈木匠发出凄厉的惨叫，他怎么也想不到，自己亲手炼成的傀儡，竟然会反抗他。我走到他面前，举起拨浪鼓，狠狠砸在他的头上。\n“傀儡，也会疼的。”\n这是我这辈子说的第一句话，也是最后一句话。\n陈木匠死了。可我也被他临死前打出的一道灭魂符，打得魂飞魄散。我的木头躯壳碎成了无数片，那些童魂的魂魄，也跟着我一起消散在风里。我以为我终于解脱了，终于可以不用再做一个没有灵魂的傀儡了。"
    },
    {
      "title": "九楼",
      "brief": "我没有消散。",
      "body": "我没有消散。\n我的魂魄和九十九个童魂的魂魄缠在一起，变成了一团巨大的怨气，在阴阳交界徘徊不散。阴司的判官来了，他看着我，叹了口气。\n他说，我怨气太重，杀了太多人，无法入轮回；可我心存善念，救了无数孩子，也不能打入十八层地狱。\n于是，他封我为 “九楼守童”，让我镇守阴间的九层鬼楼。九层鬼楼，是专门收容未满十二岁枉死孩童的地方。\n这里的孩子，有的是饿死的，有的是病死的，有的是被害死的。他们怨气深重，无法入轮回，也不受普通阴差管束。普通阴差一靠近，就会被他们的怨气反噬，只有我，能接近他们。\n阴司给了我一具新的躯壳，还是原来的样子：凌乱的黑发，破旧的灰布长衫，关节处的裂痕，身上缠绕的红绳，怀里抱着的阿禾木偶。只是这一次，红绳不再是用来操控我的，而是用来牵引那些迷路的童魂；铜铃不再是用来锁魂的，而是用来呼唤那些躲在角落里的孩子；拨浪鼓不再是杀人的工具，而是引魂的法器。我站在九层鬼楼的飞檐下，摇着拨浪鼓。\n“咚咚咚 ——”拨浪鼓的声音，在空旷的鬼楼里回荡。那些躲在墙角、床底、井里的枉死童魂，听到声音，就会一个个走出来，怯生生地看着我。我会伸出手，把他们抱进怀里，放进我刻的小木偶里，然后带着他们，走进九层鬼楼。这里是他们的家。我会给他们讲故事，会陪他们玩捉迷藏，会告诉他们，再也没有人会伤害他们了。\n我见过无数可怜的孩子：有被继母推下井的，有被爹娘卖掉换钱的，有在战乱中被乱箭射死的。他们都很怕生，只有看到我怀里的阿禾，才会放下戒备，慢慢靠近我。我还是一个傀儡，可我现在是自己的主人。没有人再能操控我，没有人再能伤害我和我的孩子们。我守着这九层鬼楼，守着这些被人间抛弃的童年，再也不让他们像我一样，在黑暗里孤独地哭泣。"
    },
    {
      "title": "守童",
      "brief": "我在九层鬼楼，已经守了三百年了。",
      "body": "我在九层鬼楼，已经守了三百年了。\n三百年里，我送走了无数孩子，也迎来了无数孩子。我的怀里，永远抱着一个娃娃；我的手里，永远摇着拨浪鼓。我身上的关节，还是会发出 “咯吱咯吱” 的声响；我脸上的裂痕，还是会渗出淡淡的朱砂血痕。\n我认识了两个朋友。一个是无面行者阿岭，他接引成人亡魂，每次遇到迷路的童魂，都会送到我这里来。他话很少，总是沉默地站在那里，放下孩子就走。\n可我知道，他是个好人。他会偷偷给我带一些阳间的木头，让我刻更多的木偶，给那些新来的孩子。另一个是司帐娘赤幔，她执掌冥婚。她从来不会为难我接引的孩子，有时候还会给那些孤苦伶仃的童魂，牵一根小小的红线，让他们在阴间有个伴。她的红帐很温暖，孩子们都喜欢躲在她的帐子后面玩。\n世人都怕我，说我是九楼的童煞，是吃人的恶鬼。可他们不知道，我从来没有害过一个好人。\n我只会惩罚那些伤害孩子的人：那些贩卖孩童的人贩子，那些虐待孩子的父母，那些用孩子炼邪术的术士。\n我会把他们的魂魄，封在最丑陋的木偶里，让他们永世承受被操控、被抛弃的痛苦。\n我没有自己的魂魄，我是无数枉死童魂的集合体。他们的痛苦，就是我的痛苦；他们的快乐，就是我的快乐。我活着的意义，就是守着这些孩子，不让他们再受一点伤害。有时候，我会坐在九层鬼楼的屋檐上，看着人间的方向。我会想起七岁那年，我还是一个活生生的孩子，会光着脚在田埂上跑，会摘路边的野花。可那已经是很久很久以前的事了。\n晚风拂过，拨浪鼓轻轻摇晃，发出清脆的声响。怀里的阿禾，安静地靠着我的胸口。我低头，看着她，轻轻笑了。\n没关系。\n只要这些孩子能有一个家，只要他们不用再做被人操控的傀儡，我永远做一个木头人，也没关系。"
    }
  ],
  "mirror": [
    {
      "title": "红棺",
      "brief": "红，从来都不是喜。",
      "body": "红，从来都不是喜。\n至少于我而言，红色是棺木内壁冰冷的漆，是钉穿木板的锈钉，是我十七岁那年，被活埋入土的绝望。我曾是寻常官家女儿，针线刺绣，眉眼温顺，总以为大红嫁衣是女子一生最好的归宿。直到那一身喜服裹住我的身子，我才明白，有些红，是给死人穿的。\n婚约既定，媒妁为凭。我未曾见过我的未婚夫，只听闻他是盐商之子，锦衣玉食。可婚期未至，一场急病便夺走了他的性命。原本该烧掉的婚书，被两家人死死按住。为了门第脸面，为了互通的利益，他们决定，让活着的我，去陪葬死去的他。\n我跪在冰冷的青砖上，哭到嗓子沙哑。我拉扯着爹娘的衣袖，卑微乞求，可他们眼神淡漠，像在看一件无关紧要的摆件。夜深之后，一碗汤药被强行灌入我喉间，苦涩的药液麻痹四肢，我浑身发软，连挣扎的力气都尽数消散。\n大婚那日，没有唢呐震天，没有宾客满堂。荒山孤坟旁，四口面无表情的轿夫抬着我，周遭死寂得可怕。沉重的红盖头遮住我的视线，我只能闻到刺鼻的胭脂香，混着山间潮湿的泥土腥气。我被推入一具刷满红漆的薄棺，棺内寒气刺骨，一旁僵硬的男尸，贴着我的衣袖，冰冷触感令人作呕。\n哐当一声，棺盖闭合。\n铁锤落下，铁钉入木，沉闷的敲击声一下下砸在我的心上。黑暗吞噬了所有光亮，密闭的棺木里，空气越来越稀薄。我疯狂抬手拍打木板，指甲断裂，鲜血顺着木纹蜿蜒流淌。外面传来人声谈笑，他们说新娘子腼腆害羞，闹一闹便安分了。\n黄土簌簌落下，掩埋了整具棺木。地底漆黑潮湿，腐朽气味死死裹住我。濒死的窒息感中，我咬破舌尖，滚烫的鲜血沾染贴身帷幔。我在心底立下血誓，若能化灵，必掌阴阳婚契，撕碎所有借礼法行凶的肮脏交易，让贪利害命之人，皆入无间炼狱。\n再次睁眼，黑暗散尽。红帐随风飘摇，铜铃悬于帐前，轻晃无声。我立于阴阳边界，手握一柄寒光凛冽的牵魂钩。阴司判我为冥婚司帐，执掌人间阴婚秩序。\n世间再无那个穿红待嫁的少女。\n从此红帐为衣，弯钩为刃，我是赤幔，行走阴阳，冷眼观尽人间荒唐。"
    },
    {
      "title": "冥婚",
      "brief": "世人总爱美化冥婚。",
      "body": "世人总爱美化冥婚。\n他们说，死后结缘，魂魄相守，是孤独亡魂最好的归宿。可只有我清楚，这看似浪漫的名头之下，藏着多少愚昧与恶。冥婚本是古时安抚孤魂的礼制，时至今日，早已沦为恶人敛财害命的工具。而我，便是斩断这些罪孽的执刀人。\n我的帐前挂着两串铜铃，左铃悯孤魂，右铃警恶人。右铃急促震颤的那一夜，阴风穿林，我知晓，阳间又有人造下孽债。\n山下村落里，藏着一个心术不正的道士。他游走乡野，靠着一张巧舌蛊惑村民，谎称冥婚能旺家兴财、庇佑子孙。贫苦乡民愚昧无知，被利益蒙蔽双眼，不惜卖掉亲生女儿，将鲜活少女婚配给荒山野岭的无名枯骨。\n十五岁的阿翠，便是其中最可怜的牺牲品。她眉目干净，性情怯懦，却被亲生父亲以几两碎银卖掉命格。察觉异样的深夜，她赤脚出逃，却被狠心的父亲拖拽捆绑，锁进不见天光的柴房，静待吉日活埋入坟。\n我踏阴风而至时，夜色浓稠如墨。荒坟之中，白烛摇曳，昏黄火光映着道士狰狞的侧脸。符咒漫天飞舞，晦涩咒音回荡山野，薄薄的棺木里，少女蜷缩身躯，浑身颤抖，泪水打湿了粗糙的麻衣。那绝望无助的模样，像极了当年困在红棺里的我。\n红帐骤然展开，阴风卷起满地枯叶，烛火瞬间化作诡异的青白色。道士骤然回头，看见帷幔中若隐若现的我，双腿一软，直直跪倒在泥泞之中，慌乱磕头求饶，口中不停念着赎罪经文。\n我无意听他虚伪忏悔。牵魂钩寒光一闪，冰冷钩尖锁住他作恶的魂魄。我将他打入荒坟之下，令他永世陪伴枯骨，尝尽地底阴冷孤寂，偿还他亲手促成的每一场害人冥婚。\n我抬手破开棺木，将阿翠飘散的魂魄归位，抹去这段刺骨的惨痛记忆。夜风之中，我目送懵懂的少女奔向远方，逃离冰冷的故土。\n世人皆惧我阴寒冷酷，骂我煞气逼人。可无人知晓，我所有的狠戾，皆源自地底那一段窒息的绝望。我守红帐，断恶缘，只为护住那些无辜之人，不让她们重蹈我的覆辙。"
    },
    {
      "title": "红线",
      "brief": "旁人以为，我手中红线，只为捆锁魂魄。",
      "body": "旁人以为，我手中红线，只为捆锁魂魄。\n可只有我明白，这细细一缕红绳，是阴阳两界，仅存的温柔。我见惯了恶意丛生的冥婚，见惯了利益交换下的生葬惨剧，一度以为，世间姻缘，无论人鬼，皆藏龌龊。直到那一夜，左铃轻响，我才知晓，执念深情，从不分生死。\n那是一个寒冬深夜，霜雾浓重，阴风刺骨。一名布衣女子的魂魄，缓缓飘至我的红帐之前。她衣衫单薄，眉眼憔悴，发丝凌乱地贴在惨白的脸颊上，眼底没有恶鬼的戾气，只剩化不开的相思与悲凉。\n她生前嫁给一名戍边士兵，二人清贫度日，却恩爱相守。战火燃起，丈夫奔赴关外战场，从此杳无音信。她苦守故土十年，日夜期盼爱人归来，最终只等来一句战死沙场的消息。边关苦寒，尸骨无存，连一方坟冢都未曾留下。\n人间再无相见之日，她便在二人成婚的祠堂之中，自缢而亡。魂魄离体之时，她心中别无怨念，只求在阴司之内，与丈夫魂魄相逢，哪怕永世不入轮回，也愿相伴相守。\n我翻看阴司名册，在万千孤魂之中，寻到那名士兵的魂魄。他战死沙场，忠魂不灭，本该轮回转世，投胎富贵人家。可十年来，他始终徘徊在冰冷战场，不肯离去，执念牵挂着远方的妻子。\n那一夜，我第一次主动掀开遮挡面容的帷幔。红绳缠绕指尖，我以阴司之力，牵起两道漂泊的孤魂。红线相缠，两魂相依，十年相思，终得圆满。荒寒夜色里，他们相拥而立，没有言语，唯有泪水滴落，消融了长久的思念苦楚。\n我静静伫立一旁，看着这一幕，帐上陈年血咒，竟悄然淡去几分。我忽然懂得，冥婚从不是罪孽，邪恶的从来不是姻缘，而是利用姻缘作恶的人心。\n我执掌红线，审判恶人，亦成全深情。冰冷的红帐之下，既有杀伐戾气，亦有脉脉温情。这世间万般执念，只要心甘情愿，我便愿为其一牵红线，让离散之人，生死重逢，永不别离。"
    },
    {
      "title": "铜铃",
      "brief": "阴阳两路，孤魂万千。",
      "body": "阴阳两路，孤魂万千。\n我在红帐之下独处百年，见惯了恶鬼横行，看遍了人心险恶。绝大多数阴灵，要么嗜血作恶，要么执念癫狂，唯独一人，安静得如同山间薄雾，沉默行走在阴阳边界。那人便是无面行者，寂言。\n我与他相识已久，却从未听过他一言一语。他无面无声，身披素色旧衣，手持引路幡，常年徘徊在阴阳交界，接引迷途孤魂。他送来的魂魄，大多温顺干净，无滔天戾气，无害人恶念。故而每逢他送魂至我帐前，我总会多添一缕红线，让那些孤魂在阴间过得安稳顺遂。\n那一夜，阴风大作，煞气翻涌。一群无主饿鬼闯入我的结界，它们衣衫破烂，皮肉腐坏，常年吞食残魂，戾气滔天。彼时我正为一对深情孤魂系上红线，饿鬼嘶吼冲撞，撕碎帐幔，打翻铜铃，阴煞之气瞬间席卷整片红帐结界。\n我手持弯钩斩杀恶鬼，可饿鬼数量繁多，层层叠叠不断逼近。我一心护住身后无辜魂魄，难以抽身，片刻之间便落入下风。就在阴煞即将破帐的瞬间，一道素白身影伫立帐外。\n引路幡轻轻摇晃，惨白符纸流转微光。无声之间，扑面而来的饿鬼化作缕缕黑烟，消散在阴风之中。寂言静默而立，背影孤冷，不曾踏入我的帐内，也不曾抬头窥探我的模样。\n风波平息，满地狼藉。我抬手摘下帐前一枚铜铃，缓步走到他身侧。这铜铃可镇阴煞、驱邪祟，是我贴身之物。我将铜铃递到他冰冷的掌心，红帐帷幔随风轻扫，我轻声告知，若遇凶险，摇铃一声，我便踏风而至。\n他没有动作，没有回应，只是轻轻握紧那枚铜铃。片刻后，他转身步入浓重黑雾之中，背影孤寂，渐行渐远。\n阴阳两界，人情淡薄，恶鬼横行。我与他，一红一白，一煞一静，无需多言，彼此相守。这枚铜铃，是我百年孤寂里，唯一的牵绊，也是阴阳边界，最无声的约定。"
    },
    {
      "title": "红幔",
      "brief": "百年光阴，弹指一瞬。",
      "body": "百年光阴，弹指一瞬。\n我守着这一方红帐，看人间朝代更迭，看世人生死离别。帐幔褶皱之间，藏着无数姻缘罪孽；铜铃摇晃之声，载着万千孤魂悲苦。世人惧怕我一身红衣，忌惮我手中弯钩，将我视作冷血无情的阴煞恶鬼。可无人知晓，我本是凡人，也曾贪恋人间烟火，也曾期盼一世安稳。\n我见过太多愚昧惨剧：父母为钱财卖掉亲生骨肉，术士为私利撮合邪性冥婚，活人贪慕虚妄富贵，将鲜活性命推入冰冷棺木。每一场荒唐罪孽，我皆冷眼旁观，以阴司律法审判恶人，让作恶之人付出惨痛代价。\n也曾有新死的懵懂少女被送至我的帐前，她被继母恶意婚配孤魂，临死前满眼惶恐，哭得浑身发抖。那一双无助的眼眸，瞬间勾起我深埋心底的回忆。我想起漆黑棺木里的绝望，想起铁钉入木的刺耳声响，想起黄土掩埋时，那一丝彻底消散的光亮。\n我抹去少女魂魄的恐惧，送她重回阳间，斩断那桩肮脏孽缘。而后我挥动牵魂钩，将恶毒继母的魂魄拘入阴界，让她亲身体验一遍，地底暗无天日的孤寂与痛苦。\n罪孽需偿，善恶有报，这是我给自己定下的规矩，也是我坚守百年的道义。\n晚风拂过红帐，帷幔轻轻摇曳。曾经狰狞刺眼的血咒，如今已然淡若无形。仇恨未曾消散，只是早已化作守护的力量。我不再是那个被困棺中的绝望少女，而是执掌阴婚、庇护孤魂的司帐娘娘。\n红帐是我的棺椁，亦是我的铠甲。弯钩是我的罪孽，亦是我的公道。\n我伫立阴阳边界，看遍人间荒唐，守尽世间孤魂。往后岁月，无论寒暑更迭，无论阴风呼啸，我仍会守着这一袭红幔，斩恶缘，护孤魂。\n纵使世人皆惧我，我亦无悔。\n毕竟这世间，总要有人身着红衣，身在黑暗，为无辜之人，守住一丝冰凉的公道。"
    }
  ],
  "elevator": [
    {
      "title": "浊河",
      "brief": "我名阿岭，生于古时湘西深山。世人总觉得，常年行走山林的引路人，必是心。",
      "body": "我名阿岭，生于古时湘西深山。世人总觉得，常年行走山林的引路人，必是心慈温厚之辈。可山野从不懂悲悯，瘴雾噬人，山石藏险，豺狼夜行，在这里活着，本就要戒掉多余的善意。我自幼孤苦，独居深山，青丝高高束成利落马尾发髻，素绳捆扎，不染分毫繁饰。我素来赤裸上身，筋骨冷硬分明，常年被山风烈日打磨，皮肉泛着冷白哑光；下身仅着一袭简易黑色布裙，布料粗糙，垂落至脚踝，行动时悄无声息。脚下从无实地落脚，常年凝着一团不散的浓黑虚影，似踏非踏，漂泊无依。\n我本是山野孤人，寡言冷血，常年孤身穿梭荒林，专替进山之人引路，只收碎银，不谈人情。生人入山，亡魂归土，界限分明，从不逾矩。山野苦寒，我不屑冗余衣物束缚，赤裸上身更适配山林攀爬，黑裙遮体，简便利落，这是我常年与山野搏斗，养成的独有模样。死后化作阴差，这身装束也从未改变，成了我刻入魂魄的外形。一块暗沉粗布常年蒙住脸面，底下是一片死寂空白，无眼无鼻，没有任何神情，冷淡得如同山间顽石。\n那年盛夏，暴雨连月不休，山洪崩山，河道泛滥。断崖石壁间，一名采药女子被卡在乱石之中，衣袍湿透，满身血污，微弱的呼救声淹没在轰鸣水声里。我本可转身离去，山洪汹涌，贸然施救等同于自寻死路。可我瞥见她腰间挂着的草药囊，那一味孤草，曾救活我濒死的病重母亲。人情债，最是难搪，我出手，只为还债，无关善心。\n我踏过湿滑嶙峋的山石，赤裸的脊背被暴雨冷水冲刷，皮肤冻得发凉。伸手去拽那名女子的刹那，暴涨的暗河裹挟泥沙轰然冲撞而来，湍急黑水瞬间将我卷落断崖。乱石划破我的皮肉，冰冷河水封死我的呼吸，意识沉沦的最后一刻，我没有悔意，只觉这笔人情债，终究是还清了。\n再次睁眼，我立于阴阳夹缝之间，脚下黑雾翻涌，亡魂哀嚎不绝。我抬手抚过蒙面粗布，布料之下，是一片光滑死寂的空白皮肉。判官问我，愿入富贵轮回，还是留守冥途任职。我厌弃人世繁扰，不屑轮回转世，索性摇了摇头。阴司便抹去我的皮囊情绪，赐我一柄引魂幡，封我为无面行者。\n自此，世间再无山野引路人阿岭。依旧是高束发髻，赤裸上身，黑裙垂落，脚下凝着不散黑影。我持幡独行，无颜无言，淡漠穿行阴阳两界。浊河吞掉我的凡身，我便永做这冥途之中，最冷的孤影。"
    },
    {
      "title": "稚魂",
      "brief": "世人私下传我温柔，说我善待幼魂，是冥途难得的良善阴差。着实可笑。我本。",
      "body": "世人私下传我温柔，说我善待幼魂，是冥途难得的良善阴差。着实可笑。我本无心悲悯，只是偏爱干净纯粹的魂魄。阴阳两界恶鬼横行，多数亡魂沾满贪念、戾气、污浊，唯有孩童魂魄澄澈通透，不染俗世龌龊，看着清净，不扰我心神。我无面无表情，空白面皮隔绝所有情绪，旁人永远猜不透我的心思。\n那一日，冥途古道黑雾沉沉，我足下黑影贴地蔓延，赤裸的皮肉浸着阴间寒凉，没有半分活人温度。古道旁蜷缩着一名幼魂，怀里死死抱着破旧布老虎，发丝凌乱，哭声微弱沙哑。她执念浅显，只执着等候阳间的母亲，执拗不肯踏入轮回。周遭游荡的饿魂垂涎她纯净魂魄，蛰伏在黑雾之中，伺机而动，想要将她撕碎吞噬。\n我本可以径直离去，冥途本就弱肉强食，亡魂厮杀是亘古规矩。可我看着她瑟瑟发抖的模样，忽然想起年少孤身躲在山石后的自己。彼时我无依无靠，在寒夜里冻得浑身发抖，无人问津。我驻足停留，无关善意，只是不愿这般干净的魂魄，被污浊恶鬼肆意糟蹋，坏了我眼前清净。\n我手握引魂幡，幡身陈旧，幡面微光黯淡。赤裸的脊背绷起冷硬线条，阴风掠过皮肉，泛起刺骨凉意。我将幡杆压低，微光稳稳笼罩住幼魂，替她隔绝周遭阴煞污秽。有不知死活的饿鬼冲破黑雾扑来，我抬手轻挥幡杆，没有多余动作，那狰狞恶鬼便顷刻化作黑烟，消散在阴风之中。\n我沉默伫立三日，任由孩童哭闹纠缠。她哭累了，怯生生伸手攥住我黑裙的衣角，指尖微弱的温度，触碰到我冰冷僵硬的皮肉。蒙面粗布无风微动，空白面皮之下，没有丝毫动容。我没有心软，只是缓缓放轻脚步，带着她缓步前行。世人误把我的偏颇当作温柔，殊不知我冷漠成性，从不普度众生，唯独偏爱干净澄澈之物。脚下黑影随行，赤裸上身映着冥途幽光，我本就是黑暗里的孤鬼，何来慈悲可言。"
    },
    {
      "title": "窥面",
      "brief": "冥途有一条不可僭越的铁律，凡人亡魂，不得窥探我的面容。亡魂皆以为我蒙。",
      "body": "冥途有一条不可僭越的铁律，凡人亡魂，不得窥探我的面容。亡魂皆以为我蒙面是样貌丑陋、不堪入目，实则不然。我遮面，一是厌烦旁人窥探揣测，二是为惩戒狂妄无知之辈。我空白的面皮从不是缺陷，而是一面映照人心的阴镜，藏着世人最不敢直视的阴暗。\n曾有一名含冤而死的秀才，执念深重，怨气难平。他不信阴差无情，偏执认定世间尚有温热人情，执意要扯开我的蒙面粗布，妄图从我空洞的脸上，寻到一丝情绪波动。周遭亡魂纷纷劝阻，他却狂妄自大，嗤笑旁人怯懦，一意孤行要窥探我的真面目。\n我静立不动，足下黑影缓缓流动，赤裸的上身在阴冷黑雾中泛着惨白冷光，没有丝毫阻拦之意。他猛地伸手扯下粗布，那一片死寂空白的面皮骤然暴露，无眼无鼻，无唇无骨，空洞平滑的皮肉看得人头皮发麻。下一瞬，秀才发出撕心裂肺的惨叫，我本无面容，可我的空白面皮会映照人心，映入他眼中的，是他被人推落深井、溺水窒息、绝望扭曲的临死惨状。\n人皆畏死，更畏直面自己的惨死模样。我从未刻意害人，不过是直白剖开世人刻意逃避的恐惧。引魂幡铜铃骤然脆响，我面无表情，幡身吸力暴涨，径直将他浑浊不堪的魂魄吸入幡中，打入畜生道，永世不得为人。\n我重新系好粗糙遮面布，将那片空洞掩藏。自此事后，所有亡魂皆对我心生忌惮，不敢妄动。我赤裸上身，身着黑裙，持幡立于黑雾，脚下黑影如墨。顺从安分者，我渡其安稳往生；狂妄冒犯者，我令其永世沉沦。我从不是善人，这张无脸，便是冥途最冰冷无情的警示。"
    },
    {
      "title": "旧人",
      "brief": "我在冥途独行百年，看遍阴阳生离，看淡世间执念。我本无牵挂，无面无心，。",
      "body": "我在冥途独行百年，看遍阴阳生离，看淡世间执念。我本无牵挂，无面无心，皮囊冰冷，理应断绝所有俗世牵绊。可我心底深处，偏偏困着一缕凡人念想，是当年我舍命救下的那名采药女子。\n我等候她，无关情爱，更无深情，仅仅是偏执的不甘。那是我此生唯一一次破例救人，是我唯一偿还的人情，我不愿让这份牵绊潦草落幕。我要亲手接引她踏入冥途，送她入轮回，彻底斩断人世最后一丝羁绊，给自己一个干净的了结。高束的发髻从未散乱，赤裸的皮肉常年冰凉，黑裙随风轻晃，脚下黑影不离不弃，这身孤寂模样，便是我百年常态。\n那名采药女子阳间寿终八十七载，安然离世，可她的魂魄，从未出现在冥途入口。我翻阅阴司名册，踏遍阴阳边界，寻遍黑雾荒郊，始终寻不到她的踪迹。有人说她功德圆满，超脱三界；有人说她执念不散，化作阳间地缚灵。流言纷杂，真假难辨。\n我没有眼睛，无法观人容貌，早已模糊了她的模样。可我记得她当初抓着我手臂的力度，记得她慌乱微弱的喘息。我天生擅长辨声，听得懂世间每一缕脚步声，哪怕时隔百年，也能精准分辨。\n每日子时，冥途阴气最盛，我会刻意多驻足一个时辰。孤身伫立黑雾之中，引魂幡轻垂，赤裸脊背迎着刺骨阴风，黑裙翻飞，脚下浓黑虚影静静蔓延。阴风偶尔掀起我的蒙面布，露出一片死寂空白。旁人皆以为我深情守候，殊不知我只是偏执执拗。我冷漠半生，唯独为她破了规矩，这份不甘，我必须亲手抹平。若她永世不来，我便永世等候，直至魂飞魄散。"
    },
    {
      "title": "偏私",
      "brief": "我在阴司无品无阶，不入名册，不受阴律管束，游离在阴阳夹缝之间，独来独。",
      "body": "我在阴司无品无阶，不入名册，不受阴律管束，游离在阴阳夹缝之间，独来独往，随性而为。纵使是性情冷厉的红无常，也从不会轻易招惹我。世人误以为我德高望重，实则是我无拘无束、行事随心，连阴司都难以拿捏。再加上我赤裸上身、黑裙素简、脚下凝影的诡异模样，天生带着生人勿近的阴煞之气。\n曾有一名济世老中医，一生行医救人，免费接济贫苦百姓，心底纯善无恶。却遭奸人恶意诬陷，背负污名，含冤吐血而亡。阳寿未尽之时，他的魂魄被红无常锁定，奉命押入阴狱候审。我恰巧途经阴阳交界，撞见这一幕。\n我本可以视而不见，阴阳审判，因果轮回，本就与我无关。我素来冷漠，从不插手阴司公务。可我能清晰感知魂魄澄澈与否，那名老中医的魂魄干净纯粹，不染一丝污浊。恍惚间，我想起年少之时，唯一为我母亲免费施药的无名医者。那是我贫瘠人生里，唯一见过的纯粹善意。\n一念既定，我跨步上前，赤裸的身躯挡在红无常身前，足下黑影翻涌扩张，无形煞气弥散开来。我抬手拦下她的勾魂镰，指尖冰冷僵硬，随后扯下引魂幡上三道功德符咒。这是我百年接引亡魂、恪守分寸积攒的全部底蕴，是我唯一的筹码。我将符咒默默推至她面前，以自身百年功德，换取老中医一次清白、一次生机。\n红无常凝视我蒙面之下的空白脸面，沉默良久，最终收镰退让。她清楚，我从不多管闲事，一旦出手，便是不可逆转的决断。我无眼无眉，看不清喜怒；赤裸皮肉冰凉，辨不出情绪；黑裙沉静，黑影默然。我从不慈悲，只为报恩；从不行善，只为偏私。\n黑雾翻涌，冥风萧瑟。我依旧孤身伫立阴阳边界，高髻不乱，上身赤裸，黑裙垂落，脚下黑影永随。世人误将我的偏私当作温柔，误将我的偏执当作善良。可我心知肚明，我从不是善人。我冷漠、记恩、记仇、偏执，善恶随心，不受束缚。\n人间阴阳，万般疾苦。我持幡独行，无面无念，不问苍生，不渡无缘。唯有亏欠之人、偏爱之魂，方能得我破例相待。余下万千亡魂，沉浮善恶，皆与我无关。"
    }
  ]
};

Object.entries(soulBiographyArchive).forEach(([ghostId, bios]) => {
  if (soulLore[ghostId]) soulLore[ghostId].bios = bios;
});

const summonConfig = {
  normal: { name: "\u666e\u901a\u53ec\u5524", currency: "gold", single: 100, ten: 900 },
  mystery: { name: "\u9ad8\u7ea7\u53ec\u5524", currency: "spirit", single: 10, ten: 90 }
};

const rarityVisual = {
  N: { label: "N", color: "#58c777", rare: false },
  R: { label: "R", color: "#4ba6ff", rare: false },
  SR: { label: "SR", color: "#a95cff", rare: false },
  SSR: { label: "SSR", color: "#ffd45a", rare: true },
  SP: { label: "SP", color: "#ff3b35", rare: true }
};

const summonRateTables = {
  normal: [
    { kind: "item", weight: 30.0 },   // 道具 + N 总计 87%
    { kind: "card", rarity: "N", weight: 57.0 },
    { kind: "card", rarity: "R", weight: 10.0 },
    { kind: "card", rarity: "SR", weight: 3.0 }
  ],
  mystery: [
    { kind: "card", rarity: "R", weight: 78.75 },
    { kind: "card", rarity: "SR", weight: 20.0 },
    { kind: "card", rarity: "SSR", weight: 1.0 },
    { kind: "card", rarity: "SP", weight: 0.25 }
  ]
};

function createCardLibrary() {
  const pools = [
    ["N", 8],
    ["R", 17],
    ["SR", 17],
    ["SSR", 7],
    ["SP", 6]
  ];
  const cards = [];
  pools.forEach(([rarity, count]) => {
    for (let i = 1; i <= count; i += 1) {
      const serial = String(i).padStart(3, "0");
      const code = `${rarity}${serial}`;
      cards.push({
        id: code,
        rarity,
        name: code,
        image: `./assets/cards/${code}.png`
      });
    }
  });
  return cards;
}

const summonCards = createCardLibrary();

const state = loadState();
let currentTab = "Story";
let activeStoryChapterId = null;
let activeGhost = soulRoster.includes(state.unlockedGhosts[0]) ? state.unlockedGhosts[0] : soulRoster[0];
let activeSoulTab = "feed";
let activeSummonPool = "normal";
let activeBagTab = "items";
let activeBagItemId = null;
let engine = null;
const tapAudio = new Audio("./assets/audio/tap.mp3");
tapAudio.preload = "auto";
const bgmAudio = new Audio("./assets/audio/BGM01.mp3");
bgmAudio.preload = "auto";
bgmAudio.loop = true;
bgmAudio.volume = 0.38;

function playTapSound() {
  try {
    const sound = tapAudio.cloneNode();
    sound.volume = 0.75;
    sound.play().catch(() => {});
  } catch {}
}

function playBgm() {
  try {
    if (bgmAudio.paused) bgmAudio.play().catch(() => {});
  } catch {}
}

function defaultState() {
  return {
    seenOpening: false,
    playerName: "",
    playerGender: "",
    unlockedChapters: ["1-1"],
    completedChapters: [],
    unlockedGhosts: [...soulRoster],
    ghosts: {
      mirror: { trust: 0, affinityLevel: 1, affinityExp: 0, danger: 0, stage: 1, daily: 0, lastReset: todayKey(), warn: 0 },
      rain: { trust: 12, affinityLevel: 1, affinityExp: 1200, danger: 8, stage: 1, daily: 0, lastReset: todayKey(), warn: 0 },
      elevator: { trust: 24, affinityLevel: 1, affinityExp: 2400, danger: 18, stage: 1, daily: 0, lastReset: todayKey(), warn: 0 }
    },
    bag: Object.fromEntries(Object.entries(items).map(([id, item]) => [id, item.count || 0])),
    cards: {},
    currency: { gold: 10000, spirit: 1000 },
    pity: {
      standard: { total: 0, sr: 0, ssr: 0, sp: 0 },
      limited: { total: 0, sr: 0, ssr: 0, sp: 0 }
    },
    lastDraws: [],
    storySave: null
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const nextState = saved ? mergeDefaults(saved) : defaultState();
    if (DEV_FORCE_ONBOARDING_ON_REFRESH) nextState.seenOpening = false;
    return nextState;
  } catch {
    const nextState = defaultState();
    if (DEV_FORCE_ONBOARDING_ON_REFRESH) nextState.seenOpening = false;
    return nextState;
  }
}

function mergeDefaults(saved) {
  const base = defaultState();
  const merged = {
    ...base,
    ...saved,
    ghosts: { ...base.ghosts, ...saved.ghosts },
    bag: { ...base.bag, ...saved.bag },
    cards: { ...base.cards, ...saved.cards },
    currency: { ...base.currency, ...saved.currency },
    pity: { ...base.pity, ...saved.pity }
  };
  soulRoster.forEach(id => {
    if (!merged.unlockedGhosts.includes(id)) merged.unlockedGhosts.push(id);
    if (!merged.ghosts[id]) {
      merged.ghosts[id] = { trust: 0, affinityLevel: 1, affinityExp: 0, danger: 0, stage: 1, daily: 0, lastReset: todayKey(), warn: 0 };
    }
    normalizeAffinity(merged.ghosts[id]);
  });
  normalizeStoryProgress(merged);
  return merged;
}

function normalizeStoryProgress(targetState) {
  const unlocked = new Set(["1-1"]);
  const completed = new Set(targetState.completedChapters || []);
  chapters.forEach((round, index) => {
    if (!completed.has(round.id)) return;
    unlocked.add(round.id);
    const next = chapters[index + 1];
    if (next) unlocked.add(next.id);
  });
  targetState.unlockedChapters = chapters
    .map(round => round.id)
    .filter(id => unlocked.has(id));
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  document.getElementById("saveState").textContent = "已保存";
  updateStatusBar();
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function resetDailyIfNeeded(ghostId) {
  const ghost = state.ghosts[ghostId];
  if (ghost.lastReset !== todayKey()) {
    ghost.daily = 0;
    ghost.lastReset = todayKey();
  }
}

function normalizeAffinity(ghost) {
  if (!ghost) return { level: 1, exp: 0, progress: 0, title: affinityTitles[0] };
  if (!Number.isFinite(ghost.affinityLevel)) ghost.affinityLevel = 1;
  if (!Number.isFinite(ghost.affinityExp)) {
    ghost.affinityExp = Math.max(0, Math.min(affinityExpPerLevel - 1, Math.round((ghost.trust || 0) * 100)));
  }
  ghost.affinityLevel = Math.max(1, Math.min(affinityMaxLevel, Math.floor(ghost.affinityLevel)));
  ghost.affinityExp = Math.max(0, Math.floor(ghost.affinityExp));
  while (ghost.affinityExp >= affinityExpPerLevel && ghost.affinityLevel < affinityMaxLevel) {
    ghost.affinityExp -= affinityExpPerLevel;
    ghost.affinityLevel += 1;
  }
  if (ghost.affinityLevel >= affinityMaxLevel) {
    ghost.affinityLevel = affinityMaxLevel;
    ghost.affinityExp = Math.min(ghost.affinityExp, affinityExpPerLevel);
  }
  return {
    level: ghost.affinityLevel,
    exp: ghost.affinityExp,
    progress: Math.max(0, Math.min(100, (ghost.affinityExp / affinityExpPerLevel) * 100)),
    title: affinityTitles[ghost.affinityLevel - 1] || affinityTitles[0]
  };
}

function addAffinityExp(ghost, exp) {
  const before = normalizeAffinity(ghost).level;
  ghost.affinityExp += Math.max(0, Math.round(exp));
  const after = normalizeAffinity(ghost).level;
  return { before, after };
}

class StoryEngine {
  constructor(script, onEnd, snapshot) {
    this.raw = script;
    this.lines = script.split("\n").map(line => line.trim()).filter(line => line && !line.startsWith("#"));
    this.labels = {};
    this.index = snapshot?.index || 0;
    this.onEnd = onEnd;
    this.waiting = false;
    this.typing = false;
    this.auto = false;
    this.skip = false;
    this.scene = snapshot?.scene || { bg: "building", chars: [] };
    this.buildLabels();
    this.applyScene();
  }

  buildLabels() {
    this.lines.forEach((line, i) => {
      const [cmd, name] = line.split(/\s+/);
      if (cmd?.toLowerCase() === "label" && name) this.labels[name] = i;
    });
  }

  log(message) {
    const panel = document.getElementById("logPanel");
    const list = document.getElementById("logList");
    panel.classList.remove("hidden");
    const row = document.createElement("div");
    row.textContent = message;
    list.prepend(row);
  }

  snapshot() {
    return {
      raw: this.raw,
      index: this.index,
      scene: this.scene
    };
  }

  applyScene() {
    setBackground(this.scene.bg || "building");
    renderChars(this.scene.chars || []);
  }

  async next() {
    if (this.waiting || this.typing) {
      this.skipType = true;
      return;
    }
    const line = this.lines[this.index++];
    if (!line) {
      this.finish();
      return;
    }
    await this.execute(line);
  }

  async execute(line) {
    const [cmdRaw, ...rest] = line.split(/\s+/);
    const cmd = cmdRaw.toLowerCase();
    try {
      if (cmd === "bg") {
        const bg = rest[1];
        if (rest[0] === "show" && bg) {
          this.scene.bg = bg;
          setBackground(bg);
        }
        return this.next();
      }
      if (cmd === "char") {
        const action = rest[0];
        const name = rest[1];
        const pos = rest[2] || "center";
        if (action === "show") this.scene.chars = [{ name, pos }];
        if (action === "hide") this.scene.chars = this.scene.chars.filter(char => char.name !== name);
        renderChars(this.scene.chars);
        return this.next();
      }
      if (cmd === "wait") {
        this.waiting = true;
        setTimeout(() => {
          this.waiting = false;
          this.next();
        }, Number(rest[0] || 0.5) * 1000);
        return;
      }
      if (cmd === "jump") {
        this.index = this.labels[rest[0]] ?? this.index;
        return this.next();
      }
      if (cmd === "label") return this.next();
      if (cmd === "choice") return this.showChoices(rest.join(" "));
      if (cmd === "end") return this.finish();
      if (cmd === "bgm" || cmd === "video") return this.next();
      await this.say(cmdRaw, rest.join(" "));
    } catch (error) {
      this.log(`绗?${this.index} 琛岄敊璇細${error.message}`);
      this.next();
    }
  }

  async say(name, text) {
    const speaker = document.getElementById("speaker");
    const line = document.getElementById("line");
    document.getElementById("choices").innerHTML = "";
    speaker.textContent = name;
    line.textContent = "";
    this.typing = true;
    for (const char of text) {
      if (this.skip || this.skipType) {
        line.textContent = text;
        break;
      }
      line.textContent += char;
      await sleep(28);
    }
    this.skipType = false;
    this.typing = false;
    if (this.auto || this.skip) setTimeout(() => this.next(), this.skip ? 80 : 900);
  }

  showChoices(payload) {
    const choices = document.getElementById("choices");
    choices.innerHTML = "";
    const parts = payload.match(/[^:]+:[^\s]+/g) || [];
    parts.forEach(part => {
      const [label, target] = part.split(":");
      const btn = document.createElement("button");
      btn.textContent = label;
      btn.onclick = () => {
        choices.innerHTML = "";
        this.index = this.labels[target] ?? this.index;
        this.next();
      };
      choices.appendChild(btn);
    });
  }

  finish() {
    this.onEnd?.();
  }
}

let chapterOneData = null;

const storyCharacterMap = {
  "\u65c1\u767d": "\u65c1\u767d.png",
  "\u4e5d\u697c\u5b88\u7ae5": "\u4e5d\u697c\u5b88\u7ae5.\u963f\u96bc.png",
  "九楼守童·阿隼": "九楼守童.阿隼.png",
  "\u53f8\u5e10\u5a18": "\u53f8\u5e10\u5a18\u00b7\u8d64\u5e54.png",
  "司帐娘·赤幔": "司帐娘·赤幔.png",
  "无面行者·寂言": "无面行者·寂言.png",
  "\u5e03\u5076\u6028\u7ae5": "\u5e03\u5076\u6028\u7ae5.png",
  "\u6b8b\u70db\u9b42": "\u6b8b\u70db\u9b42.png",
  "\u767d\u8863\u7a1a\u7075": "\u767d\u8863\u7a1a\u7075.png",
  "画皮鬼": "画皮鬼.png",
  "幽瞳灵猫": "幽瞳灵猫.png",
  "水榭鬼姬": "水榭鬼姬.png",
  "阴潭恶": "阴潭恶.png",
  "提灯童仆": "提灯童仆.png",
  "\u955c\u79fb": "\u955c\u79fb.png",
  "镜妖·镜移": "镜移.png",
  "\u9634\u6c34\u86c7": "\u9634\u6c34\u86c7.png",
  "\u7eb8\u4f1e\u620f\u5076": "\u7eb8\u4f1e\u620f\u5076.png",
  "\u51b0\u7bb1\u91cc\u7684\u5973\u4eba": "\u9634\u6f6d\u6076.png",
  "\u52a0\u73ed\u540c\u4e8b\u00b7\u5c0f\u5434": "\u65e0\u9762\u884c\u8005\u00b7\u5bc2\u8a00.png",
  "\u6b8b\u80a2\u4fdd\u5b89\u00b7\u8001\u8d75": "\u795e\u79d8\u4eba.png",
  "\u8001\u8d75": "\u795e\u79d8\u4eba.png",
  "\u5c0f\u5434": "\u65e0\u9762\u884c\u8005\u00b7\u5bc2\u8a00.png"
};

const storyPortraitMap = {
  "\u65c1\u767d_\u7acb\u7ed8": "\u65c1\u767d.png",
  "\u73a9\u5bb6_\u7acb\u7ed8": "player",
  "\u4e5d\u697c\u5b88\u7ae5_\u7acb\u7ed8": "\u4e5d\u697c\u5b88\u7ae5.\u963f\u96bc.png",
  "九楼守童·阿隼_立绘": "九楼守童.阿隼.png",
  "\u53f8\u5e10\u5a18_\u7acb\u7ed8": "\u53f8\u5e10\u5a18\u00b7\u8d64\u5e54.png",
  "司帐娘·赤幔_立绘": "司帐娘·赤幔.png",
  "无面行者·寂言_立绘": "无面行者·寂言.png",
  "\u5e03\u5076\u6028\u7ae5_\u7acb\u7ed8": "\u5e03\u5076\u6028\u7ae5.png",
  "\u6b8b\u70db\u9b42_\u7acb\u7ed8": "\u6b8b\u70db\u9b42.png",
  "\u767d\u8863\u7a1a\u7075_\u7acb\u7ed8": "\u767d\u8863\u7a1a\u7075.png",
  "画皮鬼_立绘": "画皮鬼.png",
  "幽瞳灵猫_立绘": "幽瞳灵猫.png",
  "水榭鬼姬_立绘": "水榭鬼姬.png",
  "阴潭恶_立绘": "阴潭恶.png",
  "提灯童仆_立绘": "提灯童仆.png",
  "\u955c\u79fb_\u7acb\u7ed8": "\u955c\u79fb.png",
  "镜移_立绘": "镜移.png",
  "\u9634\u6c34\u86c7_\u7acb\u7ed8": "\u9634\u6c34\u86c7.png",
  "\u7eb8\u4f1e\u620f\u5076_\u7acb\u7ed8": "\u7eb8\u4f1e\u620f\u5076.png",
  "\u51b0\u7bb1\u5973_\u7acb\u7ed8": "\u9634\u6f6d\u6076.png",
  "\u5c0f\u5434_\u7acb\u7ed8": "\u65e0\u9762\u884c\u8005\u00b7\u5bc2\u8a00.png",
  "\u8001\u8d75_\u7acb\u7ed8": "\u795e\u79d8\u4eba.png"
};

function storyAssetUrl(kind, file) {
  return `./assets/chapter1/${kind}/${encodeURIComponent(file)}`;
}

function resolveStoryCharacter(row) {
  const speaker = row?.["\u8bf4\u8bdd\u4eba"] || "";
  const portrait = row?.["\u7acb\u7ed8\u540d"] || "";
  let file = storyPortraitMap[portrait] || storyCharacterMap[speaker];
  if (file === "player" || speaker === "\u73a9\u5bb6") {
    file = state.playerGender === "female" ? "\u5973\u4e3b.png" : "\u7537\u4e3b.png";
  }
  if (!file) return null;
  const pos = speaker === "\u73a9\u5bb6" || speaker === "\u65c1\u767d" ? "left" : "right";
  return { name: speaker, pos, src: storyAssetUrl("chars", file) };
}

async function loadChapterOneData() {
  if (chapterOneData) return chapterOneData;
  const response = await fetch("./assets/chapter1/chapter1.json?v=20260518-branches");
  chapterOneData = await response.json();
  return chapterOneData;
}

class SpreadsheetStoryEngine {
  constructor(round, onEnd, snapshot = null) {
    this.round = round;
    this.rows = round.rows || [];
    this.index = snapshot?.index || 0;
    this.onEnd = onEnd;
    this.typing = false;
    this.skipType = false;
    this.branchChoice = snapshot?.branchChoice || "";
    this.waitingForName = snapshot?.waitingForName ?? (round.id === "1-1" && !state.playerName);
    this.nameAsked = snapshot?.nameAsked || false;
  }

  snapshot() {
    return {
      type: "spreadsheet",
      roundId: this.round.id,
      index: this.index,
      branchChoice: this.branchChoice,
      waitingForName: this.waitingForName,
      nameAsked: this.nameAsked
    };
  }

  async next() {
    if (this.typing) {
      this.skipType = true;
      return;
    }
    if (this.waitingForName && !this.nameAsked && this.index >= 1) {
      this.nameAsked = true;
      await this.say("\u795e\u79d8\u4eba", "\u8fdb\u53bb\u4e4b\u524d\uff0c\u544a\u8bc9\u6211\u4f60\u7684\u540d\u5b57\u3002\u4e5d\u53f7\u697c\u53ea\u8bb0\u5f97\u5199\u5728\u6863\u6848\u4e0a\u7684\u4eba\u3002");
      showPlayerNameModal(() => {
        this.waitingForName = false;
        this.next();
      });
      return;
    }
    const row = this.nextPlayableRow();
    if (!row) return this.finish();
    this.applyRowScene(row);
    await this.say(this.displaySpeaker(row), this.displayText(row));
    if (row["\u9009\u62e9A"] || row["\u9009\u62e9B"]) {
      this.showChoices(row);
    }
  }

  nextPlayableRow() {
    while (this.index < this.rows.length) {
      const row = this.rows[this.index++];
      const branch = row["\u5206\u652f"] || "";
      if (!branch) {
        this.branchChoice = "";
        return row;
      }
      if (this.branchChoice && branch === this.branchChoice) return row;
    }
    return null;
  }

  applyRowScene(row) {
    const bgName = (row["\u80cc\u666f\u56fe"] || "").trim();
    if (bgName) {
      const filename = /\.\w+$/i.test(bgName) ? bgName : `${bgName}.jpg`;
      setBackground(storyAssetUrl("bg", filename));
    }
    const character = resolveStoryCharacter(row);
    renderChars(character ? [character] : []);
  }

  displaySpeaker(row) {
    const speaker = row["\u8bf4\u8bdd\u4eba"] || "\u65c1\u767d";
    if (speaker === "\u73a9\u5bb6") return playerDisplayName();
    return speaker;
  }

  displayText(row) {
    const text = row["\u5bf9\u767d\u5185\u5bb9"] || "";
    return text.replace(/\bPlayer\b/g, playerDisplayName());
  }

  async say(name, text) {
    const speaker = document.getElementById("speaker");
    const line = document.getElementById("line");
    document.getElementById("choices").innerHTML = "";
    speaker.textContent = name;
    line.textContent = "";
    this.typing = true;
    for (const char of text) {
      if (this.skipType) {
        line.textContent = text;
        break;
      }
      line.textContent += char;
      await sleep(22);
    }
    this.skipType = false;
    this.typing = false;
  }

  showChoices(row) {
    const choices = document.getElementById("choices");
    choices.innerHTML = "";
    [["A", row["\u9009\u62e9A"]], ["B", row["\u9009\u62e9B"]]].forEach(([branch, label]) => {
      if (!label) return;
      const btn = document.createElement("button");
      btn.textContent = label;
      btn.addEventListener("click", event => {
        event.stopPropagation();
        this.branchChoice = branch;
        choices.innerHTML = "";
        this.next();
      });
      choices.appendChild(btn);
    });
  }

  finish() {
    renderChars([]);
    this.onEnd?.();
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function playerDisplayName() {
  return state.playerName || "\u73a9\u5bb6";
}

function updatePlayerNameDisplays(root = document) {
  root.querySelectorAll(".hub-player-copy strong, .story-hud-player strong").forEach(el => {
    el.textContent = playerDisplayName();
  });
}

function setBackground(name) {
  const bg = document.getElementById("bgLayer");
  bg.className = "bg-layer";
  if (name && (name.startsWith("./") || name.startsWith("/") || name.includes(".jpg") || name.includes(".png"))) {
    bg.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,.02), rgba(0,0,0,.22)), url("${name}")`;
  } else {
    bg.style.backgroundImage = "";
    bg.classList.add(`bg-${name || "building"}`);
  }
}

function renderChars(chars) {
  const layer = document.getElementById("charLayer");
  layer.innerHTML = "";
  chars.forEach(char => {
    const el = document.createElement("div");
    el.className = `ghost-portrait ${char.pos || "center"} ${char.src ? "real-portrait" : ""}`;
    el.title = char.name;
    if (char.src) {
      const img = document.createElement("img");
      img.src = char.src;
      img.alt = char.name || "";
      el.appendChild(img);
    }
    layer.appendChild(el);
  });
}

function showPlayerNameModal(done) {
  const layer = document.getElementById("modalLayer");
  if (!layer) return;
  layer.className = "modal-layer name-entry-layer";
  const gender = state.playerGender === "female" ? "female" : "male";
  const names = playerNamePools[gender] || playerNamePools.male;
  let currentName = state.playerName || names[Math.floor(Math.random() * names.length)];
  layer.innerHTML = `
    <article class="name-entry-modal">
      <div class="name-entry-panel">
        <img src="./assets/onboarding/bg_naming_panel.png" alt="">
        <button class="name-random" type="button" title="\u968f\u673a\u540d\u5b57">
          <img src="./assets/onboarding/btn_random_name.png" alt="">
        </button>
        <button class="name-entry-value" type="button" title="\u5f53\u524d\u540d\u5b57"></button>
        <button class="name-confirm" type="button">
          <img src="./assets/onboarding/btn_common.png" alt="">
          <span>\u8fdb\u5165\u8be1\u4e8b</span>
        </button>
      </div>
    </article>
  `;
  const nameValue = layer.querySelector(".name-entry-value");
  const applyName = name => {
    currentName = name;
    if (nameValue) nameValue.textContent = name;
  };
  applyName(currentName);
  layer.querySelector(".name-random")?.addEventListener("click", () => applyName(names[Math.floor(Math.random() * names.length)]));
  nameValue?.addEventListener("click", () => applyName(names[Math.floor(Math.random() * names.length)]));
  layer.querySelector(".name-confirm")?.addEventListener("click", () => {
    state.playerName = currentName || names[0];
    saveState();
    updatePlayerNameDisplays();
    closeModal();
    done?.();
  });
  updateUiDebugTargets();
}

function showRoleSelectModal(done) {
  const layer = document.getElementById("modalLayer");
  if (!layer) return;
  let selectedGender = state.playerGender === "female" ? "female" : "male";
  layer.className = "modal-layer role-select-layer";
  layer.innerHTML = `
    <section class="role-select-screen" aria-label="\u9009\u62e9\u89d2\u8272">
      <button class="role-card role-card-male selected" data-gender="male" type="button" title="\u7537\u4e3b">
        <img src="./assets/onboarding/bg_role_select_male.png" alt="">
      </button>
      <button class="role-card role-card-female" data-gender="female" type="button" title="\u5973\u4e3b">
        <img src="./assets/onboarding/bg_role_select_female.png" alt="">
      </button>
      <button class="role-confirm" type="button">
        <img src="./assets/onboarding/btn_common.png" alt="">
        <span>\u786e\u8ba4\u8fdb\u5165</span>
      </button>
    </section>
  `;
  const syncSelection = () => {
    layer.querySelectorAll("[data-gender]").forEach(card => {
      card.classList.toggle("selected", card.dataset.gender === selectedGender);
    });
  };
  layer.querySelectorAll("[data-gender]").forEach(card => {
    card.addEventListener("click", () => {
      selectedGender = card.dataset.gender;
      syncSelection();
    });
  });
  layer.querySelector(".role-confirm")?.addEventListener("click", () => {
    state.playerGender = selectedGender;
    state.playerName = "";
    saveState();
    closeModal();
    done?.();
  });
  syncSelection();
  updateUiDebugTargets();
}

async function startStory(scriptId, onEnd, snapshot = null) {
  document.getElementById("titleScreen").classList.add("hidden");
  document.getElementById("home").classList.add("hidden");
  document.getElementById("nav").classList.add("hidden");
  document.getElementById("scene").classList.remove("hidden");
  document.getElementById("dialogue").classList.remove("hidden");
  if (/^1-\d+$/.test(scriptId)) {
    try {
      const data = await loadChapterOneData();
      const round = data.rounds.find(item => item.id === scriptId);
      if (round) {
        engine = new SpreadsheetStoryEngine(round, () => {
          const reward = completeChapter(scriptId);
          saveState();
          presentCompletionRewards(reward, () => {
            showStoryHome();
            onEnd?.();
          });
        }, snapshot);
        engine.next();
        return;
      }
    } catch (error) {
      notify("\u771f\u5b9e\u5267\u672c\u8f7d\u5165\u5931\u8d25\uff0c\u5c06\u4f7f\u7528\u5185\u7f6e\u5267\u672c", "warn");
    }
  }
  engine = new StoryEngine(storyScripts[scriptId], () => {
    if (scriptId === "opening") {
      state.seenOpening = true;
      unlockChapter("1-1");
      saveState();
      showHome();
      onEnd?.();
    } else {
      const reward = completeChapter(scriptId);
      saveState();
      presentCompletionRewards(reward, () => {
        showStoryHome();
        onEnd?.();
      });
    }
  });
  engine.next();
}

function showHome() {
  playBgm();
  engine = null;
  document.getElementById("titleScreen").classList.add("hidden");
  document.getElementById("scene").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
  showMainHub();
  renderAll();
  updatePlayerNameDisplays();
}

function showStoryHome() {
  playBgm();
  engine = null;
  document.getElementById("titleScreen").classList.add("hidden");
  document.getElementById("scene").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
  openModule("Story");
}

function showMainHub() {
  currentTab = "Hub";
  document.getElementById("home").classList.remove("story-shell");
  document.getElementById("home").classList.remove("raise-shell");
  document.getElementById("home").classList.remove("summon-shell");
  document.getElementById("home").classList.remove("bag-shell");
  document.getElementById("mainHub").classList.remove("hidden");
  document.querySelector(".top-status").classList.add("hidden");
  document.querySelector(".content-area").classList.add("hidden");
  document.getElementById("nav").classList.add("hidden");
  document.querySelectorAll(".tab-panel").forEach(panel => panel.classList.add("hidden"));
  updateUiDebugTargets();
}

function openModule(tabName) {
  if (!["Story", "Raise", "Gacha", "Bag"].includes(tabName)) {
    showMainHub();
    return;
  }
  currentTab = tabName;
  const isStory = tabName === "Story";
  const isRaise = tabName === "Raise";
  const isSummon = tabName === "Gacha";
  const isBag = tabName === "Bag";
  if (isRaise) activeSoulTab = "feed";
  if (isBag) {
    activeBagTab = "cards";
    activeBagItemId = null;
  }
  const isArtScreen = isStory || isRaise || isSummon || isBag;
  document.getElementById("home").classList.toggle("story-shell", isStory);
  document.getElementById("home").classList.toggle("raise-shell", isRaise);
  document.getElementById("home").classList.toggle("summon-shell", isSummon);
  document.getElementById("home").classList.toggle("bag-shell", isBag);
  document.getElementById("mainHub").classList.add("hidden");
  document.querySelector(".top-status").classList.toggle("hidden", isArtScreen);
  document.querySelector(".content-area").classList.remove("hidden");
  document.getElementById("nav").classList.toggle("hidden", isArtScreen);
  document.querySelectorAll("#nav button").forEach(item => item.classList.toggle("active", item.dataset.tab === tabName));
  document.querySelectorAll(".tab-panel").forEach(panel => panel.classList.add("hidden"));
  const panel = document.getElementById(`tab${tabName}`);
  if (!panel) {
    showMainHub();
    return;
  }
  panel.classList.remove("hidden");
  panel.classList.remove("panel-enter");
  requestAnimationFrame(() => panel.classList.add("panel-enter"));
  renderAll();
  updateUiDebugTargets();
}

function showTitleScreen() {
  engine = null;
  document.getElementById("titleScreen").classList.remove("hidden");
  document.getElementById("scene").classList.add("hidden");
  document.getElementById("home").classList.add("hidden");
  document.getElementById("nav").classList.add("hidden");
  const hint = document.getElementById("enterHint");
  hint.textContent = state.seenOpening ? "检测到本地存档：将进入主界面" : "新档案：将进入第一章第一回";
}

function enterGame() {
  playBgm();
  if (state.seenOpening) {
    showHome();
    return;
  }
  showRoleSelectModal(() => {
    showPlayerNameModal(() => {
      state.seenOpening = true;
      unlockChapter("1-1");
      saveState();
      startStory("1-1");
    });
  });
}

function firstUnlockedStoryChapter() {
  return storyChapters.find(chapter => chapter.rounds.some(round => state.unlockedChapters.includes(round.id))) || storyChapters[0];
}

function isStoryChapterUnlocked(chapter) {
  return chapter.rounds.some(round => state.unlockedChapters.includes(round.id));
}

function isStoryChapterDone(chapter) {
  return chapter.rounds.every(round => state.completedChapters.includes(round.id));
}

function firstPlayableRound(chapter) {
  return chapter.rounds.find(round => state.unlockedChapters.includes(round.id) && !state.completedChapters.includes(round.id)) || chapter.rounds.find(round => state.unlockedChapters.includes(round.id)) || chapter.rounds[0];
}

function pickRandomItems(count = 10) {
  const drops = {};
  for (let i = 0; i < count; i += 1) {
    const id = rewardItemPool[Math.floor(Math.random() * rewardItemPool.length)];
    drops[id] = (drops[id] || 0) + 1;
    state.bag[id] = (state.bag[id] || 0) + 1;
  }
  return drops;
}

function mergeLoot(base, extra) {
  const merged = { ...base };
  Object.entries(extra || {}).forEach(([id, count]) => {
    merged[id] = (merged[id] || 0) + count;
  });
  return merged;
}

function presentCompletionRewards(reward, done) {
  if (!reward) {
    done?.();
    return;
  }
  const layer = document.getElementById("modalLayer");
  if (!layer) {
    done?.();
    return;
  }
  const rewardCards = [
    ...(reward.gold ? [{ id: "gold", icon: currencyIconPath("gold"), count: reward.gold, label: "\u91d1\u5e01" }] : []),
    ...(reward.spirit ? [{ id: "spirit", icon: currencyIconPath("spirit"), count: reward.spirit, label: "\u7075" }] : []),
    ...Object.entries(reward.items || {}).map(([id, count]) => ({
      id,
      icon: getItemIconPath(id),
      count,
      label: items[id]?.name || id
    }))
  ];
  layer.className = "modal-layer";
  layer.innerHTML = `
    <article class="game-modal reward-modal">
      <h2>获得奖励</h2>
      <div class="reward-grid" style="--reward-count:${rewardCards.length}">
        ${rewardCards.map((item, index) => `
          <div class="reward-card" style="--reward-index:${index}" title="${item.label}">
            <img src="${item.icon}" alt="${item.label}">
            <strong>x${item.count}</strong>
          </div>
        `).join("")}
      </div>
      <button class="primary reward-confirm" data-close-reward="1">确认</button>
    </article>
  `;
  const closeButton = layer.querySelector("[data-close-reward]");
  window.setTimeout(() => {
    closeButton?.classList.add("show");
  }, Math.max(0, rewardCards.length - 1) * 120 + 280);
  closeButton?.addEventListener("click", () => {
    closeModal();
    done?.();
  });
}

function completeChapter(id) {
  if (!state.completedChapters.includes(id)) state.completedChapters.push(id);
  const next = chapters[chapters.findIndex(ch => ch.id === id) + 1];
  if (next) unlockChapter(next.id);
  const reward = {
    gold: 2000,
    spirit: 0,
    items: pickRandomItems(10)
  };
  state.currency.gold = (state.currency.gold || 0) + reward.gold;
  const current = chapters.find(ch => ch.id === id);
  const isChapterEnd = current && (!next || next.id.split("-")[0] !== current.id.split("-")[0]);
  if (isChapterEnd) {
    reward.spirit = 200;
    state.currency.spirit = (state.currency.spirit || 0) + 200;
    reward.items = mergeLoot(reward.items, pickRandomItems(10));
  }
  return reward;
}

function unlockChapter(id) {
  if (!state.unlockedChapters.includes(id)) state.unlockedChapters.push(id);
}

function unlockGhost(id) {
  if (!state.unlockedGhosts.includes(id)) state.unlockedGhosts.push(id);
  if (!state.ghosts[id]) state.ghosts[id] = { trust: 0, affinityLevel: 1, affinityExp: 0, danger: 0, stage: 1, daily: 0, lastReset: todayKey(), warn: 0 };
  normalizeAffinity(state.ghosts[id]);
}

function switchSoul(direction) {
  const roster = soulRoster.filter(id => state.unlockedGhosts.includes(id));
  if (!roster.length) return;
  const currentIndex = Math.max(0, roster.indexOf(activeGhost));
  const nextIndex = (currentIndex + direction + roster.length) % roster.length;
  activeGhost = roster[nextIndex];
  activeSoulTab = "feed";
  renderRaiseTab();
  updateStatusBar();
  updateUiDebugTargets();
}

function renderAll() {
  renderStoryTab();
  renderRaiseTab();
  renderGachaTab();
  renderBagTab();
  updateFx();
  updateStatusBar();
  updateCurrencyDisplays();
  updatePlayerNameDisplays();
  updateUiDebugTargets();
}

function loadUiDebugLayout() {
  try {
    uiDebugLayout = JSON.parse(localStorage.getItem(UI_LAYOUT_KEY) || "{}") || {};
  } catch {
    uiDebugLayout = {};
  }
}

function saveUiDebugLayout() {
  localStorage.setItem(UI_LAYOUT_KEY, JSON.stringify(uiDebugLayout));
}

function stageBounds() {
  return document.getElementById("stage")?.getBoundingClientRect();
}

function applyUiDebugPosition(element, position) {
  if (!element || !position) return;
  const computed = getComputedStyle(element);
  if (computed.position === "static") element.style.position = "relative";
  element.style.left = `${position.left}%`;
  element.style.top = `${position.top}%`;
  element.style.right = "auto";
  element.style.bottom = "auto";
}

function ensureUiDebugPanel() {
  let panel = document.getElementById("uiDebugPanel");
  if (panel) return panel;
  panel = document.createElement("div");
  panel.id = "uiDebugPanel";
  panel.className = "ui-debug-panel hidden";
  panel.innerHTML = `
    <strong>UI\u8c03\u8bd5</strong>
    <span>Alt + A \u5f00\u5173\uff0c\u62d6\u52a8\u5143\u7d20\u81ea\u52a8\u4fdd\u5b58</span>
    <button type="button" data-ui-save>\u4fdd\u5b58\u4f4d\u7f6e</button>
    <button type="button" data-ui-reset>閲嶇疆浣嶇疆</button>
  `;
  document.body.appendChild(panel);
  panel.querySelector("[data-ui-save]")?.addEventListener("click", () => {
    saveUiDebugLayout();
    notify("UI \u4f4d\u7f6e\u5df2\u4fdd\u5b58", "info");
  });
  panel.querySelector("[data-ui-reset]")?.addEventListener("click", () => {
    uiDebugLayout = {};
    localStorage.removeItem(UI_LAYOUT_KEY);
    updateUiDebugTargets();
    notify("\u5df2\u91cd\u7f6e UI \u8c03\u8bd5\u4f4d\u7f6e", "info");
  });
  return panel;
}

function setUiDebugEnabled(enabled) {
  uiDebugEnabled = enabled;
  localStorage.setItem(UI_DEBUG_ENABLED_KEY, enabled ? "1" : "0");
  document.body.classList.toggle("ui-debug-mode", enabled);
  ensureUiDebugPanel().classList.toggle("hidden", !enabled);
  updateUiDebugTargets();
  notify(enabled ? "UI\u8c03\u8bd5\u6a21\u5f0f\u5df2\u5f00\u542f" : "UI\u8c03\u8bd5\u6a21\u5f0f\u5df2\u5173\u95ed", "info");
}

function updateUiDebugTargets() {
  document.querySelectorAll("[data-ui-debug-id]").forEach(element => {
    element.classList.remove("ui-debug-target");
    element.classList.remove("ui-debug-selected");
    element.removeAttribute("data-ui-debug-id");
    element.removeAttribute("data-ui-debug-label");
  });
  uiDebugTargets.forEach(target => {
    document.querySelectorAll(target.selector).forEach((element, index) => {
      const id = index ? `${target.id}.${index + 1}` : target.id;
      element.dataset.uiDebugId = id;
      element.dataset.uiDebugLabel = target.label;
      if (uiDebugLayout[id]) applyUiDebugPosition(element, uiDebugLayout[id]);
      element.classList.toggle("ui-debug-target", uiDebugEnabled);
      element.classList.toggle("ui-debug-selected", uiDebugEnabled && uiDebugSelectedId === id);
    });
  });
}

function selectUiDebugTarget(element) {
  if (!element) return;
  uiDebugSelectedId = element.dataset.uiDebugId;
  document.querySelectorAll(".ui-debug-selected").forEach(item => item.classList.remove("ui-debug-selected"));
  element.classList.add("ui-debug-selected");
}

function moveSelectedUiDebugTarget(key, fast) {
  if (!uiDebugEnabled || !uiDebugSelectedId) return false;
  const element = document.querySelector(`[data-ui-debug-id="${CSS.escape(uiDebugSelectedId)}"]`);
  if (!element) return false;
  const rect = stageBounds();
  if (!rect) return false;
  const elementRect = element.getBoundingClientRect();
  const current = uiDebugLayout[uiDebugSelectedId] || {
    left: ((elementRect.left - rect.left) / rect.width) * 100,
    top: ((elementRect.top - rect.top) / rect.height) * 100
  };
  const step = fast ? 1 : 0.1;
  const next = {
    left: Number(current.left),
    top: Number(current.top)
  };
  if (key === "ArrowLeft") next.left -= step;
  if (key === "ArrowRight") next.left += step;
  if (key === "ArrowUp") next.top -= step;
  if (key === "ArrowDown") next.top += step;
  next.left = Math.max(-20, Math.min(120, Number(next.left.toFixed(3))));
  next.top = Math.max(-20, Math.min(120, Number(next.top.toFixed(3))));
  uiDebugLayout[uiDebugSelectedId] = next;
  applyUiDebugPosition(element, next);
  saveUiDebugLayout();
  return true;
}

function initializeUiDebug() {
  loadUiDebugLayout();
  uiDebugEnabled = localStorage.getItem(UI_DEBUG_ENABLED_KEY) === "1";
  document.body.classList.toggle("ui-debug-mode", uiDebugEnabled);
  ensureUiDebugPanel().classList.toggle("hidden", !uiDebugEnabled);

  let dragState = null;
  document.addEventListener("pointerdown", event => {
    if (!uiDebugEnabled) return;
    if (event.target.closest(".ui-debug-panel")) return;
    const element = event.target.closest("[data-ui-debug-id]");
    if (!element) return;
    const rect = stageBounds();
    if (!rect) return;
    const elementRect = element.getBoundingClientRect();
    dragState = {
      element,
      id: element.dataset.uiDebugId,
      pointerId: event.pointerId,
      offsetX: event.clientX - elementRect.left,
      offsetY: event.clientY - elementRect.top
    };
    selectUiDebugTarget(element);
    element.classList.add("ui-debug-dragging");
    element.setPointerCapture?.(event.pointerId);
    event.preventDefault();
    event.stopPropagation();
  }, true);

  document.addEventListener("pointermove", event => {
    if (!dragState || event.pointerId !== dragState.pointerId) return;
    const rect = stageBounds();
    if (!rect) return;
    const left = ((event.clientX - rect.left - dragState.offsetX) / rect.width) * 100;
    const top = ((event.clientY - rect.top - dragState.offsetY) / rect.height) * 100;
    const position = {
      left: Math.max(-20, Math.min(120, Number(left.toFixed(3)))),
      top: Math.max(-20, Math.min(120, Number(top.toFixed(3))))
    };
    uiDebugLayout[dragState.id] = position;
    applyUiDebugPosition(dragState.element, position);
    event.preventDefault();
  }, true);

  document.addEventListener("pointerup", event => {
    if (!dragState || event.pointerId !== dragState.pointerId) return;
    dragState.element.classList.remove("ui-debug-dragging");
    dragState.element.releasePointerCapture?.(event.pointerId);
    saveUiDebugLayout();
    dragState = null;
    event.preventDefault();
    event.stopPropagation();
  }, true);

  document.addEventListener("pointercancel", () => {
    if (!dragState) return;
    dragState.element.classList.remove("ui-debug-dragging");
    saveUiDebugLayout();
    dragState = null;
  }, true);
}

function updateStatusBar() {
  const mode = document.getElementById("statusMode");
  const title = document.getElementById("statusTitle");
  const meta = document.getElementById("statusMeta");
  const contract = document.getElementById("contractCount");
  const letter = document.getElementById("letterCount");
  if (!mode || !title || !meta) return;
  contract.textContent = state.bag.shadow_contract || 0;
  letter.textContent = state.bag.taboo_letter || 0;
  const completed = state.completedChapters.length;
  if (currentTab === "Story") {
    mode.textContent = "鍓ф儏杩涘害";
    title.textContent = state.unlockedChapters.at(-1) || "1-1";
    meta.textContent = state.unlockedChapters.at(-1) || "1-1";
  }
  if (currentTab === "Raise") {
    const ghost = state.ghosts[activeGhost];
    resetDailyIfNeeded(activeGhost);
    mode.textContent = "褰撳墠鍏绘垚";
    title.textContent = soulDisplay[activeGhost]?.name || ghostCatalog[activeGhost]?.name || "鏈€夋嫨";
    meta.textContent = `浠婃棩 ${Math.max(0, 10 - ghost.daily)}/10`;
  }
  if (currentTab === "Gacha") {
    const poolId = document.getElementById("tabGacha")?.dataset.pool || "limited";
    const pool = pools[poolId];
    const pity = state.pity[poolId];
    mode.textContent = "鍙鍗℃睜";
    title.textContent = pool.name;
    meta.textContent = `SSR ${pool.ssrPity - pity.ssr} 鎶藉唴蹇呭嚭`;
  }
  if (currentTab === "Bag") {
    const count = bagEntriesFor(activeBagTab).length;
    mode.textContent = "鑳屽寘瀹归噺";
    title.textContent = bagCategoryName(activeBagTab);
    meta.textContent = `${count}/48`;
  }
  if (currentTab === "Hub") {
    mode.textContent = "主界面";
    title.textContent = "九号楼";
    meta.textContent = "档案待处理";
  }
  updateContextHint();
}

function currencyLabel(type) {
  return type === "gold" ? "\u91d1" : "\u7075";
}

function currencyIconPath(type) {
  return type === "gold" ? "./assets/item_icons/icon_gold.png" : "./assets/item_icons/icon_spirit.png";
}

function summonCostMarkup(type, amount) {
  return `<small><img src="${currencyIconPath(type)}" alt="${currencyLabel(type)}"><span>x${amount}</span></small>`;
}

function updateCurrencyDisplays(root = document) {
  root.querySelectorAll(".hub-gold-value, .story-hud-gold-value, .summon-gold span, .bag-art-gold span, .soul-gold span").forEach(el => {
    el.textContent = state.currency?.gold ?? 0;
  });
  root.querySelectorAll(".hub-spirit-value, .story-hud-spirit-value, .summon-spirit span, .bag-art-spirit span, .soul-spirit span").forEach(el => {
    el.textContent = state.currency?.spirit ?? 0;
  });
}

function updateContextHint() {
  const hint = document.getElementById("contextHint");
  if (!hint) return;
  const text = {
    Story: "点击章节或回合进入剧情，完成当前回合后才会解锁下一回合。",
    Raise: "在御魂中赠送道具可提升好感度，不同道具效果不同。",
    Gacha: "普通召唤消耗金币，神秘召唤消耗灵。",
    Bag: "在背包中选择道具后点击使用，可直接跳转御魂界面。"
  }[currentTab] || "";
  hint.textContent = text;
}

function updateFx() {}

function notify(text, tone = "info") {
  const layer = document.getElementById("toastLayer");
  if (!layer) return;
  layer.className = `toast-layer ${tone}`;
  layer.textContent = text;
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => {
    layer.className = "toast-layer hidden";
  }, 1800);
}

function applyGift(ghostId, itemId, count, silent = false) {
  const ghost = state.ghosts[ghostId];
  const item = items[itemId];
  if (!ghost || !item) return;
  const gainedExp = Math.round((item.trust || 0) * count * 100);
  const levelResult = addAffinityExp(ghost, gainedExp);
  const totalTrust = ((ghost.affinityLevel - 1) * affinityExpPerLevel + ghost.affinityExp) / affinityExpPerLevel * 12.5;
  ghost.trust = Math.max(0, Math.min(100, Math.round(totalTrust)));
  ghost.danger = Math.max(0, Math.min(100, ghost.danger + Math.round((item.danger || 0) * count)));
  if (!silent) notify(levelResult.after > levelResult.before ? "\u597d\u611f\u7b49\u7ea7\u63d0\u5347" : "\u9972\u80b2\u5df2\u751f\u6548", "info");
  return levelResult;
}

function bagEntriesFor(tab = activeBagTab) {
  return Object.entries(state.bag || {}).filter(([, count]) => count > 0).map(([id, count]) => ({ id, count }));
}

function bagCategoryName(tab = activeBagTab) {
  const names = {
    items: "\u9053\u5177\u80cc\u5305",
    cards: "\u5361\u724c\u80cc\u5305",
    all: "\u5168\u90e8"
  };
  return names[tab] || names.items;
}

function showChapterModal(chapter, done) {
  const layer = document.getElementById("modalLayer");
  if (!layer) return;
  layer.className = "modal-layer";
  layer.innerHTML = `
    <article class="game-modal chapter-modal">
      <button class="modal-close" data-close="1">\u00d7</button>
      <div class="modal-thumb">${chapter.thumb || "\u5377"}</div>
      <div>
        <span class="kicker">Story Round</span>
        <h2>${chapter.title}</h2>
        <p>${chapter.desc || ""}</p>
        <div class="modal-actions">
          <button class="primary" data-enter="1">${done ? "\u56de\u987e\u5267\u60c5" : "\u8fdb\u5165\u5267\u60c5"}</button>
          <button data-close="1">\u53d6\u6d88</button>
        </div>
      </div>
    </article>
  `;
  layer.querySelector("[data-enter]")?.addEventListener("click", () => {
    closeModal();
    startStory(chapter.id);
  });
  layer.querySelectorAll("[data-close]").forEach(btn => btn.addEventListener("click", closeModal));
}

function showRoundEnterModal(round) {
  const layer = document.getElementById("modalLayer");
  if (!layer || !round) return;
  layer.className = "modal-layer story-enter-layer";
  layer.innerHTML = `
    <article class="story-enter-modal">
      <img class="story-enter-bg" src="./assets/story_ui/bg_round_enter.png" alt="">
      <div class="story-enter-copy">
        <h2>${round.title || "\u672a\u547d\u540d\u56de\u5408"}</h2>
        <p>${round.desc || "\u786e\u8ba4\u662f\u5426\u8fdb\u5165\u8be5\u6bb5\u5267\u60c5\uff1f"}</p>
      </div>
      <button class="story-enter-close" data-close="1" type="button">
        <img src="./assets/story_ui/btn_round_enter.png" alt="">
        <span>\u6682\u65f6\u79bb\u5f00</span>
      </button>
      <button class="story-enter-btn" data-enter="1" type="button">
        <img src="./assets/story_ui/btn_round_enter.png" alt="">
        <span>\u8fdb\u5165\u5267\u60c5</span>
      </button>
    </article>
  `;
  layer.querySelector("[data-enter]")?.addEventListener("click", () => {
    closeModal();
    startStory(round.id);
  });
  layer.querySelectorAll("[data-close]").forEach(btn => btn.addEventListener("click", closeModal));
  updateUiDebugTargets();
}

function closeModal() {
  const layer = document.getElementById("modalLayer");
  if (!layer) return;
  layer.className = "modal-layer hidden";
  layer.innerHTML = "";
}

function hasPendingBranchChoice() {
  const choices = document.getElementById("choices");
  return !!choices && choices.querySelectorAll("button").length > 0;
}

function renderRaiseTab() {
  const root = document.getElementById("tabRaise");
  if (!root) return;
  const ghost = state.ghosts[activeGhost] || { trust: 0, danger: 0, stage: 1, daily: 0 };
  const catalog = { ...(ghostCatalog[activeGhost] || {}), ...(soulDisplay[activeGhost] || { name: "\u955c\u4e2d\u5f71", rarity: "SSR", quote: "" }) };
  const affinity = normalizeAffinity(ghost);
  const trust = Math.max(0, Math.min(100, ((affinity.level - 1) * affinityExpPerLevel + affinity.exp) / (affinityMaxLevel * affinityExpPerLevel) * 100));
  const lore = soulLore[activeGhost] || soulLore.mirror;
  const itemCells = Array.from({ length: 35 }, (_, index) => {
    const itemId = soulGiftItems[index % soulGiftItems.length];
    const item = giftDisplay[itemId] || items[itemId] || { name: "\u793c\u7269", icon: "\u7269", hint: "" };
    const count = state.bag?.[itemId] || 0;
    const owned = index < soulGiftItems.length && count > 0;
    return `
      <button class="soul-item ${owned ? "owned" : ""}" type="button" ${index < soulGiftItems.length ? `data-gift-id="${itemId}"` : ""}>
        <img src="./assets/raise_ui/item_panel.png" alt="">
        <span class="soul-plus">${index < soulGiftItems.length ? `<img src="${getItemIconPath(itemId)}" alt="${item.name}">` : "+"}</span>
        ${index < soulGiftItems.length ? `<small>x${count}</small><strong>${item.name}</strong>` : ""}
      </button>
    `;
  }).join("");
  const affinityTitle = affinity.title;
  const feedContent = `
          <div class="soul-title">${affinity.title}</div>
          <div class="soul-exp">
            <img class="soul-exp-bg" src="./assets/raise_ui/exp_bar_bg.png" alt="">
            <img class="soul-exp-bar" src="./assets/raise_ui/exp_bar.png" alt="" style="width:${affinity.progress}%">
            <p><span>Lv.${affinity.level}</span>銆€${affinity.exp} /${affinityExpPerLevel}</p>
          </div>
          <div class="soul-item-area">
            <div class="soul-items">
              ${itemCells}
            </div>
            <div class="soul-scrollbar">
              <img class="soul-slider-bg" src="./assets/raise_ui/slider_bg.png" alt="">
              <img class="soul-slider-bar" src="./assets/raise_ui/slider_bar.png" alt="">
            </div>
          </div>
          <p class="soul-tip">\u8d60\u9001\u793c\u7269\uff0c\u53ef\u4ee5\u63d0\u5347\u597d\u611f\u5fe0\u8bda\u5ea6</p>
  `;
  const infoContent = `
          <div class="soul-title">${affinityTitle}</div>
          <div class="soul-exp soul-info-exp">
            <img class="soul-exp-bg" src="./assets/raise_ui/exp_bar_bg.png" alt="">
            <img class="soul-exp-bar" src="./assets/raise_ui/exp_bar.png" alt="" style="width:${lore.bond || trust}%">
            <p><span>${lore.bond || Math.round(trust)}</span> /100</p>
          </div>
          <div class="soul-info-body">
            ${(lore.info || []).map((line, index) => `<p class="${index > 1 ? "long" : ""}">${line}</p>`).join("")}
          </div>
          <div class="soul-info-footer">
            <span>\u5371\u9669\u7b49\u7ea7\uff1a<em>\u9ad8</em></span>
            <span>\u6765\u6e90\uff1a11F\u672a\u5f52\u6863\u9879\u76ee\u7ec4</span>
          </div>
  `;
  const bioRows = (lore.bios || []).map((bio, index) => {
    const unlocked = true;
    return `
      <button class="soul-bio-row ${unlocked ? "unlocked" : "locked"}" data-bio-index="${index}" type="button">
        <img class="soul-bio-bg" src="./assets/raise_ui/bg_bio.png" alt="">
        <span class="soul-bio-thumb"></span>
        <span class="soul-bio-copy">
          <strong>\u4f20\u8bb0${["\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94"][index]}\u3000${bio.title}</strong>
          <small>${unlocked ? bio.brief : "\u672a\u89e3\u9501"}</small>
        </span>
        <img class="soul-bio-state" src="./assets/raise_ui/${unlocked ? "bio_active" : "bio_inactive"}.png?v=89" alt="">
      </button>
    `;
  }).join("");
  const bioContent = `
          <div class="soul-title">\u4f20\u3000\u8bb0</div>
          <div class="soul-bio-list">
            ${bioRows}
          </div>
  `;
  const soulPanelContent = activeSoulTab === "info" ? infoContent : activeSoulTab === "bio" ? bioContent : feedContent;
  root.innerHTML = `
    <div class="soul-screen">
      <img class="soul-bg" src="./assets/module_bg/bg_soul_main.jpg" alt="">
      <div class="soul-vignette"></div>
      <button class="soul-back" type="button" aria-label="返回主界面">
        <img src="./assets/raise_ui/btn_back.png" alt="">
      </button>
      <div class="soul-titlebar">
        <img src="./assets/raise_ui/bar_title.png" alt="">
        <strong>\u5fa1\u9b42</strong>
      </div>

      <div class="soul-currency soul-gold">
        <img src="./assets/main_ui/frame_gold.png" alt="">
        <span>152234</span>
      </div>
      <div class="soul-currency soul-spirit">
        <img src="./assets/main_ui/frame_spirit.png" alt="">
        <span>152234</span>
      </div>

      <aside class="soul-name-plate">
        <img src="./assets/raise_ui/bar_ghost_name.png" alt="">
        <strong>${catalog.name || "\u8be1\u5f02\u540d\u5b57"}</strong>
      </aside>

      <section class="soul-character soul-character-${activeGhost}" aria-label="寰￠瓊灞曠ず">
        <div class="soul-character-aura"></div>
        <div class="soul-character-figure"><img src="${soulPortraits[activeGhost] || ""}" alt="${catalog.name || ""}"></div>
        <button class="soul-page soul-page-prev" type="button"><img src="./assets/raise_ui/btn_page.png" alt=""></button>
        <button class="soul-page soul-page-next" type="button"><img src="./assets/raise_ui/btn_page.png" alt=""></button>
      </section>

      <section class="soul-feed-panel">
        <img class="soul-feed-frame" src="./assets/raise_ui/bg_feed_show.png" alt="">
        <div class="soul-feed-content">
          ${soulPanelContent}
        </div>
      </section>

      <nav class="soul-side-tabs" aria-label="寰￠瓊鍒嗛〉">
        <button class="${activeSoulTab === "feed" ? "selected" : ""}" data-soul-tab="feed" type="button"><img src="./assets/raise_ui/${activeSoulTab === "feed" ? "tab_selected" : "tab_unselected"}.png" alt=""><span>\u9972 \u517b</span></button>
        <button class="${activeSoulTab === "info" ? "selected" : ""}" data-soul-tab="info" type="button"><img src="./assets/raise_ui/${activeSoulTab === "info" ? "tab_selected" : "tab_unselected"}.png" alt=""><span>\u60c5 \u62a5</span></button>
        <button class="${activeSoulTab === "bio" ? "selected" : ""}" data-soul-tab="bio" type="button"><img src="./assets/raise_ui/${activeSoulTab === "bio" ? "tab_selected" : "tab_unselected"}.png" alt=""><span>\u4f20 \u8bb0</span></button>
      </nav>
    </div>
  `;
  root.querySelector(".soul-back")?.addEventListener("click", showMainHub);
  root.querySelector(".soul-page-prev")?.addEventListener("click", () => switchSoul(-1));
  root.querySelector(".soul-page-next")?.addEventListener("click", () => switchSoul(1));
  root.querySelectorAll("[data-soul-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      const nextTab = btn.dataset.soulTab || "feed";
      const shouldOpenBio = nextTab === "bio" && activeSoulTab === "bio";
      activeSoulTab = nextTab;
      renderRaiseTab();
      updateUiDebugTargets();
      if (shouldOpenBio) window.setTimeout(() => showSoulBioModal(0), 40);
    });
  });
  root.querySelectorAll("[data-gift-id]").forEach(btn => {
    const openGift = event => {
      event.stopPropagation();
      feedSoulGift(btn.dataset.giftId);
    };
    btn.addEventListener("click", openGift);
    btn.addEventListener("swipeclick", openGift);
  });
  root.querySelectorAll("[data-bio-index]").forEach(btn => {
    const openBio = event => {
      event.stopPropagation();
      showSoulBioModal(Number(btn.dataset.bioIndex));
    };
    btn.addEventListener("click", openBio);
    btn.addEventListener("swipeclick", openBio);
  });
  const items = root.querySelector(".soul-items");
  const bar = root.querySelector(".soul-slider-bar");
  const syncSoulSlider = () => {
    if (!items || !bar) return;
    const maxScroll = Math.max(1, items.scrollHeight - items.clientHeight);
    const maxMove = Math.max(0, items.clientHeight - bar.clientHeight);
    bar.style.transform = `translateY(${(items.scrollTop / maxScroll) * maxMove}px)`;
  };
  items?.addEventListener("scroll", syncSoulSlider, { passive: true });
  bindSwipeScroll(items, syncSoulSlider);
  bindSwipeScroll(root.querySelector(".soul-info-body"));
  bindSwipeScroll(root.querySelector(".soul-bio-list"));
  requestAnimationFrame(syncSoulSlider);
}

function feedSoulGift(itemId) {
  if (!itemId || !soulGiftItems.includes(itemId)) return;
  showSoulGiftModal(itemId);
}

function showSoulGiftModal(itemId) {
  const item = giftDisplay[itemId] || items[itemId] || { name: "\u793c\u7269", icon: "\u7269" };
  const count = state.bag?.[itemId] || 0;
  const maxCount = Math.max(1, Math.min(10, count));
  const layer = document.getElementById("modalLayer");
  if (!layer) return;
  layer.className = "modal-layer soul-gift-layer";
  layer.innerHTML = `
    <article class="soul-gift-modal">
      <img class="soul-gift-frame" src="./assets/story_ui/frame_dialog.png" alt="">
      <h2>\u9001\u51fa\u793c\u7269</h2>
      <div class="soul-gift-preview">
        <span>${item.icon || "\u7269"}</span>
        <strong>${item.name}</strong>
        <small>\u6301\u6709\uff1a${count}</small>
      </div>
      <div class="soul-gift-count">
        <button data-gift-minus type="button">-</button>
        <span data-gift-count>1</span>
        <button data-gift-plus type="button">+</button>
      </div>
      <p>\u786e\u8ba4\u5c06\u8be5\u793c\u7269\u9001\u7ed9\u5f53\u524d\u5fa1\u9b42\uff1f</p>
      <button class="soul-gift-cancel" data-close="1" type="button">
        <img src="./assets/story_ui/btn_round_enter.png" alt="">
        <span>\u53d6\u6d88</span>
      </button>
      <button class="soul-gift-confirm ${count <= 0 ? "disabled" : ""}" data-confirm-gift type="button">
        <img src="./assets/story_ui/btn_round_enter.png" alt="">
        <span>${count <= 0 ? "\u6570\u91cf\u4e0d\u8db3" : "\u786e\u5b9a\u9001\u51fa"}</span>
      </button>
    </article>
  `;
  let selectedCount = 1;
  const countText = layer.querySelector("[data-gift-count]");
  const renderCount = () => {
    if (countText) countText.textContent = String(selectedCount);
  };
  layer.querySelector("[data-gift-minus]")?.addEventListener("click", () => {
    selectedCount = Math.max(1, selectedCount - 1);
    renderCount();
  });
  layer.querySelector("[data-gift-plus]")?.addEventListener("click", () => {
    selectedCount = Math.min(maxCount, selectedCount + 1);
    renderCount();
  });
  layer.querySelector("[data-confirm-gift]")?.addEventListener("click", () => {
    if (count <= 0) {
      notify("\u793c\u7269\u6570\u91cf\u4e0d\u8db3", "warn");
      return;
    }
    confirmSoulGift(itemId, selectedCount);
  });
  layer.querySelector("[data-close]")?.addEventListener("click", closeModal);
}

function confirmSoulGift(itemId, count) {
  const owned = state.bag?.[itemId] || 0;
  const finalCount = Math.max(1, Math.min(count, owned));
  if (finalCount <= 0) {
    notify("\u793c\u7269\u6570\u91cf\u4e0d\u8db3", "warn");
    closeModal();
    return;
  }
  state.bag[itemId] = owned - finalCount;
  const levelResult = applyGift(activeGhost, itemId, finalCount, true);
  saveState();
  const leveled = levelResult && levelResult.after > levelResult.before;
  notify(leveled ? `\u597d\u611f\u63d0\u5347\u81f3 Lv.${levelResult.after}` : `${giftDisplay[itemId]?.name || "\u793c\u7269"} x${finalCount}\u5df2\u9001\u51fa`, "info");
  closeModal();
  renderRaiseTab();
  updateUiDebugTargets();
}

function showSoulBioModal(index) {
  const lore = soulLore[activeGhost] || soulLore.mirror;
  const bio = lore.bios?.[index];
  if (!bio) {
    notify("\u4f20\u8bb0\u5c1a\u672a\u89e3\u9501", "warn");
    return;
  }
  const layer = document.getElementById("modalLayer");
  if (!layer) return;
  layer.className = "modal-layer soul-bio-layer";
  const bioBody = formatBioBody(bio.body);
  layer.innerHTML = `
    <article class="soul-bio-modal">
      <img class="soul-bio-modal-frame" src="./assets/raise_ui/bg_feed_show.png" alt="">
      <h2>${escapeHtml(bio.title)}</h2>
      <div class="soul-bio-modal-body">
        ${bioBody}
      </div>
    </article>
  `;
  const modal = layer.querySelector(".soul-bio-modal");
  layer.addEventListener("click", event => {
    if (event.target === layer) closeModal();
  });
  modal?.addEventListener("click", event => event.stopPropagation());
  bindSwipeScroll(layer.querySelector(".soul-bio-modal-body"));
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatBioBody(value = "") {
  return String(value)
    .split(/\n+/)
    .map(part => part.trim())
    .filter(Boolean)
    .map(part => `<p>${escapeHtml(part)}</p>`)
    .join("");
}

function renderGachaTab() {
  const root = document.getElementById("tabGacha");
  if (!root) return;
  const isNormal = activeSummonPool === "normal";
  const config = summonConfig[activeSummonPool] || summonConfig.normal;
  root.innerHTML = `
    <div class="summon-screen">
      <img class="summon-bg" src="./assets/module_bg/bg_draw_main.jpg" alt="">
      <div class="summon-bg-mask"></div>
      <button class="summon-back" type="button" aria-label="\u8fd4\u56de\u4e3b\u754c\u9762"><img src="./assets/raise_ui/btn_back.png" alt=""></button>
      <div class="summon-titlebar">
        <img src="./assets/raise_ui/bar_title.png" alt="">
        <strong>\u53ec\u5524</strong>
        <small>SUMMON</small>
      </div>

      <div class="summon-currency summon-gold">
        <img src="./assets/main_ui/frame_gold.png" alt="">
        <span>${state.currency.gold}</span>
      </div>
      <div class="summon-currency summon-spirit">
        <img src="./assets/main_ui/frame_spirit.png" alt="">
        <span>${state.currency.spirit}</span>
      </div>

      <section class="summon-preview-panel">
        <img class="summon-preview-bg" src="./assets/summon_ui/bar_ad_left.png" alt="">
        <div class="summon-preview-main">
          <img src="./assets/cards/SP001.png" alt="SP001">
        </div>
        <div class="summon-progress">
          <span></span>
        </div>
        <div class="summon-reward-row">
          <div class="summon-preview-card">
            <img class="summon-preview-frame" src="./assets/summon_ui/frame_reward_preview.png" alt="">
            <img class="summon-preview-face" src="./assets/cards/SP001.png" alt="SP001">
          </div>
          <img src="./assets/summon_ui/frame_reward_preview.png" alt="">
          <img src="./assets/summon_ui/frame_reward_preview.png" alt="">
        </div>
      </section>

      <img class="summon-fx" src="./assets/summon_ui/eff_summon.png" alt="">

      <button class="summon-btn summon-once" type="button">
        <img src="./assets/summon_ui/btn_summon.png" alt="">
        <span>\u53ec\u5524\u4e00\u6b21</span>
        ${summonCostMarkup(config.currency, config.single)}
      </button>
      <button class="summon-btn summon-ten" type="button">
        <img src="./assets/summon_ui/btn_summon.png" alt="">
        <span>\u53ec\u5524\u5341\u6b21</span>
        ${summonCostMarkup(config.currency, config.ten)}
      </button>

      <aside class="summon-pool-panel">
        <img class="summon-pool-frame" src="./assets/summon_ui/bg_summon.png" alt="">
        <button class="summon-pool-card ${isNormal ? "selected" : ""}" data-summon-pool="normal" type="button">
          <img src="./assets/summon_ui/summon_normal_${isNormal ? "selected" : "unselected"}.png" alt="">
        </button>
        <button class="summon-pool-card ${!isNormal ? "selected" : ""}" data-summon-pool="mystery" type="button">
          <img src="./assets/summon_ui/summon_mystery_${!isNormal ? "selected" : "unselected"}.png" alt="">
        </button>
      </aside>
      <div class="summon-result-layer hidden"></div>
    </div>
  `;
  root.querySelector(".summon-back")?.addEventListener("click", showMainHub);
  root.querySelector(".summon-once")?.addEventListener("click", () => performSummon(1));
  root.querySelector(".summon-ten")?.addEventListener("click", () => performSummon(10));
  root.querySelectorAll("[data-summon-pool]").forEach(btn => {
    btn.addEventListener("click", () => {
      activeSummonPool = btn.dataset.summonPool || "normal";
      renderGachaTab();
      updateUiDebugTargets();
    });
  });
}

function pickFromWeighted(table) {
  const total = table.reduce((sum, item) => sum + item.weight, 0);
  let roll = Math.random() * total;
  for (const item of table) {
    roll -= item.weight;
    if (roll <= 0) return item;
  }
  return table[0];
}

function pickCardByRarity(rarity) {
  const pool = summonCards.filter(card => card.rarity === rarity);
  if (!pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

function createSummonResult(poolId) {
  const drawRule = pickFromWeighted(summonRateTables[poolId] || summonRateTables.normal);
  if (drawRule.kind === "item") {
    const itemId = rewardItemPool[Math.floor(Math.random() * rewardItemPool.length)];
    const itemDef = items[itemId] || {};
    state.bag[itemId] = (state.bag[itemId] || 0) + 1;
    return {
      kind: "item",
      id: itemId,
      image: itemDef.iconPath || "./assets/item_icons/icon_book.png",
      name: itemDef.name || itemId,
      rarity: "N",
      rarityLabel: "道具",
      rare: false,
      color: "#58c777"
    };
  }
  const card = pickCardByRarity(drawRule.rarity) || pickCardByRarity("N");
  if (!card) return null;
  state.cards[card.id] = (state.cards[card.id] || 0) + 1;
  const visual = rarityVisual[card.rarity] || rarityVisual.N;
  return {
    kind: "card",
    id: card.id,
    image: card.image,
    name: card.name,
    rarity: card.rarity,
    rarityLabel: visual.label,
    rare: visual.rare,
    color: visual.color
  };
}

function performSummon(count) {
  const config = summonConfig[activeSummonPool] || summonConfig.normal;
  const cost = count === 10 ? config.ten : config.single;
  const current = state.currency[config.currency] || 0;
  if (current < cost) {
    notify(`${currencyLabel(config.currency)}\u4e0d\u8db3`, "warn");
    return;
  }
  state.currency[config.currency] = current - cost;
  const results = Array.from({ length: count }, () => createSummonResult(activeSummonPool)).filter(Boolean);
  state.lastDraws = results;
  saveState();
  updateCurrencyDisplays();
  renderBagTab();
  showSummonResults(results);
}

function showSummonResults(results) {
  const layer = document.querySelector("#tabGacha .summon-result-layer");
  if (!layer) return;
  const rare = results.find(item => item.rare);
  layer.className = `summon-result-layer ${results.length === 1 ? "single" : "ten"}`;
  layer.innerHTML = `
    <div class="summon-result-backdrop"></div>
    <section class="summon-result-board">
      <div class="summon-result-grid">
        ${results.map((card, index) => `
          <button class="summon-card summon-${card.kind} rarity-${card.rarity}" type="button" style="--rarity:${card.color}; --delay:${index * 110}ms">
            <span class="summon-card-back"><img src="./assets/cards/card_back.png" alt=""></span>
            <span class="summon-card-front">
              <img src="${card.image}" alt="${card.name}">
              <strong>${card.name}</strong>
              <small>${card.rarityLabel}</small>
            </span>
          </button>
        `).join("")}
      </div>
      <button class="summon-result-close" type="button">
        <img src="./assets/onboarding/btn_common.png" alt="">
        <span>\u6536\u8d77</span>
      </button>
    </section>
    ${rare ? `
      <section class="summon-rare-show hidden rarity-${rare.rarity}">
        <div class="summon-rare-card" style="--rarity:${rare.color}">
          <img src="${rare.image}" alt="${rare.name}">
          <strong>${rare.name}</strong>
          <span>${rare.rarityLabel} 稀有</span>
        </div>
      </section>
    ` : ""}
  `;
  requestAnimationFrame(() => {
    layer.querySelectorAll(".summon-card").forEach((card, index) => {
      window.setTimeout(() => card.classList.add("revealed"), 220 + index * 180);
    });
    if (rare) {
      const rareShow = layer.querySelector(".summon-rare-show");
      window.setTimeout(() => rareShow?.classList.remove("hidden"), 520 + results.length * 180);
      rareShow?.addEventListener("click", () => rareShow.classList.add("hidden"));
    }
  });
  layer.querySelector(".summon-result-close")?.addEventListener("click", () => {
    layer.className = "summon-result-layer hidden";
    layer.innerHTML = "";
  });
}

function renderBagTab() {
  const root = document.getElementById("tabBag");
  if (!root) return;
  const itemEntries = bagEntriesFor("items");
  const cardEntries = Object.entries(state.cards || {})
    .filter(([, count]) => count > 0)
    .map(([id, count]) => {
      const card = summonCards.find(entry => entry.id === id);
      return card ? { ...card, count } : null;
    })
    .filter(Boolean);

  const isCardBag = activeBagTab === "cards";
  const entries = isCardBag ? cardEntries : itemEntries;
  if (!activeBagItemId || !entries.some(entry => entry.id === activeBagItemId)) {
    activeBagItemId = entries[0]?.id || null;
  }

  const selected = entries.find(entry => entry.id === activeBagItemId) || null;
  const itemMeta = {
    old_photo: { name: "\u7f20\u7ebf\u7eb8\u5076", icon: "\u5076", desc: "\u7528\u7ea2\u7ebf\u7f20\u7ed5\u7684\u7eb8\u5076\uff0c\u5934\u90e8\u5199\u6709\u6a21\u7cca\u7684\u5492\u6587\uff0c\u4f3c\u4e4e\u4e0e\u516c\u53f8\u5185\u90e8\u88ab\u5c01\u5b58\u7684\u5e9f\u5f03\u9879\u76ee\u6709\u5173\u3002", route: "\u63d0\u4ea4\u81f3\u5c01\u5b58\u6863\u6848\u5ba4\u7684\u732e\u796d\u53f0\uff0c\u53ef\u63d0\u5347\u4e0e\u7279\u5b9a\u7075\u4f53\u7684\u7f81\u7eca\u3002" },
    cracked_lipstick: { name: "\u88c2\u53e3\u5507\u818f", icon: "\u5507", desc: "\u6ca1\u6709\u76d6\u5b50\u7684\u6697\u7ea2\u8272\u5507\u818f\uff0c\u6d82\u9762\u50cf\u88ab\u7259\u9f7f\u54ac\u65ad\u8fc7\u3002", route: "\u9002\u5408\u8d60\u4e88\u4f9d\u604b\u7c7b\u8be1\u5f02\uff0c\u4f46\u4f1a\u5e26\u6765\u5c11\u91cf\u4fb5\u8680\u3002" },
    forbidden_incense: { name: "\u7981\u9999", icon: "\u9999", desc: "\u70b9\u71c3\u540e\u4f1a\u95fb\u5230\u96e8\u591c\u697c\u9053\u7684\u6c14\u5473\u3002", route: "\u7528\u4e8e\u9ad8\u98ce\u9669\u5951\u7ea6\uff0c\u4e00\u6b21\u6295\u5582\u5373\u4f1a\u663e\u8457\u6539\u53d8\u72b6\u6001\u3002" },
    balance_charm: { name: "\u5236\u8861\u7b26", icon: "\u7b26", desc: "\u6cbe\u7740\u51b7\u7070\u7684\u7eb8\u7b26\uff0c\u8fb9\u89d2\u6709\u4e0d\u5c5e\u4e8e\u4eca\u591c\u7684\u6c34\u6e0d\u3002", route: "\u7528\u4e8e\u964d\u4f4e\u4fb5\u8680\u5371\u6b86\uff0c\u7a33\u5b9a\u5df2\u6536\u5bb9\u8be1\u5f02\u3002" },
    shadow_contract: { name: "\u8be1\u5f71\u4e4b\u5951", icon: "\u5951", desc: "\u53ef\u4ee5\u542f\u52a8\u4e00\u6b21\u666e\u901a\u53ec\u5524\u7684\u5951\u7ea6\u51ed\u8bc1\u3002", route: "\u5728\u53ec\u5524\u754c\u9762\u6d88\u8017\uff0c\u53ef\u83b7\u5f97\u65b0\u8be1\u5f02\u6216\u5176\u8bb0\u5fc6\u6b8b\u7247\u3002" },
    taboo_letter: { name: "\u7981\u5fcc\u4e4b\u7b3a", icon: "\u7b3a", desc: "\u7eb8\u9762\u6c38\u8fdc\u6f6e\u6e7f\uff0c\u5374\u4e0d\u4f1a\u6ef4\u6c34\u3002", route: "\u5728\u795e\u79d8\u53ec\u5524\u4e2d\u6d88\u8017\uff0c\u66f4\u5bb9\u6613\u89e6\u53d1\u5f02\u5e38\u5951\u7ea6\u3002" }
  };

  const visible = isCardBag
    ? entries.map(entry => ({
        ...entry,
        desc: `品质：${entry.rarity}。由召唤获得的诡异卡牌。`,
        route: "可在御魂界面查看、培养和解锁传记。"
      }))
    : entries.map(entry => ({ ...entry, ...(itemMeta[entry.id] || items[entry.id] || {}) }));
  const selectedInfo = isCardBag
    ? visible.find(item => item.id === activeBagItemId) || visible[0]
    : selected ? { ...selected, ...(itemMeta[selected.id] || {}) } : visible[0];
  const normalizedInfo = selectedInfo ? {
    ...selectedInfo,
    desc: selectedInfo.desc || "带有诡异气息的收容道具，可用于御魂系统养成与剧情推进。",
    route: selectedInfo.route || "可在御魂界面进行赠礼或献祭。"
  } : null;
  const slotCount = isCardBag ? Math.max(24, visible.length) : 25;
  const cells = Array.from({ length: slotCount }, (_, index) => {
    const item = visible[index];
    const selectedClass = item && item.id === activeBagItemId ? "selected" : "";
    const framePrefix = isCardBag ? "frame_card" : "frame_item";
    return `
      <button class="bag-art-slot ${selectedClass} ${item ? "filled" : "empty"}" type="button" ${item ? `data-bag-item="${item.id}"` : ""}>
        <img src="./assets/bag_ui/${framePrefix}_${selectedClass ? "selected" : "unselected"}.png" alt="">
        ${item ? (isCardBag
          ? `<img class="bag-art-card-mini" src="${item.image}" alt="${item.name}"><small>x${item.count || 1}</small>`
          : `<span class="bag-art-icon has-image"><img src="${getItemIconPath(item.id)}" alt="${item.name || item.id}"></span><small>x${item.count || 1}</small>`) : ""}
      </button>
    `;
  }).join("");
  const panelTitle = isCardBag ? "\u6211\u7684\u8be1\u5f02" : "\u6211\u7684\u9053\u5177";
  const titleText = isCardBag ? "\u8be1\u5f02\u5323\u5b50" : "\u7eb3\u7269\u5e93";
  root.innerHTML = `
    <div class="bag-art-screen ${isCardBag ? "card-mode" : "item-mode"}">
      <img class="bag-art-bg" src="./assets/module_bg/bg_bag_main.jpg" alt="">
      <div class="bag-art-mask"></div>
      <button class="bag-art-back" type="button" aria-label="\u8fd4\u56de\u4e3b\u754c\u9762"><img src="./assets/raise_ui/btn_back.png" alt=""></button>
      <div class="bag-art-titlebar">
        <img src="./assets/raise_ui/bar_title.png" alt="">
        <strong>${titleText}</strong>
      </div>
      <div class="bag-art-currency bag-art-gold">
        <img src="./assets/main_ui/frame_gold.png" alt="">
        <span>152234</span>
      </div>
      <div class="bag-art-currency bag-art-spirit">
        <img src="./assets/main_ui/frame_spirit.png" alt="">
        <span>152234</span>
      </div>

      <section class="bag-art-grid-panel">
        <img class="bag-art-grid-bg" src="./assets/bag_ui/${isCardBag ? "bg_card_panel" : "bg_item_panel"}.png" alt="">
        <h2>${panelTitle}</h2>
        <div class="bag-art-grid">
          ${cells}
        </div>
      </section>

      ${isCardBag ? `
        <section class="bag-art-card-show">
          <div class="bag-art-card-aura"></div>
          <div class="bag-art-card-figure">
            ${normalizedInfo ? `<img class="bag-art-card-face" src="${normalizedInfo.image}" alt="${normalizedInfo.name}">` : ""}
          </div>
        </section>
      ` : `
        <section class="bag-art-info">
          <img class="bag-art-info-bg" src="./assets/bag_ui/bg_item_info_bar.png" alt="">
          <h2>${normalizedInfo?.name || "\u9053\u5177\u540d\u5b57"}</h2>
          <p class="bag-art-count">\u6301\u6709\uff1a <span>${normalizedInfo?.count || 0}</span></p>
          <div class="bag-art-info-icon">
            <img src="./assets/bag_ui/frame_item_info.png" alt="">
            <span><img src="${normalizedInfo?.id ? getItemIconPath(normalizedInfo.id) : "./assets/item_icons/icon_book.png"}" alt="${normalizedInfo?.name || "物品"}"></span>
          </div>
          <img class="bag-art-line line-one" src="./assets/bag_ui/line_split.png" alt="">
          <p class="bag-art-desc">${normalizedInfo?.desc || "\u9009\u62e9\u4e00\u4e2a\u9053\u5177\u67e5\u770b\u8be6\u60c5\u3002"}</p>
          <img class="bag-art-line line-two" src="./assets/bag_ui/line_split.png" alt="">
          <h3>\u4f7f\u7528\u8def\u5f84\uff1a</h3>
          <p class="bag-art-route">${normalizedInfo?.route || ""}</p>
          <button class="bag-art-use" type="button">
            <img src="./assets/summon_ui/btn_summon.png" alt="">
            <span>\u4f7f\u7528</span>
          </button>
        </section>
      `}

      <nav class="bag-art-tabs" aria-label="\u80cc\u5305\u5206\u7c7b">
        <button class="${isCardBag ? "selected" : ""}" data-bag-tab="cards" type="button">
          <img src="./assets/bag_ui/${isCardBag ? "tab_box_selected" : "tab_box_unselected"}.png" alt="">
          <span>\u8be1\u5f02\u5323\u5b50</span>
        </button>
        <button class="${!isCardBag ? "selected" : ""}" data-bag-tab="items" type="button">
          <img src="./assets/bag_ui/${!isCardBag ? "tab_box_selected" : "tab_box_unselected"}.png" alt="">
          <span>\u9053\u5177\u5323\u5b50</span>
        </button>
      </nav>
    </div>
  `;
  root.querySelector(".bag-art-back")?.addEventListener("click", showMainHub);
  root.querySelectorAll("[data-bag-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      activeBagTab = btn.dataset.bagTab || "items";
      activeBagItemId = null;
      renderBagTab();
      updateUiDebugTargets();
    });
  });
  root.querySelectorAll("[data-bag-item]").forEach(btn => {
    btn.addEventListener("click", () => {
      activeBagItemId = btn.dataset.bagItem;
      renderBagTab();
      updateUiDebugTargets();
    });
  });
  if (isCardBag) {
    const cardGrid = root.querySelector(".bag-art-grid");
    if (cardGrid) bindVerticalDragScroll(cardGrid, btn => {
      const itemButton = btn.closest("[data-bag-item]");
      if (!itemButton) return;
      activeBagItemId = itemButton.dataset.bagItem;
      renderBagTab();
      updateUiDebugTargets();
    });
  }
  root.querySelector(".bag-art-use")?.addEventListener("click", () => {
    activeSoulTab = "feed";
    openModule("Raise");
  });
}

function bindVerticalDragScroll(element, onTap, options = {}) {
  if (element.dataset.dragBound === "1") return;
  element.dataset.dragBound = "1";
  let pointerId = null;
  let startTarget = null;
  let pressedButton = null;
  let suppressClick = false;
  element.addEventListener("wheel", event => {
    event.preventDefault();
    element.scrollTop += event.deltaY;
  }, { passive: false });

  let startY = 0;
  let startScroll = 0;
  let dragged = false;
  element.addEventListener("pointerdown", event => {
    if (event.button !== 0) return;
    pointerId = event.pointerId;
    startTarget = event.target;
    pressedButton = event.target?.closest?.("button");
    if (pressedButton && element.contains(pressedButton) && options.pressClass) {
      pressedButton.classList.remove(options.pressClass);
      void pressedButton.offsetWidth;
      pressedButton.classList.add(options.pressClass);
    }
    startY = event.clientY;
    startScroll = element.scrollTop;
    dragged = false;
    element.classList.add("dragging");
    element.setPointerCapture?.(event.pointerId);
  });
  element.addEventListener("pointermove", event => {
    if (pointerId !== event.pointerId || !element.classList.contains("dragging")) return;
    const delta = event.clientY - startY;
    if (Math.abs(delta) > 4) {
      dragged = true;
      if (pressedButton && options.pressClass) pressedButton.classList.remove(options.pressClass);
    }
    element.scrollTop = startScroll - delta;
  });
  element.addEventListener("pointerup", event => {
    const target = startTarget;
    const wasDragged = dragged;
    const button = pressedButton;
    pointerId = null;
    startTarget = null;
    pressedButton = null;
    element.classList.remove("dragging");
    element.releasePointerCapture?.(event.pointerId);
    if (!wasDragged && typeof onTap === "function") {
      const tapButton = button || target?.closest?.("button");
      if (tapButton && element.contains(tapButton)) {
        suppressClick = true;
        onTap(tapButton, event);
      }
    }
  });
  element.addEventListener("pointercancel", () => {
    if (pressedButton && options.pressClass) pressedButton.classList.remove(options.pressClass);
    pointerId = null;
    startTarget = null;
    pressedButton = null;
    element.classList.remove("dragging");
  });
  element.addEventListener("click", event => {
    if (!dragged && !suppressClick) return;
    event.preventDefault();
    event.stopPropagation();
    dragged = false;
    suppressClick = false;
  }, true);
}

function bindSwipeScroll(element, onScroll) {
  if (!element || element.dataset.swipeBound === "1") return;
  element.dataset.swipeBound = "1";
  let pointerId = null;
  let startY = 0;
  let startScroll = 0;
  let dragged = false;

  element.addEventListener("wheel", event => {
    event.preventDefault();
  }, { passive: false });

  element.addEventListener("pointerdown", event => {
    if (event.button !== 0) return;
    pointerId = event.pointerId;
    startY = event.clientY;
    startScroll = element.scrollTop;
    dragged = false;
    element.classList.add("dragging");
    element.setPointerCapture?.(event.pointerId);
  });

  element.addEventListener("pointermove", event => {
    if (pointerId !== event.pointerId) return;
    const delta = event.clientY - startY;
    if (Math.abs(delta) > 3) dragged = true;
    element.scrollTop = startScroll - delta;
    onScroll?.();
  });

  element.addEventListener("pointerup", event => {
    if (!dragged) {
      const target = document.elementFromPoint(event.clientX, event.clientY)?.closest("[data-gift-id], [data-bio-index]");
      if (target && element.contains(target)) {
        target.dispatchEvent(new CustomEvent("swipeclick", { bubbles: true }));
      }
    }
    pointerId = null;
    element.classList.remove("dragging");
    element.releasePointerCapture?.(event.pointerId);
  });

  element.addEventListener("pointercancel", () => {
    pointerId = null;
    element.classList.remove("dragging");
  });

  element.addEventListener("click", event => {
    if (!dragged) return;
    event.preventDefault();
    event.stopPropagation();
    dragged = false;
  }, true);
}

function playStoryPress(element, className, next) {
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
  const actionDelay = className === "chapter-clicked" ? 260 : 90;
  const clearDelay = className === "chapter-clicked" ? 520 : 140;
  window.setTimeout(next, actionDelay);
  window.setTimeout(() => element.classList.remove(className), clearDelay);
}

function renderStoryTab() {
  const root = document.getElementById("tabStory");
  const fallbackChapter = firstUnlockedStoryChapter();
  const selectedChapter = storyChapters.find(chapter => chapter.id === activeStoryChapterId) || fallbackChapter;
  activeStoryChapterId = selectedChapter.id;
  const selectedRound = firstPlayableRound(selectedChapter);

  root.innerHTML = `
    <div class="story-screen story-compose">
      <img class="story-bg-layer story-bg-a active" alt="">
      <img class="story-bg-layer story-bg-b" alt="">
      <div class="story-dim"></div>
      <img class="story-hud-avatar" src="./assets/main_ui/frame_avatar.png" alt="">
      <div class="story-hud-player"><strong>${playerDisplayName()}</strong></div>
      <img class="story-hud-gold" src="./assets/main_ui/frame_gold.png" alt="">
      <span class="story-hud-gold-value">152234</span>
      <img class="story-hud-spirit" src="./assets/main_ui/frame_spirit.png" alt="">
      <span class="story-hud-spirit-value">152234</span>
      <img class="story-decor-line" src="./assets/story_ui/decor_pattern.png" alt="">
      <section class="story-chapter-list" aria-label="\u5267\u60c5\u7ae0\u8282"></section>
      <aside class="story-turn-panel" aria-label="\u7ae0\u8282\u56de\u5408">
        <img class="story-turn-bg" src="./assets/story_ui/turn_bg.png" alt="">
        <div class="story-turn-list"></div>
      </aside>
      <div class="story-bottom-tabs" aria-label="\u4e3b\u529f\u80fd">
        <img class="story-bottom-pattern" src="./assets/main_ui/bg_pattern.png" alt="">
        <img class="story-bottom-active story-active-story" src="./assets/main_ui/press/btn_story_press.png" alt="">
        <button data-story-tab="Story" class="story-tab-hit story-tab-story" title="\u5267\u60c5"></button>
        <button data-story-tab="Raise" class="story-tab-hit story-tab-raise" title="\u517b\u6210"></button>
        <button data-story-tab="Gacha" class="story-tab-hit story-tab-gacha" title="\u53ec\u5524"></button>
        <button data-story-tab="Bag" class="story-tab-hit story-tab-bag" title="\u80cc\u5305"></button>
        <button data-story-tab="Archive" class="story-tab-hit story-tab-archive" title="\u6863\u6848\u5ba4"></button>
      </div>
    </div>
  `;

  const screen = root.querySelector(".story-compose");
  const chapterRoot = root.querySelector(".story-chapter-list");
  const turnRoot = root.querySelector(".story-turn-list");
  let activeBgIndex = 0;
  let bgReady = false;
  const setStoryBackground = chapter => {
    const layers = screen.querySelectorAll(".story-bg-layer");
    if (layers.length < 2) {
      screen.style.setProperty("--story-bg-image", `url("${chapter.bg}")`);
      return;
    }
    if (!bgReady) {
      layers[0].src = chapter.bg;
      layers[0].classList.add("active");
      layers[1].classList.remove("active");
      bgReady = true;
      return;
    }
    const nextIndex = activeBgIndex === 0 ? 1 : 0;
    const current = layers[activeBgIndex];
    const next = layers[nextIndex];
    if (next.src.endsWith(chapter.bg.replace("./", "")) && next.classList.contains("active")) return;
    next.src = chapter.bg;
    next.classList.add("active");
    current.classList.remove("active");
    activeBgIndex = nextIndex;
  };
  const refreshChapterStates = () => {
    const chapter = storyChapters.find(item => item.id === activeStoryChapterId) || selectedChapter;
    chapterRoot.querySelectorAll(".story-chapter-card").forEach(card => {
      const item = storyChapters.find(entry => entry.id === card.dataset.chapterId);
      if (!item) return;
      const unlocked = isStoryChapterUnlocked(item);
      const current = item.id === chapter.id;
      card.classList.toggle("current", current);
      card.classList.toggle("done", isStoryChapterDone(item));
      card.classList.toggle("locked", !unlocked);
      const img = card.querySelector("img");
      if (img) {
        const frame = unlocked ? (current ? "chapter_selected" : "chapter_current") : "chapter_locked";
        img.src = `./assets/story_ui/${frame}.png`;
      }
    });
  };
  const renderTurnCards = chapter => {
    const activeRound = firstPlayableRound(chapter);
    const rounds = [...chapter.rounds];
    while (rounds.length < 7) {
      rounds.push({
        id: `${chapter.id}-locked-${rounds.length + 1}`,
        title: "\u672a\u89e3\u9501",
        desc: "\u540e\u7eed\u56de\u5408\u5c1a\u672a\u5f00\u653e\u3002",
        locked: true
      });
    }
    turnRoot.innerHTML = "";
    turnRoot.scrollTop = 0;
    rounds.forEach((round, index) => {
      const unlocked = !round.locked && state.unlockedChapters.includes(round.id);
      const done = state.completedChapters.includes(round.id);
      const current = round.id === activeRound.id;
      const turnLabel = `\u7b2c${index + 1}\u56de`;
      const turnName = unlocked ? (round.title || turnLabel) : "\u672a\u89e3\u9501";
      const row = document.createElement("button");
      row.className = `story-turn-card ${unlocked ? "" : "locked"} ${done ? "done" : ""} ${current ? "current" : ""}`;
      row.dataset.roundIndex = String(index);
      row._round = round;
      row._unlocked = unlocked;
      row.type = "button";
      row.innerHTML = `
        <img src="./assets/story_ui/${unlocked ? "turn_current" : "turn_locked"}.png" alt="">
        <div class="story-turn-copy">
          <strong>${turnLabel}</strong>
          <span>${turnName}</span>
        </div>
      `;
      turnRoot.appendChild(row);
    });
  };

  setStoryBackground(selectedChapter);

  storyChapters.forEach((chapter, index) => {
    const unlocked = isStoryChapterUnlocked(chapter);
    const done = isStoryChapterDone(chapter);
    const current = chapter.id === selectedChapter.id;
    const card = document.createElement("button");
    card.className = `story-chapter-card ${unlocked ? "" : "locked"} ${done ? "done" : ""} ${current ? "current" : ""}`;
    card.dataset.chapterId = chapter.id;
    card._chapter = chapter;
    card._unlocked = unlocked;
    card.type = "button";
    const chapterFrame = unlocked ? (current ? "chapter_selected" : "chapter_current") : "chapter_locked";
    card.innerHTML = `
      <img src="./assets/story_ui/${chapterFrame}.png" alt="">
      <span class="story-chapter-thumb" style="background-image: url('${chapter.thumb || chapter.bg}')"></span>
      <div class="story-chapter-copy">
        <span>${chapter.label}</span>
        <strong>${chapter.title}</strong>
      </div>
    `;
    chapterRoot.appendChild(card);
  });

  renderTurnCards(selectedChapter);
  bindVerticalDragScroll(chapterRoot, card => {
    const chapter = card._chapter;
    if (!chapter) return;
    if (!card._unlocked) {
      window.setTimeout(() => notify("\u8be5\u7ae0\u8282\u5c1a\u672a\u89e3\u9501", "warn"), 120);
      return;
    }
    window.setTimeout(() => {
      activeStoryChapterId = chapter.id;
      setStoryBackground(chapter);
      refreshChapterStates();
      renderTurnCards(chapter);
    }, 120);
    window.setTimeout(() => card.classList.remove("chapter-clicked"), 520);
  }, { pressClass: "chapter-clicked" });
  bindVerticalDragScroll(turnRoot, row => {
    const round = row._round;
    if (!round) return;
    if (!row._unlocked) {
      window.setTimeout(() => notify("\u8be5\u56de\u5408\u5c1a\u672a\u89e3\u9501", "warn"), 80);
      return;
    }
    window.setTimeout(() => showRoundEnterModal(round), 80);
    window.setTimeout(() => row.classList.remove("turn-clicked"), 140);
  }, { pressClass: "turn-clicked" });

  const exitStoryThen = next => {
    const screen = root.querySelector(".story-compose");
    if (!screen) {
      next();
      return;
    }
    screen.classList.add("story-exit");
    window.setTimeout(next, 360);
  };

  root.querySelectorAll("[data-story-tab]").forEach(btn => {
    btn.onclick = () => {
      if ((btn.dataset.storyTab === "Story" && currentTab === "Story") || btn.dataset.storyTab === "Archive") {
        exitStoryThen(showMainHub);
        return;
      }
      exitStoryThen(() => openModule(btn.dataset.storyTab));
    };
  });
}

function initializeControls() {
  const enterButton = document.getElementById("enterGameBtn");
  document.addEventListener("pointerdown", event => {
    const button = event.target.closest?.("button");
    if (!button || button.disabled) return;
    playTapSound();
    playBgm();
  }, true);

  enterButton?.addEventListener("click", () => {
    enterButton.classList.remove("clicked");
    void enterButton.offsetWidth;
    enterButton.classList.add("clicked");
    setTimeout(() => {
      enterButton.classList.remove("clicked");
      enterGame();
    }, 120);
  });

  const playHubPress = (tabName, next) => {
    const layer = document.getElementById("hubPressLayer");
    const key = {
      Story: "story",
      Raise: "raise",
      Gacha: "gacha",
      Bag: "bag"
    }[tabName];
    if (!layer || !key) {
      next();
      return;
    }
    layer.src = `./assets/main_ui/main_hub_${key}_press.png`;
    layer.classList.remove("hidden");
    window.setTimeout(() => {
      layer.classList.add("hidden");
      next();
    }, 140);
  };

  document.getElementById("dialogue")?.addEventListener("click", event => {
    if (event.target.closest("button")) return;
    if (hasPendingBranchChoice()) return;
    engine?.next();
  });

  window.addEventListener("keydown", event => {
    if (event.altKey && event.key.toLowerCase() === "a") {
      event.preventDefault();
      setUiDebugEnabled(!uiDebugEnabled);
      return;
    }
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key) && moveSelectedUiDebugTarget(event.key, event.shiftKey)) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (event.key === " " || event.key === "Enter") {
      if (!document.getElementById("scene")?.classList.contains("hidden")) {
        event.preventDefault();
        if (hasPendingBranchChoice()) return;
        engine?.next();
      }
    }
  });

  document.getElementById("saveStoryBtn")?.addEventListener("click", event => {
    event.stopPropagation();
    if (!engine) return;
    state.storySave = engine.snapshot();
    saveState();
    notify("\u5267\u60c5\u5df2\u5b58\u6863", "info");
  });

  document.getElementById("loadStoryBtn")?.addEventListener("click", event => {
    event.stopPropagation();
    if (!state.storySave) {
      notify("\u6682\u65e0\u5267\u60c5\u5b58\u6863", "warn");
      return;
    }
    if (state.storySave.type === "spreadsheet" && state.storySave.roundId) {
      startStory(state.storySave.roundId, null, state.storySave);
      return;
    }
    engine = new StoryEngine(state.storySave.raw, showStoryHome, state.storySave);
    engine.next();
  });

  document.getElementById("autoBtn")?.addEventListener("click", event => {
    event.stopPropagation();
    if (!engine) return;
    engine.auto = !engine.auto;
    notify(engine.auto ? "\u81ea\u52a8\u64ad\u653e\u5f00\u542f" : "\u81ea\u52a8\u64ad\u653e\u5173\u95ed", "info");
  });

  document.getElementById("skipBtn")?.addEventListener("click", event => {
    event.stopPropagation();
    if (!engine) return;
    engine.skip = !engine.skip;
    notify(engine.skip ? "\u5feb\u8fdb\u5f00\u542f" : "\u5feb\u8fdb\u5173\u95ed", "info");
    if (engine.skip) engine.next();
  });

  document.querySelectorAll("#mainHub .hub-hotspot").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.dataset.tab) {
        playHubPress(btn.dataset.tab, () => openModule(btn.dataset.tab));
        return;
      }
      notify("\u529f\u80fd\u5df2\u63a5\u5165", "info");
    });
  });

  document.querySelectorAll("#nav button").forEach(btn => {
    btn.addEventListener("click", () => openModule(btn.dataset.tab));
  });

  document.getElementById("mainMenuBtn")?.addEventListener("click", showMainHub);
}

initializeUiDebug();
initializeControls();
showTitleScreen();
