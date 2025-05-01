from django import forms
from .models import UserProfile, Appointment

class RegisterForm(forms.ModelForm):
    confirmPassword = forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = UserProfile
        fields = ['name', 'email', 'password']
        widgets = {
            'password': forms.PasswordInput(),
        }

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        confirm = cleaned_data.get('confirmPassword')
        if password != confirm:
            raise forms.ValidationError("Passwords do not match")

class AppointmentForm(forms.ModelForm):
    class Meta:
        model = Appointment
        fields = ['doctor_name', 'appointment_datetime', 'reason', 'status']
