from django.contrib import admin
from django.urls import path, include
from appointments import views  # type: ignore # Make sure this import is correct for your app
from django.contrib.auth import views as auth_views
from django.urls import path
# from . import views


urlpatterns =[ 
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('appointment_form/', views.appointment_form, name='appointment_form'),
    path('appointments/', views.appointments_view, name='appointments'),
    path('register/', views.register_view, name='register'),
    path('register/login.html', views.login_view, name='register_login'),  # New pattern
    path('', include('appointments.urls')),  # Main app for homepage
    path('appointments/', include('appointments.urls')),
    path('logout/', auth_views.LogoutView.as_view(next_page='login.html'), name='logout'),
     path('', views.index_view, name='index'),
    path('register/', views.register_view, name='register'),
    path('book/', views.appointment_form_view, name='appointment_form'),
]
              
