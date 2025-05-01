from django.urls import path
from django.contrib.auth.views import LogoutView


from . import views

urlpatterns = [
    path('', views.index, name='index'),  # your home page
    path('appointment-form/', views.appointment_form, name='appointment_form'),
    path('appointments/', views.appointments, name='appointments'),
    path('register/', views.register, name='register'),
    path('', views.appointment_list, name='appointment_list'),  # Appointments homepage
     path('profile/', views.profile, name='profile'),  # New line for profile page
     path('login_view/', views.login_view, name='login_view'),  # New line for login page
    path('register/login.html', views.login_view, name='register_login'),  # New pattern for login page
    # path('logout/', views.logout_view, name='logout'),  # New line for logout page
    path('logout/', LogoutView.as_view(next_page='login'), name='logout'),
    

]

