const blink = (selector) => {
  $(selector).animate({ opacity: 0 }, 500, 'linear', function () {
    $(this).delay(1000);
    $(this).animate({ opacity: 1 }, 500, () => blink(this));
    $(this).delay(3000);
  });
};

const setWindow = () => {
  const winWidth = screen.width;
  const winHeight = screen.height;
  const winPosX = screen.width / 2 - winWidth / 2;
  const winPosY = screen.height / 2 - winHeight / 2;

  window.resizeTo(winWidth, winHeight);
  window.moveTo(winPosX, winPosY);
};

const fadeOutPopUp = () => {
  $popupWindowElem.fadeOut(400);
  $popupOverlayElem.fadeOut(400);
  $bodyElem.addClass(`active`);
};

$($popupOverlayElem).add($buttonCloseElem).on('click', fadeOutPopUp);
$(document).keypress(({ key }) => (key === 'Esc' ? fadeOutPopUp() : key));

$($buttonSubmitElem).on('click', function () {
  const $newInfoElem = $('<p class="text text_color-red info-error">Укажите корректный номер</p>');

  if (/^SD\d{6}/.test($headCallInputElem.val())) fadeOutPopUp();
  if (!/^SD\d{6}/.test($headCallInputElem.val())) {
    $(this).parent().append($newInfoElem);
    $newInfoElem.fadeOut(2500);
    setTimeout(() => $newInfoElem.remove(), 2500);
  }
});

$($buttonElem).on('click', function () {
  $(this).next().show(400);
});

$($buttonTinaFullElem).on('click', () => $buttonTinaFullElem.next().show(400));
$($buttonTinaIncElem).on('click', () => $buttonTinaIncElem.next().show(400));
$($buttonScheduleurElem).on('click', () => $buttonScheduleurElem.next().show(400));
$($buttonMailElem).on('click', () => $buttonMailElem.next().show(400));
$($buttonLadaizhevskElem).on('click', () => $buttonLadaizhevskElem.next().show(400));

$($okRadioButtonElem).on('click', function () {
  const $thisFormNOk = $(this).closest($buttonsContainer).find('.js-form-call-NOk');
  const $thisFormOk = $(this).closest($buttonsContainer).find('.js-form-call-Ok');
  const $thisCopyButton = $(this).closest($accordionTitleContainer).find('.js-button-copy');

  if ($thisFormNOk.length) {
    $thisCopyButton.hide(400);
    $thisFormNOk.hide(400);
    setTimeout(() => {
      $thisCopyButton.remove();
      $thisFormNOk.remove();
      $thisFormOk.show(400);
    }, 400);
  }
});

$($nokRadioButtonElem).on('click', function () {
  addNOkBlock($(this));
});

$($collapseOuterButton).on('click', function () {
  $(this).children($rotateElem).toggleClass(ROTATE_CLASS);
  $(this).next($collapseContent).slideToggle();
});

$($collapseInnerButton).on('click', function () {
  const thisAccordion = $(this).offsetParent();
  const thisRotateElem = $(this).parent().find($rotateElem);
  const thisAccordionContent = $(this).parent().parent().next($accordionContent);
  const thisAccordionRotateElems = $(thisAccordion).children().find($rotateElem);
  const thisAccordionContentElems = $(thisAccordion).children().find($accordionContent);

  $(thisAccordionRotateElems).not(thisRotateElem).removeClass(ROTATE_CLASS);
  $(thisAccordionContentElems).not(thisAccordionContent).slideUp();
  $(thisRotateElem).toggleClass(ROTATE_CLASS);
  $(thisAccordionContent).slideToggle();
});

blink($blinkElem);
setWindow();
