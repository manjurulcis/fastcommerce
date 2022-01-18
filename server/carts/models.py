from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from products.models import Product, Size

User = get_user_model()


class CartItem(models.Model):
    cart = models.ForeignKey('Cart', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    size = models.ForeignKey(Size, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.product}"

    @property
    def total_price(self):
        return self.product.final_price * self.quantity

    @property
    def total_customer_profit(self):
        return self.product.customer_profit * self.quantity


class Cart(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="carts")
    items = models.ManyToManyField(CartItem, related_name='items')
    ordered = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.user.username

    @property
    def total_price(self):
        total_price = 0
        for item in self.items.all():
            total_price += item.total_price
        return total_price

    @property
    def items_count(self):
        return self.items.all().count()

    @property
    def total_customer_profit(self):
        total_customer_profit = 0
        for item in self.items.all():
            total_customer_profit += item.total_customer_profit
        return total_customer_profit


# Each user should be have cart
# When user registered create cart model with this user

@receiver(post_save, sender=User)
def create_cart(sender, instance, created, **kwargs):
    if created:
        Cart.objects.create(user=instance)
