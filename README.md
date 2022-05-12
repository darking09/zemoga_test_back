# ZEMOGA TESTING BACK

## Installation and Setup

Moving on, I am going to explain the steps to run this code from the docker:

1. Add the .env according to .env.example, you could change the values for your database or environment.

2. To install the project from docker you must run the next command and it'll launch the serve on [http://localhost:8080](http://localhost:8080):<br/>
   `docker-compose up`

3. After the Docker started, you should enter to docker shell environment with the next command:<br/>
   `sudo docker exec -it nodejs_zemoga_back bash`



**Note**: You should have installed and configured the docker on your computer.

## Running the unit tests

Now, I am going to explain the steps to run the unit tests:

1. You should enter to the docker environment with the next command:<br/>
   `sudo docker exec -it nodejs_zemoga_back bash`

2. You should run the next command:

   `yarn test`

**Note**: It's possible that the first time the unit tests fail because this tries to download the mongo server to run these unit tests. I recommend running it again.

## Endpoint on Serverless

This project was deployed over Lambda Functions of AWS, the data for this web service is:

1. Base endpoint: [https://tzq7sb2dwk.execute-api.us-east-1.amazonaws.com](https://tzq7sb2dwk.execute-api.us-east-1.amazonaws.com/).

2. Method to access the endpoint to search a users in the web services:
   *    Method: GET
   *    Endpoint: [https://tzq7sb2dwk.execute-api.us-east-1.amazonaws.com/api/user/:user_id](https://tzq7sb2dwk.execute-api.us-east-1.amazonaws.com/api/user/darkingsoft)
   *    user_id is the parameter to read the user's information, this could be the Twitter handle or database id.
   *    Example of the returned JSON:<br/>

```yaml
{
  "_id": "627ca18e614fee37b06d06ef",
  "tweets": [
    {
      "picture": "https://pbs.twimg.com/profile_images/422466023103926272/maG6gfgV_normal.jpeg",
      "name": "Fernando Torres B.",
      "handle": "darkingsoft",
      "content": "RT @Tolaymaruja: Oites Tola, deberíamos empezar a decile a Duque “señor expresidente”, pa hacenos la ilusión que ya se fue.",
      "_id": "627ca190614fee37b06d06f3"
    },
    {
      "picture": "https://pbs.twimg.com/profile_images/422466023103926272/maG6gfgV_normal.jpeg",
      "name": "Fernando Torres B.",
      "handle": "darkingsoft",
      "content": "RT @DanielSamperO: Esta emboscada emocional al candidato Rodolfo Hernández utilizando la tragedia de su hija es de un amarillismo vergonzos…",
      "_id": "627ca190614fee37b06d06f4"
    },
    {
      "picture": "https://pbs.twimg.com/profile_images/422466023103926272/maG6gfgV_normal.jpeg",
      "name": "Fernando Torres B.",
      "handle": "darkingsoft",
      "content": "RT @Lauraggils: Me cuentan que el presidente está satisfecho con su legado y, en particular, en política exterior. Tenemos un demente en Ca…",
      "_id": "627ca190614fee37b06d06f5"
    },
    {
      "picture": "https://pbs.twimg.com/profile_images/422466023103926272/maG6gfgV_normal.jpeg",
      "name": "Fernando Torres B.",
      "handle": "darkingsoft",
      "content": "RT @MONYRODRIGUEZOF: Presupuesto de guerra para enfrentar estudiantes y población civil, pero cuando se necesita de verdad… ajúa.",
      "_id": "627ca190614fee37b06d06f6"
    },
    {
      "picture": "https://pbs.twimg.com/profile_images/422466023103926272/maG6gfgV_normal.jpeg",
      "name": "Fernando Torres B.",
      "handle": "darkingsoft",
      "content": "RT @tobonsanin: Solidaridad con el ingeniero Rodolfo Hernández y con la dificultad que significó perder a su hija. No tienen que recordárse…",
      "_id": "627ca190614fee37b06d06f7"
    }
  ],
  "name": "Fernando Torres B.",
  "experience": "I have worked more 8 years with software projects in Colombia, Mexico and USA...",
  "picture": "https://pbs.twimg.com/profile_images/422466023103926272/maG6gfgV_normal.jpeg",
  "twitterHandle": "darkingsoft",
  "__v": 0
}
```

3.  Method to access the endpoint to add or update to users in the web services:

    *   Method: POST
    *   Endpoint: [https://tzq7sb2dwk.execute-api.us-east-1.amazonaws.com/api/user](https://tzq7sb2dwk.execute-api.us-east-1.amazonaws.com/api/user)
    *   Parameters to be sending:
        *    handle:string is the Twitter handle for a user.
        *    name:string is the name of the user to show.
        *    experience:string, long text about the user experience or some topic that him/her wants talking.
    *    Example of the returned JSON:<br/>

```yaml
{
  "_id": "627caf18a472f3e3e6333ddd",
  "tweets": [
      {
          "picture": "https://pbs.twimg.com/profile_images/1521957986335297536/itVSA7l0_normal.jpg",
          "name": "Eleon Musk.",
          "handle": "elonmusk",
          "content": "@jack Yeah",
          "_id": "627caf19a472f3e3e6333ddf"
      },
      {
          "picture": "https://pbs.twimg.com/profile_images/1521957986335297536/itVSA7l0_normal.jpg",
          "name": "Eleon Musk.",
          "handle": "elonmusk",
          "content": "Tap on the stars in upper right of screen to revert to chronological",
          "_id": "627caf19a472f3e3e6333de0"
      },
      {
          "picture": "https://pbs.twimg.com/profile_images/1521957986335297536/itVSA7l0_normal.jpg",
          "name": "Eleon Musk.",
          "handle": "elonmusk",
          "content": "Chronological tweets seem much better than what “the algorithm” suggests",
          "_id": "627caf19a472f3e3e6333de1"
      },
      {
          "picture": "https://pbs.twimg.com/profile_images/1521957986335297536/itVSA7l0_normal.jpg",
          "name": "Eleon Musk.",
          "handle": "elonmusk",
          "content": "@stevenmarkryan Literally true. Even 100x is possible.",
          "_id": "627caf19a472f3e3e6333de2"
      },
      {
          "picture": "https://pbs.twimg.com/profile_images/1521957986335297536/itVSA7l0_normal.jpg",
          "name": "Eleon Musk.",
          "handle": "elonmusk",
          "content": "@WholeMarsBlog Without billions of miles of training data, solving self-driving is impossible",
          "_id": "627caf19a472f3e3e6333de3"
      }
  ],
  "name": "Eleon Musk.",
  "experience": "I have worked more 8 years with software projects in Colombia, Mexico and USA...",
  "picture": "https://pbs.twimg.com/profile_images/1521957986335297536/itVSA7l0_normal.jpg",
  "twitterHandle": "elonmusk",
  "__v": 0
}
```
**Note**: to update a user, you always should send the handle to get it, on the case this is not sending, return an error
