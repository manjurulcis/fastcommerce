from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate, login
from django.core.validators import RegexValidator

from .validators import phone_number_or_email_reg


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    cart_items_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        exclude = ('password', 'is_admin', 'is_active')
        read_only_fields = ('last_login',)

    def get_cart_items_count(self, obj):
        return obj.carts.get(ordered=False).items.count()


class RegisterSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'phone_number', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        # Login user (set session)
        login(self.context.get('request'), user,
              backend='django.contrib.auth.backends.ModelBackend')
        return user


class LoginSerializer(serializers.ModelSerializer):
    phone_number_or_email = serializers.CharField(validators=[
        RegexValidator(
            phone_number_or_email_reg,
            message="Invalid phone number or email address."
        )
    ])

    class Meta:
        model = User
        fields = ('id', 'phone_number_or_email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        """Return user by phone number or email"""

        if '@' in data['phone_number_or_email']:
            user = authenticate(
                email=data['phone_number_or_email'],
                password=data['password']
            )
        else:
            user = authenticate(
                phone_number=data['phone_number_or_email'],
                password=data['password']
            )
        if user:
            # Login user (set session)
            login(self.context.get('request'), user)
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField()
    new_password = serializers.CharField()
