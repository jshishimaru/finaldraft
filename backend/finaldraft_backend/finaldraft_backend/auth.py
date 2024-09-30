from django.http import JsonResponse
from django.views import View
from django.conf import settings
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login, logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import requests
from django.contrib.auth.models import User

redirect_url ='http://localhost:8000/oauth/channeli/callback/'
authorize_url ='https://channeli.in/oauth/authorise/'
token_url ='https://channeli.in/open_auth/token/'
get_user_data_url ='https://channeli.in/open_auth/get_user_data/'
logout_url = 'https://channeli.in/open_auth/revoke_token/'

class OAuthAuthorize(View):
	def get(self, request):
		client_id = settings.CLIENT_ID
		state = 'random_state'
		auth_url = f"{authorize_url}?client_id={client_id}&redirect_uri={redirect_url}&state={state}"		
		return redirect(auth_url)

class OAuthGetToken(View):
	def get(self, request):
		code = request.GET.get('code')
		state = request.GET.get('state')

		client_id = settings.CLIENT_ID
		client_secret = settings.CLIENT_SECRET

		data = {
			'client_id': client_id,
			'client_secret': client_secret,
			'code': code,
			'redirect_uri': redirect_url,
			'grant_type': 'authorization_code'
		}

		response = requests.post(token_url, data=data)
		if response.status_code != 200:
			return JsonResponse({'error': 'Failed to obtain access token'}, status=response.status_code)

		token_data = response.json()
		access_token = token_data.get('access_token')
		refresh_token = token_data.get('refresh_token')
		
		user_info = requests.get(get_user_data_url, headers = {'Authorization': f'Bearer {access_token}'})
		print(user_info.json())
		return response( user_info.json())

class OAuthLogout(View):
	def get(self, request):
		params = {
			'client_id': settings.CLIENT_ID,
			'client_secret': settings.CLIENT_SECRET,
			'token': request.GET.get('token'),
			'token_type_hint' : request.GET.get('token_type_hint'),
		}
		response = requests.post(logout_url , data = params)

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):
	def get(self, request):
		return JsonResponse({'message': 'Login Required'}, status=401)
	
	def post(self, request):
		username = request.POST.get('username')
		password = request.POST.get('password')
		users = User.objects.all()
		user = authenticate(username=username, password=password)
		if user is not None:
			login(request, user)
			return JsonResponse({'message': 'Login Successful'})
		else:
			return JsonResponse({'message': 'Login Failed'}, status=401)

		