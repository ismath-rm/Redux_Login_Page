from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework import serializers
from users.models import User, UserProfile
from rest_framework_simplejwt.tokens import RefreshToken, Token, AccessToken
from django.contrib.auth.hashers import make_password

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  @classmethod
  def get_token(cls, user):
    token = super().get_token(user)

    token['first_name'] = user.first_name

    return token 
  

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
      model = User
      fields = ['id', 'first_name', 'phone_number', 'email', 'password']
      extra_kwargs = {
        'password' : {'write_only':True}
      }

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        validated_data['is_active'] = True
        return super(UserRegisterSerializer, self).create(validated_data)
    

class UserSerializer(serializers.ModelSerializer):
   class Meta:
      model = User
      exclude = ('password',)

class UserDetailsUpdateSerializer(serializers.ModelSerializer):
   class Meta:
      model = UserProfile
      fields = ['profile_pic']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['profile_pic',]

###################### ADMIN SIDE ####################
        
class AdminUserSerializer(serializers.ModelSerializer):
    UserProfile = UserProfileSerializer(required=False)

    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {
            'password': {'write_only': True},
            'first_name': {'error_messages': {'required': 'Please provide the first name.'}},
            'last_name': {'error_messages': {'required': 'Please provide the last name.'}},
            'phone_number': {'error_messages': {'required': 'Please provide the phone number.'}},
            'email': {'error_messages': {'required': 'Please provide the email address.'}},
        }
    
    def create(self, validated_data):
        profile_data = validated_data.pop('UserProfile')  # Corrected key name
        password = validated_data.pop('password', None)
        user_instance = self.Meta.model(**validated_data)
        if password is not None:
            user_instance.set_password(password)
            user_instance.is_active = True
            user_instance.save()
        UserProfile.objects.create(user=user_instance, **profile_data)
        return user_instance

    
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'phone_number', 'email', 'is_active']

    def update(self, instance, validated_data):
        # Update user fields
        instance.first_name = validated_data.get('first_name', instance.first_name)
    
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.email = validated_data.get('email', instance.email)
        
        
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.save()
        return instance