function addNOkBlock(thisElem, value) {
  function copyTitle() {
    const $newTempInput = $('<input>');
    const $newCopiedInfoElem = $('<p class="info-copy">Copied</p>');
    const $titleText = $(this).prev().text().trim();

    $($bodyElem).append($newTempInput);
    $newTempInput.val($titleText).select();
    document.execCommand('copy');
    $newTempInput.remove();

    $($(this).parent()).append($newCopiedInfoElem);
    $newCopiedInfoElem.fadeOut(1400);
  }

  const $newCopyButton = $('<input class="js-button-copy button-copy button-copy_position text text_fs-xxs" type="button" value="copy" />');
  const $newFormNOkElem = $('<form class="js-form-call-NOk form-call-item form-call_position"></form>');
  const $newLinkElem = $(
    '<a class="button-link button-link-open_small text text_fs-xxs" href="https://itsm.vaz.ru/sm/index.do" target="_blank">Открыть обращение</a>'
  );
  const $newInputElem = $('<input class="js-input-call input-call input-call_small" type="text" placeholder="SD******" maxlength="8" />');
  const $newTextareaElem = $('<textarea class="js-textarea textarea-call text text_fs-xxs" placeholder="Описание проблемы"></textarea>');

  const $thisFormOk = $(thisElem).closest($buttonsContainer).find('.js-form-call-Ok');
  const $thisFormNOk = $(thisElem).closest($buttonsContainer).find('.js-form-call-NOk');

  $(thisElem).next().find('.js-NOK-radiobutton').prop('checked', true);

  if (!$thisFormNOk.length) {
    $thisFormOk.hide(400);
    $(thisElem)
      .closest($buttonsContainer)
      .append($newFormNOkElem.append($newLinkElem).append($newInputElem).append($newTextareaElem.val(value)));
    $(thisElem).closest($buttonsContainer).find('.js-form-call-NOk').show(400);

    $(thisElem).closest($accordionTitleContainer).children().first().append($newCopyButton);
    $(thisElem).closest($accordionTitleContainer).find('.js-button-copy').show(400);
  }

  $('.js-button-copy').on('click', copyTitle);
}
