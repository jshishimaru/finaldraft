from django.contrib import admin
from django.urls import path,include
from finaldraft_backend.auth import OAuthAuthorize, OAuthGetToken , OAuthLogout , LoginView , SignUpView


urlpatterns = [
    path('admin/', admin.site.urls),
	path('auth/', LoginView.as_view() , name='login'),
	path('auth/signup/', SignUpView.as_view() , name='signup'),
	path('oauth/authorise/', OAuthAuthorize.as_view() , name='authorise'),
	path('oauth/channeli/callback/', OAuthGetToken.as_view() , name='get_token'),
	path('oauth/channeli/logout/' , OAuthLogout.as_view() , name='logout'),
	path('finaldraft/', include('finaldraft.urls')),
]
