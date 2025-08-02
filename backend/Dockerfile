FROM python:3.10-slim

RUN mkdir /backend
WORKDIR /backend

COPY . .

RUN pip install --no-cache-dir --upgrade -r requirements.txt

CMD ["python", "-m", "main"]