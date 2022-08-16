const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const todayMonthLetter = getMonthLetter(padTo2Digits(yesterday.getMonth() + 1));
const yesterdayDate = padTo2Digits(yesterday.getDate());

const wsh = new ActiveXObject(`WScript.shell`);
const fileSystem = new ActiveXObject(`Scripting.FileSystemObject`);
const network = new ActiveXObject(`WScript.Network`);

const operatorName = network.UserName;
const parentFolder = getParentFolder();
const pathDistr = parentFolder + `\\\\distr\\\\`;

const TIGHTVNC = `tvnviewer.exe -host=`;
const TIGHTVNC_PORT = `:59000`;
const LITE_MANAGER = `ROMViewer.exe  /Name:`;
const LITE_MANAGER_KEY_CONTROL = ` /ViewOnly`;

const COMMAND_TILDA = `~`;

const ROTATE_CLASS = `rotate`;

const ERR_SCRIPT_MSG = `Возникла непредвиденная ошибка скрипта,`;
const ERR_DISK_MSG = `Не удалось получить размер сетевого диска`;
const ERR_AOS_MSG = `Не удалось получить количество`;
