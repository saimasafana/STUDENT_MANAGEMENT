set -o errexit

pip install -r requirements.txt
python m anage.py collectstatic,
python manage.py migrate