set -o errexit

pip install -r requirements.txt
python m anage.py collectstatic  --no-input
python manage.py migrate