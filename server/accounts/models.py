from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.core.validators import RegexValidator
from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created

from .validators import validate_national_code


class UserMananger(BaseUserManager):
    def create_user(self, phone_number, password=None, **extra_fields):
        if not phone_number:
            raise ValueError("Users must have an phone number")

        if extra_fields.get('email'):
            extra_fields['email'] = self.normalize_email(extra_fields['email'])

        user = self.model(
            phone_number=phone_number,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, phone_number, password):
        user = self.create_user(
            password=password,
            phone_number=phone_number
        )
        user.is_admin = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name="email address", max_length=50, unique=True, null=True, blank=True)
    phone_number = models.CharField(max_length=11, unique=True, validators=[
        RegexValidator('^09\d{9}$', message="Invalid phone number.")])
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    national_code = models.CharField(
        validators=[validate_national_code], blank=True, null=True, max_length=10)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserMananger()

    USERNAME_FIELD = 'phone_number'

    class Meta:
        ordering = ('-date_joined', )

    def __str__(self):
        return self.phone_number

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def username(self):
        return self.phone_number


# reset password signal
# TODO: send real email in production
@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    print(reset_password_token.key)
