---
title: "Gmail Deleter"
description: "Too many emails"
permalink: "/3/"
date: "2026-01-13 04:34:27 +0000"
categories: ["Tools"]
tags: ["gmail"]
---

# Introduction

Running the script you will see the top 5 Email senders: 

```jsx
  ┌─────────────────────────────────────────────────────────────────────────┐
  │                                                                         │
  │  Please select which sender to remove/block:                            │
  │                                                                         │
  │                                                                         │
  │    1 - Discover Card <discover@services.discover.com> (47 emails)       │
  │    2 - "H&M" <newsletter@email.hm.com> (41 emails)                      │
  │    3 - Google Calendar <calendar-notification@google.com> (38 emails)   │
  │    4 - IKEA Family <ikea@news.email.ikea.us> (25 emails)                │
  │    5 - Robinhood <noreply@robinhood.com> (24 emails)                    │
  │    6 - Exit                                                             │
  │                                                                         │
  │                                                                         │
  └─────────────────────────────────────────────────────────────────────────┘
  >>  

```

After selecting an option, it will delete all the emails from that sender. 

```jsx
Deleting emails from Discover Card <discover@services.discover.com> as a batch:
Deleted email 1
Deleted email 2
Deleted email 3
```

I actually hit the limit but the idea is there lol, otherwise you will have to just iterate through each of them. 

# Configuration

1. Create a Google API Project with the gmail API. [https://console.cloud.google.com/welcome](https://console.cloud.google.com/welcome) 
2. Ensure gmail API is enabled. 
3. Add the scope to have permissions: Dashboard → API Services → Data Access → Add or Remove Scopes → Add the scope with [`https://mail.google.com/`](https://mail.google.com/) . This scope will allow for deletion of emails. 
4. Ensure you have a local test user to authenticate. You will need two files the `credentials.json` file and the `token.json` , `credentials.json` is from there. Audience → Test Users → Add user. 

# Batching

After a while I noticed that it took a while to get the emails. After a bit of research looks like we can use a batch request which will send all the requests at once since the current get method to get all emails is a lot. 

[https://developers.google.com/workspace/gmail/api/guides/batch](https://developers.google.com/workspace/gmail/api/guides/batch) 

[https://googleapis.github.io/google-api-python-client/docs/epy/googleapiclient.http.BatchHttpRequest-class.html](https://googleapis.github.io/google-api-python-client/docs/epy/googleapiclient.http.BatchHttpRequest-class.html) 

After switching over to batching, instead of going through each page then going to the next page, first we go through all the pages and get the tokens to paginate and put them all through a batch but, we run into this error: 

```jsx
Error occurred: <HttpError 429 when requesting https://gmail.googleapis.com/gmail/v1/users/me/messages?pageToken=17798478678229882922&alt=json returned "Too many concurrent requests for user.". Details: "[{'message': 'Too many concurrent requests for user.', 'domain': 'global', 'reason': 'rateLimitExceeded'}]">
```

Looking at this, batching actually executes but doesn’t return anything according to the documentation, so while I was trying to add the individual requests and executing `.batch()` it won’t work when I try to iterate over the messages like I thought, it quite literally executes everything as a batch. This would work well with the delete_emails_from_senders. 

This is how it looks: 

```jsx
def deleted_email_callback(request_id, response, exception):
    if exception is not None:
        print(f"Error deleting email {request_id}: {exception}")
    else:
        print(f"Deleted email {request_id}")

def delete_emails_from_sender(service, sender_email):
    try:
        # Call the Gmail API to fetch emails from the specified sender
        query = f"from:{sender_email}"
        results = service.users().messages().list(userId="me", q=query).execute()
        messages = results.get("messages", [])

        if not messages:
            print(f"No emails found from {sender_email}.")
            return

        print(f"Deleting emails from {sender_email} as a batch:")
        
        batch = service.new_batch_http_request(callback=deleted_email_callback)
        
        for message in messages:
            batch.add(service.users().messages().delete(userId="me", id=message["id"]))
        batch.execute()

    except HttpError as error:
        print(f"An error occurred while deleting emails: {error}")
```

# Resources

[https://developers.google.com/workspace/gmail/api/auth/scopes](https://developers.google.com/workspace/gmail/api/auth/scopes) 

[https://developers.google.com/workspace/docs/api/how-tos/batch](https://developers.google.com/workspace/docs/api/how-tos/batch)

[https://developers.google.com/workspace/gmail/api/guides/batch#example](https://developers.google.com/workspace/gmail/api/guides/batch#example) 

[https://www.oncrawl.com/technical-seo/how-use-googles-indexing-api-bulk-python/](https://www.oncrawl.com/technical-seo/how-use-googles-indexing-api-bulk-python/) 

[https://googleapis.github.io/google-api-python-client/docs/epy/googleapiclient.http.BatchHttpRequest-class.html](https://googleapis.github.io/google-api-python-client/docs/epy/googleapiclient.http.BatchHttpRequest-class.html) 

[https://googleapis.github.io/google-api-python-client/docs/batch.html](https://googleapis.github.io/google-api-python-client/docs/batch.html)
