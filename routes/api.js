'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let locale = req.body.locale;
      let text = req.body.text;

      if(!locale || text === undefined) {
        return res.json({ error: 'Required field(s) missing' });
      }

      if(text === '') {
        return res.json({ error: 'No text to translate' });
      }

      let translation = '';
      
      switch(locale) {
        case 'american-to-british':
          translation = translator.toBritishEnglish(text);
          break;
        case 'british-to-american':
          translation = translator.toAmericanEnglish(text);
          break;
        default:
          return res.json({ error: 'Invalid value for locale field' });
      }

      if(translation === text) {
        return res.json({ text, translation: 'Everything looks good to me!' });
      }  
      return res.json({ text, translation: translation[1] });
    });
};