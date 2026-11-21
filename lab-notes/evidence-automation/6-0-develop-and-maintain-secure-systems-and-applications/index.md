---
layout: page
title: "6.0 - Develop and maintain secure systems and applications"
permalink: "/lab-notes/evidence-automation/6-0-develop-and-maintain-secure-systems-and-applications/"
---

## Overview of the Requirement

---

Requirement 6.0 is simple enough, in that most of what is needed is whether or not the system has been updated. 

[6.1 Workflow](/lab-notes/evidence-automation/6-1-workflow/)

[6.3 Workflow](/lab-notes/evidence-automation/6-3-workflow/)

| **Requirement** | **Workflow ideas** |
| --- | --- |
| 6.1 → Latest **vendor** supplied security patches installed. Deploy **Critical Patches** within a month release.  | Use Kibana to see if any recent updates were found throughout the hosts that are forwarding logs.  |
| 6.2 → **Develop** and **assign Risk Ranking** to newly discovered **Security Vulnerabilities**  | Have like a document for risk rankings and how like it is documented. Essentially have a documented process?  |
| 6.3 → Use **SDLC** when **developing applications**  | Send out Interview forms for those responsible for developing SDLC.  |
| 6.4 → Use **CCR** (Change Control Requests) **for all system changes**  | Also send out Change Control Requests to list of approvers for system changes. Have a google sheet that tells you when forms were sent out and if they have been responded to.  |
| 6.5 → Follow **best practices when coding**. Follow best practices for **identifying and managing vulnerabilities**  | How are you scanning your environment type of stuff kind of?  |
| 6.6 → Ensure all **public-facing web applications are protected against known attacks**, either by **coding reviews or web application firewall** in front of it  | Test to see if public-facing web application has a firewall in front of it. Could be checking to make sure that the WAF is enabled and monitoring traffic.  |
