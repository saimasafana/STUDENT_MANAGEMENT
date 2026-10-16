

#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt
<<<<<<< HEAD
python manage.py collectstatic --no-input
python manage.py migrate
=======
python m anage.py collectstatic  --no-input,
python manage.py migrate
>>>>>>> 5de085f (updated commitnew3)
