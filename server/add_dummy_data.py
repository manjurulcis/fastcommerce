# -*- coding: utf-8 -*-
import os
import django
import json

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "web.settings")
django.setup()

from django.core.files import File
from accounts.models import User
from profiles.models import Address
from products.models import Product, Size


def reset_db():
    try:
        os.remove('db.sqlite3')
    except:
        pass
    os.system('python manage.py migrate')
    print("Database reseted.")


def add_users():
    with open('./dummy_data/users.json') as f:
        users = json.load(f)
    for user in users:
        User.objects.create_user(**user)
    print("Users added.")


def add_addresses():
    with open('./dummy_data/addresses.json') as f:
        addresses = json.load(f)
    for address in addresses:
        user = User.objects.get(id=address['user'])
        del address['user']
        Address.objects.create(user=user, **address)
    print("Addresses added.")


def add_sizes():
    with open('./dummy_data/sizes.json') as f:
        sizes = json.load(f)
    for size in sizes:
        Size.objects.create(**size)


def add_products():
    add_sizes()
    with open('./dummy_data/products.json') as f:
        products = json.load(f)
    for product in products:
        title = product['title']
        photo_main = File(open(product['photo_main'], 'rb'))
        photo_1 = product.get('photo_1')
        if photo_1:
            photo_1 = File(open(photo_1, 'rb'))
        photo_2 = product.get('photo_2')
        if photo_2:
            photo_2 = File(open(photo_2, 'rb'))
        photo_3 = product.get('photo_3')
        if photo_3:
            photo_3 = File(open(photo_3, 'rb'))
        photo_4 = product.get('photo_4')
        if photo_4:
            photo_4 = File(open(photo_4, 'rb'))
        description = product['description']
        price = product['price']
        discount_price = product.get('discount_price')
        sale_count = product['sale_count']
        sizes = product['sizes']
        colors = product.get('colors', False)
        product = Product.objects.create(
            title=title, photo_main=photo_main, photo_1=photo_1, photo_2=photo_2,
            photo_3=photo_3, photo_4=photo_4, description=description, price=price,
            sale_count=sale_count, discount_price=discount_price
        )
        for size in sizes:
            product.sizes.add(size)
        if colors:
            for color in colors:
                product.colors.add(color)
    print("Products added.")


if __name__ == '__main__':
    reset_db()
    add_users()
    add_addresses()
    add_products()
    print('Done.')
