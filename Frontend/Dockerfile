FROM ubuntu:20.04
WORKDIR /app
ARG DEBIAN_FRONTEND=noninteractive
# RUN apt update && apt upgrade -y && apt-get -y --no-install-recommends install build-essential\
# RUN apt update && apt upgrade -y && apt-get -y --no-install-recommends install \
#  python3-pip\
#  libpq-dev\
#  python-is-python3
# COPY requirements.txt ./
# RUN python -m pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 12345
EXPOSE 34567
EXPOSE 45678
EXPOSE 19000
RUN cd ~
RUN curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh
RUN bash /tmp/nodesource_setup.sh
RUN apt install nodejs
RUN cd /app
RUN npm install
RUN npm expo start
# RUN echo "ready to start"
# CMD ["python","main.py"]
