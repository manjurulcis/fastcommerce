SECRET_KEY = 'YOUR_SECRET_KEY'

DEBUG = False
TEMPLATE_DEBUG = DEBUG

TIME_ZONE = 'UTC'

ALLOWED_HOSTS = ['YOUR_HOST']

INSTALLED_APPS = [
    # Project applications
    'products.apps.ProductsConfig',
    'accounts.apps.AccountsConfig',
    'carts.apps.CartsConfig',
    'profiles.apps.ProfilesConfig',
    'orders.apps.OrdersConfig',
    # Plugins
    'rest_framework',
    'django_filters',
    # Django core
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.YOUR_ENGINE',
        'NAME': 'DATABASE_NAME',
        'USER': 'DATABASE_USER',
        'PASSWORD': 'DATABASE_PASSWORD',
        'HOST': 'DATABASE_HOST',
        'PORT': 'DATABASE_PORT',
    }
}

STATIC_ROOT = os.path.join(BASE_DIR, 'static')
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
