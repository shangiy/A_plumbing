from django.shortcuts import render
from .models import *
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as auth_login
from django.contrib import messages


def index(request):

    return render(request, 'products/index.html')


def about(request):

    return render(request, 'products/about.html')



def contact(request):

    return render(request, 'products/contact.html')




def team(request):

    return render(request, 'products/team.html')






def decor(request):
    cat = 3
    decor = product.objects.filter(category=cat)
    context = {

        'decor' : decor
    }
    return render(request, 'products/decor.html', context)

def roofing(request):
    cat = 4
    decor = product.objects.filter(category=cat)
    context = {

        'roof' : decor
    }
    return render(request, 'products/roofing.html', context)

def plumbing(request):
    cat = 5
    decor = product.objects.filter(category=cat)
    context = {

        'plumb' : decor
    }
    return render(request, 'products/plumbing.html', context)

def tanks(request):
    cat = 2
    decor = product.objects.filter(category=cat)
    context = {

        'tank' : decor
    }
    return render(request, 'products/tanks.html', context)


def lighting(request):
    cat = 1
    decor = product.objects.filter(category=cat)
    context = {

        'light' : decor
    }
    return render(request, 'products/lighting.html',context)
 

def checkout(request):

    return render(request, 'products/checkout.html')


def dashboard(request):

    return render(request, 'products/dashboard.html')



def signup(request):
    if request.method == 'POST':
        username = request.POST.get('fullname')
        email = request.POST.get('email')
        password1 = request.POST.get('password')
        password2 = request.POST.get('confirm_password')

        if password1 != password2:
            messages.error(request, 'Passwords do not match')
            return redirect('signup')

        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already exists')
            return redirect('dashboard')

        user = User.objects.create_user(username=username, email=email, password=password1)
        auth_login(request, user)
        return redirect('dashboard')  

    return render(request, 'products/signup.html')


def login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = authenticate(request, email=email, password=password)
        if user is not None:
            auth_login(request, user)
            print('user logged in')
            return redirect('dashboard')
        else:
            print('user not logged in')

            messages.error(request, 'Invalid credentials')
            return redirect('dashboard')

    return render(request, 'products/login.html')




