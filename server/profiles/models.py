from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import RegexValidator
from django.db.models.signals import post_save
from django.dispatch import receiver

from products.models import Product

User = get_user_model()


class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    reciver_full_name = models.CharField(max_length=120)
    reciver_phone_number = models.CharField(max_length=11, validators=[
        RegexValidator('^09\d{9}$', message="Invalid phone number.")])
    state = models.CharField(max_length=120)
    city = models.CharField(max_length=120)
    postal_address = models.TextField()
    postal_code = models.CharField(max_length=10, validators=[RegexValidator(
        '^[0-9]{10,10}$', message="Invalid postal code")])
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Addresses'
        ordering = ('-created_at', )

    def __str__(self):
        return self.user.username


class FavoritesProductsManager(models.Manager):
    def check_product(self, user, product_id):
        if user.is_authenticated:
            return user.favorite_products.products.filter(id=product_id).exists()


class FavoritesProducts(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='favorite_products')
    products = models.ManyToManyField(
        Product, related_name='products', blank=True)

    objects = FavoritesProductsManager()

    class Meta:
        verbose_name_plural = 'Favorites Products'

    def __str__(self):
        return self.user.username

    @property
    def products_count(self):
        return self.products.all().count()

# Each user should be have favorite products
# When user registered create favorite products model with this user


@receiver(post_save, sender=User)
def create_fvorite_products(sender, instance, created, **kwargs):
    if created:
        FavoritesProducts.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_fvorite_products(sender, instance, **kwargs):
    instance.favorite_products.save()
