FROM python:latest

COPY ./ .

RUN pip3 install -r requirements.txt

CMD python3 -m uvicorn main:app --reload --port 8000 --host 0.0.0.0