---
layout: page
title: "Remediate Vulnerabilities with Amazon Inspector"
permalink: "/lab-notes/pwnlabs/amazon-inspector/"
---

Logging into ECR: 

```
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin $(aws sts get-caller-identity --query "Account" --output text).dkr.ecr.us-west-2.amazonaws.com
```

Tagging docker image: 

```
docker tag logistic-app $(aws sts get-caller-identity --query "Account" --output text).dkr.ecr.us-west-2.amazonaws.com/logistic-app
```

Pushing: 

```
docker push $(aws sts get-caller-identity --query "Account" --output text).dkr.ecr.us-west-2.amazonaws.com/logistic-app:latest
```
