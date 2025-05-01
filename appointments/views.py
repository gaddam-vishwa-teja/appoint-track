from django.shortcuts import render
from .models import Appointment

def index(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        date = request.POST.get('date')
        time = request.POST.get('time')
        message = request.POST.get('message')

        Appointment.objects.create(
            name=name,
            email=email,
            date=date,
            time=time,
            message=message
        )
        return render(request, 'appointments/index.html', {'success': True})

    return render(request, 'appointments/index.html')

def appointment_form(request):
    return render(request, 'appointments/appointment_form.html')

def appointments(request):
    return render(request, 'appointments/appointments.html')

    return render(request, 'appointments/profile.html')

def register(request):
    return render(request, 'appointments/register.html')


def register_view(request):
    # Your registration logic here (e.g., handling form submissions)
    return render(request, 'appointments/register.html')

def login_view(request):
    # Logic to display the login form
    return render(request, 'appointments/login.html')

def index(request):
    # ... your homepage logic ...
    return render(request, 'appointments/index.html')

def appointments_view(request):
    # ... your appointments list logic ...
    return render(request, 'appointments/index.html')

def register_view(request):
    # ... your registration logic ...
    return render(request, 'appointments/register.html')

def login_view(request):
    # ... your login logic ...
    return render(request, 'appointments/login.html')
def appointment_form(request):  # Or appointment_form_view if that was your intent
    # Logic to display the appointment form
    return render(request, 'appointments/appointment_form.html')

def make_appointment(request):
    # ... your form handling logic ...
    return render(request, 'appointments/appointment_form.html')

def appointment_list(request):
    return render(request, 'appointments/list.html')  # Or your actual template name

def profile(request):
    return render(request, 'appointments/profile.html')  # Renders your profile.html file

from django.shortcuts import render, redirect
from .forms import RegisterForm, AppointmentForm

def register_view(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('register')  # Redirect to same or login
    else:
        form = RegisterForm()
    return render(request, 'appointments/register.html', {'form': form})

def appointment_form_view(request):
    if request.method == 'POST':
        form = AppointmentForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('appointment_form')  # Or to appointments page
    else:
        form = AppointmentForm()
    return render(request, 'appointments/appointment_form.html', {'form': form})

def index_view(request):
    return render(request, 'appointments/index.html')
