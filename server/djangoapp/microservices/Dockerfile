FROM python:3.9.18-slim-bookworm

WORKDIR /python-docker

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
RUN python3 -c "import nltk; nltk.download('vader_lexicon')"
COPY . .

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "2", "app:app"]