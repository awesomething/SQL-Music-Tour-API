const db = require('../model/song');

const aiController = {};

/* promptReveiver receives prompt from request body and make POST request to openai API */
aiController.promptReceiver = (req, res, next) => {
  const { prompt } = req.body;

  // check if prompt is missing

  const system =
    'You are a SQL expert. This is a table schema. I will type natural language and you will return a JSON object with only one property called query, and the value is SQL query string. \
    ### Postgres SQL bands table with its properties: \
    # \
    # categories(category, categoryname) \
    # band_id \
    # name \
    # genre \
    # available_start_time \
    # end_time ';

  /* adding reponse.ok made the post requeest work
    reference: https://stackoverflow.com/questions/74944407/using-fetch-to-call-the-openai-api-throws-error-400-you-must-provide-a-model-pa */
  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: system,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 150,
      temperature: 0.0,
      //   stream: true,
    }),
  }).then((response) => {
    if (response.ok) {
      response
        .json()
        .then((json) => {
          const content = JSON.parse(json.choices[0].message['content']);
          res.locals.query = content['query'];
          return next();
        })
        .catch((err) => {
          return next({
            log: 'aiController.promptReceiver Error',
            message: {
              err: 'Error occurred in aiController.promptReceiver',
            },
          });
        });
    }
  });
};

module.exports = aiController;
