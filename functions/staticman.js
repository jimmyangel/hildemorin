const { processEntry } = require("@staticman/netlify-functions");
const queryString = require("querystring");

exports.handler = (event, context, callback) => {
  const repo = process.env.REPO;
  const [username, repository] = repo.split("/");
  const bodyData = queryString.parse(event.body);

  event.queryStringParameters = {
    ...event.queryStringParameters,
    ...bodyData,
    username,
    repository,
  };

  const config = {
    origin: event.headers.origin,
    sites: {
      [repo]: {
        allowedFields: ["name", "body"],
        branch: "master",
        commitMessage: "Add Staticman data",
        filename: "{@id}",
        format: "yaml",
        generatedFields: {
          date: {
            type: "date",
            options: {
              format: "timestamp-seconds"
            }
          },
        },
        moderation: false,
        name: "hildemorin.com",
        path: "data/comments/{options.entryId}",
        requiredFields: ["name", "body"],
      },
    },
  };
  return processEntry(event, context, callback, config);
};
