function addSendMailButton(addTo, subjectText, bodyText) {
  const $sendMailButton = $(`<a class="js-sendReport button-link button-link-check_p text text_fs-s"
  href="mailto:${process.env.TO_RECIPIENT}?cc=${process.env.COPY_TO_RECIPIENT}&subject=${subjectText}&body=Здравствуйте.%0D%0A%0D%0A${bodyText}"
  target="_blank">Отправить отчет по почте</a>`);

  if ($(addTo).find(`.js-sendReport`).length) $(addTo).find(`.js-sendReport`).remove();
  $(addTo).append($sendMailButton);
}
