from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _


def validate_national_code(code):
    message = "Invalid national code."
    if len(code) != 10:
        raise ValidationError(
            _(message), params={'code': code})
    if code == "0000000000" or code == "1111111111" or code == "2222222222" or code == "3333333333" or code == "4444444444" or code == "5555555555" or code == "6666666666" or code == "7777777777" or code == "8888888888" or code == "9999999999":
        raise ValidationError(
            _(message), params={'code': code})
    ctrl_code = int(code[-1])
    code = list(code)
    del code[-1]
    nums = [10, 9, 8, 7, 6, 5, 4, 3, 2]
    total = 0
    for i in range(len(code)):
        total += int(code[i]) * nums[i]
    total = total % 11
    if total < 2:
        if ctrl_code != total:
            raise ValidationError(
                _(message), params={'code': code})
    if ctrl_code != 11 - total:
        raise ValidationError(
            _(message), params={'code': code})


phone_number_or_email_reg = '^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$|^09\d{9}$'
