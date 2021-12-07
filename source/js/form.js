(function () {
  var me = {};
  var form = document.querySelector('.form-container');
  var closeButton = null;

  function onClose() {
    me.close();
    closeButton.removeEventListener('click', onClose);
  }

  me.open = function () {
    form.classList.remove('is-hidden');

    closeButton = document.querySelector('.form__close-button');
    closeButton.addEventListener('click', onClose);
  };

  me.close = function () {
    form.classList.add('is-hidden');
  };

  me.isValid = function () {
    if (
      !me.isAllComplited(document.querySelectorAll('[data-valid="required"]'))
    ) {
      console.log('Заполните все необходимые поля');
      return false;
    } else if (
      !ITVDN.validation.isEmail(document.querySelector('[data-email]').value)
    ) {
      console.log('Не верный email');
      return false;
    } else if (
      !ITVDN.validation.isNumber(document.querySelector('[data-number]').value)
    ) {
      console.log('Не верный номер');
      return false;
    }
    return true;
  };

  me.isAllComplited = function (data) {
    var result = true;

    console.log(ITVDN);
    for (var i = 0; i < data.length; i++) {
      if (!ITVDN.validation.isNotEmpty(data[i].value)) {
        result = false;
        break;
      }
    }

    return result;
  };

  ITVDN.form = me;
})();
