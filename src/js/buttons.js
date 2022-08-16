$($checkOVOProcButton).on(`click`, () => puttyConnection(process.env.HOST_UAGEX1, process.env.COMMAND_OVO));
$($checkGretSurvButton).on(`click`, () => puttyConnection(process.env.HOST_UAGEX1, process.env.COMMAND_GRET));
$($checkCFTButton).on(`click`, () => puttyConnection(process.env.HOST_UAGEX1, process.env.COMMAND_CFT));
$($checkRAMButton).on(`click`, () => puttyConnection(process.env.HOST_UAGEX1, process.env.COMMAND_MONIT_CLUST));
$($checkSIPTOLButton).on(`click`, () => puttyConnection(process.env.HOST_SIPTOL, COMMAND_TILDA, process.env.COMMAND_SIPTOL));
$($checkEpsilon).on(`click`, () => wsh.Run(pathDistr + `epsilon.rdp`));
$($checkRDS02).on(`click`, () => wsh.Run(pathDistr + `RDS-02.rdp`));
$($checkKZS).on(`click`, () => wsh.Run(pathDistr + `Client186.exe`));
$($checkTablo04).on(`click`, () => wsh.Run(pathDistr + TIGHTVNC + `10.183.32.142` + TIGHTVNC_PORT));
$($checkTablo05).on(`click`, () => wsh.Run(pathDistr + TIGHTVNC + `tablo05` + TIGHTVNC_PORT));
$($checkTablo06).on(`click`, () => wsh.Run(pathDistr + TIGHTVNC + `tablo06` + TIGHTVNC_PORT));
$($checkTablo12).on(`click`, () => wsh.Run(pathDistr + TIGHTVNC + `tablo12` + TIGHTVNC_PORT));
$($checkTablo27).on(`click`, () => wsh.Run(pathDistr + TIGHTVNC + `tablo27` + TIGHTVNC_PORT));
$($checkTablo28).on(`click`, () => wsh.Run(pathDistr + TIGHTVNC + `tablo28` + TIGHTVNC_PORT));
$($checkInfoterminal1).on(`click`, () => wsh.Run(pathDistr + LITE_MANAGER + `IZDH462415` + LITE_MANAGER_KEY_CONTROL));
$($checkInfoterminal2).on(`click`, () => wsh.Run(pathDistr + LITE_MANAGER + `IZDH463665` + LITE_MANAGER_KEY_CONTROL));
$($check1CBuh).on(`click`, () => connect1C(operatorName, process.env.DB1));
$($check1COsn).on(`click`, () => connect1C(operatorName, process.env.DB2));
$($check25000Button).on(`click`, () =>
  puttyConnection(process.env.HOST_UAGEX1, process.env.COMMAND_DIR_LOG, process.env.COMMAND_DIR_DAT, process.env.COMMAND_DIR_DECOPER)
);
$($checkMQButton).on(`click`, () =>
  puttyConnection(process.env.HOST_UAGEX1, process.env.COMMAND_SP04, process.env.COMMAND_SURV_MQ, process.env.COMMAND_DOWN, COMMAND_TILDA)
);
$($checkGPITransButton).on(`click`, () =>
  puttyConnection(process.env.HOST_UAGCFT, process.env.COMMAND_SU_CFTUAG, process.env.commandListcat)
);

$($checkRebootButton).on(`click`, async function () {
  try {
    await new Promise.resolve(
      $.ajax({
        method: `GET`,
        url: process.env.UAGEX1_URL,
        headers: { Authorization: process.env.UAGEX1_URL_HEADERS },
      })
        .done((response) => {
          const rebootString = response.substr(response.indexOf(`Last reboot`), 34);
          const rebootDate = rebootString.substr(13, 12);
          const lastSundayDate = Date.parse(`last sunday`);

          if (Date.equals(lastSundayDate, Date.parse(rebootDate))) return addOkBlock($(this), rebootString);
          if (!Date.equals(lastSundayDate, Date.parse(rebootDate))) return addNOkBlock($(this), rebootString);
        })
        .fail((error) => addNOkBlock($(this), String(error.statusText)))
    );
  } catch (err) {
    addNOkBlock($(this), String(err));
    return alert(`${ERR_SCRIPT_MSG} ${String(err)}`);
  }
});

$($checkSIPTKButton).on(`click`, async function () {
  try {
    await new Promise.resolve(
      $.ajax({
        method: `GET`,
        url: process.env.SIPTK_URL,
      })
        .done((response) => {
          if (response.indexOf(`dog_ok`) !== -1) return addOkBlock($(this), `Все сервисы запущены`);
          return addNOkBlock($(this), `Не все сервисы запущены`);
        })
        .fail((error) => addNOkBlock($(this), String(error)))
    );
  } catch (err) {
    addNOkBlock($(this), String(err));
    return alert(`${ERR_SCRIPT_MSG} ${String(err)}`);
  }
});

$($checkAOS04Button).on(`click`, function () {
  try {
    const clientsOfAOS04 = getClientsNum(`AOS-04`);

    if (clientsOfAOS04) return addOkBlock($(this), clientsOfAOS04);
    return addNOkBlock($(this), ERR_AOS_MSG);
  } catch (err) {
    addNOkBlock($(this), err);
    return alert(`${ERR_SCRIPT_MSG} ${err}`);
  }
});

$($checkAOS06Button).on(`click`, function () {
  try {
    const clientsOfAOS06 = getClientsNum(`AOS-06`);

    if (clientsOfAOS06) return addOkBlock($(this), clientsOfAOS06);
    return addNOkBlock($(this), ERR_AOS_MSG);
  } catch (err) {
    addNOkBlock($(this), err);
    return alert(`${ERR_SCRIPT_MSG} ${err}`);
  }
});

$($checkAOSJobs).on(`click`, function () {
  try {
    const jobsNum = getJobsNum();

    if (!jobsNum) return addOkBlock($(this), `Нет пакетов в обработке.`);
    if (jobsNum) {
      const { count, groupId, className, statusJob, time } = jobsNum;
      const nowTime = new Date();
      const difference = (nowTime - time) / 1000;
      const options = [`пакет`, `пакета`, `пакетов`];
      const FOURTY_MINUTES = 2400;
      const resultString = `Всего ${count} ${declOfNum(
        count,
        options
      )}. Самый старый '${groupId} ${className}', в состоянии '${statusJob}' с ${time.toString(`dd.MM.yyyy HH:mm:ss`)}.`;

      if (difference < FOURTY_MINUTES) return addOkBlock($(this), resultString);
      if (difference >= FOURTY_MINUTES) return addNOkBlock($(this), resultString);
    }
  } catch (err) {
    addNOkBlock($(this), err);
    return alert(`${ERR_SCRIPT_MSG} ${err}`);
  }
});

$($checkKPIReport).on(`click`, function () {
  const now = new Date();
  const todayDate = String(now.getFullYear()) + String(now.getMonth() + 1) + String(now.getDate());
  const reportFileName = `Отчет Расчет запасов ТМЦ и показателей KPI Версия 2 _${todayDate}_`;
  const kpiReportPlace = process.env.kpiReportPlace;

  try {
    const file = searchFile(reportFileName, kpiReportPlace);

    if (file) return addOkBlock($(this), file);
    return addNOkBlock($(this), `Файл ${reportFileName} не найден`);
  } catch (err) {
    addNOkBlock($(this), err);
    return alert(`${ERR_SCRIPT_MSG} ${err}`);
  }
});

$($checkGPI43BZHButton).on(`click`, function () {
  const arrOfFolders = [process.env.gpiFolder1, process.env.gpiFolder2, process.env.gpiFolder3];
  const lastGPI43BZH = `GPI43BZH_` + todayMonthLetter + yesterdayDate;

  try {
    for (let i = 0; i < arrOfFolders.length; i++) {
      const file = searchFile(lastGPI43BZH, arrOfFolders[i]);

      if (file) return addOkBlock($(this), file);
    }
    return addNOkBlock($(this), `Файл ` + lastGPI43BZH + ` не найден`);
  } catch (err) {
    addNOkBlock($(this), err);
    return alert(`${ERR_SCRIPT_MSG} ${err}`);
  }
});

$($checkDiskFButton).on(`click`, function () {
  try {
    const diskFreeSpace = getDiskFreeSpace(`F`);

    if (diskFreeSpace) return addOkBlock($(this), diskFreeSpace);
    if (!diskFreeSpace) return addNOkBlock($(this), ERR_DISK_MSG);
  } catch (err) {
    addNOkBlock($(this), err);
    return alert(`${ERR_SCRIPT_MSG} ${err}`);
  }
});

$($checkDiskGButton).on(`click`, function () {
  try {
    const diskFreeSpace = getDiskFreeSpace(`G`);

    if (diskFreeSpace) return addOkBlock($(this), diskFreeSpace);
    if (!diskFreeSpace) return addNOkBlock($(this), ERR_DISK_MSG);
  } catch (err) {
    addNOkBlock($(this), err);
    return alert(`${ERR_SCRIPT_MSG} ${err}`);
  }
});

$($checkDiskKButton).on(`click`, function () {
  try {
    const diskFreeSpace = getDiskFreeSpace(`K`);

    if (diskFreeSpace) return addOkBlock($(this), diskFreeSpace);
    if (!diskFreeSpace) return addNOkBlock($(this), ERR_DISK_MSG);
  } catch (err) {
    addNOkBlock($(this), err);
    return alert(`${ERR_SCRIPT_MSG} ${err}`);
  }
});

$($checkDiskPButton).on(`click`, function () {
  try {
    const diskFreeSpace = getDiskFreeSpace(`P`);

    if (diskFreeSpace) return addOkBlock($(this), diskFreeSpace);
    if (!diskFreeSpace) return addNOkBlock($(this), ERR_DISK_MSG);
  } catch (err) {
    addNOkBlock($(this), err);
    return alert(`${ERR_SCRIPT_MSG} ${err}`);
  }
});

$($checkDiskSButton).on(`click`, function () {
  try {
    const diskFreeSpace = getDiskFreeSpace(`S`);

    if (diskFreeSpace) return addOkBlock($(this), diskFreeSpace);
    if (!diskFreeSpace) return addNOkBlock($(this), ERR_DISK_MSG);
  } catch (err) {
    addNOkBlock($(this), err);
    return alert(`${ERR_SCRIPT_MSG} ${err}`);
  }
});

$($checkDiskWButton).on(`click`, function () {
  try {
    const diskFreeSpace = getDiskFreeSpace(`W`);

    if (diskFreeSpace) return addOkBlock($(this), diskFreeSpace);
    if (!diskFreeSpace) return addNOkBlock($(this), ERR_DISK_MSG);
  } catch (err) {
    addNOkBlock($(this), err);
    return alert(`${ERR_SCRIPT_MSG} ${err}`);
  }
});

$($generateReportButton).on(`click`, function () {
  const now = new Date();
  const todayNow = padTo2Digits(now.getDate()) + `.` + padTo2Digits(now.getMonth() + 1) + `.` + padTo2Digits(now.getFullYear());
  const timeNow = padTo2Digits(now.getHours()) + `-` + padTo2Digits(now.getMinutes());

  const networkFolder = process.env.reportFolder;
  const reportName = `Проверка_ИС_${todayNow}_${timeNow}.xlsx`;
  const placeToSave = connectNetworkDrive(`G`) ? `${networkFolder}\\${reportName}` : `${parentFolder}\\${reportName}`;

  try {
    const GREEN = 4;
    const RED = 3;

    const excel = new ActiveXObject(`Excel.Application`);
    const sheet = excel.Workbooks.Add().ActiveSheet;

    let nokItems = ``;
    let row = 1;

    sheet.Range(`A1`, `A3`).Font.Bold = true;
    sheet.Range(`A1`, `B3`).Borders.Weight = 1;

    excel.Cells(row, 1).Value = `Дата и время`;
    excel.Cells(row++, 2).Value = todayNow + ` ` + timeNow;

    excel.Cells(row, 1).Value = `Исполнитель`;
    excel.Cells(row++, 2).Value = operatorName;

    excel.Cells(row, 1).Value = `Обращение №`;
    excel.Cells(row++, 2).Value = $headCallInputElem.val();
    excel.Cells(row, 2).EntireColumn.HorizontalAlignment = -4108;

    sheet.Range(`C5`, `F5`).Font.Bold = true;
    sheet.Range(`C5`, `F5`).HorizontalAlignment = -4108;
    sheet.Range(`C5`, `F5`).Borders.Weight = 2;
    excel.Cells(++row, 3).Value = `Название`;
    excel.Cells(row, 4).Value = `Статус`;
    excel.Cells(row, 4).EntireColumn.HorizontalAlignment = -4108;
    excel.Cells(row, 5).Value = `Результат`;
    excel.Cells(row, 6).Value = `Обращение №`;
    excel.Cells(row, 6).EntireColumn.HorizontalAlignment = -4108;
    excel.Cells(row, 6).AutoFilter;

    $accordionTitleElem.each(function (index) {
      if (Object.hasOwnProperty.call($accordionTitleElem, index)) {
        const $thisButtonsContainer = $(this).parent().next();
        const $thisRadioButtonVal = $thisButtonsContainer.find(`input:checked`).val();
        const $thisOkTextAreaVal = $thisButtonsContainer.children(`.js-form-call-Ok`).children(`.js-textarea`).val();
        const $thisNOkTextAreaVal = $thisButtonsContainer.children(`.js-form-call-NOk`).children(`.js-textarea`).val();
        const $thisInputVal = $thisButtonsContainer.children(`.js-form-call-NOk`).children(`.js-input-call`).val();
        const $thisCheckingItemVal = $accordionTitleElem[index].innerText;

        excel.Cells(++row, 3).Value = $thisCheckingItemVal;
        excel.Cells(row, 4).Value = $thisRadioButtonVal;

        if ($thisRadioButtonVal === `OK`) {
          excel.Cells(row, 5).Value = $thisOkTextAreaVal;
          excel.Cells(row, 5).EntireColumn.HorizontalAlignment = -4108;
          excel.Cells(row, 4).Interior.ColorIndex = GREEN;
        }
        if ($thisRadioButtonVal === `NOK`) {
          excel.Cells(row, 5).Value = $thisNOkTextAreaVal;
          excel.Cells(row, 6).Value = $thisInputVal;
          excel.Cells(row, 4).Interior.ColorIndex = RED;
          sheet.Range(`E` + row, `F` + row).HorizontalAlignment = -4108;

          nokItems += `${$thisCheckingItemVal}%20${$thisRadioButtonVal}%20${$thisInputVal}%20${$thisNOkTextAreaVal}%0D%0A`;
        }
      }
      sheet.Range(`C` + row, `F` + row).Borders.Weight = 2;
    });

    nokItems = nokItems
      ? `${nokItems}%0D%0AСмотри подробный отчет '${placeToSave}'`
      : `Все ИС работают в штатном режиме.%0D%0AСмотри подробный отчет '${placeToSave}'`;

    addSendMailButton($reportsBox, reportName, nokItems);

    sheet.Range(`A1`, `F1`).EntireColumn.AutoFit();

    sheet.SaveAs(placeToSave);
    sheet.Application.Quit();

    if (confirm(`Отчет ${placeToSave} сформирован. Открыть файл?`)) {
      excel.Workbooks.open(placeToSave);
      excel.Visible = true;
      excel.UserControl = true;
    }
    return;
  } catch (err) {
    alert(`${ERR_SCRIPT_MSG} ${err}. Файл будет сохранен в ${placeToSave}`);
    return;
  }
});
