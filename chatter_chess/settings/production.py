import os

from .common import *

DEBUG = False
SECRET_KEY = os.environ['DJANGO_SECRET']
ALLOWED_HOSTS = [
	'chatter-chess-env.eba-kywfvmhu.us-west-2.elasticbeanstalk.com'
]


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ['RDS_DB_NAME'],
        'USER': os.environ['RDS_USERNAME'],
        'PASSWORD': os.environ['RDS_PASSWORD'],
        'HOST': os.environ['RDS_HOSTNAME'],
        'PORT': os.environ['RDS_PORT']
    }
}
