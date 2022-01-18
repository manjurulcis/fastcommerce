from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

User = get_user_model()


class CustomBackend(ModelBackend):
    def authenticate(self, request, phone_number=None, email=None, password=None, **kwargs):
        """Allow authenticate with phone number and email"""

        if phone_number is None and email is None and password is None:
            return

        if phone_number:
            try:
                user = User._default_manager.get_by_natural_key(
                    phone_number)
            except User.DoesNotExist:
                User().set_password(password)
            else:
                if user.check_password(password) and self.user_can_authenticate(user):
                    return user
        elif email:
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return
            else:
                if user.check_password(password) and self.user_can_authenticate(user):
                    return user
