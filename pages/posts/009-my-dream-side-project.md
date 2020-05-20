---
title: 'Day 9: My Dream Side Project'
date: 2019-02-11
image: https://files-ew26yfdvy.now.sh/carbon.png
---

I've been mentoring people who are learning to code. In several cases, they've wanted to build a traditional web application using PHP frameworks like [Laravel](https://laravel.com) or [WordPress](https://wordpress.org).

This is a great choice, especially for people starting out. You can take these skills and get jobs!

But I keep hitting roadblocks when it comes to helping these people get up and running:

- Their local dev environment is locked down, or it requires an onslaught of installs like Composer, Node.js, Git, Homebrew, Valet or a local dev server
- They need to deploy their work, but they don't want to set up or rent a server in the cloud. They usually end up using FTP to send it to a server their school has designated, which is also locked down 😭

## We can make this better

So I've been wanting to build two things to solve these problems:

**An immutable, "serverless" deployment workflow for common PHP projects like Laravel and WordPress.** I am in love with [Zeit](https://zeit.co/), and this would essentially be the same thing as their [Serverless Docker product](https://zeit.co/blog/serverless-docker), only geared toward PHP projects.

This would also include access to a **database broker service**, where users could request small database instances for different revisions of a project for testing. The service would make it simple for the user to say "Hey, I need a MySQL database for this Laravel App." The service would respond "OK - here is the host, username and password." Additionally, the user could say "Hey, I would like to test a version of this with a replica of that database to see if my migration runs smoothly." The service would copy that database and provide the user new credentials to use.

So how would it work? Through an intuitive command line tool (and eventual GitHub integration):

```bash
$ php artisan deploy

Deploying Laravel application your-laravel-app to your-laravel-app-f2uye8.fancyservice.sh...

It looks like you need a database. Would you like to provision one now? (Y/n)
Provisioning database and populating remote environment variables...
Database provisioned!

Laravel app deployed successfully to https://your-laravel-app-f2uye8.fancyservice.sh
```

Laravel apps are designed to be run in multiple environments, with the environment-specific variables living in a gitignored `.env` file. This could be built into the deployment service as `secrets`, similar to how [Zeit handles it](https://zeit.co/docs/v2/deployments/environment-variables-and-secrets/). Everything else about Laravel lends itself really well to this scenario.

WordPress, on the other hand, is another story.

Most WordPress projects are based on a `wp-config.php` file, which usually acts as a place to put secrets (similar to Laravel's `.env`). It also has folders full of dynamically-populated **plugins** which often come from third parties, and a folder for **uploads** which contain a bunch of binary files.

If I were to implement a WordPress "buildpack" for my deployment service, I'd enforce the following constraints:

- Every project (if it is not already) will be transformed into a [Roots Bedrock](https://roots.io/bedrock/) format, which is inspired by the [Twelve-Factor App methodology](https://12factor.net/).
- Uploads must be deferred to a third-party service like Amazon S3.
- Plugins will be installed via Composer from [wpackagist](https://wpackagist.org).

This will standardize the way WordPress apps are deployed and reduce the load on my file storage server implementation.

## But how?

There's a lot to consider here. Security, networking, scalability.

Obviously, we would want to run everything in a container. So a naive me might write a li'l script that pulls in a Git repo inside a Docker container and fires up `php -S :80`, right?

The problem is that is a lack of _orchestration_. It's tough to try to maintain a bunch of machines, running a bunch of Docker images, and make that scalable. Most PHP deployment services like [Laravel Forge](https://forge.laravel.com) or [ServerPilot](http://serverpilot.io) — which are great, don't get me wrong — require that you **run your own infrastructure**. This could mean a DigitalOcean Droplet or Linode instance.

But I want to make it even easier than that. `php artisan deploy` or `wp deploy`, remember?

There's also the issue of _security_. I don't know about Docker containers sharing the same host node, and I don't care to become a Unix security expert overnight.

So let's use [Kubernetes](https://kubernetes.io/). It is:

- Open Source
- Supported by big players (Google, etc)
- Scalable
- Pretty confusing tbh

With Kubernetes, one big constraint is that **everything must be an image**. This means no uploading morsels of PHP files willy-nilly. This constraint is pretty great, because it means Kubernetes (I'm trying of typing it out now, so let's call it `k8s`) has **self-healing** and **autoscaling** features.

How does this work? Here's a diagram. I'll explain afterward:

![PHP Deployment Dreams](/blog/php_deployment_mock.png)

The flow of a deployment goes from _left to right_, while the flow of a web visitor goes from _top to bottom_:

- **User/Cli**: The person typing `deploy` in their command line. This syncs files up to an API server running my web app.
- **API Server**: We see new files incoming, store them, and create a new deployment. This is an immutable state of the application with a unique identifier. The API server tells the Image Builder what's up.
- **Image Builder**: This component packages up the files for a given deployment into a Docker image. It also handles transforming WordPress projects into a compatible Bedrock format.
- **Container Registry**: Per-deployment images are pushed up to a private container registry, like Google Container Registry. Storage is cheap, baby.
- **K8s Deployment**: When the image is uploaded to the registry, the Image Builder creates a new deployment in my cluster through the k8s API.
- **Ingress/Routing**: Meanwhile, our API Server also calls out to the k8s cluster to tell it about this new deployment and make sure people can visit it.
- **Load Balancer**: This lives on the edge of the k8s cluster and sends requests to the correct node and pod, according to the Ingress rules. Before most requests, it will hit the Activator.
- **Activator/Sleeper**: This is a tricky part! And I'm gonna talk about it below.

## Scaling to Zero

One important aspect of running an immutable deployment service like this is that **a lot of apps out there don't need a server most of the time**. This is partially where the term _serverless_ gets tossed around. If I make a dumb Laravel project for a weekend hack, do I _really_ need a 8GB server running full-time to support it for the following three years? Probably not.

There's a concept in local software development called "socket activation," meaning an application component will not come online and take up precious memory and CPU utilization until it is needed in the step of the program. This concept translates to serverless architecture with the term **scale to zero**.

When you think of scaling, you usually think of high-traffic situations like during the Super Bowl or when your latest app goes viral. However, scaling the _opposite way_ means you can reduce costs when you're not needing server space. Most cloud offerings, like AWS Elastic Beanstalk, already offer autoscaling as part of the package.

However, the REALLY COOL part about _scaling to zero_ is relatively new and is now possible in a Kubernetes environment. What does this mean?

- Freeing up server resources when apps are getting literally no traffic
- Cost savings
- Seriously — cost savings

I'm all about this concept, and it's a must for me in order to build this service. You see this happen already in the wild with services like Zeit, [Glitch](https://glitch.com), [CodePen Projects](http://codepen.io/projects), and [CodeSandbox ServerSide Eval](https://codesandbox.io).

I'm not gonna lie: trying to come up with ways to implement this has been occupying my mind for a couple months. I just couldn't figure out how I could build a service that:

1. Sees an incoming request
1. _Holds on_ to the request
1. Checks the k8s API to see if a given pod for a version of a project is awake or sleeping, using various app API and k8s API calls
1. If it is active, pass traffic through to the pod, which resolves the request
1. If it is active, _hold on even longer_ while the pod is recreated (known as a cold start). Once it is active, ideally within a couple seconds or less, the request is routed to the new pod and resolved.

How the heck am I supposed to do all that?! Learn Go and write a bunch of custom k8s integrations?

## Knative to the rescue

Thankfully, I didn't have to do that, because — gosh darnit — someone already has.

[Knative](https://cloud.google.com/knative/) was announced at Cloud Next '18. It's a joint effort between Google, IBM, Pivotal and Redhat. And it is cool, y'all.

It offers so much - serving tools, image builders, routing and metrics.

I have a lot to say about Knative! But I'm going to save that for my next post, where I install Knative on a new GKE k8s cluster and try it out for the first time.

Stay tuned!
