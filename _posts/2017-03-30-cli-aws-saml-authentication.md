---
layout: post
title:  Authenticating to AWS from the command line
date:   2017-03-30
author_name: Daniel Dyba
author_image: https://s.gravatar.com/avatar/e1237fa7ee270ace2ebb53c8cab91a6b?s=300
author_url: https://www.danieldyba.com
image: https://source.unsplash.com/MwRZqE1JuGs/500x300
excerpt: Go beyond the AWS console
tags: [aws]
---

At PennyMac, we use OneLogin as a single-sign on platform for authenticating to third-party applications, three of which are Amazon Web Services accounts. Today, we're going to look at using a Python script that takes away the complexity of authenticating to AWS through OneLogin.

The link to the repository is [here](https://gitlab.pnmac.com/windows/aws_saml_api). The instructions in the README are straightforward. Clone the repository to your computer.

If you're on a Mac and have Homebrew installed, you're one command away from installing the [AWS CLI](https://aws.amazon.com/cli/):

```
brew install awscli
```

Go to the repository and run the Python script `aws_cli_sso_via_vco.py` and pass `dev` as the first argument. Here `dev` is the AWS development account you'll be authenticating against:

```
python aws_cli_sso_via_vco.py dev
```

Running that script will produce the following output:

```
Username: your-username-here
Password:
Getting SAML assertion. Please wait. . .


----------------------------------------------------------------
Your new access key pair has been stored in the AWS configuration file /Users/your-username-here/.aws/credentials under the dev profile.
Note that it will expire at 2017-03-30T18:03:19Z.
After this time you may safely rerun this script to refresh your access key pair.
To use this credential call the AWS CLI with the --profile option (e.g. aws --profile dev ec2 describe-instances).
----------------------------------------------------------------


Testing new creds:  passed
```

> **NOTE** _You'll have to regularly run this script (every hour), in order to maintain a fresh set of valid credentials._

As the script mentions, you can try out the AWS CLI with a simple command:

```
aws --profile dev ec2 describe-instances
```

Note the reappearance of `dev` here as the argument to the `--profile` switch. If you want to avoid having to keep track of remembering to specify `dev` as the profile, you can export the `AWS_PROFILE` variable or add it to your `.bashrc` or `.zshrc`:

```
export AWS_PROFILE=dev
```

## Troubleshooting Notes

If your password contains a `&`, you may have some difficulties logging in successfully.

If you already have a `credentials` file in the `~/.aws` folder, you'll also need to add a section at the bottom of the file:

```
[dev]
```

If you can't successfully authenticate, it's likely that you don't have access to the VCO server on port 8281. You'll want to open a ticket with ServiceNow and ask them for access to the VCO server. You can see the name of the server [here](https://gitlab.pnmac.com/windows/aws_saml_api/blob/master/aws_cli_sso_via_vco.py#L64).

If you still don't have access, you may need to request to be placed in the group that has access to the AWS development account. Again, open a ServiceNow ticket requesting this.
