function addOkBlock(thisElem, value) {
  const $newFormOkElem = $('<form class="js-form-call-Ok form-call-item"></form>');
  const $newTextareaElem = $('<textarea class="js-textarea textarea-info text text_fs-xxs"></textarea>');

  const $thisFormOk = $(thisElem).closest($buttonsContainer).find('.js-form-call-Ok');
  const $thisFormNOk = $(thisElem).closest($buttonsContainer).find('.js-form-call-NOk');
  const $thisCopyButton = $(thisElem).closest($accordionTitleContainer).find('.js-button-copy');

  $(thisElem).next().find('.js-OK-radiobutton').prop('checked', true);

  if (!$thisFormOk.length) {
    $(thisElem)
      .closest($buttonsContainer)
      .append($newFormOkElem.append($newTextareaElem.val(value)));
    $(thisElem).closest($buttonsContainer).find('.js-form-call-Ok').show(400);
  }
  if ($thisFormOk.length) {
    $thisFormOk.remove();
    $(thisElem)
      .closest($buttonsContainer)
      .append($newFormOkElem.append($newTextareaElem.val(value)));
    $(thisElem).closest($buttonsContainer).find('.js-form-call-Ok').show();
  }
  if ($thisFormNOk.length) {
    $thisCopyButton.hide(400);
    $thisFormNOk.hide(400);
    setTimeout(function () {
      $thisCopyButton.remove();
      $thisFormNOk.remove();
    }, 400);

    $(thisElem)
      .closest($buttonsContainer)
      .append($newFormOkElem.append($newTextareaElem.val(value)));
    $(thisElem).closest($buttonsContainer).find('.js-form-call-Ok').show();
  }
}
