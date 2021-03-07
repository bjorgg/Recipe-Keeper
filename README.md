# Module 6 - React Framework

In this school assignment I was supposed to study a React framework, how to connect a database and/or a CMS to my application and how to deploy a web application to a professional deployment platform. I chose to use Next.js, Prismic and Vercel.

## Recipe Keeper

My idea was to build a recipe keeper application, a place where one can keep all of "theirs" recipes. For now there are just four recipes. The application is very minimal, a front page which lists all recipes and then you can click on each to navigate to the recipe. The logo links back to the front page. It's also very simply styled. This is a project which I hope I will come back to and add more features to it. Also to add more recipes so I can maybe someday empty the drawer which is full of recipes I have printed out, cut out from some paper/magazine or jotted down on a piece of paper.

## Future vision

- Search - be able to search for a recipe by name or keyword.
- Log in - since the site is thought for personal use it would be nice to have a log in feature.
- Filter by tags - be able to filter recipes by tags which each recipe currently has.
- Favorites - be able to mark you favorite recipes and then filter by favorites.

## Webhooks

I created two webhooks for this application, both will trigger deployment and a re-run of the build step on Vercel. One is triggered when code is pushed to the GitHub repo and the other one is triggered when content changes in the Prismic Headless CMS repo. The latter one I needed beacause of Next.js static paths, because fallback is set to false they are all statically generated during build time. That means that I need to run the build again if I add more items to the data source.

Here is a link to screenshots of the webhooks

> [Screenshots]()

## Live version

Here is a link to the live version

> [Recipe Keeper](https://recipe-keeper-blue.vercel.app/)

---
