---
layout: page
title: "Multi-Juicer on a Home lab Environment"
permalink: "/lab-notes/multi-juicer/"
---

Multi-Juicer is cool and everything but I don’t feel like spending $10 to put it on the cloud. This is how I did it on my home network. If you don’t know Multi-Juicer it is basically a way for multiple people to use one platform to do Juice Shop, basically what Multi Juicer does is it uses Kubernetes to run separate Juice Shop instances for each participant on a central Kubernetes cluster, so we can run an event without the need to download local Juice Shop instances, and also show a scoreboard. 

## Install Kubernetes

[https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/#install-kubectl-binary-with-curl-on-linux](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/#install-kubectl-binary-with-curl-on-linux)

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

kubectl version --client
```

## Install Minikube

[https://minikube.sigs.k8s.io/docs/start/](https://minikube.sigs.k8s.io/docs/start/)

```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64

sudo install minikube-linux-amd64 /usr/local/bin/minikube

sudo apt install docker.io

sudo usermod -aG docker $USER && newgrp docker

# For 40 users you need 16GB of ram and 12 CPUs, the VM i had has 14 CPUs and 20 GB of RAM
minikube start --memory 12288 --cpus=12
```

### Install Helm and Multi Juicer

[https://helm.sh/docs/intro/install/](https://helm.sh/docs/intro/install/) 

```bash
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3

chmod 700 get_helm.sh

./get_helm.sh
```

[https://github.com/juice-shop/multi-juicer](https://github.com/juice-shop/multi-juicer)

```bash
helm install multi-juicer oci://ghcr.io/juice-shop/multi-juicer/helm/multi-juicer

helm install -f values.yaml multi-juicer ./multi-juicer/helm/multi-juicer/

helm delete multi-juicer
```

[https://github.com/juice-shop/multi-juicer/blob/main/helm/multi-juicer/values.yaml](https://github.com/juice-shop/multi-juicer/blob/main/helm/multi-juicer/values.yaml)

## Expose with Cloud Flare Tunnel

Exposing Local server to the internet with a cloud flare tunnel: 

```bash
wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb && dpkg -i cloudflared-linux-amd64.deb

cloudflared login

cloudflared tunnel create <YourTunnelName>

sudo nano ~/.cloudflared/config.yml

tunnel: <TunnelUUID>
credentials-file: /root/.cloudflared/<TuinnelUUID>.json
ingress:
  - hostname: lab.example.com
    service: http://<LAB_HOST>:<PORT> 
  - service: http_status:404

cloudflared tunnel route dns <TunnelName> <hostname>

cloudflared tunnel run <TunnelName>
```

Commands that are useful for troubleshooting: 

`kubectl describe pod <pod number>` 

`kubectl get pods`
