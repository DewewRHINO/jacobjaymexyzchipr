---
layout: page
title: "Remediate Risks with Prowler and AWS Security Hub CSPM"
permalink: "/lab-notes/pwnlabs/prowler/"
---

Cloud Security Posture Management (CSPM). 

```
brew install prowler
prowler -v 
prowler aws --help
prowler aws --list-compliance --no-banner
prowler aws --compliance cis_1.4_aws --region us-west-2 --no-banner
```

The following are some example results from Prowler from the CIS framework: 

```
$ prowler aws --compliance cis_1.4_aws --region us-west-2 --no-banner
-> Using the AWS credentials below:
  · AWS-CLI Profile: default
  · AWS Regions: us-west-2
  · AWS Account: 123456789012
  · User Id: AIDA5G2VGULKF22FXUYYX
  · Caller Identity ARN: arn:aws:iam::123456789012:user/example-user

-> Using the following configuration:
  · Config File: /opt/homebrew/Cellar/prowler/5.47.0/libexec/lib/python3.13/site-packages/prowler/config/config.yaml
  · Mutelist File: /opt/homebrew/Cellar/prowler/5.47.0/libexec/lib/python3.13/site-packages/prowler/config/aws_mutelist.yaml
  · Scanning unused services and resources: False

Executing 66 checks, please wait...
-> Scan completed! |▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉| 66/66 [100%] in 37.6s 

Overview Results:
╭───────────────────┬──────────────────┬────────────────╮
│ 20.83% (5) Failed │ 4.17% (1) Passed │ 0.0% (0) Muted │
╰───────────────────┴──────────────────┴────────────────╯

Account 123456789012 Scan Results (severity columns are for fails only):
╭────────────┬────────────┬──────────┬────────────┬────────┬──────────┬───────┬─────────╮
│ Provider   │ Service    │ Status   │   Critical │   High │   Medium │   Low │   Muted │
├────────────┼────────────┼──────────┼────────────┼────────┼──────────┼───────┼─────────┤
│ aws        │ account    │ PASS (0) │          0 │      0 │        0 │     0 │       0 │
├────────────┼────────────┼──────────┼────────────┼────────┼──────────┼───────┼─────────┤
│ aws        │ cloudwatch │ PASS (0) │          0 │      0 │        0 │     0 │       0 │
├────────────┼────────────┼──────────┼────────────┼────────┼──────────┼───────┼─────────┤
│ aws        │ ec2        │ FAIL (1) │          0 │      1 │        0 │     0 │       0 │
├────────────┼────────────┼──────────┼────────────┼────────┼──────────┼───────┼─────────┤
│ aws        │ s3         │ FAIL (4) │          0 │      2 │        2 │     0 │       0 │
╰────────────┴────────────┴──────────┴────────────┴────────┴──────────┴───────┴─────────╯
* You only see here those services that contains resources.

Detailed results are in:
 - JSON-OCSF: ./output/prowler-output-123456789012-20261031104140.ocsf.json
 - CSV: ./output/prowler-output-123456789012-20261031104140.csv
 - HTML: ./output/prowler-output-123456789012-20261031104140.html

Compliance Status of CIS_1.4_AWS Framework:
╭─────────────────┬─────────────────┬────────────────╮
│ 83.33% (5) FAIL │ 16.67% (1) PASS │ 0.0% (0) MUTED │
╰─────────────────┴─────────────────┴────────────────╯

Framework CIS_1.4_AWS Results:
╭────────────┬──────────────────────────────────┬───────────┬───────────┬─────────╮
│ Provider   │ Section                          │ Level 1   │ Level 2   │   Muted │
├────────────┼──────────────────────────────────┼───────────┼───────────┼─────────┤
│ AWS        │ 1 Identity and Access Management │ PASS(0)   │ PASS(0)   │       0 │
├────────────┼──────────────────────────────────┼───────────┼───────────┼─────────┤
│ AWS        │ 2 Storage                        │ FAIL(4)   │ FAIL(1)   │       0 │
├────────────┼──────────────────────────────────┼───────────┼───────────┼─────────┤
│ AWS        │ 4 Monitoring                     │ PASS(0)   │ PASS(0)   │       0 │
╰────────────┴──────────────────────────────────┴───────────┴───────────┴─────────╯
* Only sections containing results appear.

Detailed results of CIS_1.4_AWS are in:
 - CSV: ./output/compliance/prowler-output-123456789012-20261031104140_cis_1.4_aws.csv
```

We can also format the data so that AWS Security Hub can understand it: 

```
prowler aws --compliance cis_1.4_aws --region us-west-2 --no-banner --security-hub 
```

Discovering Secrets with Prowler: 

```
prowler aws --categories secrets --region us-west-2 --security-hub --no-banner
```
