from django.db import models
from autoslug import AutoSlugField
from web.utils import id_generator


class SizeManager(models.Manager):
    def available_sizes(self):
        return self.filter(available_count__gt=0)


class Size(models.Model):
    size = models.CharField(max_length=50)
    waist_min_size = models.PositiveIntegerField()
    waist_max_size = models.PositiveIntegerField(null=True, blank=True)
    hip_min_size = models.PositiveIntegerField()
    hip_max_size = models.PositiveIntegerField(null=True, blank=True)
    height_min_size = models.PositiveIntegerField()
    height_max_size = models.PositiveIntegerField(null=True, blank=True)
    available_count = models.PositiveIntegerField()

    objects = SizeManager()

    def __str__(self):
        return self.size

    @property
    def available(self):
        return self.available_count > 0


class ProductManager(models.Manager):
    def all(self):
        return self.filter(active=True)

    def available_products(self):
        return self.all().filter(sizes__available_count__gt=0).distinct()


class Product(models.Model):
    title = models.CharField(max_length=120)
    slug = AutoSlugField(populate_from='title',
                         unique_with=['title'], unique=True)
    photo_main = models.ImageField(upload_to='product_photos/%Y/%m/%d/')
    photo_1 = models.ImageField(
        upload_to='product_photos/%Y/%m/%d/', blank=True, null=True)
    photo_2 = models.ImageField(
        upload_to='product_photos/%Y/%m/%d/', blank=True, null=True)
    photo_3 = models.ImageField(
        upload_to='product_photos/%Y/%m/%d/', blank=True, null=True)
    photo_4 = models.ImageField(
        upload_to='product_photos/%Y/%m/%d/', blank=True, null=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_price = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)
    sizes = models.ManyToManyField(Size)
    colors = models.ManyToManyField('self', blank=True, related_name='colors')
    active = models.BooleanField(default=True)
    sale_count = models.IntegerField(default=0)
    code = models.CharField(max_length=40, unique=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = ProductManager()

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.code = id_generator()
        super(Product, self).save(*args, **kwargs)

    @property
    def available(self):
        return self.sizes.available_sizes().exists()

    @property
    def discount_percent(self):
        if self.discount_price:
            discount_percent = 100 - (self.discount_price * 100) / self.price
            return int(discount_percent)
        return

    @property
    def final_price(self):
        if self.discount_price:
            return self.discount_price
        return self.price

    @property
    def customer_profit(self):
        if self.discount_price:
            return self.price - self.discount_price
        return 0
