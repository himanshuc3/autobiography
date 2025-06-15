# Deploying on AWS

- Configuring AWS, GCS and supabase.

## AWS Configuration

- IAM console setup.
- VPS vs containers

  - EC2 vs ECS/EKS
  - Heavy (OS overhead per instance) vs Lightweight, better resource sharing
  - EC for persistent services (like DBs) vs containers for stateless apps
  - ECS with EC2 nch type -> you run containers on top of EC2

- AWS RDS apparently sucks so bad that there is a position called DBA to manage databases. Supabase is the alternative.

- OAuth: Handshaking with the email/oauth provider

- ECR: aws container registry
- Setting credentials is a pain in the ACE
