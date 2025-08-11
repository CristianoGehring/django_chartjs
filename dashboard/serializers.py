from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # Get all permissions for the user, from both groups and direct assignment
        permissions = user.get_all_permissions()
        token['permissions'] = list(permissions)

        return token
